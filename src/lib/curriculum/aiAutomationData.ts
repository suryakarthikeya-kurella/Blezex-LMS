import { CurriculumSubCourse, CurriculumSubModule, CurriculumItem } from "../curriculumTypes";

// =========================================================================
// AI AUTOMATION CURRICULUM
// 6 Sequential Sub-Courses with Deep Lessons, Assessments & Capstone
// =========================================================================

// --- SUB-COURSE 1: LLM Foundations & Prompt Engineering ---
const aiMod1_1: CurriculumSubModule = {
  id: "mod-ai-1-1",
  subCourseId: "subcourse-ai-foundations",
  title: "LLM Architectures & Prompt Design",
  position: 1,
  duration: "3 hours",
  items: [
    {
      id: "ai-prompt-001",
      moduleId: "mod-ai-1-1",
      moduleTitle: "LLM Architectures & Prompt Design",
      modulePosition: 1,
      subCourseId: "subcourse-ai-foundations",
      subCourseTitle: "LLM Foundations & Prompt Engineering",
      subCoursePosition: 1,
      title: "Core Mechanics of Large Language Models & Tokenization",
      duration: "35 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "How LLMs Process Text: Tokens, Attention & Probability Distributions",
      contentDescription: "Understand the transformer architecture foundation, how text converts into token IDs, context window limitations, and why next-token prediction governs generative AI behavior.",
      sections: [
        {
          title: "Definition and Architecture Fundamentals",
          explanation: "Large Language Models (LLMs) are autoregressive neural networks built on the Transformer architecture (Vaswani et al., 2017). Rather than processing text as characters or words, models break language into tokens—sub-word chunks averaging 3 to 4 characters in English.",
          bullets: [
            "Tokens are numeric IDs mapped to fixed vocabulary dictionaries (e.g., 100k tokens in cl100k_base or o200k_base).",
            "Self-attention allows the model to calculate dynamic relationship weights between all tokens within the context window.",
            "Inference is probabilistic: at each step, the model computes a softmax distribution over its entire vocabulary to predict token N+1.",
            "Context window limits govern total input plus generated output memory (e.g., 128k in GPT-4o, 1M+ in Gemini 1.5 Pro)."
          ],
          table: {
            headers: ["Concept", "Mechanism", "Impact on Automation"],
            rows: [
              ["Tokenization", "Sub-word BPE encoding", "Billing metric and prompt density bottleneck"],
              ["Context Window", "KV Cache memory limit", "Maximum input prompt + history document capacity"],
              ["Autoregression", "Sequential token generation", "Latency is linear with output token count"],
              ["Temperature", "Logit divisor before softmax", "Controls determinism vs creative variance"]
            ]
          }
        },
        {
          title: "Token Inspection & Cost Estimation in Python",
          explanation: "Use tiktoken to calculate token counts accurately before dispatching API calls to prevent context window overflow and optimize operational cost.",
          codeSnippet: {
            language: "python",
            filename: "token_counter.py",
            code: `import tiktoken

def inspect_prompt(text: str, model_name: str = "gpt-4o") -> dict:
    # Load tokenizer for the specified target model
    encoding = tiktoken.encoding_for_model(model_name)
    tokens = encoding.encode(text)
    
    return {
        "model": model_name,
        "token_count": len(tokens),
        "character_count": len(text),
        "tokens_sample": tokens[:10],
        "estimated_input_cost_usd": round(len(tokens) * 0.000005, 6) # e.g. $5 per 1M tokens
    }

prompt = "Analyze this customer support ticket and extract sentiment, root cause, and priority."
print(inspect_prompt(prompt))`
          }
        },
        {
          title: "Prompt Engineering Protocols: System vs User Prompts",
          explanation: "Modern LLMs delineate roles to separate operational constraints from untrusted user input, defending against prompt injection and preserving output structure.",
          bullets: [
            "System Prompt: Defines persona, rigid constraints, output format rules, and failure fallbacks.",
            "User Prompt: Contains dynamic input data, customer inputs, or raw payload text.",
            "Few-Shot Exemplars: Demonstrating 2-3 input/output pairs in the system prompt increases task accuracy above 95% compared to zero-shot."
          ]
        }
      ],
      questions: [
        {
          id: "q-ai-001",
          prompt: "Why is estimating token counts essential before sending large payloads into automated LLM pipelines?",
          options: [
            { id: "a", label: "Because LLMs crash if they receive any payload greater than 500 characters" },
            { id: "b", label: "To prevent context window overflow exceptions and manage API execution costs" },
            { id: "c", label: "Because token counts alter the language model's base training weights" },
            { id: "d", label: "Because tokens determine whether an LLM runs locally or in the cloud" }
          ],
          correctIndex: 1,
          explanation: "Context windows have hard limits (e.g., 8k, 32k, 128k tokens). Counting tokens upfront ensures payloads fit within budget and prevents API rate limit or context truncation failures."
        },
        {
          id: "q-ai-002",
          prompt: "What is the primary role of the 'system' message in chat completion architectures?",
          options: [
            { id: "a", label: "To provide the user's password to the model" },
            { id: "b", label: "To set operational guidelines, persona, response formatting rules, and safety boundaries" },
            { id: "c", label: "To compile the Python code into machine instructions" },
            { id: "d", label: "To reset the LLM's neural network to factory settings" }
          ],
          correctIndex: 1,
          explanation: "The system message provides behavioral instructions, role personas, and formatting constraints that govern how the model interprets subsequent user and assistant messages."
        }
      ]
    },
    {
      id: "ai-prompt-002",
      moduleId: "mod-ai-1-1",
      moduleTitle: "LLM Architectures & Prompt Design",
      modulePosition: 1,
      subCourseId: "subcourse-ai-foundations",
      subCourseTitle: "LLM Foundations & Prompt Engineering",
      subCoursePosition: 1,
      title: "Advanced Prompt Frameworks: Chain-of-Thought & ReAct",
      duration: "40 mins",
      type: "cheatsheet",
      position: 2,
      contentHeading: "Reasoning Architecture: Zero-Shot CoT, Few-Shot Demonstrations & Output Control",
      contentDescription: "Master Chain-of-Thought (CoT), step-by-step reasoning decomposition, role prompting, and how to eliminate hallucination in complex analytical workflows.",
      sections: [
        {
          title: "Decomposition and Reasoning Chains",
          explanation: "When faced with multi-step reasoning, directly demanding a final answer forces the LLM to commit to a probability path too early. By instructing the model to think step-by-step, we leverage intermediate tokens to calculate sound conclusions.",
          bullets: [
            "Zero-Shot CoT: Appending 'Think step-by-step before reaching your final conclusion' generates an internal scratchpad.",
            "Self-Consistency: Generating multiple CoT paths at temperature 0.7 and taking the majority consensus answer.",
            "Negative Constraints: Explicitly stating what the model MUST NOT do (e.g. 'Never extrapolate missing dates; output null if absent')."
          ]
        },
        {
          title: "Production System Prompt Architecture",
          explanation: "Standard enterprise prompt structure using Markdown delimiters, role definition, and strict output contracts.",
          codeSnippet: {
            language: "markdown",
            filename: "system_prompt_template.md",
            code: `# ROLE
You are an Enterprise Financial Extraction Specialist. Your duty is to parse raw invoice text into structured data.

# INSTRUCTIONS
1. Read the provided invoice text carefully.
2. Verify that line item quantities multiplied by unit prices equal the line totals.
3. Identify the vendor tax identification number (EIN / VAT).
4. Output your analysis in the prescribed JSON format ONLY.

# CONSTRAINTS
- Never guess or calculate tax if not explicitly printed on the document.
- If a value is missing, set its JSON key to null.
- Do NOT include markdown code fences (\`\`\`json) or conversational preamble in your final output.`
          }
        }
      ],
      questions: [
        {
          id: "q-ai-003",
          prompt: "How does Chain-of-Thought (CoT) prompting mathematically improve complex problem-solving in transformers?",
          options: [
            { id: "a", label: "It fine-tunes model weights on the GPU in real-time" },
            { id: "b", label: "It generates intermediate tokens that provide subsequent attention layers with contextual reasoning steps" },
            { id: "c", label: "It doubles the maximum context window of the model" },
            { id: "d", label: "It switches the model from FP16 to FP32 precision" }
          ],
          correctIndex: 1,
          explanation: "Because transformers generate one token at a time autoregressively, intermediate reasoning tokens become part of the preceding context for subsequent tokens, dramatically boosting multi-step accuracy."
        }
      ]
    }
  ]
};

