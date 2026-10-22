// @vitest-environment jsdom
import { describe, expect, it, beforeEach } from "vitest";
import {
  SUPPORTED_LANGUAGES,
  getLanguageById,
  getLanguagesByCategory,
  SupportedLanguage
} from "../lib/codelab/languageRegistry";
import { executeSqlQuery, SAMPLE_DB_SCHEMA, TableSchemaInfo, resetSqlDatabase } from "../lib/codelab/sqlRunner";
import { getExerciseForLesson, CURRICULUM_EXERCISES } from "../lib/codelab/exerciseData";
import {
  createProject,
  getProject,
  listProjects,
  deleteProject,
  duplicateProject,
  saveProject
} from "../lib/codelab/projectService";

describe("Language Registry (Focused Core Languages)", () => {
  const allowedLanguages = ["python", "web", "sql", "java", "cpp", "c", "javascript"];

  it("contains strictly and only the required 7 programming languages", () => {
    expect(SUPPORTED_LANGUAGES.length).toBe(7);
    const ids = SUPPORTED_LANGUAGES.map((l: SupportedLanguage) => l.id);
    allowedLanguages.forEach(langId => {
      expect(ids).toContain(langId);
    });
  });

  it("validates language metadata for all 7 languages", () => {
    allowedLanguages.forEach(langId => {
      const found = getLanguageById(langId);
      expect(found, `Language ${langId} must exist`).toBeDefined();
      expect(found?.name.length).toBeGreaterThan(0);
      expect(found?.starterCode.length).toBeGreaterThan(0);
      expect(found?.extension).toMatch(/^\.[a-z0-9]+$/);
    });
  });

  it("ensures language IDs are unique", () => {
    const ids = SUPPORTED_LANGUAGES.map((l: SupportedLanguage) => l.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("filters languages by category", () => {
    const webLangs = getLanguagesByCategory("web");
    expect(webLangs.some((l: SupportedLanguage) => l.id === "web")).toBe(true);
    expect(webLangs.some((l: SupportedLanguage) => l.id === "javascript")).toBe(true);

    const dataLangs = getLanguagesByCategory("data");
    expect(dataLangs.some((l: SupportedLanguage) => l.id === "sql")).toBe(true);
    expect(dataLangs.some((l: SupportedLanguage) => l.id === "python")).toBe(true);
  });

  it("gracefully falls back to default language for unknown lookup", () => {
    expect(getLanguageById("cobol").id).toBe("python");
  });
});

describe("In-Browser SQL Query Engine", () => {
  beforeEach(() => {
    resetSqlDatabase();
  });

  it("executes basic SELECT queries", async () => {
    const result = await executeSqlQuery("SELECT name, track FROM students LIMIT 2;");
    expect(result.error).toBeUndefined();
    expect(result.rowCount).toBe(2);
    expect(result.rows.length).toBe(2);
    expect(result.rows[0]).toHaveProperty("name");
    expect(result.rows[0]).toHaveProperty("track");
  });

  it("filters results with WHERE clauses", async () => {
    const result = await executeSqlQuery("SELECT name, gpa, status FROM students WHERE status = 'active';");
    expect(result.error).toBeUndefined();
    expect(result.rowCount).toBeGreaterThan(0);
    result.rows.forEach((row: Record<string, any>) => {
      expect(row.status).toBe("active");
    });
  });

  it("handles numeric comparisons in WHERE clauses", async () => {
    const result = await executeSqlQuery("SELECT name, gpa FROM students WHERE gpa >= 3.8;");
    expect(result.error).toBeUndefined();
    result.rows.forEach((row: Record<string, any>) => {
      expect(Number(row.gpa)).toBeGreaterThanOrEqual(3.8);
    });
  });

  it("orders rows correctly with ORDER BY DESC", async () => {
    const result = await executeSqlQuery("SELECT name, gpa FROM students ORDER BY gpa DESC;");
    expect(result.error).toBeUndefined();
    expect(result.rows.length).toBeGreaterThan(1);
    for (let i = 1; i < result.rows.length; i++) {
      expect(Number(result.rows[i - 1].gpa)).toBeGreaterThanOrEqual(Number(result.rows[i].gpa));
    }
  });

  it("creates a table and inserts rows into it successfully", async () => {
    // 1. Create table
    const createRes = await executeSqlQuery("CREATE TABLE developers (id INT PRIMARY KEY, name VARCHAR(100), salary INT);");
    expect(createRes.error).toBeUndefined();
    expect(createRes.message).toContain("created successfully");

    // Verify dynamic schema registered the new table
    const tableNames = SAMPLE_DB_SCHEMA.map((t: TableSchemaInfo) => t.tableName);
    expect(tableNames).toContain("developers");

    // 2. Insert rows
    const insertRes = await executeSqlQuery("INSERT INTO developers (id, name, salary) VALUES (1, 'Kavya', 95000), (2, 'Vikram', 82000);");
    expect(insertRes.error).toBeUndefined();
    expect(insertRes.rowCount).toBe(2);

    // 3. Select from new table
    const selectRes = await executeSqlQuery("SELECT * FROM developers WHERE salary > 85000;");
    expect(selectRes.error).toBeUndefined();
    expect(selectRes.rowCount).toBe(1);
    expect(selectRes.rows[0].name).toBe("Kavya");
    expect(selectRes.rows[0].salary).toBe(95000);
  });

  it("executes multi-statement SQL scripts sequentially", async () => {
    const script = `
      CREATE TABLE projects_lab (id INT, title TEXT);
      INSERT INTO projects_lab VALUES (10, 'BlezeX IDE');
      INSERT INTO projects_lab VALUES (20, 'Career LMS');
      SELECT * FROM projects_lab;
    `;
    const result = await executeSqlQuery(script);
    expect(result.error).toBeUndefined();
    expect(result.rowCount).toBe(2);
    expect(result.rows[0].title).toBe("BlezeX IDE");
    expect(result.rows[1].title).toBe("Career LMS");
  });

  it("supports UPDATE and DELETE statements", async () => {
    await executeSqlQuery("CREATE TABLE inventory (id INT, item TEXT, count INT);");
    await executeSqlQuery("INSERT INTO inventory VALUES (1, 'Notebook', 10), (2, 'Pen', 25);");

    const updateRes = await executeSqlQuery("UPDATE inventory SET count = 15 WHERE id = 1;");
    expect(updateRes.error).toBeUndefined();
    expect(updateRes.rowCount).toBe(1);

    const deleteRes = await executeSqlQuery("DELETE FROM inventory WHERE id = 2;");
    expect(deleteRes.error).toBeUndefined();
    expect(deleteRes.rowCount).toBe(1);

    const selectRes = await executeSqlQuery("SELECT * FROM inventory;");
    expect(selectRes.rowCount).toBe(1);
    expect(selectRes.rows[0].count).toBe(15);
  });

  it("returns error message for non-existent table", async () => {
    const result = await executeSqlQuery("SELECT * FROM non_existent_table;");
    expect(result.error).toMatch(/Table "non_existent_table" not found/);
    expect(result.rowCount).toBe(0);
  });
});

describe("Coding Exercises and Curricular Linkage", () => {
  it("resolves built-in curriculum exercises", () => {
    const jsEx = CURRICULUM_EXERCISES["js-reverse-string"];
    expect(jsEx).toBeDefined();
    expect(jsEx.testCases.length).toBeGreaterThanOrEqual(3);
    expect(jsEx.hints.length).toBeGreaterThan(0);

    const pyEx = CURRICULUM_EXERCISES["py-two-sum"];
    expect(pyEx).toBeDefined();
    expect(pyEx.language).toBe("python");
    expect(pyEx.testCases.some(tc => tc.isHidden)).toBe(true);
  });

  it("dynamically adapts exercise for Python-related lessons", () => {
    const ex = getExerciseForLesson("intro-py", "Python Machine Learning Foundations", "cheatsheet");
    expect(ex.language).toBe("python");
    expect(ex.title).toMatch(/Python/);
    expect(ex.testCases.length).toBeGreaterThan(0);
  });

  it("dynamically adapts exercise for SQL/Database-related lessons", () => {
    const ex = getExerciseForLesson("sql-basics", "Relational Database Design with SQL", "practice");
    expect(ex.language).toBe("sql");
    expect(ex.starterCode).toMatch(/SELECT/i);
  });
});

describe("Project Persistence Service", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("creates, saves, retrieves, duplicates, and deletes a local project", async () => {
    // 1. Create
    const project = await createProject({
      title: "My Vitest Python Project",
      language: "python",
      description: "Automated unit test project",
    });
    expect(project.id).toBeDefined();
    expect(project.title).toBe("My Vitest Python Project");
    expect(project.files?.length).toBe(1);
    expect(project.files?.[0].name).toBe("main.py");

    // 2. Retrieve
    const fetched = await getProject(project.id);
    expect(fetched).toBeDefined();
    expect(fetched?.id).toBe(project.id);

    // 3. Update & Save
    const modifiedFiles = [
      { name: "main.py", content: "print('Updated from unit test!')", is_entry_point: true, position: 1 },
      { name: "utils.py", content: "def helper(): pass", is_entry_point: false, position: 2 },
    ];
    await saveProject({ ...project, title: "Renamed Project" }, modifiedFiles);

    const afterSave = await getProject(project.id);
    expect(afterSave?.title).toBe("Renamed Project");
    expect(afterSave?.files?.length).toBe(2);

    // 4. Duplicate
    const duplicated = await duplicateProject(project.id);
    expect(duplicated).toBeDefined();
    expect(duplicated?.id).not.toBe(project.id);
    expect(duplicated?.title).toContain("(Copy)");
    expect(duplicated?.files?.length).toBe(2);

    // 5. List
    const all = await listProjects();
    expect(all.length).toBe(2);

    // 6. Delete
    await deleteProject(project.id);
    const afterDelete = await getProject(project.id);
    expect(afterDelete).toBeNull();
    const listAfterDelete = await listProjects();
    expect(listAfterDelete.length).toBe(1);
  });
});
