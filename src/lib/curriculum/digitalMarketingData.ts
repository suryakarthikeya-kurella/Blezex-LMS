import { CurriculumSubCourse, CurriculumSubModule, CurriculumItem } from "../curriculumTypes";

// =========================================================================
// DIGITAL MARKETING CURRICULUM
// 6 Sequential Sub-Courses with Deep Lessons, Assessments & Capstone
// =========================================================================

// --- SUB-COURSE 1: Marketing Strategy & Audience Psychology ---
const mktgMod1_1: CurriculumSubModule = {
  id: "mod-mktg-1-1",
  subCourseId: "subcourse-mktg-strategy",
  title: "Audience Personas & Funnel Architecture",
  position: 1,
  duration: "3.5 hours",
  items: [
    {
      id: "mktg-strat-001",
      moduleId: "mod-mktg-1-1",
      moduleTitle: "Audience Personas & Funnel Architecture",
      modulePosition: 1,
      subCourseId: "subcourse-mktg-strategy",
      subCourseTitle: "Marketing Strategy & Audience Psychology",
      subCoursePosition: 1,
      title: "Customer Persona Development, Jobs-to-be-Done & Funnel Stages",
      duration: "40 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Foundations of High-Conversion Growth Strategy",
      contentDescription: "Master demographic and psychographic persona mapping, the Jobs-To-Be-Done (JTBD) framework, and full-funnel architectures (TOFU, MOFU, BOFU).",
      sections: [
        {
          title: "Full-Funnel Acquisition Architecture",
          explanation: "High-performance marketing campaigns align messaging directly with customer awareness stages.",
          bullets: [
            "Top-of-Funnel (TOFU - Awareness): Educational problem-oriented content solving immediate friction without pushing hard sales.",
            "Middle-of-Funnel (MOFU - Consideration): Webinars, product comparison guides, and ROI calculators addressing specific solutions.",
            "Bottom-of-Funnel (BOFU - Decision): Free trials, customer case studies, social proof, and limited-time purchase incentives."
          ]
        }
      ],
      questions: [
        {
          id: "q-mktg-st-1",
          prompt: "What is the primary risk of pushing Bottom-of-Funnel (BOFU) direct-response offers to Top-of-Funnel (TOFU) cold audiences?",
          options: [
            { id: "a", label: "The website will experience a 404 error" },
            { id: "b", label: "Extremely low conversion rates, wasted ad spend, and brand fatigue because the audience hasn't yet recognized their problem or trusted the brand" },
            { id: "c", label: "Google Analytics will stop tracking visitors" },
            { id: "d", label: "Customer email addresses will be deleted" }
          ],
          correctIndex: 1,
          explanation: "Cold audiences who do not yet perceive their problem or recognize the brand will bounce from hard sell offers, burning ad budget with negligible ROI."
        }
      ]
    },
    {
      id: "mktg-strat-quiz-1",
      moduleId: "mod-mktg-1-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-mktg-strategy",
      subCourseTitle: "Marketing Strategy & Audience Psychology",
      subCoursePosition: 1,
      title: "Sub-Course Assessment: Marketing Strategy & Customer Personas",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Positioning, Funnels & Customer Psychology",
      contentDescription: "Evaluate your capability to identify market positioning moats, calculate Customer Lifetime Value (LTV) to Customer Acquisition Cost (CAC) ratios, and map value propositions.",
      questions: [
        {
          id: "q-mktg-st-2",
          prompt: "What is widely regarded as a healthy benchmark for the LTV:CAC ratio in sustainable venture and SaaS businesses?",
          options: [
            { id: "a", label: "0.5:1 (spending double what customers pay)" },
            { id: "b", label: "3:1 or higher (customer value is at least triple acquisition cost)" },
            { id: "c", label: "100:1" },
            { id: "d", label: "1:1 (breaking even on gross customer revenue)" }
          ],
          correctIndex: 1,
          explanation: "A 3:1 LTV:CAC ratio provides healthy margins to cover operational overhead, support, and reinvestment into growth without excessive capital burn."
        }
      ]
    }
  ]
};

export const mktgSubCourse1: CurriculumSubCourse = {
  id: "subcourse-mktg-strategy",
  title: "Marketing Strategy & Audience Psychology",
  position: 1,
  duration: "4.5 hours",
  description: "Construct data-driven growth strategies, formulate customer personas with Jobs-to-be-Done, and optimize multi-stage acquisition funnels.",
  modules: [mktgMod1_1],
  items: [...mktgMod1_1.items]
};