const aiMod1_2: CurriculumSubModule = {
  id: "mod-ai-1-2",
  subCourseId: "subcourse-ai-foundations",
  title: "Structured Outputs & Function Schema Enforcement",
  position: 2,
  duration: "2.5 hours",
  items: [
    {
      id: "ai-prompt-003",
      moduleId: "mod-ai-1-2",
      moduleTitle: "Structured Outputs & Function Schema Enforcement",
      modulePosition: 2,
      subCourseId: "subcourse-ai-foundations",
      subCourseTitle: "LLM Foundations & Prompt Engineering",
      subCoursePosition: 1,
      title: "Guaranteed JSON Schema & Pydantic Validation",
      duration: "35 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Deterministic Structured Outputs with Strict JSON Schemas",
      contentDescription: "Harness OpenAI & Anthropic structured outputs to guarantee 100% syntactically valid JSON matching your exact Pydantic and JSON Schema definitions.",
      sections: [
        {
          title: "The Problem of Hallucinated JSON",
          explanation: "Prompting an LLM to 'output JSON' often results in invalid syntax, missing required fields, or trailing markdown fences. Modern models support constrained decoding (grammar sampling) where the model's output logits are restricted to valid schema transitions.",
          codeSnippet: {
            language: "python",
            filename: "structured_output.py",
            code: `from pydantic import BaseModel, Field
from openai import OpenAI
from typing import List, Optional

class TicketTriage(BaseModel):
    ticket_id: str
    sentiment: str = Field(description="Must be 'positive', 'neutral', or 'negative'")
    urgency_score: int = Field(ge=1, le=5, description="1 is low, 5 is critical outage")
    tags: List[str]
    suggested_response: str
    escalation_required: bool

client = OpenAI()

response = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[
        {"role": "system", "content": "Extract and triage customer support tickets."},
        {"role": "user", "content": "Ticket #9481: Our production server is down and throwing 502 errors! We are losing revenue!"}
    ],
    response_format=TicketTriage
)

triage_result: TicketTriage = response.choices[0].message.parsed
print(f"Urgency: {triage_result.urgency_score}/5 | Escalate: {triage_result.escalation_required}")`
          }
        }
      ],
      questions: [
        {
          id: "q-ai-004",
          prompt: "What is the primary advantage of OpenAI's Structured Outputs feature over standard JSON mode prompting?",
          options: [
            { id: "a", label: "It makes the model respond in binary instead of ASCII" },
            { id: "b", label: "It uses constrained grammar decoding to guarantee 100% schema conformance with no missing required fields" },
            { id: "c", label: "It bypasses the need for an API key" },
            { id: "d", label: "It eliminates all token costs" }
          ],
          correctIndex: 1,
          explanation: "Constrained grammar decoding masks out invalid tokens during sampling, mathematically ensuring that the output string strictly obeys the target JSON Schema."
        }
      ]
    },
    {
      id: "ai-prompt-quiz-1",
      moduleId: "mod-ai-1-2",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 2,
      subCourseId: "subcourse-ai-foundations",
      subCourseTitle: "LLM Foundations & Prompt Engineering",
      subCoursePosition: 1,
      title: "Knowledge Assessment: Prompt Engineering & Schema Enforcement",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: LLM Architecture, Prompt Optimization & Structured Outputs",
      contentDescription: "Evaluate your mastery of prompt structures, system prompts, token efficiency, few-shot conditioning, and constrained JSON generation.",
      questions: [
        {
          id: "q-ai-exam-1",
          prompt: "Which parameter controls the randomness of next-token selection by scaling logits prior to the softmax calculation?",
          options: [
            { id: "a", label: "frequency_penalty" },
            { id: "b", label: "temperature" },
            { id: "c", label: "max_tokens" },
            { id: "d", label: "presence_penalty" }
          ],
          correctIndex: 1,
          explanation: "Temperature scales the logits before the softmax function; temperature=0 makes the output deterministic (greedy sampling), while higher temperatures flatten the probability curve."
        },
        {
          id: "q-ai-exam-2",
          prompt: "What is Prompt Injection, and what is the best architectural mitigation?",
          options: [
            { id: "a", label: "When Python crashes due to memory leaks; restart the server" },
            { id: "b", label: "When untrusted user input overrides system instructions; mitigated with strict role separation, structured outputs, and input sanitization" },
            { id: "c", label: "When tokens exceed the context window; increase max_tokens" },
            { id: "d", label: "When API keys are exposed on GitHub; revoke the token" }
          ],
          correctIndex: 1,
          explanation: "Prompt injection occurs when untrusted input hijacks the instructions of the LLM. Mitigation requires role separation, delimiter boundaries, guardrails, and programmatic schema validation."
        }
      ]
    }
  ]
};

