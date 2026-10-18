import { CurriculumSubCourse, CurriculumSubModule, CurriculumItem } from "../curriculumTypes";

// =========================================================================
// DATA ANALYTICS CURRICULUM
// 6 Sequential Sub-Courses with Deep Lessons, Assessments & Capstone
// =========================================================================

// --- SUB-COURSE 1: Modern Excel & Business Analytics Foundations ---
const dataMod1_1: CurriculumSubModule = {
  id: "mod-data-1-1",
  subCourseId: "subcourse-data-excel",
  title: "Advanced Excel, Formulas & Data Modeling",
  position: 1,
  duration: "3.5 hours",
  items: [
    {
      id: "data-xl-001",
      moduleId: "mod-data-1-1",
      moduleTitle: "Advanced Excel, Formulas & Data Modeling",
      modulePosition: 1,
      subCourseId: "subcourse-data-excel",
      subCourseTitle: "Modern Excel & Business Analytics Foundations",
      subCoursePosition: 1,
      title: "Advanced Lookup Formulas, Dynamic Arrays & Pivot Tables",
      duration: "40 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Modern Spreadsheet Analytics: XLOOKUP, Filter & Slicers",
      contentDescription: "Harness modern dynamic array formulas (XLOOKUP, FILTER, UNIQUE, SORT), Pivot Tables, calculated fields, and executive KPI scorecards.",
      sections: [
        {
          title: "XLOOKUP vs Legacy VLOOKUP",
          explanation: "XLOOKUP operates bidirectionally without requiring target columns to be to the right of key columns, defaults to exact match, and provides native fallback handling.",
          codeSnippet: {
            language: "excel",
            filename: "formulas.xlsx",
            code: `=XLOOKUP(A2, Customers[CustomerID], Customers[CustomerName], "Unknown Customer", 0)

=FILTER(Transactions, (Transactions[Revenue] > 1000) * (Transactions[Region] = "North America"), "No Records")

=UNIQUE(SORT(Employees[Department]))`
          }
        }
      ],
      questions: [
        {
          id: "q-data-xl-1",
          prompt: "What is the primary advantage of XLOOKUP over traditional VLOOKUP in financial modeling?",
          options: [
            { id: "a", label: "It changes the font color to green" },
            { id: "b", label: "It does not break when columns are inserted/deleted, looks left or right, and has built-in error handling without IFERROR" },
            { id: "c", label: "It converts Excel files to PDF" },
            { id: "d", label: "It requires macros to be enabled" }
          ],
          correctIndex: 1,
          explanation: "XLOOKUP references separate return arrays rather than static column index integers, making spreadsheets impervious to column insertion/deletion breakage."
        }
      ]
    },
    {
      id: "data-xl-quiz-1",
      moduleId: "mod-data-1-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-data-excel",
      subCourseTitle: "Modern Excel & Business Analytics Foundations",
      subCoursePosition: 1,
      title: "Sub-Course Assessment: Excel Business Analytics",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Excel Data Modeling & Executive Reporting",
      contentDescription: "Evaluate your capability to perform multi-criteria aggregations (SUMIFS, COUNTIFS), pivot analysis, and dynamic array calculations.",
      questions: [
        {
          id: "q-data-xl-2",
          prompt: "In an Excel Pivot Table, what does placing a date field into the 'Rows' area enable?",
          options: [
            { id: "a", label: "Automatic hierarchical grouping by Year, Quarter, and Month for temporal trend analysis" },
            { id: "b", label: "Deletion of past transactions" },
            { id: "c", label: "Conversion into a SQL database" },
            { id: "d", label: "Immediate printing of the worksheet" }
          ],
          correctIndex: 0,
          explanation: "Excel automatically creates a date hierarchy grouping (Years, Quarters, Months), allowing analysts to expand and collapse seasonal performance metrics."
        }
      ]
    }
  ]
};

export const dataSubCourse1: CurriculumSubCourse = {
  id: "subcourse-data-excel",
  title: "Modern Excel & Business Analytics Foundations",
  position: 1,
  duration: "4.5 hours",
  description: "Master enterprise Excel modeling, XLOOKUP, dynamic array functions (FILTER, UNIQUE), Pivot Table analytics, calculated fields, and executive dashboards.",
  modules: [dataMod1_1],
  items: [...dataMod1_1.items]
};

