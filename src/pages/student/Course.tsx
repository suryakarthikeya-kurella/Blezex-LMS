import { useEffect, useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Icon, { IconName } from "../../components/Icon";
import { isCertificateUnlocked } from "../../lib/certificateUnlock";
import { Card, Empty } from "../../components/ui";
import { fetchCourseCurriculum, getCompletedItemIds, isCurriculumModuleUnlocked } from "../../lib/curriculumService";
import {
  CurriculumModule,
  CurriculumItem,
  getCourseTotalMinutes,
  getModuleTotalMinutes,
  formatMinutesToHuman,
  getCourseCodeBadge,
  cleanSubCourseTitle,
  cleanModuleTitle,
  cleanLessonHeading,
} from "../../lib/curriculumData";

const SUB_COURSE_TAGS: Record<string, string[]> = {
  // 1. Full Stack Web Development
  "html-css-foundations": ["HTML5", "CSS3", "BOOTSTRAP"],
  "js-fundamentals": ["JAVASCRIPT", "ES6+", "DOM"],
  "database-sql": ["SQL", "POSTGRESQL", "DATABASE"],
  "node-express": ["NODE.JS", "EXPRESS", "REST API"],
  "react-js": ["REACT", "HOOKS", "JSX"],
  "git-basics": ["GIT", "GITHUB", "WORKFLOW"],

  // 2. AI, Machine Learning & Data Science (All 16 Subcourses)
  "subcourse-aiml-1": ["AI CONCEPTS", "INTELLIGENT SYSTEMS", "SEARCH"],
  "subcourse-aiml-2": ["LINEAR ALGEBRA", "CALCULUS", "GRADIENT DESCENT"],
  "subcourse-aiml-3": ["PYTHON", "NUMPY", "PANDAS & VIZ"],
  "subcourse-aiml-4": ["DATA SCIENCE", "CLEANING", "MULTIVARIATE EDA"],
  "subcourse-aiml-5": ["SQL FOR AI", "WINDOW FUNCTIONS", "FEATURE STORE"],
  "subcourse-aiml-6": ["SUPERVISED ML", "UNSUPERVISED", "PIPELINES"],
  "subcourse-aiml-7": ["ENSEMBLES", "XGBOOST", "SHAP INTERPRETABILITY"],
  "subcourse-aiml-8": ["DEEP LEARNING", "BACKPROP", "PYTORCH"],
  "subcourse-aiml-9": ["COMPUTER VISION", "CNNs", "YOLO DETECTION"],
  "subcourse-aiml-10": ["NLP", "TF-IDF", "TRANSFORMERS"],
  "subcourse-aiml-11": ["GENERATIVE AI", "LLMs", "PROMPT ENGINEERING"],
  "subcourse-aiml-12": ["RAG", "VECTOR DB", "AI AGENTS"],
  "subcourse-aiml-13": ["TIME SERIES", "ARIMA", "DEMAND FORECASTING"],
  "subcourse-aiml-14": ["DATA ENGINEERING", "MLOPS", "FASTAPI DOCKER"],
  "subcourse-aiml-15": ["AI ETHICS", "SECURITY", "RESPONSIBLE AI"],
  "subcourse-aiml-16": ["PORTFOLIO", "PRODUCTION CAPSTONE", "CAREER"],

  // Legacy mappings for AI ML Data Science
  "subcourse-aiml-numpy-pandas": ["NUMPY", "PANDAS", "VECTORIZATION"],
  "subcourse-aiml-eda": ["EDA", "IMPUTATION", "OUTLIERS"],
  "subcourse-aiml-supervised": ["REGRESSION", "TREES", "XGBOOST"],
  "subcourse-aiml-evaluation": ["PRECISION", "RECALL", "ROC-AUC"],
  "subcourse-aiml-unsupervised": ["K-MEANS", "CLUSTERING", "PCA"],
  "subcourse-aiml-deep-learning": ["NEURAL NETS", "BACKPROP", "FASTAPI"],

  // 3. Data Analytics & Business Intelligence (All 15 Subcourses)
  "subcourse-da-1": ["DATA CONCEPTS", "LIFECYCLE", "STATISTICS"],
  "subcourse-da-2": ["EXCEL", "XLOOKUP", "PIVOT TABLES"],
  "subcourse-da-3": ["SQL", "JOINS & CTES", "WINDOW FUNCTIONS"],
  "subcourse-da-4": ["PYTHON", "PANDAS & NUMPY", "SEABORN"],
  "subcourse-da-5": ["DATA QUALITY", "CLEANING", "EDA"],
  "subcourse-da-6": ["STATISTICS", "PROBABILITY", "HYPOTHESIS TESTING"],
  "subcourse-da-7": ["DATA VIZ", "STORYTELLING", "EXECUTIVE CHARTS"],
  "subcourse-da-8": ["POWER BI", "STAR SCHEMA", "DAX MEASURES"],
  "subcourse-da-9": ["TABLEAU", "LOD EXPRESSIONS", "DASHBOARDS"],
  "subcourse-da-10": ["DATA WAREHOUSE", "ETL & ELT", "SNOWFLAKE"],
  "subcourse-da-11": ["PREDICTIVE ML", "SCIKIT-LEARN", "CHURN & A/B"],
  "subcourse-da-12": ["BUSINESS METRICS", "CAC & CLV", "DECISION SCIENCE"],
  "subcourse-da-13": ["AI ANALYTICS", "TEXT-TO-SQL", "LLM AGENTS"],
  "subcourse-da-14": ["DATA GOVERNANCE", "GDPR & PII", "LINEAGE"],
  "subcourse-da-15": ["CAPSTONE", "PORTFOLIO", "CAREER ROADMAP"],

  // Legacy mappings for Data Analytics
  "subcourse-data-excel": ["EXCEL", "XLOOKUP", "PIVOT TABLES"],
  "subcourse-data-sql": ["SQL", "WINDOW FUNCTIONS", "CTEs"],
  "subcourse-data-python": ["PYTHON", "PANDAS", "NUMPY"],
  "subcourse-data-viz": ["SEABORN", "MATPLOTLIB", "EDA"],
  "subcourse-data-bi": ["POWER BI", "DAX", "STAR SCHEMA"],
  "subcourse-data-capstone": ["A/B TESTING", "PREDICTIVE", "CAPSTONE"],

  // 4. AI Automation Course (All 10 Subcourses)
  "subcourse-aia-1": ["AI FUNDAMENTALS", "RPA & AI", "ARCHITECTURE"],
  "subcourse-aia-2": ["WORKFLOWS", "TRIGGERS & LOGIC", "RELIABILITY"],
  "subcourse-aia-3": ["N8N & MAKE", "ZAPIER", "LOW-CODE"],
  "subcourse-aia-4": ["GEN AI", "PROMPT ENG", "DATA EXTRACTION"],
  "subcourse-aia-5": ["APIS & WEBHOOKS", "OAUTH 2.0", "INTEGRATION"],
  "subcourse-aia-6": ["AI AGENTS", "REASONING LOOPS", "RAG & MEMORY"],
  "subcourse-aia-7": ["PYTHON & JS", "CUSTOM CODE", "API CALLS"],
  "subcourse-aia-8": ["CRM AUTOMATION", "SALES & SUPPORT", "OPERATIONS"],
  "subcourse-aia-9": ["DOCKER & CLOUD", "SECURITY & AUDIT", "SCALING"],
  "subcourse-aia-10": ["ENTERPRISE CAPSTONE", "OCR & RAG", "PRODUCTION"],

  // Legacy mappings for AI
  "subcourse-ai-foundations": ["LLM", "PROMPT ENGINEERING", "TOKENS"],
  "subcourse-ai-python": ["PYTHON", "OPENAI SDK", "STREAMING"],
  "subcourse-ai-rag": ["RAG", "VECTOR DB", "EMBEDDINGS"],
  "subcourse-ai-agents": ["LANGCHAIN", "AGENTS", "TOOLS"],
  "subcourse-ai-n8n": ["N8N", "AUTOMATION", "WEBHOOKS"],
  "subcourse-ai-capstone": ["CAPSTONE", "EVALS", "GOVERNANCE"],

  // 5. Python Programming & Problem Solving (All 16 Subcourses)
  "subcourse-py-1": ["PYTHON SYNTAX", "CPYTHON", "MEMORY & TYPES"],
  "subcourse-py-2": ["OPERATORS", "LOGIC", "LOOPS & CONTROL FLOW"],
  "subcourse-py-3": ["STRINGS", "F-STRINGS", "REGEX PATTERNS"],
  "subcourse-py-4": ["LISTS & DICTS", "SETS & TUPLES", "COMPLEXITY"],
  "subcourse-py-5": ["FUNCTIONS", "DECORATORS", "MODULAR DESIGN"],
  "subcourse-py-6": ["COMPUTATIONAL THINKING", "ALGORITHMS", "TRACING"],
  "subcourse-py-7": ["OOP PILLARS", "DUNDER METHODS", "SOLID"],
  "subcourse-py-8": ["FILE I/O", "JSON & CSV", "DATA PIPELINES"],
  "subcourse-py-9": ["EXCEPTIONS", "DEBUGGING", "PYTEST & TDD"],
  "subcourse-py-10": ["DSA", "SEARCH & SORT", "TREES & GRAPHS"],
  "subcourse-py-11": ["GENERATORS", "METACLASSES", "TYPING & MYPY"],
  "subcourse-py-12": ["TWO POINTERS", "SLIDING WINDOW", "LEETCODE PATTERNS"],
  "subcourse-py-13": ["SQLITE & ORM", "FASTAPI REST", "API DESIGN"],
  "subcourse-py-14": ["ASYNCIO", "MULTIPROCESSING", "GIL & MEMORY"],
  "subcourse-py-15": ["DOCKER & CI/CD", "SECURITY", "PACKAGING"],
  "subcourse-py-16": ["PORTFOLIO PROJECTS", "CAPSTONE", "INTERVIEWS"],
  "subcourse-py-core": ["PYTHON", "MUTABILITY", "MEMORY"],
  "subcourse-py-functions": ["FUNCTIONS", "CLOSURES", "DECORATORS"],
  "subcourse-py-oop": ["CLASSES", "DUNDER", "INHERITANCE"],
  "subcourse-py-data-structures": ["HASH TABLES", "DEQUE", "HEAPS"],
  "subcourse-py-algorithms": ["TWO POINTERS", "SLIDING WINDOW", "BIG-O"],
  "subcourse-py-production": ["PYTEST", "TYPING", "DEBUGGING"],

  // 6. Digital Marketing & Personal Branding (All 18 Subcourses)
  "subcourse-dm-01": ["FUNDAMENTALS", "CHANNELS", "STRATEGY"],
  "subcourse-dm-02": ["WEBSITE", "CMS & WP", "UX & SPEED"],
  "subcourse-dm-03": ["SEO", "KEYWORDS", "TECHNICAL SEO"],
  "subcourse-dm-04": ["CONTENT", "COPYWRITING", "AIDA & PAS"],
  "subcourse-dm-05": ["SOCIAL MEDIA", "INSTAGRAM", "LINKEDIN"],
  "subcourse-dm-06": ["SEM", "GOOGLE ADS", "PPC & ROAS"],
  "subcourse-dm-07": ["PAID SOCIAL", "META ADS", "RETARGETING"],
  "subcourse-dm-08": ["EMAIL MARKETING", "AUTOMATION", "DELIVERABILITY"],
  "subcourse-dm-09": ["YOUTUBE", "VIDEO SEO", "SHORTS"],
  "subcourse-dm-10": ["INFLUENCER", "AFFILIATE", "COMMISSIONS"],
  "subcourse-dm-11": ["WEB ANALYTICS", "GA4", "ATTRIBUTION"],
  "subcourse-dm-12": ["LEAD GEN", "CRM", "PIPELINES"],
  "subcourse-dm-13": ["MARKETING AUTO", "AI WORKFLOWS", "PROMPTS"],
  "subcourse-dm-14": ["E-COMMERCE", "AOV & CRO", "GROWTH LOOPS"],
  "subcourse-dm-15": ["MOBILE", "LOCAL SEO", "OMNICHANNEL"],
  "subcourse-dm-16": ["BUDGETING", "CAC & ROAS", "EXECUTIVE ROI"],
  "subcourse-dm-17": ["PRIVACY & DPDP", "GDPR", "ETHICS & WCAG"],
  "subcourse-dm-18": ["CAPSTONE", "PORTFOLIO", "CAREER LAUNCH"],

  // 7. Communication & Professional Skills (16 Subcourses)
  "subcourse-comm-1": ["COMMUNICATION PROCESS", "SHANNON-WEAVER", "7 CS"],
  "subcourse-comm-2": ["BUSINESS ENGLISH", "MODAL VERBS", "PRONUNCIATION"],
  "subcourse-comm-3": ["VERBAL FLUENCY", "PREP FRAMEWORK", "IMPROMPTU"],
  "subcourse-comm-4": ["ACTIVE LISTENING", "EMPATHY", "ACTION MINUTES"],
  "subcourse-comm-5": ["BODY LANGUAGE", "EYE CONTACT", "VOCAL PRESENCE"],
  "subcourse-comm-6": ["MINTO PYRAMID", "EXECUTIVE EMAILS", "BUSINESS WRITING"],
  "subcourse-comm-7": ["INTERPERSONAL TRUST", "ASSERTIVENESS", "BOUNDARIES"],
  "subcourse-comm-8": ["EMOTIONAL INTELLIGENCE", "SELF-REGULATION", "RESILIENCE"],
  "subcourse-comm-9": ["CROSS-FUNCTIONAL TEAMS", "SBI FEEDBACK", "PSYCHOLOGICAL SAFETY"],
  "subcourse-comm-10": ["MEETING HYGIENE", "AGENDA DESIGN", "CONSENSUS DECISIONS"],
  "subcourse-comm-11": ["PERSUASIVE PRESENTATIONS", "SLIDE DESIGN", "EXECUTIVE Q&A"],
  "subcourse-comm-12": ["HARVARD NEGOTIATION", "BATNA & ZOPA", "DIFFICULT CONVERSATIONS"],
  "subcourse-comm-13": ["WORKPLACE ETIQUETTE", "ORGANIZATIONAL HIERARCHY", "ETHICS & DE&I"],
  "subcourse-comm-14": ["ASYNC WORKFLOWS", "AI COMMUNICATION", "DIGITAL REPUTATION"],
  "subcourse-comm-15": ["LEADERSHIP INFLUENCE", "COACHING & DELEGATION", "CHANGE MANAGEMENT"],
  "subcourse-comm-16": ["STAR INTERVIEWING", "SALARY NEGOTIATION", "COMMUNICATION CAPSTONE"],
  "subcourse-comm-foundations": ["ACTIVE LISTENING", "EMPATHY", "NOISE"],
  "subcourse-comm-writing": ["MINTO PYRAMID", "MECE", "EXECUTIVE MEMOS"],
  "subcourse-comm-presentations": ["STORYTELLING", "SLIDE DESIGN", "Q&A"],
  "subcourse-comm-teamwork": ["RADICAL CANDOR", "SBI FEEDBACK", "SAFETY"],
  "subcourse-comm-negotiation": ["BATNA", "ZOPA", "INTERESTS"],
  "subcourse-comm-leadership": ["GRAVITAS", "UPWARD MANAGEMENT", "ETHICS"],

  // 8. Entrepreneurship & Business Development
  "subcourse-ent-1": ["ENTREPRENEURSHIP", "MINDSET", "MARKET ANALYSIS"],
  "subcourse-ent-2": ["IDEA VALIDATION", "MOM TEST", "TAM SAM SOM"],
  "subcourse-ent-3": ["BUSINESS MODELS", "LEAN CANVAS", "VALUE PROP"],
  "subcourse-ent-4": ["BUSINESS PLANNING", "STRATEGY", "SWOT & PESTLE"],
  "subcourse-ent-5": ["FINANCIAL MODELING", "UNIT ECONOMICS", "P&L & CASH FLOW"],
  "subcourse-ent-6": ["BUSINESS REGISTRATION", "COMPLIANCE & GST", "CONTRACTS & IP"],
  "subcourse-ent-7": ["BRANDING", "POSITIONING", "DIGITAL MARKETING"],
  "subcourse-ent-8": ["SPIN SELLING", "PIPELINE CRM", "NEGOTIATION"],
  "subcourse-ent-9": ["PRODUCT MANAGEMENT", "MVP PROTOTYPING", "AGILE SCRUM"],
  "subcourse-ent-10": ["OPERATIONS & SOPS", "PROJECT MANAGEMENT", "SUPPLY CHAIN"],
  "subcourse-ent-11": ["DIGITAL BUSINESS", "AI AUTOMATION", "TECH STACK"],
  "subcourse-ent-12": ["STARTUP FUNDING", "PITCH DECKS", "CAP TABLES & DILUTION"],
  "subcourse-ent-13": ["LEADERSHIP", "TEAM BUILDING", "CULTURE & HR"],
  "subcourse-ent-14": ["SCALING SYSTEMS", "GROWTH EXPERIMENTS", "EXPANSION"],
  "subcourse-ent-15": ["BUSINESS ANALYTICS", "DASHBOARDS & KPIS", "DECISION MAKING"],
  "subcourse-ent-16": ["CUSTOMER EXPERIENCE", "CRM AUTOMATION", "RETENTION & NPS"],
  "subcourse-ent-17": ["VENTURE CAPSTONE", "INVESTOR PITCH", "90-DAY LAUNCH"],
  "subcourse-ent-discovery": ["MOM TEST", "CUSTOMER INTERVIEWS", "TAM"],
  "subcourse-ent-business-models": ["LEAN CANVAS", "UNIT ECONOMICS", "MOATS"],
  "subcourse-ent-lead-gen": ["B2B PROSPECTING", "COLD OUTREACH", "MEDDIC"],
  "subcourse-ent-sales": ["SPIN SELLING", "DISCOVERY", "CLOSING"],
  "subcourse-ent-crm": ["PIPELINE VELOCITY", "LEAD SCORING", "HUBSPOT"],
  "subcourse-ent-finance": ["BURN RATE", "RUNWAY", "PITCH DECKS"],

  // 9. Career Readiness & Employability
  "subcourse-cr-1": ["CAREER FOUNDATIONS", "EMPLOYABILITY", "SELF AUDIT"],
  "subcourse-cr-2": ["VERBAL COMMUNICATION", "BUSINESS WRITING", "ACTIVE LISTENING"],
  "subcourse-cr-3": ["ENGLISH FLUENCY", "WORKPLACE VOCABULARY", "PRONUNCIATION"],
  "subcourse-cr-4": ["ATS RESUME", "GOOGLE XYZ", "LINKEDIN OPTIMIZATION"],
  "subcourse-cr-5": ["HIRING FUNNEL", "COLD OUTREACH", "REFERRAL LOOPS"],
  "subcourse-cr-6": ["STAR METHOD", "BEHAVIORAL INTERVIEW", "MOCK SESSIONS"],
  "subcourse-cr-7": ["QUANT APTITUDE", "LOGICAL REASONING", "ASSESSMENT TESTS"],
  "subcourse-cr-8": ["EMOTIONAL INTELLIGENCE", "EISENHOWER MATRIX", "TEAMWORK"],
  "subcourse-cr-9": ["WORKPLACE ETIQUETTE", "WORKSPACE TOOLS", "KPI OWNERSHIP"],
  "subcourse-cr-10": ["AI PRODUCTIVITY", "PROMPT ENGINEERING", "DIGITAL LITERACY"],
  "subcourse-cr-11": ["PERSONAL BRANDING", "LINKEDIN INFLUENCE", "PORTFOLIOS"],
  "subcourse-cr-12": ["SMART GOALS", "SALARY NEGOTIATION", "CAREER ROADMAP"],
  "subcourse-cr-13": ["FREELANCING", "PROPOSALS & PRICING", "ENTREPRENEURSHIP"],
  "subcourse-cr-14": ["PORTFOLIO CAPSTONE", "MOCK SIMULATION", "90-DAY PLAN"],
  "subcourse-car-resume": ["ATS PARSER", "GOOGLE XYZ", "BULLETS"],
  "subcourse-car-linkedin": ["HEADLINE HOOKS", "LINKEDIN SEO", "BRANDING"],
  "subcourse-car-interview": ["STAR METHOD", "SITUATIONAL", "QUESTIONS"],
  "subcourse-car-aptitude": ["FERMI ESTIMATION", "CASE STUDY", "LOGIC"],
  "subcourse-car-search": ["COLD OUTREACH", "REFERRALS", "NETWORKING"],
  "subcourse-car-negotiate": ["TOTAL COMP", "COUNTER OFFERS", "90 DAYS"],

  // Legacy mappings
  "subcourse-mktg-strategy": ["PERSONAS", "FUNNELS", "JTBD"],
  "subcourse-mktg-seo": ["SEO", "CORE WEB VITALS", "SCHEMA"],
  "subcourse-mktg-ads": ["META ADS", "GOOGLE ADS", "ROAS"],
  "subcourse-mktg-content": ["COPYWRITING", "AIDA & PAS", "REELS"],
  "subcourse-mktg-email": ["EMAIL MARKETING", "KLAVIYO", "DMARC"],
  "subcourse-mktg-capstone": ["GA4", "CRO", "GROWTH CAPSTONE"],
  "subcourse-devops-linux": ["LINUX", "NETWORKING", "NGINX"],
  "subcourse-devops-docker": ["DOCKER", "CONTAINERS", "COMPOSE"],
  "subcourse-devops-aws": ["AWS", "VPC", "EC2 & S3"],
  "subcourse-devops-cicd": ["CI/CD", "GITHUB ACTIONS", "AUTOMATION"],
  "subcourse-devops-terraform": ["TERRAFORM", "IAC", "HCL"],
  "subcourse-devops-k8s": ["KUBERNETES", "SRE", "MONITORING"],
  "subcourse-uiux-research": ["DESIGN THINKING", "USER RESEARCH", "PERSONAS"],
  "subcourse-uiux-ia": ["INFORMATION ARCHITECTURE", "TASK FLOWS", "WIREFRAMES"],
  "subcourse-uiux-figma": ["FIGMA", "DESIGN SYSTEMS", "AUTO-LAYOUT"],
  "subcourse-uiux-proto": ["PROTOTYPING", "SMART ANIMATE", "MICRO-INTERACTIONS"],
  "subcourse-uiux-access": ["WCAG 2.2 AA", "ACCESSIBILITY", "HEURISTICS"],
  "subcourse-uiux-capstone": ["DEV HANDOFF", "PORTFOLIO", "SAAS CAPSTONE"],
};

interface KeyTakeawaysInfo {
  leadText: string;
  items: string[];
}

const DEFAULT_KEY_TAKEAWAYS: KeyTakeawaysInfo = {
  leadText: "By completing this track, you will have built real-world frontend and backend applications from scratch:",
  items: [
    "Semantic HTML5 & accessible landmark structures",
    "Responsive CSS with modern Flexbox & CSS Grid",
    "ES6+ JavaScript, DOM events, and asynchronous fetch",
    "React state, props, custom hooks, and component trees",
    "Node.js Express REST APIs and server-side routes",
    "Relational SQL databases, queries, and joins",
  ],
};

const COURSE_KEY_TAKEAWAYS: Record<string, KeyTakeawaysInfo> = {
  // 1. Full-Stack Web Development
  "full-stack-web": DEFAULT_KEY_TAKEAWAYS,
  "full-stack-web-development": DEFAULT_KEY_TAKEAWAYS,

  // 2. AI, Machine Learning & Data Science
  "ai-ml-data-science": {
    leadText: "By completing this track, you will build and deploy predictive machine learning models and data processing pipelines:",
    items: [
      "Linear algebra, multivariate calculus & gradient descent optimization",
      "Vectorized data manipulation with NumPy and Pandas DataFrames",
      "Supervised ML, decision trees, random forests & XGBoost ensembles",
      "Deep learning with PyTorch: CNNs, computer vision & YOLO object detection",
      "Natural Language Processing, transformers, self-attention & LLM prompt engineering",
      "Production MLOps: FastAPI endpoints, Docker containerization & model monitoring",
    ],
  },
  "ai, machine learning & data science": {
    leadText: "By completing this track, you will build and deploy predictive machine learning models and data processing pipelines:",
    items: [
      "Linear algebra, multivariate calculus & gradient descent optimization",
      "Vectorized data manipulation with NumPy and Pandas DataFrames",
      "Supervised ML, decision trees, random forests & XGBoost ensembles",
      "Deep learning with PyTorch: CNNs, computer vision & YOLO object detection",
      "Natural Language Processing, transformers, self-attention & LLM prompt engineering",
      "Production MLOps: FastAPI endpoints, Docker containerization & model monitoring",
    ],
  },
  "ai-machine-learning-data-science-mvge03d6": {
    leadText: "By completing this track, you will build and deploy predictive machine learning models and data processing pipelines:",
    items: [
      "Linear algebra, multivariate calculus & gradient descent optimization",
      "Vectorized data manipulation with NumPy and Pandas DataFrames",
      "Supervised ML, decision trees, random forests & XGBoost ensembles",
      "Deep learning with PyTorch: CNNs, computer vision & YOLO object detection",
      "Natural Language Processing, transformers, self-attention & LLM prompt engineering",
      "Production MLOps: FastAPI endpoints, Docker containerization & model monitoring",
    ],
  },
  "ec1aa94e-d94c-4dec-aea4-df6a251f6afb": {
    leadText: "By completing this track, you will build and deploy predictive machine learning models and data processing pipelines:",
    items: [
      "Linear algebra, multivariate calculus & gradient descent optimization",
      "Vectorized data manipulation with NumPy and Pandas DataFrames",
      "Supervised ML, decision trees, random forests & XGBoost ensembles",
      "Deep learning with PyTorch: CNNs, computer vision & YOLO object detection",
      "Natural Language Processing, transformers, self-attention & LLM prompt engineering",
      "Production MLOps: FastAPI endpoints, Docker containerization & model monitoring",
    ],
  },

  // 3. Data Analytics & Business Intelligence
  "data-analytics-bi": {
    leadText: "By completing this track, you will turn complex raw datasets into executive dashboards and strategic business insights:",
    items: [
      "Advanced business modeling in Excel: Dynamic arrays, XLOOKUP & What-If analysis",
      "Analytical SQL: Window functions, Common Table Expressions (CTEs) & complex joins",
      "Automated data cleaning & ETL workflows using Power Query and Python",
      "Executive interactive dashboard design and data storytelling in Power BI",
      "Star schema relational data modeling and analytical DAX measures",
      "Hypothesis testing, statistical A/B test analysis & commercial KPI reporting",
    ],
  },
  "data-analytics": {
    leadText: "By completing this track, you will turn complex raw datasets into executive dashboards and strategic business insights:",
    items: [
      "Advanced business modeling in Excel: Dynamic arrays, XLOOKUP & What-If analysis",
      "Analytical SQL: Window functions, Common Table Expressions (CTEs) & complex joins",
      "Automated data cleaning & ETL workflows using Power Query and Python",
      "Executive interactive dashboard design and data storytelling in Power BI & Tableau",
      "Star schema relational data modeling and analytical DAX measures",
      "Hypothesis testing, statistical A/B test analysis & commercial KPI reporting",
    ],
  },
  "data analytics": {
    leadText: "By completing this track, you will turn complex raw datasets into executive dashboards and strategic business insights:",
    items: [
      "Advanced business modeling in Excel: Dynamic arrays, XLOOKUP & What-If analysis",
      "Analytical SQL: Window functions, Common Table Expressions (CTEs) & complex joins",
      "Automated data cleaning & ETL workflows using Power Query and Python",
      "Executive interactive dashboard design and data storytelling in Power BI & Tableau",
      "Star schema relational data modeling and analytical DAX measures",
      "Hypothesis testing, statistical A/B test analysis & commercial KPI reporting",
    ],
  },
  "4ea2dbff-d166-443e-817e-a54fe59244ab": {
    leadText: "By completing this track, you will turn complex raw datasets into executive dashboards and strategic business insights:",
    items: [
      "Advanced business modeling in Excel: Dynamic arrays, XLOOKUP & What-If analysis",
      "Analytical SQL: Window functions, Common Table Expressions (CTEs) & complex joins",
      "Automated data cleaning & ETL workflows using Power Query and Python",
      "Executive interactive dashboard design and data storytelling in Power BI & Tableau",
      "Star schema relational data modeling and analytical DAX measures",
      "Hypothesis testing, statistical A/B test analysis & commercial KPI reporting",
    ],
  },

  // 4. Generative AI & Intelligent Automation
  "generative-ai-automation": {
    leadText: "By completing this track, you will architect enterprise RAG pipelines, autonomous AI agents, and automated workflows:",
    items: [
      "LLM transformer mechanics, tokenomics & structured prompt engineering",
      "OpenAI & Anthropic API integrations with streaming & structured outputs",
      "Retrieval-Augmented Generation (RAG) using vector embeddings & Pinecone/ChromaDB",
      "Autonomous multi-agent architectures using LangChain and LangGraph",
      "Enterprise workflow automation with n8n, webhooks, and third-party APIs",
      "LLM evaluation benchmarks, guardrails, and responsible AI governance",
    ],
  },
  "ai-automation": {
    leadText: "By completing this track, you will architect enterprise RAG pipelines, autonomous AI agents, and automated workflows:",
    items: [
      "LLM transformer mechanics, tokenomics & structured prompt engineering",
      "OpenAI & Anthropic API integrations with streaming & structured outputs",
      "Retrieval-Augmented Generation (RAG) using vector embeddings & Pinecone/ChromaDB",
      "Autonomous multi-agent architectures using LangChain and LangGraph",
      "Enterprise workflow automation with n8n, webhooks, and third-party APIs",
      "LLM evaluation benchmarks, guardrails, and responsible AI governance",
    ],
  },
  "ai automation": {
    leadText: "By completing this track, you will architect enterprise RAG pipelines, autonomous AI agents, and automated workflows:",
    items: [
      "LLM transformer mechanics, tokenomics & structured prompt engineering",
      "OpenAI & Anthropic API integrations with streaming & structured outputs",
      "Retrieval-Augmented Generation (RAG) using vector embeddings & Pinecone/ChromaDB",
      "Autonomous multi-agent architectures using LangChain and LangGraph",
      "Enterprise workflow automation with n8n, webhooks, and third-party APIs",
      "LLM evaluation benchmarks, guardrails, and responsible AI governance",
    ],
  },
  "ai-automation-mvdy48ts": {
    leadText: "By completing this track, you will architect enterprise RAG pipelines, autonomous AI agents, and automated workflows:",
    items: [
      "LLM transformer mechanics, tokenomics & structured prompt engineering",
      "OpenAI & Anthropic API integrations with streaming & structured outputs",
      "Retrieval-Augmented Generation (RAG) using vector embeddings & Pinecone/ChromaDB",
      "Autonomous multi-agent architectures using LangChain and LangGraph",
      "Enterprise workflow automation with n8n, webhooks, and third-party APIs",
      "LLM evaluation benchmarks, guardrails, and responsible AI governance",
    ],
  },
  "d554eb67-97aa-41d7-9af9-61735112a7c9": {
    leadText: "By completing this track, you will architect enterprise RAG pipelines, autonomous AI agents, and automated workflows:",
    items: [
      "LLM transformer mechanics, tokenomics & structured prompt engineering",
      "OpenAI & Anthropic API integrations with streaming & structured outputs",
      "Retrieval-Augmented Generation (RAG) using vector embeddings & Pinecone/ChromaDB",
      "Autonomous multi-agent architectures using LangChain and LangGraph",
      "Enterprise workflow automation with n8n, webhooks, and third-party APIs",
      "LLM evaluation benchmarks, guardrails, and responsible AI governance",
    ],
  },

  // 5. Python Programming & Problem Solving
  "python-programming": {
    leadText: "By completing this track, you will master idiomatic Python syntax, algorithmic problem solving, and production software design:",
    items: [
      "CPython memory architecture, references, mutability & type semantics",
      "Functional programming: Closures, decorators, lambda expressions & LEGB scope",
      "Object-Oriented Programming (OOP): Inheritance, dunder protocols & encapsulation",
      "Core data structures: Deques, heaps, hash maps, binary trees & Big-O complexity",
      "Algorithmic problem solving: Two-pointer, sliding window & binary search",
      "Production engineering: pytest suites, type annotations, and custom exception hierarchies",
    ],
  },
  "python-programming-problem-solving": {
    leadText: "By completing this track, you will master idiomatic Python syntax, algorithmic problem solving, and production software design:",
    items: [
      "CPython memory architecture, references, mutability & type semantics",
      "Functional programming: Closures, decorators, lambda expressions & LEGB scope",
      "Object-Oriented Programming (OOP): Inheritance, dunder protocols & encapsulation",
      "Core data structures: Deques, heaps, hash maps, binary trees & Big-O complexity",
      "Algorithmic problem solving: Two-pointer, sliding window & binary search",
      "Production engineering: pytest suites, type annotations, and custom exception hierarchies",
    ],
  },
  "python-programming-problem-solving-mvge1ju7": {
    leadText: "By completing this track, you will master idiomatic Python syntax, algorithmic problem solving, and production software design:",
    items: [
      "CPython memory architecture, references, mutability & type semantics",
      "Functional programming: Closures, decorators, lambda expressions & LEGB scope",
      "Object-Oriented Programming (OOP): Inheritance, dunder protocols & encapsulation",
      "Core data structures: Deques, heaps, hash maps, binary trees & Big-O complexity",
      "Algorithmic problem solving: Two-pointer, sliding window & binary search",
      "Production engineering: pytest suites, type annotations, and custom exception hierarchies",
    ],
  },
  "21f59e2e-0237-46d8-bad5-5ad60ab7235f": {
    leadText: "By completing this track, you will master idiomatic Python syntax, algorithmic problem solving, and production software design:",
    items: [
      "CPython memory architecture, references, mutability & type semantics",
      "Functional programming: Closures, decorators, lambda expressions & LEGB scope",
      "Object-Oriented Programming (OOP): Inheritance, dunder protocols & encapsulation",
      "Core data structures: Deques, heaps, hash maps, binary trees & Big-O complexity",
      "Algorithmic problem solving: Two-pointer, sliding window & binary search",
      "Production engineering: pytest suites, type annotations, and custom exception hierarchies",
    ],
  },

  // 6. Digital Marketing & Personal Branding (All 18 Subcourses)
  "digital-marketing": {
    leadText: "By completing this comprehensive 18-subcourse track, you will master the full modern digital marketing and growth stack:",
    items: [
      "Full-funnel growth strategy (TOFU, MOFU, BOFU), buyer personas & SMART goals",
      "High-converting landing page architecture, mobile UX & conversion paths",
      "Technical, on-page, off-page, and local Search Engine Optimization (SEO)",
      "High-converting copywriting frameworks (AIDA, PAS) & editorial calendar planning",
      "High-ROAS Google Ads (Search, Shopping, PMax) and Meta Ads Manager (FB/IG)",
      "Lifecycle email marketing, automated SMS workflows & CRM lead pipelines",
      "Web analytics with Google Analytics 4 (GA4), UTM tracking & attribution modeling",
      "Marketing ethics, privacy compliance (India DPDP Act & GDPR) & WCAG accessibility",
    ],
  },

  // 7. Communication & Professional Skills (16 Subcourses)
  "communication-skills": {
    leadText: "By completing this comprehensive 16-subcourse track, you will communicate with executive authority, influence stakeholders, and lead cross-functional teams:",
    items: [
      "The Shannon-Weaver process, 7 Cs of communication & eliminating cognitive noise",
      "Workplace English fluency, polite modals (could/would/might) & intelligible pronunciation",
      "Top-down executive writing with Barbara Minto's Pyramid Principle (BLUF & MECE)",
      "Empathetic active listening, question formulation & error-free meeting action items",
      "Non-verbal gravitas: Eye contact, confident posture, vocal dynamics & video presence",
      "Constructive feedback using Situation-Behavior-Impact (SBI) & Radical Candor",
      "Harvard Principled Negotiation: Separating people from problems, BATNA, and ZOPA",
      "High-stakes behavioral interviews using STAR, salary negotiation & capstone simulation",
    ],
  },
  "communication-professional-skills": {
    leadText: "By completing this comprehensive 16-subcourse track, you will communicate with executive authority, influence stakeholders, and lead cross-functional teams:",
    items: [
      "The Shannon-Weaver process, 7 Cs of communication & eliminating cognitive noise",
      "Workplace English fluency, polite modals (could/would/might) & intelligible pronunciation",
      "Top-down executive writing with Barbara Minto's Pyramid Principle (BLUF & MECE)",
      "Empathetic active listening, question formulation & error-free meeting action items",
      "Non-verbal gravitas: Eye contact, confident posture, vocal dynamics & video presence",
      "Constructive feedback using Situation-Behavior-Impact (SBI) & Radical Candor",
      "Harvard Principled Negotiation: Separating people from problems, BATNA, and ZOPA",
      "High-stakes behavioral interviews using STAR, salary negotiation & capstone simulation",
    ],
  },
  "communication-professional-skills-mvge9tmi": {
    leadText: "By completing this comprehensive 16-subcourse track, you will communicate with executive authority, influence stakeholders, and lead cross-functional teams:",
    items: [
      "The Shannon-Weaver process, 7 Cs of communication & eliminating cognitive noise",
      "Workplace English fluency, polite modals (could/would/might) & intelligible pronunciation",
      "Top-down executive writing with Barbara Minto's Pyramid Principle (BLUF & MECE)",
      "Empathetic active listening, question formulation & error-free meeting action items",
      "Non-verbal gravitas: Eye contact, confident posture, vocal dynamics & video presence",
      "Constructive feedback using Situation-Behavior-Impact (SBI) & Radical Candor",
      "Harvard Principled Negotiation: Separating people from problems, BATNA, and ZOPA",
      "High-stakes behavioral interviews using STAR, salary negotiation & capstone simulation",
    ],
  },
  "50c43e3e-c579-4cf7-8dec-62eb40c30f86": {
    leadText: "By completing this comprehensive 16-subcourse track, you will communicate with executive authority, influence stakeholders, and lead cross-functional teams:",
    items: [
      "The Shannon-Weaver process, 7 Cs of communication & eliminating cognitive noise",
      "Workplace English fluency, polite modals (could/would/might) & intelligible pronunciation",
      "Top-down executive writing with Barbara Minto's Pyramid Principle (BLUF & MECE)",
      "Empathetic active listening, question formulation & error-free meeting action items",
      "Non-verbal gravitas: Eye contact, confident posture, vocal dynamics & video presence",
      "Constructive feedback using Situation-Behavior-Impact (SBI) & Radical Candor",
      "Harvard Principled Negotiation: Separating people from problems, BATNA, and ZOPA",
      "High-stakes behavioral interviews using STAR, salary negotiation & capstone simulation",
    ],
  },

  // 8. Entrepreneurship & Business Development
  "entrepreneurship-business": {
    leadText: "By completing this track, you will validate market opportunities, architect scalable business models, and drive B2B/B2C revenue:",
    items: [
      "Unbiased customer discovery interviews using 'The Mom Test' methodology",
      "Lean Canvas modeling, unique value propositions, and defensible moats",
      "B2B outbound prospecting, cold email frameworks & MEDDIC lead qualification",
      "Consultative sales execution using Neil Rackham's SPIN Selling framework",
      "Sales pipeline velocity optimization, CRM deal stages & automated lead scoring",
      "Startup financial runway calculations, unit economics & the 10-slide investor pitch deck",
    ],
  },
  "entrepreneurship-business-development": {
    leadText: "By completing this track, you will validate market opportunities, architect scalable business models, and drive B2B/B2C revenue:",
    items: [
      "Unbiased customer discovery interviews using 'The Mom Test' methodology",
      "Lean Canvas modeling, unique value propositions, and defensible moats",
      "B2B outbound prospecting, cold email frameworks & MEDDIC lead qualification",
      "Consultative sales execution using Neil Rackham's SPIN Selling framework",
      "Sales pipeline velocity optimization, CRM deal stages & automated lead scoring",
      "Startup financial runway calculations, unit economics & the 10-slide investor pitch deck",
    ],
  },
  "entrepreneurship-business-development-mvge78k9": {
    leadText: "By completing this track, you will validate market opportunities, architect scalable business models, and drive B2B/B2C revenue:",
    items: [
      "Unbiased customer discovery interviews using 'The Mom Test' methodology",
      "Lean Canvas modeling, unique value propositions, and defensible moats",
      "B2B outbound prospecting, cold email frameworks & MEDDIC lead qualification",
      "Consultative sales execution using Neil Rackham's SPIN Selling framework",
      "Sales pipeline velocity optimization, CRM deal stages & automated lead scoring",
      "Startup financial runway calculations, unit economics & the 10-slide investor pitch deck",
    ],
  },
  "a4a3faff-4660-4b12-85ce-57d1da72ea60": {
    leadText: "By completing this track, you will validate market opportunities, architect scalable business models, and drive B2B/B2C revenue:",
    items: [
      "Unbiased customer discovery interviews using 'The Mom Test' methodology",
      "Lean Canvas modeling, unique value propositions, and defensible moats",
      "B2B outbound prospecting, cold email frameworks & MEDDIC lead qualification",
      "Consultative sales execution using Neil Rackham's SPIN Selling framework",
      "Sales pipeline velocity optimization, CRM deal stages & automated lead scoring",
      "Startup financial runway calculations, unit economics & the 10-slide investor pitch deck",
    ],
  },

  // 9. Career Readiness & Employability
  "career-readiness": {
    leadText: "By completing this track, you will engineer an irresistible candidate profile and accelerate your career trajectory:",
    items: [
      "ATS-compliant resume engineering using the Google XYZ achievement bullet formula",
      "Inbound recruiter attraction: Optimizing LinkedIn headline, about section & featured proof",
      "Mastering behavioral and situational interviews using the structured STAR method",
      "Analytical problem-solving: Fermi market estimations and consulting case breakdowns",
      "Tapping the hidden job market through strategic cold outreach and warm networking loops",
      "Total compensation offer evaluation, non-emotional salary negotiation & first-90-days plan",
    ],
  },
  "career-readiness-employability": {
    leadText: "By completing this track, you will engineer an irresistible candidate profile and accelerate your career trajectory:",
    items: [
      "ATS-compliant resume engineering using the Google XYZ achievement bullet formula",
      "Inbound recruiter attraction: Optimizing LinkedIn headline, about section & featured proof",
      "Mastering behavioral and situational interviews using the structured STAR method",
      "Analytical problem-solving: Quantitative aptitude shortcuts and case interview frameworks",
      "Tapping the hidden job market through strategic cold outreach and warm referral loops",
      "Total compensation offer evaluation, non-emotional salary negotiation & first-90-days plan",
    ],
  },
  "carrer-readiness-employability-mvge5776": {
    leadText: "By completing this track, you will engineer an irresistible candidate profile and accelerate your career trajectory:",
    items: [
      "ATS-compliant resume engineering using the Google XYZ achievement bullet formula",
      "Inbound recruiter attraction: Optimizing LinkedIn headline, about section & featured proof",
      "Mastering behavioral and situational interviews using the structured STAR method",
      "Analytical problem-solving: Quantitative aptitude shortcuts and case interview frameworks",
      "Tapping the hidden job market through strategic cold outreach and warm referral loops",
      "Total compensation offer evaluation, non-emotional salary negotiation & first-90-days plan",
    ],
  },
  "2ff01e9f-73ec-48bc-be0a-b80ebf2d1c75": {
    leadText: "By completing this track, you will engineer an irresistible candidate profile and accelerate your career trajectory:",
    items: [
      "ATS-compliant resume engineering using the Google XYZ achievement bullet formula",
      "Inbound recruiter attraction: Optimizing LinkedIn headline, about section & featured proof",
      "Mastering behavioral and situational interviews using the structured STAR method",
      "Analytical problem-solving: Quantitative aptitude shortcuts and case interview frameworks",
      "Tapping the hidden job market through strategic cold outreach and warm referral loops",
      "Total compensation offer evaluation, non-emotional salary negotiation & first-90-days plan",
    ],
  },

  // Cloud & DevOps
  "cloud-devops": {
    leadText: "By completing this track, you will engineer scalable cloud infrastructure, automated CI/CD pipelines, and containerized clusters:",
    items: [
      "Linux server administration, shell scripting & NGINX reverse proxies",
      "Production containerization with multi-stage Dockerfiles and Docker Compose",
      "AWS cloud architecture: VPC networking, EC2 auto-scaling, S3, and IAM security",
      "Automated CI/CD workflows using GitHub Actions and automated test gates",
      "Infrastructure as Code (IaC) with declarative Terraform and state management",
      "Container orchestration with Kubernetes deployments, services, and ingress controllers",
    ],
  },

  // UI/UX Design
  "ui-ux-design": {
    leadText: "By completing this track, you will design intuitive, accessible digital products and production-ready design systems:",
    items: [
      "Design thinking methodology, user empathy interviews, and persona synthesis",
      "Information architecture, user task flows, and low-fidelity wireframing",
      "Advanced Figma mastery: Auto-Layout 5.0, component variants & design tokens",
      "Interactive high-fidelity prototyping with Smart Animate and micro-interactions",
      "Web Content Accessibility Guidelines (WCAG 2.2 AA) and heuristic usability evaluation",
      "Design-to-engineering handoff, design system documentation, and portfolio case studies",
    ],
  },
};

export default function StudentCourse() {
  const { eid } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [subCourses, setSubCourses] = useState<CurriculumModule[]>([]);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [selectedSubCourse, setSelectedSubCourse] = useState<CurriculumModule | null>(null);
  const [selectedSubCourseIndex, setSelectedSubCourseIndex] = useState<number>(-1);
  const [drawerLockNotice, setDrawerLockNotice] = useState<string | null>(null);
  const [lockAlertMessage, setLockAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [openDrawerModules, setOpenDrawerModules] = useState<Record<string, boolean>>({});

  const toggleDrawerModule = (moduleId: string) => {
    setOpenDrawerModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const expandAllDrawerModules = () => {
    if (!selectedSubCourse?.modules) return;
    const next: Record<string, boolean> = {};
    selectedSubCourse.modules.forEach(m => { next[m.id] = true; });
    setOpenDrawerModules(next);
  };

  const collapseAllDrawerModules = () => {
    if (!selectedSubCourse?.modules) return;
    const next: Record<string, boolean> = {};
    selectedSubCourse.modules.forEach(m => { next[m.id] = false; });
    setOpenDrawerModules(next);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await fetchCourseCurriculum(eid || "full-stack-web");
        if (cancelled) return;
        setCourse(result.course);
        setSubCourses(result.modules);
        const completedIds = getCompletedItemIds(eid);
        setCompleted(completedIds);
      } catch (e) {
        console.error("Error loading course:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [eid]);

  // Close drawer on Escape key and prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedSubCourse(null);
        setSelectedSubCourseIndex(-1);
        setDrawerLockNotice(null);
        setLockAlertMessage(null);
      }
    };
    if (selectedSubCourse) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedSubCourse]);

  const allItems: CurriculumItem[] = useMemo(() => subCourses.flatMap(sc => sc.items), [subCourses]);
  const totalItemsCount = allItems.length;
  const completedCount = allItems.filter(item => completed.has(item.id)).length;
  const progressPct = totalItemsCount ? Math.round((completedCount * 100) / totalItemsCount) : 0;
  const requiredPct = course?.min_progress_pct ?? 80;
  const certificateUnlocked = isCertificateUnlocked(progressPct, requiredPct);

  // Dynamic Course Duration calculated from curriculum items
  const totalCourseMinutes = useMemo(() => getCourseTotalMinutes(subCourses), [subCourses]);
  const formattedTotalCourseDuration = formatMinutesToHuman(totalCourseMinutes);

  const effectiveEid = eid || "full-stack-web";
  const effectiveSlug = (course?.title || course?.slug || eid || "").toLowerCase();
  const activeKeyTakeaways = useMemo(() => {
    // 1. Detect from subCourses if available
    const firstSubId = subCourses?.[0]?.id || "";
    if (firstSubId.startsWith("subcourse-dm-")) return COURSE_KEY_TAKEAWAYS["digital-marketing"];
    if (firstSubId.startsWith("subcourse-aiml-")) return COURSE_KEY_TAKEAWAYS["ai-ml-data-science"];
    if (firstSubId.startsWith("subcourse-da-") || firstSubId.startsWith("subcourse-data-")) return COURSE_KEY_TAKEAWAYS["data-analytics"];
    if (firstSubId.startsWith("subcourse-auto-") || firstSubId.startsWith("subcourse-ai-")) return COURSE_KEY_TAKEAWAYS["ai-automation"];
    if (firstSubId.startsWith("subcourse-py-") || firstSubId.startsWith("subcourse-python-")) return COURSE_KEY_TAKEAWAYS["python-programming"];
    if (firstSubId.startsWith("subcourse-comm-")) return COURSE_KEY_TAKEAWAYS["communication-skills"];
    if (firstSubId.startsWith("subcourse-biz-")) return COURSE_KEY_TAKEAWAYS["entrepreneurship-business"];
    if (firstSubId.startsWith("subcourse-cr-") || firstSubId.startsWith("subcourse-car-")) return COURSE_KEY_TAKEAWAYS["career-readiness"];
    if (firstSubId.includes("html") || firstSubId.includes("js") || firstSubId.includes("node") || firstSubId.includes("react")) return DEFAULT_KEY_TAKEAWAYS;

    // 2. Detect from text (title, slug, or id normalized)
    const s = `${course?.title || ""} ${course?.slug || ""} ${eid || ""}`.toLowerCase();
    if (s.includes("marketing") || s.includes("digital") || s.includes("branding") || s.includes("373e7d95-4e2a-4dfd-9df6-606560aba857")) {
      return COURSE_KEY_TAKEAWAYS["digital-marketing"];
    }
    if (s.includes("python") || s.includes("21f59e2e-0237-46d8-bad5-5ad60ab7235f")) {
      return COURSE_KEY_TAKEAWAYS["python-programming"];
    }
    if (s.includes("data analytics") || s.includes("business intelligence") || s.includes("power-bi") || (s.includes("analytics") && !s.includes("marketing")) || s.includes("4ea2dbff-d166-443e-817e-a54fe59244ab")) {
      return COURSE_KEY_TAKEAWAYS["data-analytics"];
    }
    if (s.includes("automation") || s.includes("generative") || s.includes("d554eb67-97aa-41d7-9af9-61735112a7c9")) {
      return COURSE_KEY_TAKEAWAYS["ai-automation"];
    }
    if (s.includes("machine learning") || s.includes("ai-ml") || s.includes("data science") || s.includes("ec1aa94e-d94c-4dec-aea4-df6a251f6afb")) {
      return COURSE_KEY_TAKEAWAYS["ai-ml-data-science"];
    }
    if (s.includes("communication") || s.includes("presentation") || s.includes("speaking") || s.includes("50c43e3e-c579-4cf7-8dec-62eb40c30f86")) {
      return COURSE_KEY_TAKEAWAYS["communication-skills"];
    }
    if (s.includes("entrepreneurship") || s.includes("business development") || s.includes("startup") || s.includes("a4a3faff-4660-4b12-85ce-57d1da72ea60")) {
      return COURSE_KEY_TAKEAWAYS["entrepreneurship-business"];
    }
    if (s.includes("career") || s.includes("readiness") || s.includes("employability") || s.includes("resume") || s.includes("2ff01e9f-73ec-48bc-be0a-b80ebf2d1c75")) {
      return COURSE_KEY_TAKEAWAYS["career-readiness"];
    }

    return DEFAULT_KEY_TAKEAWAYS;
  }, [course, eid, subCourses]);

  // Sub-course custom SVG icons
  const renderSubCourseIcon = (subCourseId: string) => {
    // 1. Full Stack Web Development
    switch (subCourseId) {
      case "html-css-foundations":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
          </svg>
        );
      case "js-fundamentals":
        return <Icon name="code" size={22} />;
      case "database-sql":
      case "subcourse-data-sql":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
          </svg>
        );
      case "node-express":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <rect x="2" y="2" width="20" height="8" rx="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
        );
      case "react-js":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <ellipse cx="12" cy="12" rx="10" ry="4" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        );
      case "git-basics":
      case "subcourse-devops-cicd":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <line x1="6" y1="3" x2="6" y2="15" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M18 9a9 9 0 0 1-9 9" />
          </svg>
        );

      // AI Automation
      case "subcourse-ai-foundations":
      case "subcourse-ai-agents":
      case "subcourse-ai-capstone":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 8H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Z" />
            <circle cx="9" cy="13" r="1" fill="currentColor" />
            <circle cx="15" cy="13" r="1" fill="currentColor" />
            <path d="M9 17h6" />
          </svg>
        );
      case "subcourse-ai-python":
      case "subcourse-data-python":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case "subcourse-ai-rag":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        );
      case "subcourse-ai-n8n":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="18" cy="18" r="3" />
            <line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
            <line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
          </svg>
        );

      // Cloud & DevOps
      case "subcourse-devops-linux":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        );
      case "subcourse-devops-docker":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <path d="M22 12.5c-.7 0-1.5-.2-2.1-.7-.8.5-1.8.7-2.9.7-1.3 0-2.4-.4-3.3-1.1-.9.7-2 1.1-3.3 1.1s-2.4-.4-3.3-1.1C6.2 12.1 5.1 12.5 3.8 12.5c-.6 0-1.2-.1-1.8-.4C2 17 6 21 12 21s10-4 10-8.5Z" />
            <rect x="7" y="5" width="2" height="2" />
            <rect x="10" y="5" width="2" height="2" />
            <rect x="13" y="5" width="2" height="2" />
            <rect x="10" y="2" width="2" height="2" />
          </svg>
        );
      case "subcourse-devops-aws":
      case "subcourse-devops-terraform":
      case "subcourse-devops-k8s":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        );

      // Data Analytics
      case "subcourse-data-excel":
      case "subcourse-data-viz":
      case "subcourse-data-bi":
      case "subcourse-data-capstone":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        );

      // Digital Marketing
      case "subcourse-mktg-strategy":
      case "subcourse-mktg-seo":
      case "subcourse-mktg-ads":
      case "subcourse-mktg-content":
      case "subcourse-mktg-email":
      case "subcourse-mktg-capstone":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );

      // UI/UX Design
      case "subcourse-uiux-research":
      case "subcourse-uiux-ia":
      case "subcourse-uiux-figma":
      case "subcourse-uiux-proto":
      case "subcourse-uiux-access":
      case "subcourse-uiux-capstone":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
            <path d="m12 19 7-7 3 3-7 7-3-3z" />
            <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="m2 2 7.586 7.586" />
            <circle cx="11" cy="11" r="2" />
          </svg>
        );

      default:
        return <Icon name="book" size={22} />;
    }
  };

  const isSelectedSubCourseUnlocked = useMemo(() => {
    if (selectedSubCourseIndex < 0) return true;
    return isCurriculumModuleUnlocked(selectedSubCourseIndex, subCourses, completed);
  }, [selectedSubCourseIndex, subCourses, completed]);

  const handleSubCourseClick = (subCourse: CurriculumModule, index: number) => {
    setSelectedSubCourse(subCourse);
    setSelectedSubCourseIndex(index);
    setOpenDrawerModules({});
    setDrawerLockNotice(null);
    setLockAlertMessage(null);
  };

  if (loading) {
    return (
      <div className="grid min-h-[50vh] place-items-center text-sm font-semibold text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
          <span>Loading course and sub-courses…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-7 pb-12">
      {/* Top Breadcrumb Nav */}
      <Link
        to="/student/courses"
        className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 transition hover:text-brand"
      >
        <span className="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 bg-white transition group-hover:border-slate-300 group-hover:bg-slate-50 shadow-xs">
          <Icon name="arrowLeft" size={14} />
        </span>
        <span>Back to my courses</span>
      </Link>

      {/* Lock alert notice if user clicks locked subcourse */}
      {lockAlertMessage && (
        <div className="flex items-center justify-between rounded-2xl border border-amber-300 bg-amber-50 px-5 py-3.5 text-xs font-semibold text-amber-900 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-amber-200 text-amber-800">
              <Icon name="lock" size={13} />
            </span>
            <span>{lockAlertMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setLockAlertMessage(null)}
            className="rounded-lg p-1 text-amber-700 hover:bg-amber-100 transition"
          >
            <Icon name="close" size={14} />
          </button>
        </div>
      )}

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Main Content: Course & Sub-Courses Grid */}
        <main className="min-w-0 space-y-7">
          {/* Main Course Hero Card */}
          <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/40 to-blue-50/30 p-6 sm:p-8 md:p-9 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                    Main Career Track
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200/80 bg-indigo-50/60 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 shadow-xs">
                    {subCourses.length} Sub-Courses
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 shadow-xs">
                    {getCourseCodeBadge(course?.title || course?.slug || eid || "")}
                  </span>
                </div>

                <h1 className="mt-3.5 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl leading-tight">
                  {course?.title || "Full Stack Web Development"}
                </h1>

                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 font-normal sm:text-base">
                  {effectiveSlug.includes("ai automation") || effectiveSlug.includes("ai-automation")
                    ? "Master AI Automation across 10 progressive sub-courses. Architect end-to-end event-driven workflows, visual n8n and Make pipelines, frontier LLM integrations, autonomous AI agents, and enterprise production systems."
                    : effectiveSlug.includes("data analytics") || effectiveSlug.includes("data-analytics")
                    ? "Master modern Data Analytics across 15 progressive sub-courses. From Excel modeling, advanced SQL, Python Pandas and statistics, to Power BI, Tableau, ETL engineering, predictive modeling, and AI-powered analytics."
                    : effectiveSlug.includes("ai-ml") || effectiveSlug.includes("machine learning") || effectiveSlug.includes("data science")
                    ? "Master Artificial Intelligence, Machine Learning & Data Science across 16 progressive sub-courses. From linear algebra, calculus, and Python, to supervised ML, deep neural nets, computer vision, NLP, generative LLMs, RAG agents, and MLOps deployment."
                    : effectiveSlug.includes("career") || effectiveSlug.includes("readiness") || effectiveSlug.includes("employability")
                    ? "Master Career Readiness & Employability across 14 progressive sub-courses. From professional communication, ATS resume engineering, and STAR behavioral interviews, to quantitative aptitude, AI productivity, salary negotiation, and a complete capstone portfolio."
                    : effectiveSlug.includes("entrepreneurship") || effectiveSlug.includes("business development") || effectiveSlug.includes("business-development")
                    ? "Master Entrepreneurship & Business Development across 17 progressive sub-courses. From ideation, customer validation, and financial modeling, to sales negotiation, venture funding, operations, and launching an investment-ready enterprise."
                    : effectiveSlug.includes("python")
                    ? "Master Python Programming & Problem Solving across 16 progressive sub-courses. From core syntax, CPython memory models, and data structures, to OOP, algorithms, file serialization, asyncio concurrency, FastAPI REST backends, and full-stack portfolio capstones."
                    : effectiveSlug.includes("communication")
                    ? "Master Communication & Professional Skills across 16 progressive sub-courses. From fundamentals, workplace English, and verbal fluency, to active listening, Minto executive writing, high-impact presentations, conflict resolution, and career capstone simulations."
                    : course?.description ||
                      "Master industry-standard skills across progressive sub-courses. Complete each sub-course sequentially to build job-ready expertise with cheatsheets, blueprints, and interactive assessments."}
                </p>

                {/* Stat pills cluster */}
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 shadow-xs">
                    <Icon name="book" size={15} className="text-blue-600" />
                    <span>{subCourses.length} Sub-Courses</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3 py-1.5 shadow-xs">
                    <Icon name="sheet" size={15} className="text-indigo-600" />
                    <span>{totalItemsCount} Lessons & Activities</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-amber-200/80 bg-amber-50/60 px-3 py-1.5 text-amber-900 shadow-xs">
                    <Icon name="clock" size={15} className="text-amber-600" />
                    <span className="font-bold">{formattedTotalCourseDuration} Total</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200/80 bg-emerald-50/60 px-3 py-1.5 text-emerald-800 shadow-xs">
                    <Icon name="certificate" size={15} className="text-emerald-600" />
                    <span>Master Track Certification</span>
                  </span>
                </div>
              </div>

              {/* Progress Ring Card */}
              <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-sm backdrop-blur-xs">
                <div
                  className="relative grid h-18 w-18 place-items-center rounded-full transition-all duration-500 shadow-xs"
                  style={{
                    background: `conic-gradient(#2563eb ${progressPct * 3.6}deg, #e2e8f0 ${progressPct * 3.6}deg)`,
                  }}
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white font-display text-sm font-extrabold text-blue-900 shadow-inner">
                    {progressPct}%
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Program Progress</p>
                  <p className="mt-0.5 font-display text-base font-extrabold text-slate-900">
                    {completedCount} <span className="text-xs font-medium text-slate-500">/ {totalItemsCount} completed</span>
                  </p>
                  <span
                    className={`mt-1.5 inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      progressPct >= 100
                        ? "bg-emerald-100 text-emerald-800"
                        : progressPct > 0
                        ? "bg-blue-100 text-blue-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {progressPct >= 100 ? "Track Completed!" : progressPct > 0 ? "In Progress" : "Get Started"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Sub-Courses Grid Section Header */}
          <section className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <Icon name="courses" size={20} className="text-blue-600" />
                <h2 className="font-display text-xl font-extrabold text-slate-900">
                  Program Sub-Courses
                </h2>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Click on any sub-course to view its lessons, practice questions, and graded assessments.
              </p>
            </div>

            {/* Sub-Course Cards Grid */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {subCourses.map((subCourse, idx) => {
                const unlocked = isCurriculumModuleUnlocked(idx, subCourses, completed);
                const items = subCourse.items;
                const doneCount = items.filter(it => completed.has(it.id)).length;
                const isAllDone = items.length > 0 && doneCount === items.length;
                const subCoursePct = items.length ? Math.round((doneCount * 100) / items.length) : 0;
                const tags = SUB_COURSE_TAGS[subCourse.id] || ["WEB", "DEV"];
                const duration = formatMinutesToHuman(getModuleTotalMinutes(subCourse));
                const prevSub = idx > 0 ? subCourses[idx - 1] : null;

                return (
                  <div
                    key={subCourse.id}
                    onClick={() => handleSubCourseClick(subCourse, idx)}
                    className={`group relative flex flex-col justify-between rounded-3xl border p-5 sm:p-6 shadow-xs transition-all duration-200 cursor-pointer ${
                      !unlocked
                        ? "border-slate-200/90 bg-slate-50/80 hover:border-amber-300 hover:shadow-md"
                        : "border-slate-200/90 bg-white hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
                    }`}
                  >
                    <div>
                      {/* Top Row: Icon + Status Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`grid h-12 w-12 place-items-center rounded-2xl transition-all shadow-xs ${
                            !unlocked
                              ? "bg-slate-200 text-slate-500"
                              : isAllDone
                              ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/25"
                              : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-500/20"
                          }`}
                        >
                          {!unlocked ? <Icon name="lock" size={20} /> : renderSubCourseIcon(subCourse.id)}
                        </span>

                        {/* Top-right Status Indicator */}
                        <div>
                          {isAllDone ? (
                            <span
                              className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-white shadow-sm"
                              title="Sub-course completed"
                            >
                              <Icon name="check" size={15} />
                            </span>
                          ) : !unlocked ? (
                            <span
                              className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800 shadow-xs"
                              title="Locked - click to preview outline"
                            >
                              <Icon name="lock" size={12} className="text-amber-600" /> Locked
                            </span>
                          ) : doneCount > 0 ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                              {doneCount}/{items.length} ({subCoursePct}%)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                              Ready
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Sub-course Number & Title */}
                      <div className="mt-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Sub-Course {idx + 1}
                        </span>
                        <h3 className={`mt-0.5 font-display text-base font-extrabold transition-colors line-clamp-1 ${
                          !unlocked ? "text-slate-700 group-hover:text-amber-800" : "text-slate-900 group-hover:text-blue-600"
                        }`}>
                          {cleanSubCourseTitle(subCourse.title)}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
                          {subCourse.description}
                        </p>

                        {!unlocked && prevSub && (
                          <div className="mt-2.5 flex items-center justify-between gap-1.5 rounded-xl border border-amber-200/80 bg-amber-50/70 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
                            <span className="flex items-center gap-1.5 truncate">
                              <Icon name="lock" size={12} className="shrink-0 text-amber-600" />
                              <span className="truncate">Finish Sub-Course {idx} ({cleanSubCourseTitle(prevSub.title)})</span>
                            </span>
                            <span className="shrink-0 text-[10px] font-bold text-amber-700 underline">Preview topics</span>
                          </div>
                        )}
                      </div>

                      {/* Meta: Topics count and duration */}
                      <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span>{items.length} Topics</span>
                        <span className="text-slate-300">·</span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Icon name="clock" size={12} className="text-amber-500" />
                          <span>{duration}</span>
                        </span>
                      </div>

                      {/* Tags / Pills */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {tags.map(tag => (
                          <span
                            key={tag}
                            className={`rounded-md border px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                              !unlocked
                                ? "border-slate-200 bg-slate-100/50 text-slate-400"
                                : "border-slate-200/80 bg-slate-100/80 text-slate-600"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Progress Bar / Locked Status */}
                    <div className="mt-5 border-t border-slate-100 pt-3">
                      {!unlocked ? (
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                          <span className="flex items-center gap-1.5 text-amber-700">
                            <Icon name="lock" size={12} /> Locked
                          </span>
                          <span className="text-[10px] font-medium text-slate-400">Complete prior course first</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                            <span>Progress</span>
                            <span className={isAllDone ? "text-emerald-600" : doneCount > 0 ? "text-blue-600" : ""}>
                              {subCoursePct}%
                            </span>
                          </div>
                          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full transition-all duration-300 ${
                                isAllDone
                                  ? "bg-emerald-500"
                                  : "bg-gradient-to-r from-blue-600 to-indigo-600"
                              }`}
                              style={{ width: `${subCoursePct}%` }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {!subCourses.length && (
              <Card className="!rounded-2xl !border-slate-200">
                <Empty t="Program sub-courses are being loaded." />
              </Card>
            )}
          </section>
        </main>

        {/* Sidebar: Certificate & Key Takeaways (Restored like before) */}
        <aside className="space-y-6 xl:sticky xl:top-24">
          {/* Certificate Card */}
          <Card className="!rounded-2xl !border-slate-200 !p-5 !shadow-sm">
            {certificateUnlocked ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Icon name="certificate" size={20} />
                  <h2 className="font-display font-bold text-slate-900">Course Certificate</h2>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700 shadow-sm">
                    <Icon name="unlock" size={26} />
                  </span>
                  <p className="mt-3 font-display text-base font-extrabold text-emerald-950">Certificate Unlocked!</p>
                  <p className="mt-1 text-xs text-emerald-800">
                    You have achieved {progressPct}% completion (required: {requiredPct}%).
                  </p>
                  <Link
                    to="/student/journey"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-800"
                  >
                    <Icon name="certificate" size={14} /> View Certificate
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="relative flex min-h-52 items-center justify-center overflow-hidden rounded-2xl border-2 border-slate-700 bg-[#1e293b] p-5 text-center text-white shadow-inner">
                  <div className="relative">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-violet-500/20 text-violet-300">
                      <Icon name="lock" size={24} />
                    </span>
                    <h2 className="mt-3 font-display text-base font-extrabold leading-tight">
                      Complete modules to<br />unlock certificate
                    </h2>
                    <p className="mt-1.5 text-xs text-slate-300">
                      {requiredPct}% progress required · {Math.max(0, requiredPct - progressPct)}% remaining
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600">Progress to unlock</span>
                  <span className="font-extrabold text-slate-900">{progressPct}% / {requiredPct}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                    style={{ width: `${Math.min(100, (progressPct / requiredPct) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Key Takeaways Card (Dynamically Tailored per Course) */}
          <Card className="!rounded-2xl !border-slate-200 !p-5 !shadow-sm">
            <h2 className="font-display font-bold text-slate-900">Key Takeaways</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {activeKeyTakeaways.leadText}
            </p>
            <div className="my-4 border-t border-slate-100" />
            <ul className="space-y-3 text-xs leading-5 text-slate-600">
              {activeKeyTakeaways.items.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <Icon name="check" size={15} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>

      {/* ========================================================================= */}
      {/* Sub-Course Details Drawer (Slide-out panel matching Reference Image 1) */}
      {/* ========================================================================= */}
      {selectedSubCourse && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            onClick={() => {
              setSelectedSubCourse(null);
              setSelectedSubCourseIndex(-1);
              setDrawerLockNotice(null);
            }}
          />

          {/* Slide-out Drawer Panel */}
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
            <div className="w-screen max-w-md sm:max-w-xl bg-white shadow-2xl flex flex-col transform transition-transform duration-300 animate-in slide-in-from-right rounded-l-3xl overflow-hidden">
              {/* Drawer Top Header (matching Image 1) */}
              <div className="border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl shadow-md ${
                      !isSelectedSubCourseUnlocked
                        ? "bg-slate-700 text-white shadow-slate-700/20"
                        : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-500/20"
                    }`}>
                      {!isSelectedSubCourseUnlocked ? <Icon name="lock" size={22} /> : renderSubCourseIcon(selectedSubCourse.id)}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          SUB-COURSE {selectedSubCourseIndex >= 0 ? selectedSubCourseIndex + 1 : ""}
                        </span>
                        {!isSelectedSubCourseUnlocked && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.2 text-[10px] font-bold text-amber-800">
                            <Icon name="lock" size={10} /> Locked
                          </span>
                        )}
                      </div>
                      <h2 className="font-display text-xl font-extrabold text-slate-900">
                        {cleanSubCourseTitle(selectedSubCourse.title)}
                      </h2>
                    </div>
                  </div>

                  {/* Close 'X' Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSubCourse(null);
                      setSelectedSubCourseIndex(-1);
                      setDrawerLockNotice(null);
                    }}
                    className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 transition shadow-xs cursor-pointer"
                    aria-label="Close drawer"
                  >
                    <Icon name="close" size={16} />
                  </button>
                </div>

                {/* Sub-course brief + progress summary in drawer */}
                <p className="mt-3 text-xs leading-relaxed text-slate-500">
                  {selectedSubCourse.description}
                </p>

                {/* Locked banner inside drawer if locked */}
                {!isSelectedSubCourseUnlocked && (
                  <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200/90 bg-amber-50/80 p-3.5 text-xs text-amber-900 shadow-xs">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-amber-500 text-white shadow-xs">
                      <Icon name="lock" size={15} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-extrabold text-amber-950">Sub-Course Locked</p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-amber-800">
                        {selectedSubCourseIndex > 0 ? (
                          <>
                            Complete all topics in <strong>Sub-Course {selectedSubCourseIndex} ({cleanSubCourseTitle(subCourses[selectedSubCourseIndex - 1]?.title || "")})</strong> first to unlock these lessons. You can browse all module outlines and topics below.
                          </>
                        ) : (
                          "Complete the prerequisite topics to unlock these lessons."
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {/* Inline Notice when clicking locked lesson */}
                {drawerLockNotice && (
                  <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-100/90 px-3 py-2 text-xs font-bold text-amber-900 animate-in fade-in">
                    <span className="flex items-center gap-1.5 truncate">
                      <Icon name="lock" size={13} className="shrink-0 text-amber-700" />
                      <span className="truncate">{drawerLockNotice}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setDrawerLockNotice(null)}
                      className="text-amber-700 hover:text-amber-950 font-extrabold text-xs ml-2 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-blue-700">
                    <Icon name="sheet" size={13} /> {selectedSubCourse.items.length} Topics & Activities
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-amber-800">
                    <Icon name="clock" size={13} className="text-amber-600" />
                    {formatMinutesToHuman(getModuleTotalMinutes(selectedSubCourse))}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-emerald-800">
                    <Icon name="check" size={13} className="text-emerald-600" />
                    {selectedSubCourse.items.filter(it => completed.has(it.id)).length} / {selectedSubCourse.items.length} Completed
                  </span>
                </div>
              </div>

              {/* Drawer Topics List: Hierarchical Modules & Course Assessment */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-slate-50/40">
                {selectedSubCourse.modules && selectedSubCourse.modules.length > 0 ? (
                  <>
                    {/* Header Controls: Expand / Collapse All */}
                    <div className="flex items-center justify-between gap-2 px-1 pb-1">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        {selectedSubCourse.modules.length} Modules in this Sub-Course
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={expandAllDrawerModules}
                          className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                        >
                          Expand All
                        </button>
                        <span className="text-slate-300">·</span>
                        <button
                          type="button"
                          onClick={collapseAllDrawerModules}
                          className="text-[11px] font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                        >
                          Collapse All
                        </button>
                      </div>
                    </div>

                    {/* Render Each Module in the Sub-Course with Accordion Dropdown */}
                    {selectedSubCourse.modules.map((mod, modIdx) => {
                      const modCompletedCount = mod.items.filter(it => completed.has(it.id)).length;
                      const isModDone = mod.items.length > 0 && modCompletedCount === mod.items.length;
                      const isOpen = !!openDrawerModules[mod.id];

                      return (
                        <div key={mod.id} className="space-y-2">
                          {/* Module Header Card (Dropdown Trigger) */}
                          <div
                            onClick={() => toggleDrawerModule(mod.id)}
                            className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/90 transition-all cursor-pointer shadow-2xs select-none group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-blue-600 text-[11px] font-black text-white shadow-xs group-hover:scale-105 transition-transform">
                                {modIdx + 1}
                              </span>
                              <div className="min-w-0">
                                <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">
                                  MODULE {modIdx + 1} · {mod.items.length} TOPICS
                                </span>
                                <h3 className="font-display text-xs font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                                  {cleanModuleTitle(mod.title)}
                                </h3>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                                isModDone ? "bg-emerald-100 text-emerald-800" : "bg-white text-slate-600 border border-slate-200"
                              }`}>
                                {modCompletedCount}/{mod.items.length} Done
                              </span>
                              <span className="grid h-6 w-6 place-items-center text-slate-400 group-hover:text-slate-600 transition-transform">
                                <Icon
                                  name="chevronDown"
                                  size={14}
                                  className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                />
                              </span>
                            </div>
                          </div>

                          {/* Items inside this module (Collapsible) */}
                          {isOpen && (
                            <div className="space-y-2 pl-2 border-l-2 border-blue-500/20 ml-3 pt-1">
                            {mod.items.map((item, itemIdx) => {
                              const isDone = completed.has(item.id);

                              let itemBadge = { label: "LESSON", color: "text-blue-600 bg-blue-50 border-blue-200" };
                              if (item.isModuleQuiz) {
                                itemBadge = { label: "MODULE MCQS", color: "text-purple-700 bg-purple-50 border-purple-200" };
                              } else if (item.isModuleAssessment) {
                                itemBadge = { label: "MODULE ASSESSMENT", color: "text-amber-800 bg-amber-50 border-amber-200" };
                              } else if (item.type === "quiz") {
                                itemBadge = { label: "EXAM", color: "text-purple-700 bg-purple-50 border-purple-200" };
                              } else if (item.type === "assignment") {
                                itemBadge = { label: "LAB PROJECT", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
                              }

                              return (
                                <div
                                  key={item.id}
                                  onClick={() => {
                                    if (!isSelectedSubCourseUnlocked) {
                                      setDrawerLockNotice(
                                        `🔒 Lesson locked. Complete Sub-Course ${selectedSubCourseIndex} (${cleanSubCourseTitle(subCourses[selectedSubCourseIndex - 1]?.title || "")}) first to unlock.`
                                      );
                                      return;
                                    }
                                    setSelectedSubCourse(null);
                                    setSelectedSubCourseIndex(-1);
                                    window.scrollTo(0, 0);
                                    navigate(`/student/course/${effectiveEid}/lesson/${item.id}`);
                                  }}
                                  className={`group flex items-center justify-between gap-3 rounded-xl border p-3.5 shadow-xs transition-all ${
                                    !isSelectedSubCourseUnlocked
                                      ? "border-slate-200/70 bg-slate-100/60 opacity-80 cursor-not-allowed select-none"
                                      : "border-slate-200/80 bg-white hover:border-blue-400 hover:shadow-md cursor-pointer"
                                  }`}
                                >
                                  <div className="flex items-center gap-3 min-w-0 flex-1">
                                    {!isSelectedSubCourseUnlocked ? (
                                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-300 bg-slate-200 text-slate-500 shadow-xs">
                                        <Icon name="lock" size={13} />
                                      </span>
                                    ) : isDone ? (
                                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-white shadow-xs">
                                        <Icon name="check" size={14} />
                                      </span>
                                    ) : (
                                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-50 text-xs font-bold text-slate-600 group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shadow-xs">
                                        {itemIdx + 1}
                                      </span>
                                    )}

                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className={`inline-block rounded px-1.5 py-0.2 border text-[9px] font-black uppercase tracking-wider ${
                                          !isSelectedSubCourseUnlocked
                                            ? "bg-slate-200 text-slate-600 border-slate-300"
                                            : itemBadge.color
                                        }`}>
                                          {itemBadge.label}
                                        </span>
                                        {item.questions && item.questions.length > 0 && (
                                          <span className="text-[10px] text-slate-400 font-medium">
                                            {item.questions.length} Questions
                                          </span>
                                        )}
                                      </div>
                                      <span className={`mt-0.5 block font-display text-xs font-bold truncate ${
                                        !isSelectedSubCourseUnlocked
                                          ? "text-slate-600"
                                          : "text-slate-800 group-hover:text-blue-600 transition-colors"
                                      }`}>
                                        {cleanLessonHeading(item.title)}
                                      </span>
                                      <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                                        <span className="flex items-center gap-1">
                                          <Icon name="clock" size={10} /> {item.duration}
                                        </span>
                                        {isDone && (
                                          <>
                                            <span>·</span>
                                            <span className="font-bold text-emerald-600">Completed</span>
                                          </>
                                        )}
                                        {!isSelectedSubCourseUnlocked && (
                                          <>
                                            <span>·</span>
                                            <span className="font-bold text-amber-700">Locked</span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${
                                    !isSelectedSubCourseUnlocked ? "text-slate-400" : "text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all"
                                  }`}>
                                    {!isSelectedSubCourseUnlocked ? <Icon name="lock" size={13} /> : <Icon name="chevronRight" size={16} />}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        </div>
                      );
                    })}

                    {/* Sub-Course Final Assessment Section */}
                    {(selectedSubCourse.courseAssessment || selectedSubCourse.courseProject) && (
                      <div className="mt-6 pt-4 border-t-2 border-slate-200 space-y-3">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-50 to-purple-50 border border-amber-200/80">
                          <Icon name="sparkle" size={16} className="text-amber-600" />
                          <div>
                            <span className="block text-[10px] font-black uppercase tracking-widest text-amber-700">
                              FINAL CAPSTONE
                            </span>
                            <h3 className="font-display text-xs font-bold text-slate-900">
                              Final Course Assessment & Certification
                            </h3>
                          </div>
                        </div>

                        <div className="space-y-2 pl-2 border-l-2 border-amber-500/40 ml-3">
                          {[selectedSubCourse.courseAssessment, selectedSubCourse.courseProject].filter(Boolean).map((assessmentItem, aIdx) => {
                            if (!assessmentItem) return null;
                            const isDone = completed.has(assessmentItem.id);

                            return (
                              <div
                                key={assessmentItem.id}
                                onClick={() => {
                                  if (!isSelectedSubCourseUnlocked) {
                                    setDrawerLockNotice(
                                      `🔒 Assessment locked. Complete Sub-Course ${selectedSubCourseIndex} (${cleanSubCourseTitle(subCourses[selectedSubCourseIndex - 1]?.title || "")}) first to unlock.`
                                    );
                                    return;
                                  }
                                  setSelectedSubCourse(null);
                                  setSelectedSubCourseIndex(-1);
                                  window.scrollTo(0, 0);
                                  navigate(`/student/course/${effectiveEid}/lesson/${assessmentItem.id}`);
                                }}
                                className={`group flex items-center justify-between gap-3 rounded-xl border p-3.5 shadow-xs transition-all ${
                                  !isSelectedSubCourseUnlocked
                                    ? "border-slate-200/70 bg-slate-100/60 opacity-80 cursor-not-allowed select-none"
                                    : "border-amber-200/80 bg-white hover:border-amber-400 hover:shadow-md cursor-pointer"
                                }`}
                              >
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  {!isSelectedSubCourseUnlocked ? (
                                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-300 bg-slate-200 text-slate-500 shadow-xs">
                                      <Icon name="lock" size={13} />
                                    </span>
                                  ) : isDone ? (
                                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-white shadow-xs">
                                      <Icon name="check" size={14} />
                                    </span>
                                  ) : (
                                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-amber-300 bg-amber-50 text-xs font-black text-amber-700 shadow-xs">
                                      ★
                                    </span>
                                  )}

                                  <div className="min-w-0 flex-1">
                                    <span className="inline-block rounded px-1.5 py-0.2 border text-[9px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 border-amber-200">
                                      {assessmentItem.type === "quiz" ? "COURSE FINAL EXAM" : "CAPSTONE PROJECT"}
                                    </span>
                                    <span className="mt-0.5 block font-display text-xs font-bold text-slate-800 group-hover:text-amber-700 transition-colors truncate">
                                      {cleanLessonHeading(assessmentItem.title)}
                                    </span>
                                    <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                                      <span className="flex items-center gap-1">
                                        <Icon name="clock" size={10} /> {assessmentItem.duration}
                                      </span>
                                      {assessmentItem.questions && (
                                        <>
                                          <span>·</span>
                                          <span>{assessmentItem.questions.length} Questions</span>
                                        </>
                                      )}
                                      {isDone && (
                                        <>
                                          <span>·</span>
                                          <span className="font-bold text-emerald-600">Completed</span>
                                        </>
                                      )}
                                      {!isSelectedSubCourseUnlocked && (
                                        <>
                                          <span>·</span>
                                          <span className="font-bold text-amber-700">Locked</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${
                                  !isSelectedSubCourseUnlocked ? "text-slate-400" : "text-amber-500 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all"
                                }`}>
                                  {!isSelectedSubCourseUnlocked ? <Icon name="lock" size={13} /> : <Icon name="chevronRight" size={16} />}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* Flat Fallback */
                  selectedSubCourse.items.map((item, itemIdx) => {
                    const isDone = completed.has(item.id);

                    let itemLabel = "TOPIC";
                    if (item.type === "quiz") itemLabel = "SUB-COURSE EXAM";
                    else if (item.type === "assignment") itemLabel = "GRADED PROJECT";
                    else if (item.type === "practice") itemLabel = "PRACTICE LAB";

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (!isSelectedSubCourseUnlocked) {
                            setDrawerLockNotice(
                              `🔒 Lesson locked. Complete Sub-Course ${selectedSubCourseIndex} (${cleanSubCourseTitle(subCourses[selectedSubCourseIndex - 1]?.title || "")}) first to unlock.`
                            );
                            return;
                          }
                          setSelectedSubCourse(null);
                          setSelectedSubCourseIndex(-1);
                          window.scrollTo(0, 0);
                          navigate(`/student/course/${effectiveEid}/lesson/${item.id}`);
                        }}
                        className={`group flex items-center justify-between gap-3.5 rounded-2xl border p-4 shadow-xs transition-all ${
                          !isSelectedSubCourseUnlocked
                            ? "border-slate-200/70 bg-slate-100/60 opacity-80 cursor-not-allowed select-none"
                            : "border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-md cursor-pointer"
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          {!isSelectedSubCourseUnlocked ? (
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-300 bg-slate-200 text-slate-500 shadow-xs">
                              <Icon name="lock" size={15} />
                            </span>
                          ) : isDone ? (
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500 text-white shadow-xs">
                              <Icon name="check" size={16} />
                            </span>
                          ) : (
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-100 text-xs font-bold text-slate-600 group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shadow-xs">
                              {itemIdx + 1}
                            </span>
                          )}

                          <div className="min-w-0 flex-1">
                            <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                              {itemLabel}
                            </span>
                            <span className={`mt-0.5 block font-display text-sm font-bold truncate ${
                              !isSelectedSubCourseUnlocked ? "text-slate-600" : "text-slate-800 group-hover:text-blue-600 transition-colors"
                            }`}>
                              {cleanLessonHeading(item.title)}
                            </span>
                            <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                              <span className="flex items-center gap-1">
                                <Icon name="clock" size={11} /> {item.duration}
                              </span>
                              {isDone && (
                                <>
                                  <span>·</span>
                                  <span className="font-bold text-emerald-600">Completed</span>
                                </>
                              )}
                              {!isSelectedSubCourseUnlocked && (
                                <>
                                  <span>·</span>
                                  <span className="font-bold text-amber-700">Locked</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${
                          !isSelectedSubCourseUnlocked ? "text-slate-400" : "text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all"
                        }`}>
                          {!isSelectedSubCourseUnlocked ? <Icon name="lock" size={15} /> : <Icon name="chevronRight" size={18} />}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer */}
              <div className="border-t border-slate-200/80 bg-white p-4 sm:p-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubCourse(null);
                    setSelectedSubCourseIndex(-1);
                    setDrawerLockNotice(null);
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer"
                >
                  Close
                </button>

                {!isSelectedSubCourseUnlocked ? (
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-100 border border-slate-300 px-5 py-2.5 text-xs font-bold text-slate-500 cursor-not-allowed shadow-none"
                  >
                    <Icon name="lock" size={14} className="text-slate-400" />
                    <span>Sub-Course Locked</span>
                  </button>
                ) : (
                  (() => {
                    const firstIncomplete =
                      selectedSubCourse.items.find(it => !completed.has(it.id)) || selectedSubCourse.items[0];
                    return (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSubCourse(null);
                          setSelectedSubCourseIndex(-1);
                          window.scrollTo(0, 0);
                          if (firstIncomplete) {
                            navigate(`/student/course/${effectiveEid}/lesson/${firstIncomplete.id}`);
                          }
                        }}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition cursor-pointer"
                      >
                        <span>
                          {selectedSubCourse.items.some(it => completed.has(it.id))
                            ? "Continue Sub-Course"
                            : "Start Sub-Course"}
                        </span>
                        <Icon name="arrow" size={14} />
                      </button>
                    );
                  })()
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