export const aiSubCourse1: CurriculumSubCourse = {
  id: "subcourse-ai-foundations",
  title: "LLM Foundations & Prompt Engineering",
  position: 1,
  duration: "5.5 hours",
  description: "Master LLM architectures, tokenization mechanics, Chain-of-Thought prompting, zero/few-shot exemplars, and strict Pydantic JSON schema generation.",
  modules: [aiMod1_1, aiMod1_2],
  items: [...aiMod1_1.items, ...aiMod1_2.items]
};

// --- SUB-COURSE 2: Python for AI & API Integrations ---
const aiMod2_1: CurriculumSubModule = {
  id: "mod-ai-2-1",
  subCourseId: "subcourse-ai-python",
  title: "SDK Clients, Async Pipelines & Streaming",
  position: 1,
  duration: "4 hours",
  items: [
    {
      id: "ai-py-001",
      moduleId: "mod-ai-2-1",
      moduleTitle: "SDK Clients, Async Pipelines & Streaming",
      modulePosition: 1,
      subCourseId: "subcourse-ai-python",
      subCourseTitle: "Python for AI & API Integrations",
      subCoursePosition: 2,
      title: "Building Production API Clients with Resilient Retries",
      duration: "40 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "High-Throughput AI Integrations with Exponential Backoff & Streaming",
      contentDescription: "Build asynchronous Python pipelines connecting OpenAI, Anthropic, and Gemini SDKs with Tenacity retries, streaming response listeners, and token telemetry.",
      sections: [
        {
          title: "Handling Rate Limits & Transient Failures",
          explanation: "Production AI systems inevitably encounter HTTP 429 (Rate Limit Exceeded) and HTTP 503 (Server Overloaded) errors. Using exponential backoff with jitter prevents thundering herd problems.",
          codeSnippet: {
            language: "python",
            filename: "resilient_client.py",
            code: `import asyncio
from tenacity import retry, wait_random_exponential, stop_after_attempt, retry_if_exception_type
from openai import AsyncOpenAI, RateLimitError, APIConnectionError

client = AsyncOpenAI()

@retry(
    wait=wait_random_exponential(min=1, max=60),
    stop=stop_after_attempt(5),
    retry=retry_if_exception_type((RateLimitError, APIConnectionError))
)
async def fetch_summary_stream(document_text: str):
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a concise executive summarizer."},
            {"role": "user", "content": document_text}
        ],
        stream=True
    )
    async for chunk in response:
        delta = chunk.choices[0].delta.content or ""
        print(delta, end="", flush=True)

# asyncio.run(fetch_summary_stream("Quarterly financial report content..."))`
          }
        }
      ],
      questions: [
        {
          id: "q-ai-py-1",
          prompt: "Why is streaming (Server-Sent Events) preferred in user-facing conversational AI applications?",
          options: [
            { id: "a", label: "It lowers the cost per token by 50%" },
            { id: "b", label: "It dramatically reduces Time To First Token (TTFT), creating an instant, responsive user experience" },
            { id: "c", label: "It automatically saves responses into PostgreSQL" },
            { id: "d", label: "It eliminates the need for async Python" }
          ],
          correctIndex: 1,
          explanation: "Streaming sends tokens as they are calculated on the GPU, dropping the perceived latency (TTFT) from 10 seconds down to a few hundred milliseconds."
        }
      ]
    },
    {
      id: "ai-py-quiz-1",
      moduleId: "mod-ai-2-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-ai-python",
      subCourseTitle: "Python for AI & API Integrations",
      subCoursePosition: 2,
      title: "Sub-Course Assessment: Python AI Pipeline Architecture",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Resilient Python AI Engineering",
      contentDescription: "Evaluate your proficiency in async Python SDK operations, error recovery, token consumption monitoring, and real-time streaming implementations.",
      questions: [
        {
          id: "q-ai-py-2",
          prompt: "What does 'exponential backoff with jitter' accomplish when an LLM provider returns a 429 Too Many Requests status?",
          options: [
            { id: "a", label: "It closes the socket connection permanently" },
            { id: "b", label: "It progressively increases retry wait times while introducing random variation to prevent client request synchronization" },
            { id: "c", label: "It switches the model from GPT-4o to Llama 3" },
            { id: "d", label: "It clears the local cache" }
          ],
          correctIndex: 1,
          explanation: "Progressively increasing the wait interval with random jitter prevents all worker threads from retrying simultaneously at exact intervals, protecting both client and provider."
        }
      ]
    }
  ]
};