// --- SUB-COURSE 2: SQL for Data Analysis & Business Intelligence ---
const dataMod2_1: CurriculumSubModule = {
  id: "mod-data-2-1",
  subCourseId: "subcourse-data-sql",
  title: "Window Functions, CTEs & Cohort Analytics",
  position: 1,
  duration: "4.5 hours",
  items: [
    {
      id: "data-sql-001",
      moduleId: "mod-data-2-1",
      moduleTitle: "Window Functions, CTEs & Cohort Analytics",
      modulePosition: 1,
      subCourseId: "subcourse-data-sql",
      subCourseTitle: "SQL for Data Analysis & Business Intelligence",
      subCoursePosition: 2,
      title: "Window Functions: ROW_NUMBER, RANK, DENSE_RANK & LAG/LEAD",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Advanced SQL: Analytical Window Calculations & Trend Analysis",
      contentDescription: "Write complex analytical SQL queries using OVER (PARTITION BY ... ORDER BY), running totals, moving averages, and month-over-month growth calculations.",
      sections: [
        {
          title: "Month-over-Month Revenue Growth Query",
          explanation: "Use LAG to pull the previous row's value within a partition without needing complex self-joins.",
          codeSnippet: {
            language: "sql",
            filename: "mom_growth.sql",
            code: `WITH MonthlyRevenue AS (
    SELECT 
        DATE_TRUNC('month', order_date)::DATE AS sales_month,
        SUM(total_amount) AS revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY 1
)
SELECT 
    sales_month,
    revenue,
    LAG(revenue, 1) OVER (ORDER BY sales_month) AS prev_month_revenue,
    ROUND(
        (revenue - LAG(revenue, 1) OVER (ORDER BY sales_month)) * 100.0 / 
        NULLIF(LAG(revenue, 1) OVER (ORDER BY sales_month), 0), 
        2
    ) AS mom_growth_pct
FROM MonthlyRevenue
ORDER BY sales_month DESC;`
          }
        }
      ],
      questions: [
        {
          id: "q-data-sql-1",
          prompt: "What is the key difference between RANK() and DENSE_RANK() when two rows have tied values?",
          options: [
            { id: "a", label: "RANK skips subsequent ranks (1, 1, 3); DENSE_RANK assigns consecutive ranks without gaps (1, 1, 2)" },
            { id: "b", label: "DENSE_RANK only works on numeric columns" },
            { id: "c", label: "RANK is only available in MySQL" },
            { id: "d", label: "There is no difference" }
          ],
          correctIndex: 0,
          explanation: "RANK leaves gaps in numbering after ties, whereas DENSE_RANK ensures sequential integers without skipping."
        }
      ]
    },
    {
      id: "data-sql-quiz-1",
      moduleId: "mod-data-2-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-data-sql",
      subCourseTitle: "SQL for Data Analysis & Business Intelligence",
      subCoursePosition: 2,
      title: "Sub-Course Assessment: Analytical SQL Mastery",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Complex Analytical Queries & CTEs",
      contentDescription: "Validate your ability to calculate customer retention cohorts, cumulative sums, churn rates, and percentiles using SQL.",
      questions: [
        {
          id: "q-data-sql-2",
          prompt: "Why are Common Table Expressions (CTEs) using `WITH` preferred over deeply nested subqueries in production analytics?",
          options: [
            { id: "a", label: "CTEs increase the database memory usage by 100x" },
            { id: "b", label: "CTEs improve readability, modularity, and maintainability by structuring complex transformations sequentially from top to bottom" },
            { id: "c", label: "Subqueries are deprecated in ANSI SQL" },
            { id: "d", label: "CTEs prevent table locks" }
          ],
          correctIndex: 1,
          explanation: "CTEs break down dense query logic into readable, named logical blocks that make queries easier to audit, debug, and optimize."
        }
      ]
    }
  ]
};

export const dataSubCourse2: CurriculumSubCourse = {
  id: "subcourse-data-sql",
  title: "SQL for Data Analysis & Business Intelligence",
  position: 2,
  duration: "5 hours",
  description: "Construct advanced SQL analytical queries utilizing CTEs, window functions (ROW_NUMBER, LAG, LEAD), cumulative sums, and customer retention cohort models.",
  modules: [dataMod2_1],
  items: [...dataMod2_1.items]
};

