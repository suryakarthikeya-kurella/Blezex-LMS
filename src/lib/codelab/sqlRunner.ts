/**
 * BlezeX Interactive SQL Runner
 * Provides a client-side relational SQL execution engine supporting:
 * - Multi-statement execution (scripts separated by semicolons)
 * - CREATE TABLE (with columns, types, primary keys)
 * - INSERT INTO (single/multi-row, custom/default column lists)
 * - SELECT (with columns, *, JOIN ... ON, WHERE, ORDER BY, LIMIT)
 * - UPDATE ... SET ... WHERE
 * - DELETE FROM ... WHERE
 * - DROP TABLE [IF EXISTS]
 * - Pre-seeded BlezeX LMS tables: students, courses, enrollments, orders, products
 */

export interface SqlQueryResult {
  columns: string[];
  rows: Array<Record<string, any>>;
  rowCount: number;
  runtimeMs: number;
  executionTimeMs?: number;
  error?: string;
  message?: string;
}

export interface TableSchemaInfo {
  tableName: string;
  columns: string[];
  description: string;
}

// Initial pre-populated sample database tables
function getInitialDatabase(): Record<string, Array<Record<string, any>>> {
  return {
    students: [
      { id: 1, full_name: "Amina Al-Mansoor", name: "Amina Al-Mansoor", email: "amina@example.com", role: "student", status: "active", gpa: 3.95, track: "Full Stack Web" },
      { id: 2, full_name: "Priya Sharma", name: "Priya Sharma", email: "priya@example.com", role: "student", status: "active", gpa: 3.88, track: "AI & Data Science" },
      { id: 3, full_name: "Rohan Verma", name: "Rohan Verma", email: "rohan@example.com", role: "student", status: "active", gpa: 3.65, track: "Data Analytics" },
      { id: 4, full_name: "Alex Johnson", name: "Alex Johnson", email: "alex@example.com", role: "student", status: "active", gpa: 3.75, track: "Cloud & DevOps" },
      { id: 5, full_name: "Vikram Reddy", name: "Vikram Reddy", email: "vikram@example.com", role: "student", status: "suspended", gpa: 3.10, track: "Full Stack Web" },
    ],
    courses: [
      { id: 101, title: "Full Stack Web Development", slug: "full-stack-web", min_progress_pct: 80, category: "technical" },
      { id: 102, title: "AI, Machine Learning & Data Science", slug: "ai-ml-data-science", min_progress_pct: 80, category: "technical" },
      { id: 103, title: "Data Analytics & Business Intelligence", slug: "data-analytics-bi", min_progress_pct: 80, category: "technical" },
      { id: 104, title: "Python Programming & Problem Solving", slug: "python-programming", min_progress_pct: 80, category: "technical" },
      { id: 105, title: "Digital Marketing & Personal Branding", slug: "digital-marketing", min_progress_pct: 80, category: "non-technical" },
    ],
    enrollments: [
      { id: 1001, student_id: 1, course_id: 101, status: "active", progress_pct: 92, attendance_pct: 100 },
      { id: 1002, student_id: 1, course_id: 104, status: "active", progress_pct: 65, attendance_pct: 90 },
      { id: 1003, student_id: 2, course_id: 101, status: "active", progress_pct: 100, attendance_pct: 95 },
      { id: 1004, student_id: 3, course_id: 102, status: "active", progress_pct: 45, attendance_pct: 80 },
      { id: 1005, student_id: 4, course_id: 103, status: "active", progress_pct: 85, attendance_pct: 100 },
      { id: 1006, student_id: 5, course_id: 101, status: "paused", progress_pct: 20, attendance_pct: 50 },
    ],
    orders: [
      { id: 501, customer_name: "TechCorp Labs", amount: 2450.00, status: "completed", order_date: "2026-03-10" },
      { id: 502, customer_name: "DataMind Inc", amount: 1200.50, status: "completed", order_date: "2026-03-12" },
      { id: 503, customer_name: "Amina Al-Mansoor", amount: 499.00, status: "pending", order_date: "2026-03-15" },
      { id: 504, customer_name: "Priya Sharma", amount: 799.00, status: "completed", order_date: "2026-03-18" },
    ],
    products: [
      { id: 1, name: "Web Dev Accelerator Pass", category: "Course", price: 499.00, stock: 150 },
      { id: 2, name: "AI/ML Mastery Bundle", category: "Course", price: 799.00, stock: 80 },
      { id: 3, name: "SQL Practice Handbook", category: "E-Book", price: 29.99, stock: 500 },
      { id: 4, name: "BlezeX Pro Hoodie", category: "Merchandise", price: 45.00, stock: 45 },
    ],
  };
}