export const aiSubCourse2: CurriculumSubCourse = {
  id: "subcourse-ai-python",
  title: "Python for AI & API Integrations",
  position: 2,
  duration: "4.5 hours",
  description: "Connect Python to OpenAI, Anthropic, and Gemini SDKs with asynchronous pipelines, streaming listeners, token metrics, and production retry architectures.",
  modules: [aiMod2_1],
  items: [...aiMod2_1.items]
};

// --- SUB-COURSE 3: Vector Databases & RAG Architectures ---
const aiMod3_1: CurriculumSubModule = {
  id: "mod-ai-3-1",
  subCourseId: "subcourse-ai-rag",
  title: "Embeddings, Chunking & Retrieval-Augmented Generation",
  position: 1,
  duration: "5 hours",
  items: [
    {
      id: "ai-rag-001",
      moduleId: "mod-ai-3-1",
      moduleTitle: "Embeddings, Chunking & Retrieval-Augmented Generation",
      modulePosition: 1,
      subCourseId: "subcourse-ai-rag",
      subCourseTitle: "Vector Databases & RAG Architectures",
      subCoursePosition: 3,
      title: "Semantic Search, Chunking Strategies & Vector Indexing",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Designing High-Precision Retrieval-Augmented Generation (RAG) Systems",
      contentDescription: "Learn how vector embeddings represent semantic meaning in multi-dimensional space, document chunking techniques, cosine similarity, and vector databases like Chroma, Pinecone, and pgvector.",
      sections: [
        {
          title: "The RAG Architecture Lifecycle",
          explanation: "RAG connects proprietary enterprise data to LLMs without fine-tuning. The process involves Document Ingestion -> Chunking -> Vector Embedding -> Vector Database Storage -> User Query Vectorization -> Top-K Nearest Neighbor Retrieval -> Context Injection into Prompt.",
          bullets: [
            "Embeddings: High-dimensional floating-point vectors (e.g. 1536 dims for text-embedding-3-small, 3072 dims for text-embedding-3-large).",
            "Chunking Strategies: Fixed-size with overlap (e.g., 500 tokens with 50-token overlap), recursive character splitting, or semantic chunking.",
            "Distance Metrics: Cosine Similarity, Dot Product, or Euclidean Distance (L2).",
            "pgvector & Pinecone: Index types such as HNSW (Hierarchical Navigable Small World) and IVFFlat for sub-millisecond approximate nearest neighbor (ANN) search."
          ]
        },
        {
          title: "Complete RAG Pipeline Implementation in Python",
          explanation: "Ingesting text, generating embeddings, computing cosine similarity, and assembling grounded prompt context.",
          codeSnippet: {
            language: "python",
            filename: "rag_engine.py",
            code: `import numpy as np
from openai import OpenAI

client = OpenAI()

def get_embedding(text: str, model: str = "text-embedding-3-small") -> list[float]:
    res = client.embeddings.create(input=[text], model=model)
    return res.data[0].embedding

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# 1. Knowledge Base
documents = [
    {"id": "doc_1", "text": "BlezeX refund policy allows refunds within 14 days of enrollment if course progress is under 20%."},
    {"id": "doc_2", "text": "BlezeX certificates are issued automatically when a student attains 80% or greater progress."}
]

for doc in documents:
    doc["vector"] = get_embedding(doc["text"])

# 2. Query Retrieval
query = "Can I get a refund after 10 days if I have only completed 5%?"
query_vector = get_embedding(query)

# Rank documents by cosine similarity
ranked = sorted(documents, key=lambda d: cosine_similarity(query_vector, d["vector"]), reverse=True)
best_match = ranked[0]["text"]

# 3. Grounded Synthesis
prompt = f"""Use ONLY the following context to answer the question:
Context: {best_match}
Question: {query}"""

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": prompt}]
)
print("Answer:", response.choices[0].message.content)`
          }
        }
      ],
      questions: [
        {
          id: "q-ai-rag-1",
          prompt: "What is the primary danger of using excessively large chunk sizes (e.g., 4000 tokens) in a vector retrieval pipeline?",
          options: [
            { id: "a", label: "The database will refuse to store floats" },
            { id: "b", label: "Semantic precision dilutes, making similarity search less accurate, while flooding the context window with irrelevant noise" },
            { id: "c", label: "The text will be converted to uppercase automatically" },
            { id: "d", label: "Vector embeddings can only be computed on 10 words or fewer" }
          ],
          correctIndex: 1,
          explanation: "Large chunk sizes average out distinct semantic concepts across too much text, causing the embedding vector to be generic and diluting retrieval precision."
        }
      ]
    },
    {
      id: "ai-rag-quiz-1",
      moduleId: "mod-ai-3-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-ai-rag",
      subCourseTitle: "Vector Databases & RAG Architectures",
      subCoursePosition: 3,
      title: "Sub-Course Assessment: Vector Databases & RAG Systems",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Vector Architecture & Enterprise Retrieval",
      contentDescription: "Test your understanding of semantic vector representations, chunk overlap rationale, similarity distance metrics, and hybrid search mechanics.",
      questions: [
        {
          id: "q-ai-rag-2",
          prompt: "What is 'Hybrid Search' in modern vector search engines like Pinecone and pgvector?",
          options: [
            { id: "a", label: "Searching in both Python and JavaScript at the same time" },
            { id: "b", label: "Combining dense vector semantic search with sparse keyword search (BM25) using reciprocal rank fusion (RRF)" },
            { id: "c", label: "Storing vectors on both hard disk and RAM" },
            { id: "d", label: "Running queries on both AWS and Google Cloud simultaneously" }
          ],
          correctIndex: 1,
          explanation: "Hybrid search merges the strengths of semantic search (concept matching) with BM25 keyword search (exact part numbers, acronyms, and names) using rank fusion."
        }
      ]
    }
  ]
};