// --- SUB-COURSE 3: Python for Data Science (Pandas & NumPy) ---
const dataMod3_1: CurriculumSubModule = {
  id: "mod-data-3-1",
  subCourseId: "subcourse-data-python",
  title: "Data Wrangling with Pandas & NumPy",
  position: 1,
  duration: "5 hours",
  items: [
    {
      id: "data-py-001",
      moduleId: "mod-data-3-1",
      moduleTitle: "Data Wrangling with Pandas & NumPy",
      modulePosition: 1,
      subCourseId: "subcourse-data-python",
      subCourseTitle: "Python for Data Science (Pandas & NumPy)",
      subCoursePosition: 3,
      title: "Data Cleaning, Transformations & GroupBy Aggregations",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "High-Performance Data Manipulation with Pandas & NumPy",
      contentDescription: "Ingest CSV/JSON/SQL data into DataFrames, handle missing values (dropna, fillna, interpolate), cast data types, and compute multi-index group statistics.",
      sections: [
        {
          title: "Pandas Data Cleaning & Aggregation Pipeline",
          explanation: "Clean messy tabular data and compute aggregations using method chaining.",
          codeSnippet: {
            language: "python",
            filename: "data_pipeline.py",
            code: `import pandas as pd
import numpy as np

# Load dataset
df = pd.read_csv("ecommerce_sales.csv")

# 1. Clean and transform
df["order_date"] = pd.to_datetime(df["order_date"])
df["revenue"] = pd.to_numeric(df["revenue"].str.replace("$", "").str.replace(",", ""), errors="coerce")
df["revenue"] = df["revenue"].fillna(df["revenue"].median())

# 2. Add analytical features
df["order_month"] = df["order_date"].dt.to_period("M")
df["high_value_order"] = np.where(df["revenue"] >= 500, True, False)

# 3. Multi-metric GroupBy
summary = (
    df.groupby(["region", "category"])
    .agg(
        total_orders=("order_id", "count"),
        total_revenue=("revenue", "sum"),
        avg_order_value=("revenue", "mean")
    )
    .reset_index()
)
print(summary.head(10))`
          }
        }
      ],
      questions: [
        {
          id: "q-data-py-1",
          prompt: "What does `df.drop_duplicates(subset=['customer_email'], keep='last')` accomplish?",
          options: [
            { id: "a", label: "Deletes all records from the customer table" },
            { id: "b", label: "Retains only the most recent transaction entry for each unique customer email, discarding earlier duplicates" },
            { id: "c", label: "Sorts the DataFrame in descending order" },
            { id: "d", label: "Removes columns containing null values" }
          ],
          correctIndex: 1,
          explanation: "`keep='last'` ensures only the final instance of any duplicate customer email is preserved in the resulting DataFrame."
        }
      ]
    },
    {
      id: "data-py-quiz-1",
      moduleId: "mod-data-3-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-data-python",
      subCourseTitle: "Python for Data Science (Pandas & NumPy)",
      subCoursePosition: 3,
      title: "Sub-Course Assessment: Pandas & NumPy Data Engineering",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: DataFrame Operations & Transformations",
      contentDescription: "Evaluate your skills in DataFrame merging (inner, left, outer), lambda transformations, pivot tables, and vector operations.",
      questions: [
        {
          id: "q-data-py-2",
          prompt: "Why are vectorized operations in NumPy and Pandas exponentially faster than standard Python `for` loops?",
          options: [
            { id: "a", label: "Because they run on hidden quantum processors" },
            { id: "b", label: "Because they execute in compiled C code utilizing SIMD (Single Instruction, Multiple Data) CPU vector registers" },
            { id: "c", label: "Because they skip mathematical accuracy checks" },
            { id: "d", label: "Because they automatically write files to disk" }
          ],
          correctIndex: 1,
          explanation: "NumPy arrays leverage contiguous memory blocks and compiled C/Fortran routines to execute operations across entire arrays simultaneously."
        }
      ]
    }
  ]
};

export const dataSubCourse3: CurriculumSubCourse = {
  id: "subcourse-data-python",
  title: "Python for Data Science (Pandas & NumPy)",
  position: 3,
  duration: "5.5 hours",
  description: "Transform and clean raw datasets using Python Pandas, vectorized NumPy calculations, missing data strategies, merging techniques, and aggregation pipelines.",
  modules: [dataMod3_1],
  items: [...dataMod3_1.items]
};