// --- SUB-COURSE 2: Search Engine Optimization (SEO) Mastery ---
const mktgMod2_1: CurriculumSubModule = {
  id: "mod-mktg-2-1",
  subCourseId: "subcourse-mktg-seo",
  title: "Keyword Research, Technical SEO & Authority Building",
  position: 1,
  duration: "5 hours",
  items: [
    {
      id: "mktg-seo-001",
      moduleId: "mod-mktg-2-1",
      moduleTitle: "Keyword Research, Technical SEO & Authority Building",
      modulePosition: 1,
      subCourseId: "subcourse-mktg-seo",
      subCourseTitle: "Search Engine Optimization (SEO) Mastery",
      subCoursePosition: 2,
      title: "Technical SEO, Core Web Vitals, Structured Data & Backlinks",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Organic Search Dominance: Technical Infrastructure & Search Intent",
      contentDescription: "Master keyword search intent (informational vs commercial), on-page title tag optimization, canonicalization, JSON-LD Schema markup, Core Web Vitals (LCP, INP, CLS), and authority backlink acquisition.",
      sections: [
        {
          title: "Structured Schema Markup (JSON-LD)",
          explanation: "Inject structured JSON-LD into web headers to secure rich snippets (star ratings, FAQs, breadcrumbs) in Google search results.",
          codeSnippet: {
            language: "html",
            filename: "schema.html",
            code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Full Stack Web Development Career Accelerator",
  "description": "Comprehensive engineering course covering React, Node.js, and SQL.",
  "provider": {
    "@type": "Organization",
    "name": "BlezeX Portal",
    "sameAs": "https://blezex.com"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1240"
  }
}
</script>`
          }
        }
      ],
      questions: [
        {
          id: "q-mktg-seo-1",
          prompt: "What is Cumulative Layout Shift (CLS) in Google's Core Web Vitals?",
          options: [
            { id: "a", label: "The total number of clicks on a page" },
            { id: "b", label: "A metric measuring visual stability by quantifying unexpected layout shifts during page load" },
            { id: "c", label: "The speed of the database query" },
            { id: "d", label: "The total word count of an article" }
          ],
          correctIndex: 1,
          explanation: "CLS measures unexpected movement of visible elements as images or fonts load asynchronously; low CLS (< 0.1) is required for optimal search rankings."
        }
      ]
    },
    {
      id: "mktg-seo-quiz-1",
      moduleId: "mod-mktg-2-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-mktg-seo",
      subCourseTitle: "Search Engine Optimization (SEO) Mastery",
      subCoursePosition: 2,
      title: "Sub-Course Assessment: Technical & On-Page SEO",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Crawlability, Canonical Tags & Content Strategy",
      contentDescription: "Evaluate your proficiency in diagnosing crawl budget bottlenecks, robots.txt directives, XML sitemaps, and programmatic SEO scaling.",
      questions: [
        {
          id: "q-mktg-seo-2",
          prompt: "What is the primary function of a `rel=\"canonical\"` tag on an e-commerce product page with multiple color variants?",
          options: [
            { id: "a", label: "It translates the page into French" },
            { id: "b", label: "It signals to search engines which URL is the master version, consolidating link equity and eliminating duplicate content penalties" },
            { id: "c", label: "It hides the product from Google" },
            { id: "d", label: "It forces the browser to reload" }
          ],
          correctIndex: 1,
          explanation: "Canonical tags prevent search engines from penalizing duplicate URLs created by filtering parameters or variant query strings."
        }
      ]
    }
  ]
};

export const mktgSubCourse2: CurriculumSubCourse = {
  id: "subcourse-mktg-seo",
  title: "Search Engine Optimization (SEO) Mastery",
  position: 2,
  duration: "5.5 hours",
  description: "Execute technical SEO audits, optimize Core Web Vitals, implement structured Schema markup, perform commercial keyword intent clustering, and build authoritative backlinks.",
  modules: [mktgMod2_1],
  items: [...mktgMod2_1.items]
};