export const aiSubCourse3: CurriculumSubCourse = {
  id: "subcourse-ai-rag",
  title: "Vector Databases & RAG Architectures",
  position: 3,
  duration: "5.5 hours",
  description: "Construct production Retrieval-Augmented Generation (RAG) pipelines using semantic embeddings, chunking strategies, pgvector, Chroma, and hybrid keyword-vector search.",
  modules: [aiMod3_1],
  items: [...aiMod3_1.items]
};

// --- SUB-COURSE 4: LangChain & Autonomous AI Agents ---
const aiMod4_1: CurriculumSubModule = {
  id: "mod-ai-4-1",
  subCourseId: "subcourse-ai-agents",
  title: "Agent Loops, Tool Calling & Multi-Agent Systems",
  position: 1,
  duration: "5 hours",
  items: [
    {
      id: "ai-agent-001",
      moduleId: "mod-ai-4-1",
      moduleTitle: "Agent Loops, Tool Calling & Multi-Agent Systems",
      modulePosition: 1,
      subCourseId: "subcourse-ai-agents",
      subCourseTitle: "LangChain & Autonomous AI Agents",
      subCoursePosition: 4,
      title: "The ReAct Pattern & OpenAI Function / Tool Calling",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Building Autonomous Agents: Reason + Act Execution Loops",
      contentDescription: "Understand how LLMs make dynamic decisions, invoke external APIs through tool definitions, inspect execution returns, and iterate to complete multi-step goals.",
      sections: [
        {
          title: "The ReAct (Reasoning + Acting) Execution Cycle",
          explanation: "Traditional chains execute static sequences. In contrast, an Agent operates inside an iterative loop: Thought -> Action (Tool Call) -> Observation (Tool Output) -> Repeat until Goal is Reached.",
          codeSnippet: {
            language: "python",
            filename: "function_calling_agent.py",
            code: `import json
from openai import OpenAI

client = OpenAI()

# Define tools available to the model
tools = [
    {
        "type": "function",
        "function": {
            "name": "lookup_stock_price",
            "description": "Fetch current market price for a given stock ticker.",
            "parameters": {
                "type": "object",
                "properties": {
                    "ticker": {"type": "string", "description": "Stock symbol (e.g. AAPL, NVDA)"}
                },
                "required": ["ticker"]
            }
        }
    }
]

def execute_tool(name: str, args: dict):
    if name == "lookup_stock_price":
        prices = {"AAPL": 225.50, "NVDA": 138.25}
        return json.dumps({"ticker": args["ticker"], "price": prices.get(args["ticker"], 100.0)})
    return json.dumps({"error": "Unknown tool"})

messages = [{"role": "user", "content": "How much does 10 shares of NVDA cost right now?"}]

# Step 1: Model decides to call tool
res = client.chat.completions.create(model="gpt-4o", messages=messages, tools=tools)
msg = res.choices[0].message

if msg.tool_calls:
    tool_call = msg.tool_calls[0]
    args = json.loads(tool_call.function.arguments)
    tool_result = execute_tool(tool_call.function.name, args)
    
    # Step 2: Feed tool output back to model
    messages.append(msg)
    messages.append({
        "role": "tool",
        "tool_call_id": tool_call.id,
        "content": tool_result
    })
    
    # Step 3: Model synthesizes final response
    final_res = client.chat.completions.create(model="gpt-4o", messages=messages)
    print("Agent Response:", final_res.choices[0].message.content)`
          }
        }
      ],
      questions: [
        {
          id: "q-ai-agent-1",
          prompt: "What does the model actually return when it decides to call an external tool in OpenAI's API?",
          options: [
            { id: "a", label: "It executes the Python code on OpenAI's servers directly" },
            { id: "b", label: "It returns a message with tool_calls containing the function name and JSON arguments for the client to execute" },
            { id: "c", label: "It terminates the conversation immediately" },
            { id: "d", label: "It sends an email to the administrator" }
          ],
          correctIndex: 1,
          explanation: "The LLM never runs external code directly; it emits a structured instruction (tool_calls) telling your client code which function to call and with what arguments."
        }
      ]
    },
    {
      id: "ai-agent-quiz-1",
      moduleId: "mod-ai-4-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-ai-agents",
      subCourseTitle: "LangChain & Autonomous AI Agents",
      subCoursePosition: 4,
      title: "Sub-Course Assessment: Autonomous Agent Systems",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Agent Orchestration, Tools & Loop Control",
      contentDescription: "Validate your ability to design robust agent loops, prevent infinite recursion, configure tool contracts, and implement stateful agent graphs.",
      questions: [
        {
          id: "q-ai-agent-2",
          prompt: "How do production agent architectures prevent infinite execution loops when an agent cannot satisfy its goal?",
          options: [
            { id: "a", label: "By setting max_iterations limits and execution timeout thresholds on the agent runner" },
            { id: "b", label: "By turning off the internet connection" },
            { id: "c", label: "By deleting the model's memory buffer after every token" },
            { id: "d", label: "By disabling all function definitions" }
          ],
          correctIndex: 0,
          explanation: "Setting max_iterations (e.g. 10 steps) and hard timeout budgets ensures that an agent encountering unexpected tool outputs terminates gracefully with an explanatory fallback."
        }
      ]
    }
  ]
};

