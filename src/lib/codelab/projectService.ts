import { supabase } from "../supabase";
import { getLanguageById } from "./languageRegistry";

export interface CodeProjectFile {
  id?: string;
  project_id?: string;
  name: string;
  content: string;
  is_entry_point: boolean;
  position: number;
}

export interface CodeProject {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  language: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  files?: CodeProjectFile[];
}

const LOCAL_STORAGE_KEY_PREFIX = "blezex_codelab_projects_";

function getStorageKey(userId: string | null): string {
  return `${LOCAL_STORAGE_KEY_PREFIX}${userId || "guest"}`;
}

function getLocalProjects(userId: string | null): CodeProject[] {
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLocalProjects(userId: string | null, projects: CodeProject[]) {
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(projects));
  } catch (e) {
    console.warn("Failed to persist Code Lab projects to localStorage", e);
  }
}

/**
 * List all projects for the current authenticated user (with localStorage fallback)
 */
export async function listProjects(): Promise<CodeProject[]> {
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || null;

  if (userId) {
    try {
      const { data, error } = await supabase
        .from("code_projects")
        .select(`
          id,
          user_id,
          title,
          description,
          language,
          is_public,
          created_at,
          updated_at
        `)
        .order("updated_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as CodeProject[];
      }
    } catch {
      // Fall through to local fallback
    }
  }

  return getLocalProjects(userId);
}

/**
 * Load a single project with all its files
 */
export async function getProject(projectId: string): Promise<CodeProject | null> {
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || null;

  if (userId) {
    try {
      const { data: proj, error: projErr } = await supabase
        .from("code_projects")
        .select("*")
        .eq("id", projectId)
        .maybeSingle();

      if (!projErr && proj) {
        const { data: files } = await supabase
          .from("code_project_files")
          .select("*")
          .eq("project_id", projectId)
          .order("position", { ascending: true });

        return {
          ...proj,
          files: files || [],
        };
      }
    } catch {
      // Fallback
    }
  }

  const localList = getLocalProjects(userId);
  return localList.find(p => p.id === projectId) || null;
}

/**
 * Create a new Code Lab project with starter files
 */
export async function createProject(params: {
  title: string;
  language: string;
  description?: string;
  files?: CodeProjectFile[];
}): Promise<CodeProject> {
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || "guest";
  const now = new Date().toISOString();
  const langConfig = getLanguageById(params.language);

  // Prepare initial files
  let initialFiles = params.files;
  if (!initialFiles || initialFiles.length === 0) {
    if (params.language === "web") {
      initialFiles = [
        { name: "index.html", content: langConfig?.starterCode || "", is_entry_point: true, position: 1 },
        { name: "styles.css", content: "/* BlezeX CSS Styles */\nbody {\n  font-family: system-ui, sans-serif;\n  padding: 2rem;\n  background: #f8fafc;\n  color: #0f172a;\n}", is_entry_point: false, position: 2 },
        { name: "script.js", content: "// BlezeX JavaScript Playground\nconsole.log('BlezeX Web Playground Ready!');", is_entry_point: false, position: 3 },
      ];
    } else {
      const ext = langConfig?.extension || ".txt";
      const fileName = `main${ext}`;
      initialFiles = [
        {
          name: fileName,
          content: langConfig?.starterCode || "// Write your code here\n",
          is_entry_point: true,
          position: 1,
        },
      ];
    }
  }

  // Attempt Supabase insert
  if (user?.id) {
    try {
      const { data: proj, error: projErr } = await supabase
        .from("code_projects")
        .insert({
          user_id: user.id,
          title: params.title,
          description: params.description || "",
          language: params.language,
          is_public: false,
        })
        .select()
        .single();

      if (!projErr && proj) {
        const filesToInsert = initialFiles.map(f => ({
          project_id: proj.id,
          name: f.name,
          content: f.content,
          is_entry_point: f.is_entry_point,
          position: f.position,
        }));

        const { data: insertedFiles } = await supabase
          .from("code_project_files")
          .insert(filesToInsert)
          .select();

        return {
          ...proj,
          files: insertedFiles || filesToInsert,
        };
      }
    } catch {
      // Local fallback
    }
  }

  // Local fallback project
  const newLocalProject: CodeProject = {
    id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    user_id: userId,
    title: params.title,
    description: params.description || "",
    language: params.language,
    is_public: false,
    created_at: now,
    updated_at: now,
    files: initialFiles,
  };

  const list = getLocalProjects(userId);
  saveLocalProjects(userId, [newLocalProject, ...list]);
  return newLocalProject;
}

/**
 * Save / update project metadata and its files
 */
export async function saveProject(
  project: CodeProject,
  files: CodeProjectFile[]
): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || null;
  const now = new Date().toISOString();

  if (userId && !project.id.startsWith("proj_")) {
    try {
      // 1. Update project title and updated_at
      await supabase
        .from("code_projects")
        .update({
          title: project.title,
          description: project.description,
          updated_at: now,
        })
        .eq("id", project.id);

      // 2. Upsert files
      for (const f of files) {
        if (f.id) {
          await supabase
            .from("code_project_files")
            .update({
              content: f.content,
              name: f.name,
              is_entry_point: f.is_entry_point,
              position: f.position,
              updated_at: now,
            })
            .eq("id", f.id);
        } else {
          await supabase
            .from("code_project_files")
            .insert({
              project_id: project.id,
              name: f.name,
              content: f.content,
              is_entry_point: f.is_entry_point,
              position: f.position,
            });
        }
      }
      return true;
    } catch {
      // Fall through to local
    }
  }

  // Local storage save
  const list = getLocalProjects(userId);
  const updatedList = list.map(p => {
    if (p.id === project.id) {
      return {
        ...project,
        updated_at: now,
        files: files.map((f, idx) => ({ ...f, position: idx + 1 })),
      };
    }
    return p;
  });

  // If not found in local, push it
  if (!updatedList.some(p => p.id === project.id)) {
    updatedList.unshift({
      ...project,
      updated_at: now,
      files,
    });
  }

  saveLocalProjects(userId, updatedList);
  return true;
}

/**
 * Delete a project
 */
export async function deleteProject(projectId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || null;

  if (userId && !projectId.startsWith("proj_")) {
    try {
      const { error } = await supabase
        .from("code_projects")
        .delete()
        .eq("id", projectId);

      if (!error) return true;
    } catch {
      // Fall through to local
    }
  }

  const list = getLocalProjects(userId);
  saveLocalProjects(userId, list.filter(p => p.id !== projectId));
  return true;
}

/**
 * Duplicate an existing project
 */
export async function duplicateProject(projectId: string): Promise<CodeProject | null> {
  const existing = await getProject(projectId);
  if (!existing) return null;

  return createProject({
    title: `${existing.title} (Copy)`,
    description: existing.description,
    language: existing.language,
    files: existing.files?.map(f => ({
      name: f.name,
      content: f.content,
      is_entry_point: f.is_entry_point,
      position: f.position,
    })),
  });
}