// --- SUB-COURSE 3: Performance Marketing & Paid Ads (Meta & Google) ---
const mktgMod3_1: CurriculumSubModule = {
  id: "mod-mktg-3-1",
  subCourseId: "subcourse-mktg-ads",
  title: "Google Search Campaigns & Meta Ads Manager",
  position: 1,
  duration: "5 hours",
  items: [
    {
      id: "mktg-ads-001",
      moduleId: "mod-mktg-3-1",
      moduleTitle: "Google Search Campaigns & Meta Ads Manager",
      modulePosition: 1,
      subCourseId: "subcourse-mktg-ads",
      subCourseTitle: "Performance Marketing & Paid Ads (Meta & Google)",
      subCoursePosition: 3,
      title: "PPC Bidding, Quality Score & High-ROAS Meta Ad Scaling",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Scaling Paid Acquisition: Google Ads & Meta Pixel Optimization",
      contentDescription: "Master Google Ads Quality Score (Expected CTR, Ad Relevance, Landing Page Experience), negative keywords, Meta Conversions API (CAPI), and lookalike audience segmentation.",
      sections: [
        {
          title: "Google Ads Quality Score Formula",
          explanation: "Ad Rank = Max CPC Bid * Quality Score. Improving Quality Score from 5 to 10 cuts actual Cost-Per-Click in half while maintaining top ad positions.",
          bullets: [
            "Expected CTR: Historical click-through rates compared to competitors.",
            "Ad Relevance: Keyword match inside ad headlines and descriptions.",
            "Landing Page Experience: Page speed, mobile responsiveness, and message match consistency."
          ]
        }
      ],
      questions: [
        {
          id: "q-mktg-ads-1",
          prompt: "Why has Meta's Conversions API (CAPI) become mandatory alongside the browser-side Meta Pixel for enterprise advertisers?",
          options: [
            { id: "a", label: "Because Apple's App Tracking Transparency (ATT) and browser cookie blockers block client-side pixels; CAPI sends purchase events server-to-server reliably" },
            { id: "b", label: "Because CAPI reduces ad spend to zero" },
            { id: "c", label: "Because browser pixels are now illegal" },
            { id: "d", label: "Because CAPI automatically writes ad copy" }
          ],
          correctIndex: 0,
          explanation: "CAPI delivers server-side event tracking directly from your backend to Meta, bypassing browser ad-blockers and iOS privacy restrictions to preserve conversion signal."
        }
      ]
    },
    {
      id: "mktg-ads-quiz-1",
      moduleId: "mod-mktg-3-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-mktg-ads",
      subCourseTitle: "Performance Marketing & Paid Ads (Meta & Google)",
      subCoursePosition: 3,
      title: "Sub-Course Assessment: Performance Marketing & Paid Ads",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Media Buying, ROAS Optimization & Ad Creatives",
      contentDescription: "Test your capability to calculate Return on Ad Spend (ROAS), Cost Per Acquisition (CPA), negative keyword curation, and creative fatigue rotation.",
      questions: [
        {
          id: "q-mktg-ads-2",
          prompt: "If a company spends $10,000 on Meta Ads and generates $45,000 in gross revenue directly attributed to that campaign, what is their ROAS?",
          options: [
            { id: "a", label: "4.5x (or 450%)" },
            { id: "b", label: "0.22x" },
            { id: "c", label: "35x" },
            { id: "d", label: "1.5x" }
          ],
          correctIndex: 0,
          explanation: "ROAS = Gross Revenue / Ad Spend ($45,000 / $10,000 = 4.5x or 450%)."
        }
      ]
    }
  ]
};

export const mktgSubCourse3: CurriculumSubCourse = {
  id: "subcourse-mktg-ads",
  title: "Performance Marketing & Paid Ads (Meta & Google)",
  position: 3,
  duration: "5.5 hours",
  description: "Execute profitable paid advertising campaigns across Google Search and Meta Ads, optimize Quality Scores, implement Conversions API (CAPI), and scale ROAS.",
  modules: [mktgMod3_1],
  items: [...mktgMod3_1.items]
};