// --- SUB-COURSE 4: Exploratory Data Analysis & Visualization ---
const dataMod4_1: CurriculumSubModule = {
  id: "mod-data-4-1",
  subCourseId: "subcourse-data-viz",
  title: "Statistical Visualization with Matplotlib & Seaborn",
  position: 1,
  duration: "4.5 hours",
  items: [
    {
      id: "data-viz-001",
      moduleId: "mod-data-4-1",
      moduleTitle: "Statistical Visualization with Matplotlib & Seaborn",
      modulePosition: 1,
      subCourseId: "subcourse-data-viz",
      subCourseTitle: "Exploratory Data Analysis & Visualization",
      subCoursePosition: 4,
      title: "Data Storytelling: Distributions, Correlations & Outlier Detection",
      duration: "40 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Visual Data Analysis: Histograms, Box Plots & Correlation Heatmaps",
      contentDescription: "Master exploratory data analysis (EDA) techniques using Seaborn and Matplotlib to uncover hidden distributions, detect outliers, and present findings.",
      sections: [
        {
          title: "Correlation Matrix & Distribution Code",
          explanation: "Generate correlation heatmaps and identify multivariate relationships.",
          codeSnippet: {
            language: "python",
            filename: "eda_plots.py",
            code: `import matplotlib.pyplot as plt
import seaborn as sns

# Set publication style
sns.set_theme(style="whitegrid")
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 1. Distribution & Outliers (Box Plot)
sns.boxplot(data=df, x="department", y="salary", palette="Blues", ax=axes[0])
axes[0].set_title("Salary Distribution by Department")

# 2. Correlation Heatmap
corr = df[["tenure_years", "salary", "satisfaction_score", "projects_completed"]].corr()
sns.heatmap(corr, annot=True, cmap="coolwarm", vmin=-1, vmax=1, fmt=".2f", ax=axes[1])
axes[1].set_title("Feature Correlation Matrix")

plt.tight_layout()
plt.savefig("eda_summary.png", dpi=300)`
          }
        }
      ],
      questions: [
        {
          id: "q-data-viz-1",
          prompt: "What do the whiskers and the dots outside the whiskers represent in a standard Seaborn box plot?",
          options: [
            { id: "a", label: "The dots represent missing values" },
            { id: "b", label: "Whiskers extend to 1.5 * IQR (Interquartile Range); individual dots represent statistical outliers beyond that threshold" },
            { id: "c", label: "The dots represent average values" },
            { id: "d", label: "Whiskers show the 99th percentile" }
          ],
          correctIndex: 1,
          explanation: "Box plot whiskers span 1.5 times the IQR from Q1 and Q3; observations falling beyond the whiskers are flagged as potential outliers."
        }
      ]
    },
    {
      id: "data-viz-quiz-1",
      moduleId: "mod-data-4-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-data-viz",
      subCourseTitle: "Exploratory Data Analysis & Visualization",
      subCoursePosition: 4,
      title: "Sub-Course Assessment: Data Visualization & EDA",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Visual Storytelling & Exploratory Analysis",
      contentDescription: "Evaluate your understanding of chart selection (categorical vs continuous data), color choices, skewness, and visual presentation best practices.",
      questions: [
        {
          id: "q-data-viz-2",
          prompt: "Which visualization is most appropriate for examining the distribution and skewness of a single continuous numeric variable (such as order value)?",
          options: [
            { id: "a", label: "Pie chart" },
            { id: "b", label: "Histogram with a Kernel Density Estimate (KDE) curve" },
            { id: "c", label: "Radar chart" },
            { id: "d", label: "Treemap" }
          ],
          correctIndex: 1,
          explanation: "Histograms with KDE curves display continuous distribution shapes, bimodal peaks, and skewness directly."
        }
      ]
    }
  ]
};

export const dataSubCourse4: CurriculumSubCourse = {
  id: "subcourse-data-viz",
  title: "Exploratory Data Analysis & Visualization",
  position: 4,
  duration: "5 hours",
  description: "Conduct comprehensive exploratory data analysis (EDA), detect anomalies, analyze correlation matrices, and communicate insights with Matplotlib and Seaborn.",
  modules: [dataMod4_1],
  items: [...dataMod4_1.items]
};