export const aiSubCourse4: CurriculumSubCourse = {
  id: "subcourse-ai-agents",
  title: "LangChain & Autonomous AI Agents",
  position: 4,
  duration: "5.5 hours",
  description: "Architect stateful autonomous agents leveraging the ReAct pattern, OpenAI tool calling, memory management, and multi-agent coordination frameworks.",
  modules: [aiMod4_1],
  items: [...aiMod4_1.items]
};

// --- SUB-COURSE 5: Enterprise Workflow Automation with n8n & Make ---
const aiMod5_1: CurriculumSubModule = {
  id: "mod-ai-5-1",
  subCourseId: "subcourse-ai-n8n",
  title: "No-Code & Low-Code AI Pipelines (n8n & Webhooks)",
  position: 1,
  duration: "4.5 hours",
  items: [
    {
      id: "ai-n8n-001",
      moduleId: "mod-ai-5-1",
      moduleTitle: "No-Code & Low-Code AI Pipelines (n8n & Webhooks)",
      modulePosition: 1,
      subCourseId: "subcourse-ai-n8n",
      subCourseTitle: "Enterprise Workflow Automation with n8n",
      subCoursePosition: 5,
      title: "Webhook Ingestion, AI Node Chaining & Automated Sync",
      duration: "40 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "End-to-End Enterprise Automations with n8n, Slack, CRMs & LLMs",
      contentDescription: "Deploy self-hosted n8n workflows that ingest inbound customer webhooks, enrich data with LLMs, query internal databases, and dispatch automated alerts.",
      sections: [
        {
          title: "Architecture of an n8n AI Workflow",
          explanation: "n8n provides visual workflow orchestration with native support for JavaScript/Python script nodes, LangChain nodes, and vector stores.",
          bullets: [
            "Webhook Trigger: Listens on HTTP POST from Typeform, Stripe, GitHub, or Shopify.",
            "AI Agent Node: Injects system prompts, context tools, and models (OpenAI/Anthropic/Ollama).",
            "Conditional Branching: Routes high-priority leads to Slack alerts and low-priority to automated email drips.",
            "Database Node: Persists enriched records into Supabase or PostgreSQL for reporting."
          ]
        }
      ],
      questions: [
        {
          id: "q-ai-n8n-1",
          prompt: "What is the primary architectural advantage of self-hosting n8n in an enterprise environment?",
          options: [
            { id: "a", label: "It removes the need for any computers or servers" },
            { id: "b", label: "Full data privacy compliance (GDPR/HIPAA) by keeping sensitive customer data inside your private VPC without third-party vendor lock-in" },
            { id: "c", label: "It automatically generates React components" },
            { id: "d", label: "It allows LLMs to run without power" }
          ],
          correctIndex: 1,
          explanation: "Self-hosting n8n guarantees that internal data, API credentials, and customer communications remain strictly within your organizational infrastructure boundaries."
        }
      ]
    },
    {
      id: "ai-n8n-quiz-1",
      moduleId: "mod-ai-5-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-ai-n8n",
      subCourseTitle: "Enterprise Workflow Automation with n8n",
      subCoursePosition: 5,
      title: "Sub-Course Assessment: Automated Workflow Engineering",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: n8n Integration, Webhooks & Error Handlers",
      contentDescription: "Evaluate your capability to build robust webhook listeners, format transformations, AI tool attachments, and fault-tolerant automated processes.",
      questions: [
        {
          id: "q-ai-n8n-2",
          prompt: "How should an n8n workflow handle an upstream API timeout to ensure zero data loss?",
          options: [
            { id: "a", label: "Delete the workflow immediately" },
            { id: "b", label: "Configure an Error Trigger node connected to an alert channel and route failed items to a Dead Letter Queue (DLQ)" },
            { id: "c", label: "Ignore the error and terminate the process" },
            { id: "d", label: "Restart the operating system" }
          ],
          correctIndex: 1,
          explanation: "Connecting an Error Trigger and forwarding failed payload items to a DLQ or retry queue ensures no customer event or transaction is dropped during outages."
        }
      ]
    }
  ]
};