// --- SUB-COURSE 4: Content Marketing & Social Media Growth ---
const mktgMod4_1: CurriculumSubModule = {
  id: "mod-mktg-4-1",
  subCourseId: "subcourse-mktg-content",
  title: "Viral Storytelling, Copywriting & Channel Scaling",
  position: 1,
  duration: "4.5 hours",
  items: [
    {
      id: "mktg-cnt-001",
      moduleId: "mod-mktg-4-1",
      moduleTitle: "Viral Storytelling, Copywriting & Channel Scaling",
      modulePosition: 1,
      subCourseId: "subcourse-mktg-content",
      subCourseTitle: "Content Marketing & Social Media Growth",
      subCoursePosition: 4,
      title: "High-Converting Copywriting Frameworks: AIDA, PAS & StoryBrand",
      duration: "40 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Persuasive Copywriting & Organic Distribution Flywheels",
      contentDescription: "Master copywriting formulas (Problem-Agitate-Solve, Attention-Interest-Desire-Action), short-form video hooks for Reels/TikTok, and LinkedIn B2B thought leadership.",
      sections: [
        {
          title: "PAS Framework in Practice",
          explanation: "Problem-Agitate-Solve resonates because humans are more motivated to escape existing pain than to pursue hypothetical pleasure.",
          bullets: [
            "Problem: Clearly state the current friction point the customer experiences daily.",
            "Agitate: Highlight the compounding hidden costs, anxiety, and lost opportunity of doing nothing.",
            "Solve: Introduce your product as the definitive, friction-free relief mechanism."
          ]
        }
      ],
      questions: [
        {
          id: "q-mktg-cnt-1",
          prompt: "What is the primary role of the 'Hook' in the first 3 seconds of a short-form video on TikTok or Instagram Reels?",
          options: [
            { id: "a", label: "To show the company logo" },
            { id: "b", label: "To interrupt the user's scroll by creating an open curiosity loop or addressing a visceral pain point, preventing a bounce" },
            { id: "c", label: "To read terms and conditions" },
            { id: "d", label: "To ask for credit card information" }
          ],
          correctIndex: 1,
          explanation: "Algorithm distribution is driven by initial retention; compelling hooks capture immediate attention within the first 3 seconds to keep viewers watching."
        }
      ]
    },
    {
      id: "mktg-cnt-quiz-1",
      moduleId: "mod-mktg-4-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-mktg-content",
      subCourseTitle: "Content Marketing & Social Media Growth",
      subCoursePosition: 4,
      title: "Sub-Course Assessment: Content Marketing & Copywriting",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Editorial Calendars, Hooks & Viral Distribution",
      contentDescription: "Evaluate your capability to design multi-channel editorial calendars, repurpose pillar content, and craft persuasive sales page copy.",
      questions: [
        {
          id: "q-mktg-cnt-2",
          prompt: "What is the 'Content Repurposing Pillar Strategy'?",
          options: [
            { id: "a", label: "Copying content from competitors word-for-word" },
            { id: "b", label: "Producing one long-form asset (e.g. webinar or podcast) and atomizing it into blog posts, newsletters, quote graphics, and 10+ short-form video clips" },
            { id: "c", label: "Posting only once per year" },
            { id: "d", label: "Printing blog posts on paper" }
          ],
          correctIndex: 1,
          explanation: "Pillar content models maximize marketing ROI by slicing a single high-effort asset into dozens of tailored micro-assets distributed across platforms."
        }
      ]
    }
  ]
};

export const mktgSubCourse4: CurriculumSubCourse = {
  id: "subcourse-mktg-content",
  title: "Content Marketing & Social Media Growth",
  position: 4,
  duration: "5 hours",
  description: "Craft persuasive copy using AIDA and PAS frameworks, develop viral short-form video hooks, establish B2B authority on LinkedIn, and build automated content engines.",
  modules: [mktgMod4_1],
  items: [...mktgMod4_1.items]
};