// --- SUB-COURSE 5: BI Dashboards with Power BI & Tableau ---
const dataMod5_1: CurriculumSubModule = {
  id: "mod-data-5-1",
  subCourseId: "subcourse-data-bi",
  title: "Data Modeling, Star Schemas & DAX Calculations",
  position: 1,
  duration: "4.5 hours",
  items: [
    {
      id: "data-bi-001",
      moduleId: "mod-data-5-1",
      moduleTitle: "Data Modeling, Star Schemas & DAX Calculations",
      modulePosition: 1,
      subCourseId: "subcourse-data-bi",
      subCourseTitle: "BI Dashboards with Power BI & Tableau",
      subCoursePosition: 5,
      title: "Star Schema Architecture & DAX Measures in Power BI",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Enterprise Business Intelligence: Fact & Dimension Modeling",
      contentDescription: "Design star schemas, establish 1-to-many relationships, write Data Analysis Expressions (DAX) for dynamic measures, and configure automated data refreshes.",
      sections: [
        {
          title: "Star Schema vs Snowflake Schema",
          explanation: "Power BI's tabular engine (VertiPaq) performs fastest with denormalized Star Schemas comprising a central Fact Table surrounded by Dimension Tables.",
          codeSnippet: {
            language: "dax",
            filename: "measures.dax",
            code: `// Total Sales Measure
Total Revenue = SUM(FactSales[SalesAmount])

// Year-over-Year Sales Growth
YoY Revenue % = 
VAR CurrentSales = [Total Revenue]
VAR PriorYearSales = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(DimDate[Date]))
RETURN
DIVIDE(CurrentSales - PriorYearSales, PriorYearSales, 0)`
          }
        }
      ],
      questions: [
        {
          id: "q-data-bi-1",
          prompt: "Why should measures be written in DAX rather than creating calculated columns in Power BI whenever possible?",
          options: [
            { id: "a", label: "Because calculated columns consume RAM and disk space by calculating values per row at refresh time; DAX measures calculate on-the-fly based on visual filter contexts" },
            { id: "b", label: "Because DAX only works in Excel" },
            { id: "c", label: "Because measures don't support math" },
            { id: "d", label: "Because calculated columns are not supported in Power BI Desktop" }
          ],
          correctIndex: 0,
          explanation: "Measures are calculated dynamically based on the current filter context (slicers, drill-downs), conserving memory and optimizing dashboard responsiveness."
        }
      ]
    },
    {
      id: "data-bi-quiz-1",
      moduleId: "mod-data-5-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-data-bi",
      subCourseTitle: "BI Dashboards with Power BI & Tableau",
      subCoursePosition: 5,
      title: "Sub-Course Assessment: Business Intelligence Architecture",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Star Schema Design & Dashboard Usability",
      contentDescription: "Evaluate your skills in data modeling relationships (1-to-many vs many-to-many), cross-filter direction, and interactive dashboard storytelling.",
      questions: [
        {
          id: "q-data-bi-2",
          prompt: "What is the primary role of a dedicated Date Dimension table (DimDate) in Power BI?",
          options: [
            { id: "a", label: "To store the current server time" },
            { id: "b", label: "To guarantee continuous, gap-free calendar dates essential for accurate time-intelligence DAX functions (YTD, MTD, SAMEPERIODLASTYEAR)" },
            { id: "c", label: "To prevent users from logging in on weekends" },
            { id: "d", label: "To calculate leap seconds" }
          ],
          correctIndex: 1,
          explanation: "Time-intelligence DAX functions require a contiguous date sequence with no missing days in the primary date dimension table."
        }
      ]
    }
  ]
};

export const dataSubCourse5: CurriculumSubCourse = {
  id: "subcourse-data-bi",
  title: "BI Dashboards with Power BI & Tableau",
  position: 5,
  duration: "5 hours",
  description: "Construct scalable BI models with Star Schemas, 1-to-many relationships, dynamic DAX measures, time-intelligence calculations, and interactive executive dashboards.",
  modules: [dataMod5_1],
  items: [...dataMod5_1.items]
};