const INITIAL_SCHEMAS: TableSchemaInfo[] = [
  {
    tableName: "students",
    columns: ["id", "full_name", "email", "role", "status", "gpa", "track"],
    description: "BlezEX active and enrolled learners with performance statistics",
  },
  {
    tableName: "courses",
    columns: ["id", "title", "slug", "min_progress_pct", "category"],
    description: "Catalog of professional career tracks and programs",
  },
  {
    tableName: "enrollments",
    columns: ["id", "student_id", "course_id", "status", "progress_pct", "attendance_pct"],
    description: "Student program enrollments and live milestone progress",
  },
  {
    tableName: "orders",
    columns: ["id", "customer_name", "amount", "status", "order_date"],
    description: "Corporate and individual purchase transactions",
  },
  {
    tableName: "products",
    columns: ["id", "name", "category", "price", "stock"],
    description: "Career learning bundles, e-books, and certifications",
  },
];

let activeDatabase = getInitialDatabase();
export const SAMPLE_DB_SCHEMA: TableSchemaInfo[] = [...INITIAL_SCHEMAS];

export function resetSqlDatabase(): void {
  activeDatabase = getInitialDatabase();
  SAMPLE_DB_SCHEMA.length = 0;
  SAMPLE_DB_SCHEMA.push(...INITIAL_SCHEMAS);
}

/**
 * Split multiple SQL statements by semicolon, ignoring semicolons within quotes.
 */
function splitStatements(sql: string): string[] {
  const stmts: string[] = [];
  let current = "";
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    if ((ch === "'" || ch === '"') && (i === 0 || sql[i - 1] !== "\\")) {
      if (!inString) {
        inString = true;
        stringChar = ch;
      } else if (stringChar === ch) {
        inString = false;
        stringChar = "";
      }
    }

    if (ch === ";" && !inString) {
      if (current.trim()) stmts.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }

  if (current.trim()) {
    stmts.push(current.trim());
  }

  return stmts;
}

/**
 * Safely parse a comma-separated list of values (e.g. 1, 'John', 45000.50, NULL)
 */
function parseValueList(raw: string): any[] {
  const values: any[] = [];
  let current = "";
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if ((ch === "'" || ch === '"') && (i === 0 || raw[i - 1] !== "\\")) {
      if (!inString) {
        inString = true;
        stringChar = ch;
      } else if (stringChar === ch) {
        inString = false;
        stringChar = "";
      }
    }

    if (ch === "," && !inString) {
      values.push(cleanVal(current.trim()));
      current = "";
    } else {
      current += ch;
    }
  }

  if (current.trim()) {
    values.push(cleanVal(current.trim()));
  }

  return values;
}