export const aiSubCourse5: CurriculumSubCourse = {
  id: "subcourse-ai-n8n",
  title: "Enterprise Workflow Automation with n8n",
  position: 5,
  duration: "5 hours",
  description: "Automate complex enterprise business logic combining webhooks, n8n visual workflows, dynamic AI nodes, database writes, and automated multichannel notifications.",
  modules: [aiMod5_1],
  items: [...aiMod5_1.items]
};

// --- SUB-COURSE 6: Production AI Governance & Capstone Platform ---
const aiMod6_1: CurriculumSubModule = {
  id: "mod-ai-6-1",
  subCourseId: "subcourse-ai-capstone",
  title: "LLM Observability, Evaluation & Capstone",
  position: 1,
  duration: "6 hours",
  items: [
    {
      id: "ai-gov-001",
      moduleId: "mod-ai-6-1",
      moduleTitle: "LLM Observability, Evaluation & Capstone",
      modulePosition: 1,
      subCourseId: "subcourse-ai-capstone",
      subCourseTitle: "Production AI Deployment & Governance",
      subCoursePosition: 6,
      title: "Evals, Guardrails, Latency Optimization & Security",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Enterprise AI Quality Assurance: Evals, Red-Teaming & Cost Telemetry",
      contentDescription: "Implement automated evaluation frameworks (RAGAS / Promptfoo), LLM-as-a-judge benchmarking, latency optimization, and security guardrails against jailbreaks.",
      sections: [
        {
          title: "The LLM Evals Framework",
          explanation: "Unit tests in AI applications verify outputs against quantitative criteria: Faithfulness (is the answer grounded in context?), Answer Relevance, and Negative Guardrail Violations.",
          bullets: [
            "Faithfulness: Penalizing claims in the answer that do not exist in the retrieved document chunks.",
            "Semantic Similarity: Comparing generated answer embeddings to human gold-standard responses.",
            "NeMo Guardrails & Llama Guard: Pre-flight input classifiers that block jailbreaks, PII leaks, and toxic content before reaching the main LLM."
          ]
        }
      ],
      questions: [
        {
          id: "q-ai-gov-1",
          prompt: "What is 'LLM-as-a-Judge' evaluation methodology?",
          options: [
            { id: "a", label: "Submitting prompt outputs to an actual court of law" },
            { id: "b", label: "Using a capable model (such as GPT-4o) with a rigid rubric to evaluate and score responses generated by faster, smaller candidate models" },
            { id: "c", label: "A compiler that checks Python syntax" },
            { id: "d", label: "A security scanner that checks for open ports" }
          ],
          correctIndex: 1,
          explanation: "LLM-as-a-judge uses a frontier model with evaluation rubrics to grade outputs at scale for nuance, correctness, and tone far faster than human reviewers."
        }
      ]
    },
    {
      id: "ai-capstone-assignment",
      moduleId: "mod-ai-6-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-ai-capstone",
      subCourseTitle: "Production AI Deployment & Governance",
      subCoursePosition: 6,
      title: "Capstone Project: Autonomous Enterprise Support & Operations Platform",
      duration: "3.5 hours",
      type: "assignment",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Capstone Project: Production Enterprise AI Agent Suite",
      contentDescription: "Build and document an end-to-end autonomous customer support and operations agent featuring vector document search (RAG), strict Pydantic JSON triage, tool invocation, and an automated n8n webhook workflow.",
      assignmentPrompt: {
        instructions: "Construct a complete, production-ready AI automation architecture that accepts incoming enterprise support inquiries, searches an internal vector database for documentation context, generates structured triage records, and triggers automated remediation actions.",
        deliverables: [
          "Python / FastAPI backend integrating an LLM with structured Pydantic schema validation.",
          "Vector database integration (Chroma or pgvector) with chunking and semantic similarity search.",
          "Tool-calling capability enabling the agent to check customer subscription status or query an API.",
          "Automated webhook or n8n workflow pipeline dispatching alerts based on triage urgency.",
          "Comprehensive evaluation report showing test cases, token metrics, and guardrail protections."
        ],
        starterCode: `# Production AI Capstone Architecture Starter
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from openai import OpenAI

app = FastAPI(title="Enterprise AI Support Agent")
client = OpenAI()

class SupportRequest(BaseModel):
    user_id: str
    message: str

class TriageOutput(BaseModel):
    category: str = Field(description="Billing, Technical, Account, or Bug")
    priority: int = Field(ge=1, le=5)
    resolution_plan: str
    requires_human_escalation: bool

@app.post("/api/triage", response_model=TriageOutput)
async def triage_ticket(req: SupportRequest):
    # 1. Retrieve relevant RAG context from vector database
    # 2. Invoke LLM with strict Pydantic parsing
    # 3. Trigger automated downstream actions if priority >= 4
    pass`
      }
    }
  ]
};

export const aiSubCourse6: CurriculumSubCourse = {
  id: "subcourse-ai-capstone",
  title: "Production AI Deployment & Governance",
  position: 6,
  duration: "6.5 hours",
  description: "Deliver production-grade AI solutions with automated evals (RAGAS), guardrails, observability, token cost tracking, and an end-to-end Autonomous Enterprise Agent capstone.",
  modules: [aiMod6_1],
  items: [...aiMod6_1.items]
};

export const AI_AUTOMATION_MODULES: CurriculumSubCourse[] = [
  aiSubCourse1,
  aiSubCourse2,
  aiSubCourse3,
  aiSubCourse4,
  aiSubCourse5,
  aiSubCourse6
];