// --- SUB-COURSE 6: Statistical Inference & Predictive Analytics Capstone ---
const dataMod6_1: CurriculumSubModule = {
  id: "mod-data-6-1",
  subCourseId: "subcourse-data-capstone",
  title: "A/B Testing, Predictive Modeling & Capstone",
  position: 1,
  duration: "6.5 hours",
  items: [
    {
      id: "data-stat-001",
      moduleId: "mod-data-6-1",
      moduleTitle: "A/B Testing, Predictive Modeling & Capstone",
      modulePosition: 1,
      subCourseId: "subcourse-data-capstone",
      subCourseTitle: "Statistical Inference & Predictive Capstone",
      subCoursePosition: 6,
      title: "Hypothesis Testing, A/B Test Design & Regression Modeling",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Statistical Experimentation: p-values, Confidence Intervals & Regression",
      contentDescription: "Conduct rigorous statistical hypothesis testing, calculate sample sizes to prevent p-hacking, interpret p-values, and train predictive linear/logistic regression models in Python.",
      sections: [
        {
          title: "A/B Test Statistical Evaluation in Python",
          explanation: "Evaluate conversion rate experiments using two-proportion z-tests.",
          codeSnippet: {
            language: "python",
            filename: "ab_test.py",
            code: `from statsmodels.stats.proportion import proportions_ztest

# Experiment Results:
# Control: 1,200 conversions out of 10,000 visitors (12.0%)
# Variant: 1,350 conversions out of 10,000 visitors (13.5%)
count = [1200, 1350]
nobs = [10000, 10000]

z_stat, p_value = proportions_ztest(count, nobs)
print(f"Z-statistic: {z_stat:.4f} | P-value: {p_value:.6f}")

if p_value < 0.05:
    print("Statistically significant lift observed! Reject null hypothesis.")
else:
    print("No significant difference; retain null hypothesis.")`
          }
        }
      ],
      questions: [
        {
          id: "q-data-stat-1",
          prompt: "What does a p-value of 0.02 indicate in a business A/B test with an alpha threshold of 0.05?",
          options: [
            { id: "a", label: "There is a 2% chance that the experiment worked" },
            { id: "b", label: "There is only a 2% probability of observing this result by random chance assuming the null hypothesis is true; the result is statistically significant" },
            { id: "c", label: "Revenue will drop by 2%" },
            { id: "d", label: "The test must run for 2 more years" }
          ],
          correctIndex: 1,
          explanation: "Since p (0.02) < alpha (0.05), we reject the null hypothesis and conclude that the variant produced a statistically significant lift."
        }
      ]
    },
    {
      id: "data-capstone-assignment",
      moduleId: "mod-data-6-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-data-capstone",
      subCourseTitle: "Statistical Inference & Predictive Capstone",
      subCoursePosition: 6,
      title: "Capstone Project: Enterprise Customer Lifetime Value & Churn Analytics",
      duration: "4 hours",
      type: "assignment",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Capstone Project: End-to-End Enterprise Analytics Engine",
      contentDescription: "Execute an end-to-end data analytics engagement: write SQL ETL queries, clean and analyze customer data in Python Pandas, build an interactive executive Power BI dashboard, and train a predictive churn model with actionable business recommendations.",
      assignmentPrompt: {
        instructions: "Deliver a comprehensive, industry-grade analytics deliverable: (1) SQL queries extracting customer cohort metrics, (2) Python Jupyter notebook with data cleaning, EDA, and logistic regression churn prediction, (3) Power BI / Tableau dashboard file or high-fidelity mockups, and (4) an Executive Presentation Deck summarizing key business findings and revenue recommendations.",
        deliverables: [
          "SQL analytical script with CTEs and window functions analyzing monthly retention cohorts.",
          "Python EDA & predictive modeling notebook with visualizations and accuracy metrics (ROC-AUC).",
          "Interactive dashboard layout with KPI summary cards, churn risk segments, and geographic breakdown.",
          "Executive PDF report delivering 3 concrete strategic recommendations to reduce churn."
        ],
        starterCode: `# Data Analytics Capstone Starter
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

# 1. Ingest Cohort Transactions
df = pd.read_csv("customer_data.csv")
# 2. Train Churn Classifier & Extract Feature Importances
# 3. Export Segmented Output for Executive Power BI Reporting`
      }
    }
  ]
};

export const dataSubCourse6: CurriculumSubCourse = {
  id: "subcourse-data-capstone",
  title: "Statistical Inference & Predictive Capstone",
  position: 6,
  duration: "7 hours",
  description: "Formulate statistical experiments (A/B testing), calculate confidence intervals, train predictive regression models, and complete the Customer Lifetime Value & Churn Capstone.",
  modules: [dataMod6_1],
  items: [...dataMod6_1.items]
};

export const DATA_ANALYTICS_MODULES: CurriculumSubCourse[] = [
  dataSubCourse1,
  dataSubCourse2,
  dataSubCourse3,
  dataSubCourse4,
  dataSubCourse5,
  dataSubCourse6
];