// --- SUB-COURSE 5: Email Marketing & CRM Automation ---
const mktgMod5_1: CurriculumSubModule = {
  id: "mod-mktg-5-1",
  subCourseId: "subcourse-mktg-email",
  title: "Drip Campaigns, Segmentation & Deliverability",
  position: 1,
  duration: "4.5 hours",
  items: [
    {
      id: "mktg-em-001",
      moduleId: "mod-mktg-5-1",
      moduleTitle: "Drip Campaigns, Segmentation & Deliverability",
      modulePosition: 1,
      subCourseId: "subcourse-mktg-email",
      subCourseTitle: "Email Marketing & CRM Automation",
      subCoursePosition: 5,
      title: "Automated Lifecycle Flows: Welcome, Cart Recovery & DMARC",
      duration: "40 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Lifecycle Email Architecture: Retention, Drips & Inbox Deliverability",
      contentDescription: "Configure Klaviyo/HubSpot automated drip sequences, behavioral tagging, list segmentation, and email authentication standards (SPF, DKIM, DMARC) to guarantee 99%+ inbox placement.",
      sections: [
        {
          title: "Technical Email Deliverability Setup",
          explanation: "Major mailbox providers (Google, Yahoo) mandate strict domain authentication to prevent phishing and spam folder routing.",
          bullets: [
            "SPF (Sender Policy Framework): Declares which IP addresses are permitted to send email on behalf of your domain.",
            "DKIM (DomainKeys Identified Mail): Cryptographic signature proving email content was not altered in transit.",
            "DMARC (Domain-based Message Authentication): Policy dictating how receivers should handle unauthenticated emails (none, quarantine, reject)."
          ]
        }
      ],
      questions: [
        {
          id: "q-mktg-em-1",
          prompt: "What is the single most common cause of marketing emails being routed directly to the spam folder?",
          options: [
            { id: "a", label: "Using images in the email" },
            { id: "b", label: "Poor sender domain reputation resulting from high bounce rates, low engagement, spam complaints, and missing SPF/DKIM/DMARC records" },
            { id: "c", label: "Sending emails on Tuesdays" },
            { id: "d", label: "Having more than 100 subscribers" }
          ],
          correctIndex: 1,
          explanation: "Spam algorithms evaluate domain authentication and subscriber engagement metrics (spam complaints, unopens, and hard bounces)."
        }
      ]
    },
    {
      id: "mktg-em-quiz-1",
      moduleId: "mod-mktg-5-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-mktg-email",
      subCourseTitle: "Email Marketing & CRM Automation",
      subCoursePosition: 5,
      title: "Sub-Course Assessment: Email & CRM Lifecycle Engineering",
      duration: "30 mins",
      type: "quiz",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Assessment: Automated Flows, Subject Line Testing & Tagging",
      contentDescription: "Test your understanding of re-engagement workflows, abandoned cart recovery timing, open/click rate optimization, and subscriber list hygiene.",
      questions: [
        {
          id: "q-mktg-em-2",
          prompt: "What is an optimal cadence for an automated Abandoned Cart recovery email flow?",
          options: [
            { id: "a", label: "1 month after abandonment" },
            { id: "b", label: "Email 1 at 1 hour (helpful reminder), Email 2 at 24 hours (social proof/FAQ), Email 3 at 48 hours (urgency/small discount incentive)" },
            { id: "c", label: "Send 10 emails within the first 10 minutes" },
            { id: "d", label: "Never email customers who abandon checkout" }
          ],
          correctIndex: 1,
          explanation: "A 3-step sequence spanning 1 hour to 48 hours recovers up to 15-20% of lost e-commerce carts without alienating customers."
        }
      ]
    }
  ]
};

export const mktgSubCourse5: CurriculumSubCourse = {
  id: "subcourse-mktg-email",
  title: "Email Marketing & CRM Automation",
  position: 5,
  duration: "5 hours",
  description: "Construct high-converting email sequences (welcome, cart recovery, win-back), configure SPF/DKIM/DMARC deliverability, and implement behavioral segmentation in HubSpot and Klaviyo.",
  modules: [mktgMod5_1],
  items: [...mktgMod5_1.items]
};