function cleanVal(str: string): any {
  if (str === "NULL" || str === "null") return null;
  if (str === "TRUE" || str === "true") return true;
  if (str === "FALSE" || str === "false") return false;
  if (/^['"].*['"]$/.test(str)) {
    return str.slice(1, -1);
  }
  const num = Number(str);
  return isNaN(num) ? str : num;
}

/**
 * Executes a single SQL statement against activeDatabase
 */
function executeSingleStatement(statement: string): SqlQueryResult {
  const trimmed = statement.trim().replace(/;+$/, "").trim();
  if (!trimmed) {
    return { columns: [], rows: [], rowCount: 0, runtimeMs: 0 };
  }

  // 1. CREATE TABLE [IF NOT EXISTS] <table> (...)
  const createMatch = trimmed.match(/^CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)\s*\(([\s\S]+)\)$/i);
  if (createMatch) {
    const tableName = createMatch[1].trim().toLowerCase();
    const colsDefs = createMatch[2].trim();

    if (activeDatabase[tableName] && !trimmed.toUpperCase().includes("IF NOT EXISTS")) {
      throw new Error(`Table "${tableName}" already exists.`);
    }

    // Parse column definitions
    const parsedCols: string[] = [];
    const parts = colsDefs.split(",");

    for (const part of parts) {
      const colLine = part.trim();
      if (!colLine || /^(PRIMARY\s+KEY|FOREIGN\s+KEY|CONSTRAINT|UNIQUE|CHECK)/i.test(colLine)) {
        continue;
      }
      const colName = colLine.split(/\s+/)[0]?.replace(/[`"'[\]]/g, "");
      if (colName && !parsedCols.includes(colName)) {
        parsedCols.push(colName);
      }
    }

    if (parsedCols.length === 0) {
      parsedCols.push("id");
    }

    activeDatabase[tableName] = [];

    // Update dynamic schema explorer
    const existingSchemaIdx = SAMPLE_DB_SCHEMA.findIndex(s => s.tableName === tableName);
    if (existingSchemaIdx !== -1) {
      SAMPLE_DB_SCHEMA[existingSchemaIdx].columns = parsedCols;
    } else {
      SAMPLE_DB_SCHEMA.push({
        tableName,
        columns: parsedCols,
        description: `User created table with ${parsedCols.length} columns`,
      });
    }

    return {
      columns: ["status"],
      rows: [{ status: `Table "${tableName}" created successfully.` }],
      rowCount: 0,
      runtimeMs: 0,
      message: `Table "${tableName}" created successfully with columns: (${parsedCols.join(", ")}).`,
    };
  }

  // 2. INSERT INTO <table> [(cols...)] VALUES (...)
  const insertMatch = trimmed.match(/^INSERT\s+INTO\s+([a-zA-Z0-9_]+)(?:\s*\(([\s\S]+?)\))?\s+VALUES\s*([\s\S]+)$/i);
  if (insertMatch) {
    const tableName = insertMatch[1].trim().toLowerCase();
    const explicitCols = insertMatch[2] ? insertMatch[2].split(",").map(c => c.trim().replace(/[`"'[\]]/g, "")) : null;
    const valuesPart = insertMatch[3].trim();

    const tableData = activeDatabase[tableName];
    if (!tableData) {
      throw new Error(`Table "${tableName}" not found. Create it using CREATE TABLE ${tableName} (...) first.`);
    }

    // Determine target columns
    let targetCols = explicitCols;
    if (!targetCols) {
      const schemaEntry = SAMPLE_DB_SCHEMA.find(s => s.tableName === tableName);
      if (schemaEntry && schemaEntry.columns.length > 0) {
        targetCols = schemaEntry.columns;
      } else if (tableData.length > 0) {
        targetCols = Object.keys(tableData[0]);
      } else {
        targetCols = ["col1", "col2", "col3", "col4", "col5"];
      }
    }

    // Extract all (...) tuples from valuesPart
    const tupleMatches = valuesPart.match(/\(([\s\S]*?)\)/g);
    if (!tupleMatches || tupleMatches.length === 0) {
      throw new Error("Syntax error in VALUES clause. Expected format: VALUES (val1, val2), (val3, val4)");
    }

    let insertedCount = 0;
    for (const tuple of tupleMatches) {
      const inner = tuple.slice(1, -1);
      const vals = parseValueList(inner);
      const rowObj: Record<string, any> = {};

      targetCols.forEach((col, idx) => {
        rowObj[col] = vals[idx] !== undefined ? vals[idx] : null;
      });

      // Handle any extra columns
      if (vals.length > targetCols.length) {
        for (let i = targetCols.length; i < vals.length; i++) {
          rowObj[`col_${i + 1}`] = vals[i];
        }
      }

      tableData.push(rowObj);
      insertedCount++;
    }

    return {
      columns: ["affected_rows"],
      rows: [{ affected_rows: insertedCount }],
      rowCount: insertedCount,
      runtimeMs: 0,
      message: `${insertedCount} row${insertedCount === 1 ? "" : "s"} inserted successfully into "${tableName}".`,
    };
  }

  // 3. DROP TABLE [IF EXISTS] <table>
  const dropMatch = trimmed.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?([a-zA-Z0-9_]+)/i);
  if (dropMatch) {
    const tableName = dropMatch[1].trim().toLowerCase();
    if (!activeDatabase[tableName]) {
      if (trimmed.toUpperCase().includes("IF EXISTS")) {
        return { columns: ["status"], rows: [{ status: "Notice: table did not exist" }], rowCount: 0, runtimeMs: 0 };
      }
      throw new Error(`Table "${tableName}" does not exist.`);
    }

    delete activeDatabase[tableName];
    const sIdx = SAMPLE_DB_SCHEMA.findIndex(s => s.tableName === tableName);
    if (sIdx !== -1) {
      SAMPLE_DB_SCHEMA.splice(sIdx, 1);
    }

    return {
      columns: ["status"],
      rows: [{ status: `Table "${tableName}" dropped.` }],
      rowCount: 0,
      runtimeMs: 0,
      message: `Table "${tableName}" dropped successfully.`,
    };
  }

  // 4. DELETE FROM <table> [WHERE ...]
  const deleteMatch = trimmed.match(/^DELETE\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+([\s\S]+))?$/i);
  if (deleteMatch) {
    const tableName = deleteMatch[1].trim().toLowerCase();
    const whereClause = deleteMatch[2]?.trim();

    const tableData = activeDatabase[tableName];
    if (!tableData) {
      throw new Error(`Table "${tableName}" not found.`);
    }

    const initialLength = tableData.length;
    if (!whereClause) {
      activeDatabase[tableName] = [];
      return {
        columns: ["affected_rows"],
        rows: [{ affected_rows: initialLength }],
        rowCount: initialLength,
        runtimeMs: 0,
        message: `${initialLength} rows deleted from "${tableName}".`,
      };
    }

    activeDatabase[tableName] = tableData.filter(row => !evaluateWhereClause(row, whereClause));
    const deletedCount = initialLength - activeDatabase[tableName].length;

    return {
      columns: ["affected_rows"],
      rows: [{ affected_rows: deletedCount }],
      rowCount: deletedCount,
      runtimeMs: 0,
      message: `${deletedCount} row${deletedCount === 1 ? "" : "s"} deleted from "${tableName}".`,
    };
  }

  // 5. UPDATE <table> SET <assignments> [WHERE ...]
  const updateMatch = trimmed.match(/^UPDATE\s+([a-zA-Z0-9_]+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?$/i);
  if (updateMatch) {
    const tableName = updateMatch[1].trim().toLowerCase();
    const setClause = updateMatch[2].trim();
    const whereClause = updateMatch[3]?.trim();

    const tableData = activeDatabase[tableName];
    if (!tableData) {
      throw new Error(`Table "${tableName}" not found.`);
    }

    const assignments = setClause.split(",").map(part => {
      const [col, val] = part.split("=").map(s => s.trim());
      return { col: col.replace(/[`"'[\]]/g, ""), val: cleanVal(val) };
    });

    let updatedCount = 0;
    tableData.forEach(row => {
      if (!whereClause || evaluateWhereClause(row, whereClause)) {
        assignments.forEach(({ col, val }) => {
          row[col] = val;
        });
        updatedCount++;
      }
    });

    return {
      columns: ["affected_rows"],
      rows: [{ affected_rows: updatedCount }],
      rowCount: updatedCount,
      runtimeMs: 0,
      message: `${updatedCount} row${updatedCount === 1 ? "" : "s"} updated in "${tableName}".`,
    };
  }

  // 6. SELECT <fields> FROM <table> ...
  const selectMatch = trimmed.match(/^SELECT\s+([\s\S]+?)\s+FROM\s+([a-zA-Z0-9_]+)([\s\S]*)$/i);
  if (selectMatch) {
    const rawFields = selectMatch[1].trim();
    const primaryTable = selectMatch[2].trim().toLowerCase();
    const remainder = selectMatch[3] || "";

    const tableData = activeDatabase[primaryTable];
    if (!tableData) {
      throw new Error(`Table "${primaryTable}" not found. Available tables: ${Object.keys(activeDatabase).join(", ")}`);
    }

    let rows: Array<Record<string, any>> = [...tableData];

    // Optional JOIN
    const joinMatch = remainder.match(/JOIN\s+([a-zA-Z0-9_]+)(?:\s+AS\s+([a-zA-Z0-9_]+)|\s+([a-zA-Z0-9_]+))?\s+ON\s+([a-zA-Z0-9_.]+)\s*=\s*([a-zA-Z0-9_.]+)/i);
    if (joinMatch) {
      const joinTable = joinMatch[1].toLowerCase();
      const joinData = activeDatabase[joinTable];
      if (joinData) {
        const leftKey = joinMatch[4].split(".").pop()!;
        const rightKey = joinMatch[5].split(".").pop()!;

        const joinedRows: Array<Record<string, any>> = [];
        for (const leftRow of rows) {
          for (const rightRow of joinData) {
            if (String(leftRow[leftKey] ?? leftRow[rightKey]) === String(rightRow[rightKey] ?? rightRow[leftKey])) {
              joinedRows.push({
                ...rightRow,
                ...leftRow,
                [`${primaryTable}_id`]: leftRow.id,
                [`${joinTable}_id`]: rightRow.id,
              });
            }
          }
        }
        rows = joinedRows;
      }
    }

    // WHERE clause
    const whereMatch = remainder.match(/WHERE\s+([\s\S]+?)(?:\s+ORDER\s+BY|\s+LIMIT|$)/i);
    if (whereMatch) {
      const condRaw = whereMatch[1].trim();
      rows = rows.filter(row => evaluateWhereClause(row, condRaw));
    }

    // ORDER BY
    const orderMatch = remainder.match(/ORDER\s+BY\s+([a-zA-Z0-9_.]+)(?:\s+(ASC|DESC))?/i);
    if (orderMatch) {
      const sortField = orderMatch[1].split(".").pop()!;
      const isDesc = orderMatch[2]?.toUpperCase() === "DESC";

      rows.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA === valB) return 0;
        if (valA === undefined) return 1;
        if (valB === undefined) return -1;
        if (typeof valA === "number" && typeof valB === "number") {
          return isDesc ? valB - valA : valA - valB;
        }
        return isDesc
          ? String(valB).localeCompare(String(valA))
          : String(valA).localeCompare(String(valB));
      });
    }

    // LIMIT
    const limitMatch = remainder.match(/LIMIT\s+(\d+)/i);
    if (limitMatch) {
      const lim = parseInt(limitMatch[1], 10);
      rows = rows.slice(0, lim);
    }

    // Projection
    let projectedRows: Array<Record<string, any>> = rows;
    let finalCols: string[] = [];

    if (rawFields !== "*") {
      const requestedFields = rawFields.split(",").map(f => f.trim().split(".").pop()!);
      finalCols = requestedFields;
      projectedRows = rows.map(r => {
        const obj: Record<string, any> = {};
        requestedFields.forEach(f => {
          obj[f] = r[f];
        });
        return obj;
      });
    } else if (rows.length > 0) {
      finalCols = Object.keys(rows[0]);
    } else {
      const schema = SAMPLE_DB_SCHEMA.find(s => s.tableName === primaryTable);
      finalCols = schema ? schema.columns : Object.keys(tableData[0] || {});
    }

    return {
      columns: finalCols,
      rows: projectedRows,
      rowCount: projectedRows.length,
      runtimeMs: 0,
      message: `Query returned ${projectedRows.length} row${projectedRows.length === 1 ? "" : "s"}`,
    };
  }

  throw new Error("Syntax error or unsupported SQL statement. Try a SELECT, CREATE TABLE, INSERT INTO, UPDATE, or DELETE query.");
}

function evaluateWhereClause(row: Record<string, any>, condRaw: string): boolean {
  const conditions = condRaw.split(/\s+AND\s+/i);
  return conditions.every(cond => {
    const eqMatch = cond.match(/([a-zA-Z0-9_.]+)\s*(=|!=|<>|>=|<=|>|<)\s*('?[^']*'?)/);
    if (!eqMatch) return true;
    const field = eqMatch[1].split(".").pop()!;
    const op = eqMatch[2];
    const rawVal = eqMatch[3].trim().replace(/^['"]|['"]$/g, "");
    const val = isNaN(Number(rawVal)) ? rawVal : Number(rawVal);
    const rowVal = isNaN(Number(row[field])) ? row[field] : Number(row[field]);

    switch (op) {
      case "=":
        return String(rowVal).toLowerCase() === String(val).toLowerCase();
      case "!=":
      case "<>":
        return String(rowVal).toLowerCase() !== String(val).toLowerCase();
      case ">":
        return Number(rowVal) > Number(val);
      case ">=":
        return Number(rowVal) >= Number(val);
      case "<":
        return Number(rowVal) < Number(val);
      case "<=":
        return Number(rowVal) <= Number(val);
      default:
        return true;
    }
  });
}

/**
 * Execute SQL query or multi-statement script against relational tables
 */
export async function executeSqlQuery(sql: string): Promise<SqlQueryResult> {
  const startTime = performance.now();
  const trimmed = sql.trim();

  if (!trimmed) {
    return { columns: [], rows: [], rowCount: 0, runtimeMs: 0, executionTimeMs: 0, message: "Empty query" };
  }

  try {
    const statements = splitStatements(trimmed);
    if (statements.length === 0) {
      return { columns: [], rows: [], rowCount: 0, runtimeMs: 0, executionTimeMs: 0, message: "Empty query" };
    }

    let lastResult: SqlQueryResult | null = null;
    let selectResult: SqlQueryResult | null = null;
    const summaryMessages: string[] = [];

    for (const stmt of statements) {
      const res = executeSingleStatement(stmt);
      lastResult = res;
      if (res.message) {
        summaryMessages.push(res.message);
      }
      if (stmt.trim().toUpperCase().startsWith("SELECT")) {
        selectResult = res;
      }
    }

    const duration = Math.round((performance.now() - startTime) * 10) / 10;
    const finalResult = selectResult || lastResult!;

    return {
      ...finalResult,
      runtimeMs: duration,
      executionTimeMs: duration,
      message: summaryMessages.join("\n"),
    };
  } catch (err: any) {
    const duration = Math.round((performance.now() - startTime) * 10) / 10;
    return {
      columns: [],
      rows: [],
      rowCount: 0,
      runtimeMs: duration,
      executionTimeMs: duration,
      error: err.message || String(err),
    };
  }
}