// --- SUB-COURSE 6: Web Analytics (GA4), CRO & Capstone Campaign ---
const mktgMod6_1: CurriculumSubModule = {
  id: "mod-mktg-6-1",
  subCourseId: "subcourse-mktg-capstone",
  title: "GA4, Conversion Rate Optimization & Capstone Campaign",
  position: 1,
  duration: "6.5 hours",
  items: [
    {
      id: "mktg-ga4-001",
      moduleId: "mod-mktg-6-1",
      moduleTitle: "GA4, Conversion Rate Optimization & Capstone Campaign",
      modulePosition: 1,
      subCourseId: "subcourse-mktg-capstone",
      subCourseTitle: "Web Analytics (GA4), CRO & Capstone Campaign",
      subCoursePosition: 6,
      title: "Google Analytics 4 (GA4) Event Architecture, UTMs & CRO Testing",
      duration: "45 mins",
      type: "cheatsheet",
      position: 1,
      contentHeading: "Analytics Mastery: Custom Events, Attribution Models & A/B Page Testing",
      contentDescription: "Understand the GA4 event-driven data model, UTM parameter taxonomy, funnel drop-off diagnostics, heatmap analysis, and landing page conversion rate optimization (CRO).",
      sections: [
        {
          title: "Rigorous UTM Tracking Architecture",
          explanation: "Inconsistent UTM tags ruin attribution reporting. Follow a standardized naming convention: lowercase, hyphens instead of spaces.",
          codeSnippet: {
            language: "http",
            filename: "utm_url.txt",
            code: `https://blezex.com/courses/full-stack-web?
utm_source=meta
&utm_medium=paid-social
&utm_campaign=q4-career-accelerator
&utm_content=video-testimonial-sarah
&utm_term=software-engineer-retargeting`
          }
        }
      ],
      questions: [
        {
          id: "q-mktg-ga4-1",
          prompt: "What is the primary difference between Universal Analytics (UA) and Google Analytics 4 (GA4)?",
          options: [
            { id: "a", label: "GA4 uses an event-based data measurement model where every interaction is an event, replacing the session/pageview model of UA" },
            { id: "b", label: "GA4 only works on mobile apps" },
            { id: "c", label: "GA4 does not allow tracking revenue" },
            { id: "d", label: "UA is faster" }
          ],
          correctIndex: 0,
          explanation: "GA4 unifies web and app analytics under an event-driven model where every user touchpoint (scroll, click, purchase) is recorded as a structured event with parameters."
        }
      ]
    },
    {
      id: "mktg-capstone-assignment",
      moduleId: "mod-mktg-6-1",
      moduleTitle: "Sub-Course Assessment",
      modulePosition: 1,
      subCourseId: "subcourse-mktg-capstone",
      subCourseTitle: "Web Analytics (GA4), CRO & Capstone Campaign",
      subCoursePosition: 6,
      title: "Capstone Project: 360-Degree Growth Marketing Campaign & Launch Strategy",
      duration: "4 hours",
      type: "assignment",
      position: 2,
      isSubCourseAssessment: true,
      contentHeading: "Capstone Project: End-to-End Multichannel Growth Marketing Plan",
      contentDescription: "Develop, document, and present a comprehensive 360-degree digital marketing launch plan for a high-growth product, incorporating SEO strategy, Google & Meta paid media budget allocations, high-converting copywriting, lifecycle email flows, and a complete GA4 tracking plan.",
      assignmentPrompt: {
        instructions: "Deliver a full enterprise-grade growth marketing launch package: (1) Target Audience & Value Proposition Canvas, (2) SEO Keyword & Content Strategy with on-page optimization specs, (3) Paid Media Strategy with creative briefs, copy, and $25,000 budget allocation model, (4) Email Lifecycle Map with 3 written automated flows, and (5) GA4 Event Measurement & CRO testing roadmap.",
        deliverables: [
          "Growth Strategy Slide Deck or Document detailing customer personas, competitive positioning, and CAC/LTV targets.",
          "SEO Technical & Keyword Strategy spreadsheet with target search intents and Schema markup specifications.",
          "Paid Advertising Blueprint (Google Search Ad copy + 3 Meta Ad creative concepts with AIDA copy).",
          "Complete Lifecycle Email Wireframes (Welcome Series & Cart Abandonment Copy).",
          "GA4 Measurement Plan with custom event names, parameters, and conversion funnel definitions."
        ],
        starterCode: `# Digital Marketing Capstone Blueprint
# 1. Product & Positioning: Career Accelerator Platform
# 2. Paid Budget: $25k/mo (60% Meta Retargeting, 30% Google Search, 10% YouTube)
# 3. Target ROAS: 3.8x | Blended Target CPA: $240 | LTV Target: $1,200
# 4. Lifecycle: 5-Part Nurture Flow with Segmented Case Studies`
      }
    }
  ]
};

export const mktgSubCourse6: CurriculumSubCourse = {
  id: "subcourse-mktg-capstone",
  title: "Web Analytics (GA4), CRO & Capstone Campaign",
  position: 6,
  duration: "7 hours",
  description: "Implement GA4 event tracking, UTM conventions, landing page A/B tests (CRO), and deliver the 360-Degree Growth Marketing Launch Capstone.",
  modules: [mktgMod6_1],
  items: [...mktgMod6_1.items]
};

export const DIGITAL_MARKETING_MODULES: CurriculumSubCourse[] = [
  mktgSubCourse1,
  mktgSubCourse2,
  mktgSubCourse3,
  mktgSubCourse4,
  mktgSubCourse5,
  mktgSubCourse6
];
