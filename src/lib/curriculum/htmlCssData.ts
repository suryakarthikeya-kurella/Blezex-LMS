import { CurriculumSubCourse, CurriculumSubModule, CurriculumItem } from "../curriculumTypes";

// =========================================================================
// SUB-COURSE 1: FUNDAMENTALS OF HTML & CSS
// =========================================================================

export const rawHtmlItems: CurriculumItem[] = [
  {
    "id": "item-01-intro-web-html-css",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "01. Introduction to the Web, HTML and CSS",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 1,
    "contentHeading": "Lesson 01: Introduction to the Web, HTML and CSS",
    "contentDescription": "Understand the World Wide Web, the client-server request cycle, the foundational roles of HTML, CSS, and JavaScript, browser rendering, and setting up VS Code to build your first webpage.",
    "codeSnippet": {
      "language": "HTML",
      "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My First Website</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <h1>Welcome to Web Development</h1>\n  <p>I am learning HTML and CSS.</p>\n  <button>Get Started</button>\n</body>\n</html>"
    },
    "sections": [
      {
        "title": "1.1 What is the World Wide Web?",
        "explanation": "The World Wide Web (WWW) is a collection of interconnected web pages and resources that we access through the internet using a web browser. For example, when you visit a shopping website, you can view products, search for items, add products to your cart, and make purchases. These actions are made possible by different web technologies working together.",
        "bullets": [
          "Internet: The global physical network connecting computers and devices worldwide.",
          "World Wide Web: A service running on top of the internet that allows us to access websites via hyperlinks.",
          "Distinct services: Email, online gaming, and file transfers (FTP) also use the internet without necessarily using the Web."
        ],
        "diagram": "+-------------------------------------------------------------+\n|                          THE INTERNET                       |\n|   (The global physical network of cables, routers & servers) |\n+-------------------------------------------------------------+\n       |                  |                    |\n       v                  v                    v\n+---------------+  +---------------+  +---------------------+\n|     EMAIL     |  | ONLINE GAMING |  | WORLD WIDE WEB (WWW)|\n| (SMTP / IMAP) |  |   (UDP/TCP)   |  | (HTTP/HTTPS Pages)  |\n+---------------+  +---------------+  +---------------------+"
      },
      {
        "title": "1.2 How does a website work?",
        "explanation": "Every website interaction follows a 4-step client-server lifecycle:",
        "bullets": [
          "1. User: Enters a website URL (e.g., https://example.com) in the browser.",
          "2. Browser sends a request: DNS translates the domain into a server IP address; HTTP or HTTPS carries the request.",
          "3. Web server responds: Returns HTML, CSS, JavaScript, images, or other resources.",
          "4. Browser renders the page: Displays text, images, layout, and interactive elements.",
          "Backend communication: Some websites also communicate with backend servers to retrieve user data, save information, or process payments."
        ],
        "diagram": "[1. USER] ---> Enters URL in Browser\n     |\n     v\n[2. BROWSER] --(DNS Lookup: finds IP)--> Sends HTTP/HTTPS Request\n                                                 |\n                                                 v\n[4. RENDER PAGE] <-- Returns HTML/CSS/JS/Media -- [3. WEB SERVER]"
      },
      {
        "title": "1.3 What is HTML? (The House Analogy)",
        "explanation": "HTML stands for HyperText Markup Language. It defines the structure and meaning of web content, telling the browser which content is a heading, paragraph, image, link, list, or form.",
        "bullets": [
          "Structure vs Programming: HTML is a markup language, not a programming language. It describes content rather than providing general-purpose programming logic.",
          "The House Analogy: HTML is the structure — walls, rooms, doors, and windows.",
          "CSS is the visual design — paint, decoration, and layout.",
          "JavaScript is the behavior — lights, switches, and automated doors."
        ],
        "diagram": "+-----------------------------------------------------------+\n|                   THE WEBSITE HOUSE ANALOGY               |\n+-----------------------------------------------------------+\n|  HTML (Structure)   | Brick walls, foundation, roof, doors |\n|  CSS (Presentation) | Paint colors, wallpaper, curtains   |\n|  JavaScript (Action)| Electrical wiring, switches, alarms |\n+-----------------------------------------------------------+"
      },
      {
        "title": "1.4 What is CSS & 1.5 What is JavaScript?",
        "explanation": "CSS (Cascading Style Sheets) controls how HTML content looks and is arranged on the screen (colors, fonts, spacing, layouts). JavaScript adds behavior and interactivity (dropdowns, form validation, shopping carts, popups, and API fetching).",
        "table": {
          "headers": [
            "Technology",
            "Main Responsibility",
            "Real-World Role"
          ],
          "rows": [
            [
              "HTML",
              "Structure and meaning",
              "Headings, paragraphs, forms, tables"
            ],
            [
              "CSS",
              "Appearance and layout",
              "Colors, fonts, spacing, responsive grids"
            ],
            [
              "JavaScript",
              "Behavior and interactivity",
              "Click actions, modals, data fetching"
            ]
          ]
        }
      },
      {
        "title": "1.6 A Brief History & 1.7 What is a Web Browser?",
        "explanation": "Tim Berners-Lee proposed the Web in 1989-1991. CSS was introduced in 1996 to separate content from presentation. Today, HTML is a living standard maintained by WHATWG. A web browser (Chrome, Firefox, Safari, Edge) retrieves resources, parses HTML into the DOM, processes CSS into the CSSOM, calculates layout, and paints pixels.",
        "bullets": [
          "1989-1991: Tim Berners-Lee invents the World Wide Web at CERN.",
          "1996: CSS introduced to separate presentation from HTML content.",
          "2010s onward: HTML5, modern CSS Grid/Flexbox, and responsive design become standard.",
          "Browser Role: Parses HTML -> Combines with CSS -> Calculates Layout -> Paints pixels."
        ]
      },
      {
        "title": "1.8 Setting Up VS Code & 1.9 Your First Webpage",
        "explanation": "Install Visual Studio Code, create a project folder named 'html-css-course', and create 'index.html' and 'style.css'.",
        "bullets": [
          "Write HTML in 'index.html' and link your stylesheet using '<link rel=\"stylesheet\" href=\"style.css\">'.",
          "Add the CSS code below to 'style.css' to style the heading and button.",
          "Expected result: A centered heading, paragraph, and styled blue button on a light background."
        ],
        "codeSnippet": {
          "language": "CSS",
          "filename": "style.css",
          "code": "body {\n  font-family: Arial, sans-serif;\n  background-color: #f4f7fb;\n  text-align: center;\n  padding: 40px;\n}\nh1 {\n  color: #155eef;\n}\nbutton {\n  background-color: #155eef;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n}"
        }
      }
    ],
    "questions": [
      {
        "id": "q-01-1",
        "prompt": "What is the primary difference between the Internet and the World Wide Web?",
        "options": [
          {
            "id": "a",
            "label": "The Internet is the global network of connected computers; the Web is a service on the Internet for accessing linked pages"
          },
          {
            "id": "b",
            "label": "The Web is the physical hardware; the Internet is the browser"
          },
          {
            "id": "c",
            "label": "They are completely identical terms with no difference"
          },
          {
            "id": "d",
            "label": "The Internet was created in 2010; the Web was created in 1950"
          }
        ],
        "correctIndex": 0,
        "explanation": "The Internet is the underlying physical network. The World Wide Web is one of many services running on the Internet (like email or gaming) to access linked pages."
      },
      {
        "id": "q-01-2",
        "prompt": "In the house analogy, what role does HTML represent?",
        "options": [
          {
            "id": "a",
            "label": "The structure: walls, rooms, doors, and windows"
          },
          {
            "id": "b",
            "label": "The paint and interior decoration"
          },
          {
            "id": "c",
            "label": "The electrical wiring and light switches"
          },
          {
            "id": "d",
            "label": "The home insurance policy"
          }
        ],
        "correctIndex": 0,
        "explanation": "HTML provides the structural skeleton of the website (walls, doors), CSS provides the design (paint), and JavaScript provides behavior (switches)."
      },
      {
        "id": "q-01-3",
        "prompt": "What does HTML stand for?",
        "options": [
          {
            "id": "a",
            "label": "HyperText Markup Language"
          },
          {
            "id": "b",
            "label": "HighText Machine Language"
          },
          {
            "id": "c",
            "label": "Hyperlink Transfer Markup Language"
          },
          {
            "id": "d",
            "label": "Home Tool Markup Language"
          }
        ],
        "correctIndex": 0,
        "explanation": "HTML stands for HyperText Markup Language."
      },
      {
        "id": "q-01-4",
        "prompt": "Which technology is responsible for styling colors, fonts, and layouts on a webpage?",
        "options": [
          {
            "id": "a",
            "label": "CSS (Cascading Style Sheets)"
          },
          {
            "id": "b",
            "label": "HTML"
          },
          {
            "id": "c",
            "label": "JavaScript"
          },
          {
            "id": "d",
            "label": "SQL"
          }
        ],
        "correctIndex": 0,
        "explanation": "CSS is dedicated to visual presentation and layout."
      },
      {
        "id": "q-01-5",
        "prompt": "Which of the following is an example of JavaScript in action?",
        "options": [
          {
            "id": "a",
            "label": "Validating form fields or opening a popup modal when clicked"
          },
          {
            "id": "b",
            "label": "Defining an <h1> title tag"
          },
          {
            "id": "c",
            "label": "Changing text color to blue in a stylesheet"
          },
          {
            "id": "d",
            "label": "Setting character encoding to UTF-8"
          }
        ],
        "correctIndex": 0,
        "explanation": "JavaScript handles dynamic interactivity such as form validation, popups, and cart updates."
      },
      {
        "id": "q-01-6",
        "prompt": "Who proposed the World Wide Web and developed early HTML at CERN in 1989-1991?",
        "options": [
          {
            "id": "a",
            "label": "Tim Berners-Lee"
          },
          {
            "id": "b",
            "label": "Håkon Wium Lie"
          },
          {
            "id": "c",
            "label": "Brendan Eich"
          },
          {
            "id": "d",
            "label": "Steve Jobs"
          }
        ],
        "correctIndex": 0,
        "explanation": "Tim Berners-Lee invented the World Wide Web and early HTML."
      },
      {
        "id": "q-01-7",
        "prompt": "What is the primary role of DNS (Domain Name System) when entering a website URL?",
        "options": [
          {
            "id": "a",
            "label": "Translating human-readable domain names into server IP addresses"
          },
          {
            "id": "b",
            "label": "Rendering CSS stylesheets"
          },
          {
            "id": "c",
            "label": "Encrypting user passwords"
          },
          {
            "id": "d",
            "label": "Minifying HTML files"
          }
        ],
        "correctIndex": 0,
        "explanation": "DNS translates human-friendly domain names like example.com into numerical IP addresses."
      },
      {
        "id": "q-01-8",
        "prompt": "What is a web browser?",
        "options": [
          {
            "id": "a",
            "label": "Software that retrieves web resources and renders them visually on screen"
          },
          {
            "id": "b",
            "label": "A physical server located in a datacenter"
          },
          {
            "id": "c",
            "label": "A programming language used for database queries"
          },
          {
            "id": "d",
            "label": "An operating system"
          }
        ],
        "correctIndex": 0,
        "explanation": "A web browser (Chrome, Safari, Firefox, Edge) retrieves and displays web pages."
      },
      {
        "id": "q-01-9",
        "prompt": "Why is HTML classified as a markup language rather than a programming language?",
        "options": [
          {
            "id": "a",
            "label": "It defines content structure using tags rather than algorithms, variables, and logic loops"
          },
          {
            "id": "b",
            "label": "It only works on computers without internet"
          },
          {
            "id": "c",
            "label": "It was created before computers existed"
          },
          {
            "id": "d",
            "label": "It cannot display images"
          }
        ],
        "correctIndex": 0,
        "explanation": "Markup languages annotate and structure text content; they do not contain programming logic like loops or variables."
      },
      {
        "id": "q-01-10",
        "prompt": "What is the default filename convention for the main homepage of a website?",
        "options": [
          {
            "id": "a",
            "label": "index.html"
          },
          {
            "id": "b",
            "label": "main.html"
          },
          {
            "id": "c",
            "label": "home.html"
          },
          {
            "id": "d",
            "label": "start.html"
          }
        ],
        "correctIndex": 0,
        "explanation": "Web servers are configured by default to automatically serve index.html."
      }
    ]
  },
  {
    "id": "item-02-html-doc-structure",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "02. HTML Document Structure",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 2,
    "contentHeading": "Lesson 02: HTML Document Structure",
    "contentDescription": "Master the anatomy of an HTML document: boilerplate structure, <!DOCTYPE html>, root element, head vs. body, character encoding, responsive viewport metadata, and linking external styles and deferred scripts.",
    "codeSnippet": {
      "language": "HTML",
      "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Webpage</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>This is my first webpage.</p>\n  <script src=\"script.js\" defer></script>\n</body>\n</html>"
    },
    "sections": [
      {
        "title": "2.1 What is an HTML document? & 2.2 Boilerplate",
        "explanation": "An HTML document is a text file containing HTML markup that tells a browser how to organize and interpret webpage content. Files use the .html extension. Boilerplate is the standard starting structure used when creating any HTML page.",
        "diagram": "+-------------------------------------------------------+\n|  <!DOCTYPE html>                                      |\n|  <html lang=\"en\">                                     |\n|    <head>                                             |\n|      [Metadata, Title, Viewport, External CSS links]  |\n|    </head>                                            |\n|    <body>                                             |\n|      [Visible Content: Headings, Text, Images, Forms] |\n|    </body>                                            |\n|  </html>                                              |\n+-------------------------------------------------------+"
      },
      {
        "title": "2.3 Understanding Every Part of the Boilerplate",
        "explanation": "A line-by-line breakdown of standard boilerplate components:",
        "table": {
          "headers": [
            "Boilerplate Part",
            "Technical Purpose",
            "Why It Matters"
          ],
          "rows": [
            [
              "<!DOCTYPE html>",
              "Declares modern HTML5",
              "Prevents legacy Quirks Mode rendering bugs"
            ],
            [
              "<html lang=\"en\">",
              "Document root with language",
              "Assists screen readers with pronunciation & SEO"
            ],
            [
              "<head>",
              "Document metadata container",
              "Holds configuration invisible on the page canvas"
            ],
            [
              "<meta charset=\"UTF-8\">",
              "Universal character encoding",
              "Supports all global alphabets, symbols & emojis"
            ],
            [
              "<meta name=\"viewport\"...>",
              "Responsive device-width",
              "Renders at 1:1 physical scale on mobile devices"
            ],
            [
              "<title>",
              "Document title",
              "Shown on browser tab, bookmarks & search results"
            ],
            [
              "<link rel=\"stylesheet\"...>",
              "External stylesheet link",
              "Connects CSS rules from a separate .css file"
            ],
            [
              "<body>",
              "Visible page canvas",
              "Contains all visible text, media, buttons & forms"
            ],
            [
              "<script defer>",
              "External script with defer",
              "Executes JS after HTML parsing, preventing delays"
            ]
          ]
        }
      },
      {
        "title": "2.4 Elements, Tags and Attributes",
        "explanation": "Consider the example: <p class=\"intro\">Welcome to HTML.</p>",
        "bullets": [
          "Opening tag: '<p>' (marks where the element starts).",
          "Content: 'Welcome to HTML.' (the enclosed text or child nodes).",
          "Closing tag: '</p>' (marks where the element ends with a slash).",
          "Element: The complete package (opening tag + content + closing tag).",
          "Attribute: 'class=\"intro\"' gives the element a class that CSS or JavaScript can reference.",
          "Distinction: An element and a tag are related, but not identical: a tag is the markup identifying an element's start or end."
        ],
        "diagram": "  Opening Tag             Content            Closing Tag\n  +-----------+    +--------------------+    +-----------+\n  | <p class=\"intro\"> |    Welcome to HTML.    |    </p>   |\n  +-----------+    +--------------------+    +-----------+\n       |\n    Attribute (class=\"intro\")\n  \n  <====================== COMPLETE ELEMENT ======================>"
      },
      {
        "title": "2.5 Adding CSS and JavaScript & Project Structure",
        "explanation": "HTML connects to external files using relative paths. Keep CSS and JS in dedicated folders as projects grow.",
        "bullets": [
          "'<link rel=\"stylesheet\" href=\"css/style.css\">' inside '<head>'.",
          "'<script src=\"js/script.js\" defer></script>' inside '<body>'.",
          "Paths resolve relative to the HTML file's location."
        ],
        "diagram": "html-css-course/\n├── index.html        (Links: css/style.css & js/script.js)\n├── css/\n│   └── style.css\n└── js/\n    └── script.js"
      }
    ],
    "questions": [
      {
        "id": "q-02-1",
        "prompt": "What does the '<!DOCTYPE html>' declaration do?",
        "options": [
          {
            "id": "a",
            "label": "Tells the browser to render the page in modern HTML5 standards mode instead of quirks mode"
          },
          {
            "id": "b",
            "label": "Downloads the latest version of HTML from the server"
          },
          {
            "id": "c",
            "label": "Connects the document to an external database"
          },
          {
            "id": "d",
            "label": "Encrypts the webpage content"
          }
        ],
        "correctIndex": 0,
        "explanation": "<!DOCTYPE html> instructs the browser to parse the document using modern HTML5 standards mode."
      },
      {
        "id": "q-02-2",
        "prompt": "What is the role of the 'lang' attribute on '<html lang=\"en\">'?",
        "options": [
          {
            "id": "a",
            "label": "Identifies the document's primary language for screen readers, translation tools, and search engines"
          },
          {
            "id": "b",
            "label": "Translates the webpage into English automatically"
          },
          {
            "id": "c",
            "label": "Restricts access to English-speaking countries"
          },
          {
            "id": "d",
            "label": "Sets the font family to English serif"
          }
        ],
        "correctIndex": 0,
        "explanation": "The 'lang' attribute specifies the human language of the page, aiding assistive technologies with pronunciation."
      },
      {
        "id": "q-02-3",
        "prompt": "Why is '<meta charset=\"UTF-8\">' essential in modern HTML?",
        "options": [
          {
            "id": "a",
            "label": "It specifies character encoding supporting virtually all international characters, symbols, and emojis"
          },
          {
            "id": "b",
            "label": "It limits the webpage size to 8 megabytes"
          },
          {
            "id": "c",
            "label": "It prevents users from inspecting the page source code"
          },
          {
            "id": "d",
            "label": "It sets the page font size to 8 pixels"
          }
        ],
        "correctIndex": 0,
        "explanation": "UTF-8 encoding supports global alphabets, special characters, and emojis without garbled symbols."
      },
      {
        "id": "q-02-4",
        "prompt": "What does '<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">' accomplish?",
        "options": [
          {
            "id": "a",
            "label": "Instructs mobile browsers to render at the physical device screen width with 1:1 scale"
          },
          {
            "id": "b",
            "label": "Locks the screen orientation to portrait"
          },
          {
            "id": "c",
            "label": "Disables mobile pinching and zooming"
          },
          {
            "id": "d",
            "label": "Forces mobile dark mode"
          }
        ],
        "correctIndex": 0,
        "explanation": "The viewport meta tag matches page width to device screen width, preventing unwanted mobile zooming."
      },
      {
        "id": "q-02-5",
        "prompt": "Where does text inside the '<title>' element appear?",
        "options": [
          {
            "id": "a",
            "label": "In the browser tab, bookmarks bar, and search engine link headlines"
          },
          {
            "id": "b",
            "label": "As the top <h1> heading on the page canvas"
          },
          {
            "id": "c",
            "label": "In the page footer"
          },
          {
            "id": "d",
            "label": "Only in the developer console"
          }
        ],
        "correctIndex": 0,
        "explanation": "The <title> text is shown on the browser tab, bookmarks, and search engine results."
      },
      {
        "id": "q-02-6",
        "prompt": "What is the difference between an HTML tag and an HTML element?",
        "options": [
          {
            "id": "a",
            "label": "A tag is markup that marks start/end (<p>, </p>); an element is the complete unit including opening tag, content, and closing tag"
          },
          {
            "id": "b",
            "label": "Tags are used in CSS; elements are used in HTML"
          },
          {
            "id": "c",
            "label": "Elements are void; tags always have content"
          },
          {
            "id": "d",
            "label": "There is no difference"
          }
        ],
        "correctIndex": 0,
        "explanation": "Tags (<p> and </p>) delimit the boundaries, while the element is the entire object including its content."
      },
      {
        "id": "q-02-7",
        "prompt": "What is the benefit of adding the 'defer' attribute to an external '<script>' tag?",
        "options": [
          {
            "id": "a",
            "label": "Executes the script after HTML parsing finishes, preserving execution order without blocking the page"
          },
          {
            "id": "b",
            "label": "Prevents other websites from reading your script"
          },
          {
            "id": "c",
            "label": "Runs the script before the HTML head is parsed"
          },
          {
            "id": "d",
            "label": "Disables JavaScript errors"
          }
        ],
        "correctIndex": 0,
        "explanation": "'defer' downloads the script in parallel and delays execution until after HTML parsing is complete."
      },
      {
        "id": "q-02-8",
        "prompt": "Which section of an HTML document holds visible content like headings, text, and buttons?",
        "options": [
          {
            "id": "a",
            "label": "<body>"
          },
          {
            "id": "b",
            "label": "<head>"
          },
          {
            "id": "c",
            "label": "<meta>"
          },
          {
            "id": "d",
            "label": "<title>"
          }
        ],
        "correctIndex": 0,
        "explanation": "Everything visible to the user must be placed inside the <body> container."
      },
      {
        "id": "q-02-9",
        "prompt": "How is an external CSS stylesheet linked to an HTML document?",
        "options": [
          {
            "id": "a",
            "label": "<link rel=\"stylesheet\" href=\"style.css\">"
          },
          {
            "id": "b",
            "label": "<style src=\"style.css\"></style>"
          },
          {
            "id": "c",
            "label": "<css href=\"style.css\">"
          },
          {
            "id": "d",
            "label": "<script rel=\"stylesheet\" src=\"style.css\">"
          }
        ],
        "correctIndex": 0,
        "explanation": "<link rel='stylesheet' href='...'> connects external CSS files."
      },
      {
        "id": "q-02-10",
        "prompt": "If your stylesheet is at 'css/style.css', what relative path should be used in 'index.html'?",
        "options": [
          {
            "id": "a",
            "label": "css/style.css"
          },
          {
            "id": "b",
            "label": "../style.css"
          },
          {
            "id": "c",
            "label": "style.css"
          },
          {
            "id": "d",
            "label": "/style.css"
          }
        ],
        "correctIndex": 0,
        "explanation": "From index.html, entering the 'css' folder requires the relative path 'css/style.css'."
      }
    ]
  },
  {
    "id": "item-03-elements-tags-attributes",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "03. HTML Elements, Tags and Attributes",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 3,
    "contentHeading": "Lesson 03: HTML Elements, Tags and Attributes",
    "contentDescription": "Explore headings (h1-h6), paragraphs, inline formatting elements, links, images, lists, containers (div, span), comments, proper element nesting, and global attributes.",
    "codeSnippet": {
      "language": "HTML",
      "code": "<h1>Web Development</h1>\n<h2>HTML Fundamentals</h2>\n\n<p>\n  Learn <strong>HTML fundamentals</strong> with <em>care</em>. \n  Check the <mark>syntax</mark> carefully.\n</p>\n\n<!-- Generic Containers -->\n<div class=\"course-card\">\n  <h3>HTML Basics</h3>\n  <p>Learn <span class=\"highlight\">HTML</span> today.</p>\n</div>\n\n<!-- Void element -->\n<img src=\"images/student.jpg\" alt=\"A student learning web development\" width=\"400\">"
    },
    "sections": [
      {
        "title": "3.1 Headings ('<h1>' to '<h6>')",
        "explanation": "HTML provides six heading levels from <h1> to <h6>. Use headings to organize content hierarchically, not simply to make text larger or smaller. CSS controls their visual appearance.",
        "bullets": [
          "Hierarchical structure: <h1> is highest level; <h6> is lowest sub-heading.",
          "Best practice: Use a clear heading hierarchy that reflects document structure."
        ]
      },
      {
        "title": "3.2 Paragraphs and Text Formatting",
        "explanation": "The <p> element represents a paragraph. HTML provides specialized inline elements for semantic formatting:",
        "table": {
          "headers": [
            "Element",
            "Semantic Purpose",
            "Example Syntax"
          ],
          "rows": [
            [
              "<strong>",
              "Strong importance (vocal emphasis)",
              "<strong>Warning</strong>"
            ],
            [
              "<em>",
              "Emphasis (alters sentence meaning)",
              "<em>Read carefully</em>"
            ],
            [
              "<b>",
              "Draw attention without extra importance",
              "<b>New</b>"
            ],
            [
              "<i>",
              "Alternative voice or specialized text",
              "<i>Homo sapiens</i>"
            ],
            [
              "<mark>",
              "Highlight relevant text",
              "<mark>Important</mark>"
            ],
            [
              "<small>",
              "Side comments or fine print",
              "<small>Terms apply</small>"
            ],
            [
              "<del>",
              "Deleted text (strikethrough)",
              "<del>₹999</del>"
            ],
            [
              "<ins>",
              "Inserted text (underlined)",
              "<ins>₹799</ins>"
            ],
            [
              "<sub>",
              "Subscript text",
              "H<sub>2</sub>O"
            ],
            [
              "<sup>",
              "Superscript text",
              "x<sup>2</sup>"
            ],
            [
              "<br>",
              "Line break (void element)",
              "Line 1<br>Line 2"
            ],
            [
              "<hr>",
              "Thematic break (horizontal divider)",
              "<hr>"
            ]
          ]
        }
      },
      {
        "title": "3.3 Links & 3.4 Images",
        "explanation": "Connecting resources and embedding graphics:",
        "bullets": [
          "Links ('<a>'): '<a href=\"https://example.com\">Link</a>'. 'href' specifies destination.",
          "Images ('<img>'): '<img src=\"photo.jpg\" alt=\"Description\" width=\"400\">'.",
          "Void Element: '<img>' has no closing tag.",
          "'alt' attribute: Provides text alternative for screen readers and broken image states."
        ]
      },
      {
        "title": "3.5 Lists & 3.6 Containers ('<div>' and '<span>')",
        "explanation": "Organizing items and grouping content:",
        "bullets": [
          "Unordered list ('<ul>'): Bulleted list where order does not matter.",
          "Ordered list ('<ol>'): Numbered list where sequence matters.",
          "'<div>': Generic block-level container used to group elements for styling.",
          "'<span>': Generic inline container used to style words within a line."
        ]
      },
      {
        "title": "3.7 Comments, 3.8 Nesting & 3.9 Global Attributes",
        "explanation": "Rules for maintainable HTML markup:",
        "bullets": [
          "Comments: '<!-- Main page heading -->'. Visible in source; do not put passwords or secret keys here.",
          "Nesting: Tags must close in reverse order of opening (Correct: '<p><strong>Text</strong></p>').",
          "Global Attributes: 'id' (unique identifier), 'class' (reusable styling group), 'title' (tooltip), 'lang' (language), 'hidden' (hides element), 'data-*' (stores custom data)."
        ],
        "table": {
          "headers": [
            "Attribute",
            "Purpose",
            "Rule"
          ],
          "rows": [
            [
              "id",
              "Identifies an element uniquely",
              "Must be unique within the document"
            ],
            [
              "class",
              "Groups elements for CSS/JS",
              "Can be reused across multiple elements"
            ],
            [
              "title",
              "Advisory tooltip information",
              "Displays on hover in desktop browsers"
            ],
            [
              "data-*",
              "Stores custom developer data",
              "Accessible via dataset in JavaScript"
            ]
          ]
        }
      }
    ],
    "questions": [
      {
        "id": "q-03-1",
        "prompt": "Which element indicates deleted text, typically rendered with a strikethrough line?",
        "options": [
          {
            "id": "a",
            "label": "<del>"
          },
          {
            "id": "b",
            "label": "<strike-off>"
          },
          {
            "id": "c",
            "label": "<remove>"
          },
          {
            "id": "d",
            "label": "<hidden>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<del> represents text that has been deleted from a document (e.g., old pricing: <del>₹999</del>)."
      },
      {
        "id": "q-03-2",
        "prompt": "Which tag is used to write chemical formulas like H₂O with subscript numbers?",
        "options": [
          {
            "id": "a",
            "label": "<sub>"
          },
          {
            "id": "b",
            "label": "<sup>"
          },
          {
            "id": "c",
            "label": "<small>"
          },
          {
            "id": "d",
            "label": "<down>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<sub> creates subscript text positioned slightly below the baseline (e.g., H<sub>2</sub>O)."
      },
      {
        "id": "q-03-3",
        "prompt": "What is the difference between '<div>' and '<span>'?",
        "options": [
          {
            "id": "a",
            "label": "<div> is a generic block container; <span> is a generic inline container"
          },
          {
            "id": "b",
            "label": "<span> is a block container; <div> is inline"
          },
          {
            "id": "c",
            "label": "<div> cannot be styled with CSS"
          },
          {
            "id": "d",
            "label": "<span> is deprecated in HTML5"
          }
        ],
        "correctIndex": 0,
        "explanation": "<div> is block-level (starts on a new line), while <span> is inline (flows within text)."
      },
      {
        "id": "q-03-4",
        "prompt": "Which of the following element nestings is valid HTML?",
        "options": [
          {
            "id": "a",
            "label": "<p><strong>Important text</strong></p>"
          },
          {
            "id": "b",
            "label": "<p><strong>Important text</p></strong>"
          },
          {
            "id": "c",
            "label": "<strong><p>Important text</strong></p>"
          },
          {
            "id": "d",
            "label": "<div><p>Important text</div></p>"
          }
        ],
        "correctIndex": 0,
        "explanation": "Elements must close in the reverse order they were opened (LIFO)."
      },
      {
        "id": "q-03-5",
        "prompt": "Why should you NOT put passwords or secret keys in HTML comments (<!-- -->)?",
        "options": [
          {
            "id": "a",
            "label": "HTML comments are sent to the client and visible to anyone viewing the page source code"
          },
          {
            "id": "b",
            "label": "Comments cause JavaScript syntax crashes"
          },
          {
            "id": "c",
            "label": "Comments are deleted automatically by browsers"
          },
          {
            "id": "d",
            "label": "Comments convert text into hyperlinks"
          }
        ],
        "correctIndex": 0,
        "explanation": "Comments are part of the raw HTML sent to the browser and can be read by anyone inspecting page source."
      },
      {
        "id": "q-03-6",
        "prompt": "What is the rule regarding the 'id' attribute in an HTML document?",
        "options": [
          {
            "id": "a",
            "label": "An 'id' value must be unique within the document"
          },
          {
            "id": "b",
            "label": "Every element must share the same 'id'"
          },
          {
            "id": "c",
            "label": "'id' can only be used on <h1> tags"
          },
          {
            "id": "d",
            "label": "'id' is only allowed in JavaScript files"
          }
        ],
        "correctIndex": 0,
        "explanation": "The 'id' attribute uniquely identifies an element; no two elements should share the same id."
      },
      {
        "id": "q-03-7",
        "prompt": "Which element creates a thematic break or horizontal divider line between topics?",
        "options": [
          {
            "id": "a",
            "label": "<hr>"
          },
          {
            "id": "b",
            "label": "<br>"
          },
          {
            "id": "c",
            "label": "<line>"
          },
          {
            "id": "d",
            "label": "<divider>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<hr> represents a thematic break between paragraph-level topics."
      },
      {
        "id": "q-03-8",
        "prompt": "Which element represents mathematical superscript powers, like x²?",
        "options": [
          {
            "id": "a",
            "label": "<sup>"
          },
          {
            "id": "b",
            "label": "<sub>"
          },
          {
            "id": "c",
            "label": "<power>"
          },
          {
            "id": "d",
            "label": "<high>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<sup> displays superscript text positioned slightly above the baseline."
      },
      {
        "id": "q-03-9",
        "prompt": "Which attribute prefix is used to store custom application data on HTML elements?",
        "options": [
          {
            "id": "a",
            "label": "data-*"
          },
          {
            "id": "b",
            "label": "custom-*"
          },
          {
            "id": "c",
            "label": "meta-*"
          },
          {
            "id": "d",
            "label": "var-*"
          }
        ],
        "correctIndex": 0,
        "explanation": "Attributes starting with 'data-' (e.g., data-user-id) store custom data accessible via element.dataset in JS."
      },
      {
        "id": "q-03-10",
        "prompt": "Why should headings be chosen based on hierarchy rather than visual size?",
        "options": [
          {
            "id": "a",
            "label": "Headings communicate semantic structure for screen readers and SEO; visual styling should be handled by CSS"
          },
          {
            "id": "b",
            "label": "Browsers refuse to render headings out of order"
          },
          {
            "id": "c",
            "label": "CSS cannot change heading sizes"
          },
          {
            "id": "d",
            "label": "Headings cannot have colors"
          }
        ],
        "correctIndex": 0,
        "explanation": "Headings provide document outline semantics. Visual font-size should be controlled using CSS."
      }
    ]
  },
  {
    "id": "item-04-links-images-media",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "04. Working with Links, Images and Media",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 4,
    "contentHeading": "Lesson 04: Working with Links, Images and Media",
    "contentDescription": "Master hyperlinks, absolute vs. relative URLs, linking to internal section IDs, new tab security (target='_blank' and rel='noopener'), images and alternative text, native audio, video, and iframe embeds.",
    "codeSnippet": {
      "language": "HTML",
      "code": "<!-- 1. Links -->\n<a href=\"https://example.com\" target=\"_blank\" rel=\"noopener\">Visit Example</a>\n<a href=\"#courses\">Jump to Courses</a>\n\n<!-- 2. Responsive Image -->\n<img src=\"images/classroom.jpg\" alt=\"Students working together in a classroom\" width=\"600\">\n\n<!-- 3. Audio & Video Players -->\n<audio controls>\n  <source src=\"audio/lesson.mp3\" type=\"audio/mpeg\">\n</audio>\n\n<video controls width=\"640\" poster=\"images/lesson-cover.jpg\">\n  <source src=\"videos/lesson.mp4\" type=\"video/mp4\">\n  <track src=\"captions.vtt\" kind=\"subtitles\" srclang=\"en\" label=\"English\">\n</video>"
    },
    "sections": [
      {
        "title": "4.1 Absolute vs. 4.2 Relative URLs",
        "explanation": "Paths define how browsers locate resources across the internet or local server directories:",
        "table": {
          "headers": [
            "URL / Path Type",
            "Example Syntax",
            "How It Resolves"
          ],
          "rows": [
            [
              "Absolute URL",
              "https://developer.mozilla.org/docs",
              "Complete address with protocol & domain"
            ],
            [
              "Same Directory",
              "about.html or ./about.html",
              "File residing in the same folder as current HTML"
            ],
            [
              "Subdirectory",
              "images/logo.png",
              "Enters the 'images' folder inside current directory"
            ],
            [
              "Parent Directory",
              "../index.html",
              "Moves one directory level up into parent folder"
            ]
          ]
        },
        "diagram": "project/\n├── index.html        (From here, link to logo: \"images/logo.png\")\n├── about.html        (From here, link to index: \"index.html\")\n└── images/\n    └── logo.png"
      },
      {
        "title": "4.3 Section Links & 4.4 Opening Links in a New Tab",
        "explanation": "Internal navigation and safe new-tab opening:",
        "bullets": [
          "Linking to Section: Use an element's id: '<a href=\"#courses\">Courses</a>' scrolls to '<section id=\"courses\">'.",
          "New Tab: 'target=\"_blank\"' opens the link in a new tab.",
          "Security Requirement: Always add 'rel=\"noopener\"' with 'target=\"_blank\"' to prevent the opened page from receiving access to your page through 'window.opener'."
        ]
      },
      {
        "title": "4.5 Images and Alternative Text",
        "explanation": "Embedding visual graphics accessibly:",
        "bullets": [
          "Alternative text ('alt'): Helps people using screen readers understand meaningful images.",
          "Decorative images: If an image is purely decorative and adds no information, use empty 'alt=\"\"'.",
          "Responsive CSS Rule: 'img { max-width: 100%; height: auto; }' prevents images from overflowing their container."
        ]
      },
      {
        "title": "4.6 Audio, 4.7 Video & 4.8 Embedding External Content",
        "explanation": "Native HTML5 multimedia elements eliminate the need for third-party plugins:",
        "bullets": [
          "<audio controls>: Embeds audio controls (play, pause, volume).",
          "<video controls poster=\"cover.jpg\">: Embeds native video playback. Use '<track>' for WebVTT captions.",
          "<iframe>: Embeds another webpage or video (e.g., YouTube embed with 'allowfullscreen')."
        ]
      }
    ],
    "questions": [
      {
        "id": "q-04-1",
        "prompt": "Why should you add 'rel=\"noopener\"' when using 'target=\"_blank\"'?",
        "options": [
          {
            "id": "a",
            "label": "Prevents the opened page from accessing the originating window via window.opener"
          },
          {
            "id": "b",
            "label": "Forces the destination page to use dark mode"
          },
          {
            "id": "c",
            "label": "Downloads the destination page as a PDF"
          },
          {
            "id": "d",
            "label": "Speeds up cellular download bandwidth"
          }
        ],
        "correctIndex": 0,
        "explanation": "rel='noopener' prevents reverse tabnabbing security attacks by severs window.opener."
      },
      {
        "id": "q-04-2",
        "prompt": "What does the path '../index.html' indicate?",
        "options": [
          {
            "id": "a",
            "label": "Move up one directory level into the parent folder and open index.html"
          },
          {
            "id": "b",
            "label": "Look inside an 'index' subfolder"
          },
          {
            "id": "c",
            "label": "Look in the root domain directory"
          },
          {
            "id": "d",
            "label": "Reload the current page"
          }
        ],
        "correctIndex": 0,
        "explanation": "'../' traverses one directory level up."
      },
      {
        "id": "q-04-3",
        "prompt": "What should be provided for the 'alt' attribute on a purely decorative image?",
        "options": [
          {
            "id": "a",
            "label": "alt=\"\" (an empty string)"
          },
          {
            "id": "b",
            "label": "Omit the alt attribute entirely"
          },
          {
            "id": "c",
            "label": "alt=\"decorative image\""
          },
          {
            "id": "d",
            "label": "alt=\"none\""
          }
        ],
        "correctIndex": 0,
        "explanation": "An empty alt attribute (alt='') tells screen readers to skip the decorative image silently."
      },
      {
        "id": "q-04-4",
        "prompt": "Which CSS rule prevents embedded images from overflowing their parent container?",
        "options": [
          {
            "id": "a",
            "label": "img { max-width: 100%; height: auto; }"
          },
          {
            "id": "b",
            "label": "img { width: 100vw; }"
          },
          {
            "id": "c",
            "label": "img { overflow: hidden; }"
          },
          {
            "id": "d",
            "label": "img { display: inline; }"
          }
        ],
        "correctIndex": 0,
        "explanation": "max-width: 100% and height: auto keeps the image within container bounds while maintaining aspect ratio."
      },
      {
        "id": "q-04-5",
        "prompt": "How do you link directly to a specific section with 'id=\"pricing\"' on the same page?",
        "options": [
          {
            "id": "a",
            "label": "<a href=\"#pricing\">Pricing</a>"
          },
          {
            "id": "b",
            "label": "<a href=\"pricing\">Pricing</a>"
          },
          {
            "id": "c",
            "label": "<a to=\"pricing\">Pricing</a>"
          },
          {
            "id": "d",
            "label": "<a jump=\"#pricing\">Pricing</a>"
          }
        ],
        "correctIndex": 0,
        "explanation": "The hash symbol followed by the id ('#pricing') navigates directly to that element."
      },
      {
        "id": "q-04-6",
        "prompt": "Which element provides accessible timed text captions or subtitles for HTML5 video?",
        "options": [
          {
            "id": "a",
            "label": "<track>"
          },
          {
            "id": "b",
            "label": "<caption>"
          },
          {
            "id": "c",
            "label": "<subtitle>"
          },
          {
            "id": "d",
            "label": "<label>"
          }
        ],
        "correctIndex": 0,
        "explanation": "The <track> element specifies timed text tracks (captions, subtitles) for video players."
      },
      {
        "id": "q-04-7",
        "prompt": "What attribute displays the browser's default playback buttons (play, pause, volume) on '<video>'?",
        "options": [
          {
            "id": "a",
            "label": "controls"
          },
          {
            "id": "b",
            "label": "buttons"
          },
          {
            "id": "c",
            "label": "autoplay"
          },
          {
            "id": "d",
            "label": "player"
          }
        ],
        "correctIndex": 0,
        "explanation": "The 'controls' boolean attribute displays native audio/video controls."
      },
      {
        "id": "q-04-8",
        "prompt": "What is the purpose of the 'poster' attribute on '<video poster=\"cover.jpg\">'?",
        "options": [
          {
            "id": "a",
            "label": "Specifies a placeholder image shown before video playback begins"
          },
          {
            "id": "b",
            "label": "Posts user comments to the server"
          },
          {
            "id": "c",
            "label": "Prints a video poster to the printer"
          },
          {
            "id": "d",
            "label": "Sets the video thumbnail icon in Google Search"
          }
        ],
        "correctIndex": 0,
        "explanation": "The poster attribute specifies an image to be shown while the video is downloading or until user hits play."
      },
      {
        "id": "q-04-9",
        "prompt": "Which element embeds an external webpage or YouTube video inside your HTML document?",
        "options": [
          {
            "id": "a",
            "label": "<iframe>"
          },
          {
            "id": "b",
            "label": "<embed-page>"
          },
          {
            "id": "c",
            "label": "<external>"
          },
          {
            "id": "d",
            "label": "<window>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<iframe> (inline frame) embeds another HTML page within the current document."
      },
      {
        "id": "q-04-10",
        "prompt": "What is an Absolute URL?",
        "options": [
          {
            "id": "a",
            "label": "A complete destination address including scheme and domain (e.g. https://example.com/page)"
          },
          {
            "id": "b",
            "label": "A path relative to the current file (e.g. about.html)"
          },
          {
            "id": "c",
            "label": "A link that only works offline"
          },
          {
            "id": "d",
            "label": "A link inside a CSS comment"
          }
        ],
        "correctIndex": 0,
        "explanation": "An absolute URL contains the complete address including protocol (https://) and domain."
      }
    ]
  },
  {
    "id": "item-05-lists-and-tables",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "05. HTML Lists and Tables",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 5,
    "contentHeading": "Lesson 05: HTML Lists and Tables",
    "contentDescription": "Structure collections and data matrices: unordered lists, ordered lists with custom numbering styles, nested navigation lists, table anatomy, merging cells with colspan and rowspan, and styling accessible tables.",
    "codeSnippet": {
      "language": "HTML",
      "code": "<!-- Nested List -->\n<ul>\n  <li>Frontend\n    <ul>\n      <li>HTML</li>\n      <li>CSS</li>\n    </ul>\n  </li>\n  <li>Backend</li>\n</ul>\n\n<!-- Semantic Data Table -->\n<table>\n  <caption>Course Details</caption>\n  <thead>\n    <tr>\n      <th scope=\"col\">Course</th>\n      <th scope=\"col\">Duration</th>\n      <th scope=\"col\">Level</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>HTML</td>\n      <td>2 weeks</td>\n      <td>Beginner</td>\n    </tr>\n    <tr>\n      <td>CSS</td>\n      <td>3 weeks</td>\n      <td>Beginner</td>\n    </tr>\n  </tbody>\n</table>"
    },
    "sections": [
      {
        "title": "5.1 Unordered, 5.2 Ordered & 5.3 Nested Lists",
        "explanation": "Lists organize related items cleanly on the page:",
        "bullets": [
          "Unordered list ('<ul>'): Items where order is not significant; normally displayed with bullets.",
          "Ordered list ('<ol>'): Items in a meaningful sequence. Custom numbering styles with 'type=\"1|A|a|I|i\"'.",
          "Nested list: Placed inside another list item ('<li>'). Useful for menus, course outlines, and hierarchical sitemaps."
        ],
        "diagram": "+-------------------------------------------------------------+\n|                        HTML LISTS                           |\n+-------------------------------------------------------------+\n| <ul> (Unordered)      | <ol> (Ordered)        | Nested Lists|\n| - Bullet point 1      | 1. Step one           | - Frontend  |\n| - Bullet point 2      | 2. Step two           |   * HTML    |\n| - Bullet point 3      | 3. Step three         |   * CSS     |\n+-------------------------------------------------------------+"
      },
      {
        "title": "5.4 HTML Tables & 5.5 Understanding Table Elements",
        "explanation": "Tables display information organized into rows and columns. They are appropriate for tabular data, not as the primary technique for page layout.",
        "table": {
          "headers": [
            "Table Element",
            "Purpose in Data Grid",
            "Accessibility Role"
          ],
          "rows": [
            [
              "<table>",
              "Defines the outer table container",
              "Wraps all tabular content"
            ],
            [
              "<caption>",
              "Provides a table title or description",
              "Read first by screen readers"
            ],
            [
              "<thead>",
              "Groups column header rows",
              "Contains column title cells"
            ],
            [
              "<tbody>",
              "Groups the main data rows",
              "Contains primary data entries"
            ],
            [
              "<tfoot>",
              "Groups summary or totals rows",
              "Calculations, footnotes, totals"
            ],
            [
              "<tr>",
              "Defines a single table row",
              "Row wrapper for th and td cells"
            ],
            [
              "<th>",
              "Defines a header cell",
              "Use scope='col' or scope='row'"
            ],
            [
              "<td>",
              "Defines a standard data cell",
              "Holds individual data values"
            ]
          ]
        }
      },
      {
        "title": "5.6 Merging Table Cells ('colspan' & 'rowspan')",
        "explanation": "Cells can span across multiple columns horizontally or multiple rows vertically:",
        "bullets": [
          "'colspan=\"2\"': Merges a cell across 2 columns horizontally.",
          "'rowspan=\"2\"': Merges a cell across 2 rows vertically."
        ],
        "diagram": "COLSPAN Example (Horizontal):\n+-------------------------------+\n|     Student Info (colspan=2)  |\n+---------------+---------------+\n| Name: Ravi    | Grade: A      |\n+---------------+---------------+\n\nROWSPAN Example (Vertical):\n+---------------+---------------+\n| Frontend      | HTML          |\n| (rowspan=2)   +---------------+\n|               | CSS           |\n+---------------+---------------+"
      },
      {
        "title": "5.7 Styling a Table with CSS",
        "explanation": "Best practices for table presentation:",
        "bullets": [
          "Use 'border-collapse: collapse;' to eliminate double borders between cells.",
          "Add padding to 'th' and 'td' for clear legibility.",
          "Provide distinct background colors for 'thead' to separate headers from data."
        ],
        "codeSnippet": {
          "language": "CSS",
          "filename": "table-styles.css",
          "code": "table {\n  width: 100%;\n  border-collapse: collapse;\n}\nth, td {\n  border: 1px solid #d1d5db;\n  padding: 12px;\n  text-align: left;\n}\nthead {\n  background-color: #e8efff;\n}"
        }
      }
    ],
    "questions": [
      {
        "id": "q-05-1",
        "prompt": "Where must a nested sub-list be placed within an outer list?",
        "options": [
          {
            "id": "a",
            "label": "Inside a parent <li> element"
          },
          {
            "id": "b",
            "label": "Directly between two <li> tags inside <ul>"
          },
          {
            "id": "c",
            "label": "Outside the <ul> completely"
          },
          {
            "id": "d",
            "label": "Inside the <head> element"
          }
        ],
        "correctIndex": 0,
        "explanation": "In valid HTML, nested lists must always reside inside a parent <li> element."
      },
      {
        "id": "q-05-2",
        "prompt": "What does 'scope=\"col\"' on a '<th>' tag indicate?",
        "options": [
          {
            "id": "a",
            "label": "It identifies the header as applying to all cells in that vertical column"
          },
          {
            "id": "b",
            "label": "It sorts the column alphabetically"
          },
          {
            "id": "c",
            "label": "It changes column background color"
          },
          {
            "id": "d",
            "label": "It merges the column with adjacent columns"
          }
        ],
        "correctIndex": 0,
        "explanation": "The 'scope' attribute creates a semantic link for screen readers, announcing which column header a cell belongs to."
      },
      {
        "id": "q-05-3",
        "prompt": "Which attribute spans a table cell across two rows vertically?",
        "options": [
          {
            "id": "a",
            "label": "rowspan=\"2\""
          },
          {
            "id": "b",
            "label": "colspan=\"2\""
          },
          {
            "id": "c",
            "label": "span=\"2\""
          },
          {
            "id": "d",
            "label": "height=\"2row\""
          }
        ],
        "correctIndex": 0,
        "explanation": "rowspan='2' merges a cell vertically down across 2 rows."
      },
      {
        "id": "q-05-4",
        "prompt": "Which element provides an accessible title or caption placed directly at the top of a '<table>'?",
        "options": [
          {
            "id": "a",
            "label": "<caption>"
          },
          {
            "id": "b",
            "label": "<title>"
          },
          {
            "id": "c",
            "label": "<header>"
          },
          {
            "id": "d",
            "label": "<label>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<caption> provides a title or summary for a table."
      },
      {
        "id": "q-05-5",
        "prompt": "What CSS property removes the double borders between adjacent table cells?",
        "options": [
          {
            "id": "a",
            "label": "border-collapse: collapse;"
          },
          {
            "id": "b",
            "label": "border-spacing: none;"
          },
          {
            "id": "c",
            "label": "cell-spacing: 0;"
          },
          {
            "id": "d",
            "label": "table-border: single;"
          }
        ],
        "correctIndex": 0,
        "explanation": "border-collapse: collapse merges adjacent borders into a single clean border."
      },
      {
        "id": "q-05-6",
        "prompt": "What numbering styles are supported by the 'type' attribute on an ordered list (<ol>)?",
        "options": [
          {
            "id": "a",
            "label": "1, A, a, I, and i"
          },
          {
            "id": "b",
            "label": "Roman only"
          },
          {
            "id": "c",
            "label": "Numbers only"
          },
          {
            "id": "d",
            "label": "Any English word"
          }
        ],
        "correctIndex": 0,
        "explanation": "The type attribute on <ol> supports decimal numbers (1), uppercase letters (A), lowercase letters (a), and Roman numerals (I, i)."
      },
      {
        "id": "q-05-7",
        "prompt": "Which section of a table is used to group summary data like totals or averages?",
        "options": [
          {
            "id": "a",
            "label": "<tfoot>"
          },
          {
            "id": "b",
            "label": "<tbody>"
          },
          {
            "id": "c",
            "label": "<thead>"
          },
          {
            "id": "d",
            "label": "<summary>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<tfoot> groups the footer summary content of a table."
      },
      {
        "id": "q-05-8",
        "prompt": "Should tables be used as the primary technique for overall webpage layout?",
        "options": [
          {
            "id": "a",
            "label": "No, tables are strictly for tabular data; modern CSS Flexbox and Grid should be used for layout"
          },
          {
            "id": "b",
            "label": "Yes, tables are the most modern layout method"
          },
          {
            "id": "c",
            "label": "Yes, but only on mobile devices"
          },
          {
            "id": "d",
            "label": "Only if the page has three columns"
          }
        ],
        "correctIndex": 0,
        "explanation": "Tables must only be used for tabular data, not for general page layout."
      },
      {
        "id": "q-05-9",
        "prompt": "What is the difference between '<th>' and '<td>'?",
        "options": [
          {
            "id": "a",
            "label": "<th> is a header cell with semantic meaning; <td> is a standard data cell"
          },
          {
            "id": "b",
            "label": "<th> is for numbers; <td> is for text"
          },
          {
            "id": "c",
            "label": "<td> cannot be styled with CSS"
          },
          {
            "id": "d",
            "label": "<th> cannot have borders"
          }
        ],
        "correctIndex": 0,
        "explanation": "<th> defines a header cell, while <td> defines standard tabular data."
      },
      {
        "id": "q-05-10",
        "prompt": "Which attribute spans a table cell across two columns horizontally?",
        "options": [
          {
            "id": "a",
            "label": "colspan=\"2\""
          },
          {
            "id": "b",
            "label": "rowspan=\"2\""
          },
          {
            "id": "c",
            "label": "width=\"2col\""
          },
          {
            "id": "d",
            "label": "span=\"2\""
          }
        ],
        "correctIndex": 0,
        "explanation": "colspan='2' merges a cell horizontally across 2 columns."
      }
    ]
  },
  {
    "id": "item-06-forms-and-inputs",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "06. HTML Forms and Input Elements",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 6,
    "contentHeading": "Lesson 06: HTML Forms and Input Elements",
    "contentDescription": "Capture user input: form structure, input types, explicit label bindings, buttons, radio buttons, checkboxes, select dropdowns, textareas, native validation, and GET vs. POST.",
    "codeSnippet": {
      "language": "HTML",
      "code": "<form action=\"/register\" method=\"post\">\n  <label for=\"name\">Full Name</label>\n  <input type=\"text\" id=\"name\" name=\"fullName\" required>\n\n  <label for=\"email\">Email Address</label>\n  <input type=\"email\" id=\"email\" name=\"email\" placeholder=\"you@example.com\" required>\n\n  <fieldset>\n    <legend>Account Type</legend>\n    <label><input type=\"radio\" name=\"account\" value=\"student\" checked> Student</label>\n    <label><input type=\"radio\" name=\"account\" value=\"teacher\"> Teacher</label>\n  </fieldset>\n\n  <label for=\"course\">Choose a course</label>\n  <select id=\"course\" name=\"course\" required>\n    <option value=\"\">Select a course</option>\n    <option value=\"html\">HTML</option>\n    <option value=\"css\">CSS</option>\n  </select>\n\n  <label for=\"message\">Your Message</label>\n  <textarea id=\"message\" name=\"message\" rows=\"4\"></textarea>\n\n  <button type=\"submit\">Register</button>\n</form>"
    },
    "sections": [
      {
        "title": "6.1 What is an HTML Form? & 6.2 Basic Structure",
        "explanation": "An HTML form collects information from users (login pages, registration forms, contact forms, surveys). The <form> element groups form controls and defines how data is submitted.",
        "bullets": [
          "'action': Specifies the URL that receives the submitted form data.",
          "'method': Specifies the HTTP method used for submission ('get' or 'post').",
          "'name': Identifies a control in the submitted data payload.",
          "'required': Prevents submission when a field is missing.",
          "'id': Identifies the element and connects it to its label.",
          "Note: Processing or storing data usually requires a server or backend service."
        ]
      },
      {
        "title": "6.3 Common Input Types",
        "explanation": "The <input> element supports different types depending on the data being collected:",
        "table": {
          "headers": [
            "Input Type",
            "Purpose",
            "Example Field"
          ],
          "rows": [
            [
              "text",
              "General text entry",
              "Full Name"
            ],
            [
              "email",
              "Email address with native format check",
              "name@example.com"
            ],
            [
              "password",
              "Masked password entry",
              "Hidden characters"
            ],
            [
              "number",
              "Numeric input with min/max steppers",
              "Age, Quantity"
            ],
            [
              "tel",
              "Telephone number (phone keypad on mobile)",
              "Phone Number"
            ],
            [
              "date",
              "Date selection calendar",
              "Date of birth"
            ],
            [
              "radio",
              "One choice from a mutually exclusive group",
              "Course level"
            ],
            [
              "checkbox",
              "Independent multiple selections",
              "Interests, Terms"
            ],
            [
              "file",
              "File selection and upload",
              "Resume upload"
            ],
            [
              "url",
              "Website address",
              "Portfolio link"
            ],
            [
              "search",
              "Search input with quick clear button",
              "Course search"
            ],
            [
              "submit",
              "Submits the enclosing form",
              "Submit button"
            ],
            [
              "reset",
              "Resets controls to initial values",
              "Reset button"
            ]
          ]
        }
      },
      {
        "title": "6.4 Labels, 6.5 Radios, 6.6 Checkboxes & 6.7 Dropdowns",
        "explanation": "Controls for selection and user guidance:",
        "bullets": [
          "<label for=\"id\">: Connected via 'for' matching input 'id'. Clicking label activates input; critical for screen readers.",
          "Radio buttons ('type=\"radio\"'): Select one option from a group. Grouped when they share the same 'name'.",
          "Checkboxes ('type=\"checkbox\"'): Select multiple independent options simultaneously.",
          "Dropdown ('<select>' and '<option>'): Collapsible list; display text is what users see, 'value' attribute is what gets submitted.",
          "Textarea ('<textarea>'): Multiline text entry with opening and closing tags."
        ]
      },
      {
        "title": "6.9 Buttons, 6.10 Fieldset/Legend & 6.11 Validation",
        "explanation": "Grouping controls and validating data before submission:",
        "bullets": [
          "<button type=\"submit\"> (submits form), <button type=\"reset\"> (resets fields), <button type=\"button\"> (custom JS action).",
          "<fieldset> groups related controls; <legend> provides a caption for the group.",
          "Validation: 'required', 'minlength=\"8\"', 'type=\"email\"'. Client validation improves UX, but server validation is mandatory for security."
        ]
      },
      {
        "title": "6.12 GET vs. POST Submission Methods",
        "explanation": "Understanding HTTP submission methods:",
        "table": {
          "headers": [
            "Feature",
            "GET Method",
            "POST Method"
          ],
          "rows": [
            [
              "Data Location",
              "Appended to URL query string (/search?q=HTML)",
              "Sent in HTTP request body"
            ],
            [
              "Best For",
              "Searches, filters, bookmarkable queries",
              "Creating/updating accounts, logins, payments"
            ],
            [
              "Bookmarking",
              "URLs can be bookmarked and shared",
              "Cannot be bookmarked directly"
            ],
            [
              "Security",
              "Sensitive info visible in browser history",
              "Data not in URL; requires HTTPS for encryption"
            ]
          ]
        }
      }
    ],
    "questions": [
      {
        "id": "q-06-1",
        "prompt": "Why should login forms use 'method=\"post\"' instead of 'method=\"get\"'?",
        "options": [
          {
            "id": "a",
            "label": "POST transmits data in the request body; GET exposes passwords in the visible URL query string"
          },
          {
            "id": "b",
            "label": "GET cannot transmit characters"
          },
          {
            "id": "c",
            "label": "POST is only supported on mobile devices"
          },
          {
            "id": "d",
            "label": "POST automatically encrypts data without HTTPS"
          }
        ],
        "correctIndex": 0,
        "explanation": "GET places form fields in the browser address bar where credentials would be logged in history. POST sends data inside the request body."
      },
      {
        "id": "q-06-2",
        "prompt": "How is a '<label>' explicitly connected to an '<input id=\"username\">'?",
        "options": [
          {
            "id": "a",
            "label": "Setting <label for=\"username\">"
          },
          {
            "id": "b",
            "label": "Setting <label name=\"username\">"
          },
          {
            "id": "c",
            "label": "Placing them on the same line"
          },
          {
            "id": "d",
            "label": "Setting <label input=\"username\">"
          }
        ],
        "correctIndex": 0,
        "explanation": "The 'for' attribute on the label must match the 'id' on the input."
      },
      {
        "id": "q-06-3",
        "prompt": "What attribute must radio buttons share so that selecting one automatically deselects the others?",
        "options": [
          {
            "id": "a",
            "label": "name"
          },
          {
            "id": "b",
            "label": "id"
          },
          {
            "id": "c",
            "label": "value"
          },
          {
            "id": "d",
            "label": "class"
          }
        ],
        "correctIndex": 0,
        "explanation": "Radio buttons sharing the same 'name' attribute form a mutually exclusive group."
      },
      {
        "id": "q-06-4",
        "prompt": "What is the difference between radio buttons and checkboxes?",
        "options": [
          {
            "id": "a",
            "label": "Radio buttons allow only one choice from a group; checkboxes allow multiple independent selections"
          },
          {
            "id": "b",
            "label": "Checkboxes are round; radio buttons are square"
          },
          {
            "id": "c",
            "label": "Checkboxes submit data via GET; radios via POST"
          },
          {
            "id": "d",
            "label": "There is no functional difference"
          }
        ],
        "correctIndex": 0,
        "explanation": "Radio buttons represent mutually exclusive choices; checkboxes represent independent binary selections."
      },
      {
        "id": "q-06-5",
        "prompt": "Which element provides a caption for a '<fieldset>' grouping?",
        "options": [
          {
            "id": "a",
            "label": "<legend>"
          },
          {
            "id": "b",
            "label": "<caption>"
          },
          {
            "id": "c",
            "label": "<label>"
          },
          {
            "id": "d",
            "label": "<header>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<legend> provides a caption for the grouping created by <fieldset>."
      },
      {
        "id": "q-06-6",
        "prompt": "Which button type should be used when triggering custom JavaScript actions without submitting the form?",
        "options": [
          {
            "id": "a",
            "label": "type=\"button\""
          },
          {
            "id": "b",
            "label": "type=\"submit\""
          },
          {
            "id": "c",
            "label": "type=\"reset\""
          },
          {
            "id": "d",
            "label": "type=\"action\""
          }
        ],
        "correctIndex": 0,
        "explanation": "'type=\"button\"' does not submit the form, making it ideal for JavaScript modal toggles or custom interactions."
      },
      {
        "id": "q-06-7",
        "prompt": "Does HTML5 client-side form validation eliminate the need for server-side validation?",
        "options": [
          {
            "id": "a",
            "label": "No, client validation improves UX, but server validation is mandatory because browser checks can be bypassed"
          },
          {
            "id": "b",
            "label": "Yes, HTML5 validation is 100% secure"
          },
          {
            "id": "c",
            "label": "Yes, modern browsers block all malicious requests"
          },
          {
            "id": "d",
            "label": "Server validation is deprecated"
          }
        ],
        "correctIndex": 0,
        "explanation": "Client validation can be bypassed by malicious users or automated scripts; server-side validation is required for security."
      },
      {
        "id": "q-06-8",
        "prompt": "What does the 'placeholder' attribute do on an input field?",
        "options": [
          {
            "id": "a",
            "label": "Provides a brief hint inside the field before the user enters a value (should not replace a label)"
          },
          {
            "id": "b",
            "label": "Submits default data if left empty"
          },
          {
            "id": "c",
            "label": "Enforces password complexity"
          },
          {
            "id": "d",
            "label": "Locks the field from editing"
          }
        ],
        "correctIndex": 0,
        "explanation": "A placeholder offers a temporary hint, but does not substitute for an accessible <label>."
      },
      {
        "id": "q-06-9",
        "prompt": "Which element is used to collect multiline text messages or user feedback?",
        "options": [
          {
            "id": "a",
            "label": "<textarea>"
          },
          {
            "id": "b",
            "label": "<input type=\"multiline\">"
          },
          {
            "id": "c",
            "label": "<textbox>"
          },
          {
            "id": "d",
            "label": "<input type=\"textarea\">"
          }
        ],
        "correctIndex": 0,
        "explanation": "<textarea> has opening and closing tags and accommodates multiline text."
      },
      {
        "id": "q-06-10",
        "prompt": "What happens if an input element lacks a 'name' attribute upon form submission?",
        "options": [
          {
            "id": "a",
            "label": "Its data is omitted from the submission payload"
          },
          {
            "id": "b",
            "label": "The browser throws a JavaScript syntax error"
          },
          {
            "id": "c",
            "label": "The form automatically converts to GET"
          },
          {
            "id": "d",
            "label": "The page reloads in Quirks Mode"
          }
        ],
        "correctIndex": 0,
        "explanation": "The 'name' attribute is the key sent in the submission payload. Without it, the value is not transmitted."
      }
    ]
  },
  {
    "id": "item-07-semantic-html",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "07. Semantic HTML",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 7,
    "contentHeading": "Lesson 07: Semantic HTML",
    "contentDescription": "Understand semantic markup vs. non-semantic div soup, essential landmark elements (<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>), figure/figcaption, time, and why semantics matter for accessibility and SEO.",
    "codeSnippet": {
      "language": "HTML",
      "code": "<header>\n  <nav aria-label=\"Main navigation\">\n    <a href=\"/\">Home</a>\n    <a href=\"/courses.html\">Courses</a>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h1>HTML Basics</h1>\n    <p>Published on <time datetime=\"2026-10-15\">October 15, 2026</time></p>\n    <p>Learn how HTML structures web content.</p>\n    <figure>\n      <img src=\"images/html-structure.png\" alt=\"Diagram showing the structure of an HTML document\">\n      <figcaption>The basic structure of an HTML document.</figcaption>\n    </figure>\n  </article>\n</main>\n\n<footer>\n  <p>&copy; 2026 BlezeX</p>\n</footer>"
    },
    "sections": [
      {
        "title": "7.1 What is Semantic HTML? & 7.2 Semantic vs. Non-Semantic",
        "explanation": "Semantic HTML means choosing elements based on the meaning and purpose of their content. Semantic elements help browsers, search engines, developers, and assistive technologies understand webpage organization.",
        "diagram": "NON-SEMANTIC (Div Soup):           SEMANTIC HTML5:\n+--------------------------+     +--------------------------+\n| <div class=\"header\">     |     | <header>                 |\n|   <div class=\"nav\">...   |     |   <nav>...               |\n+--------------------------+     +--------------------------+\n| <div class=\"content\">    |     | <main>                   |\n|   <div class=\"article\">..|     |   <article>...           |\n+--------------------------+     +--------------------------+\n| <div class=\"footer\">     |     | <footer>                 |\n+--------------------------+     +--------------------------+"
      },
      {
        "title": "7.3 Important Semantic Elements",
        "explanation": "Core semantic elements and their dedicated roles:",
        "table": {
          "headers": [
            "Element",
            "Semantic Purpose",
            "Key Characteristic"
          ],
          "rows": [
            [
              "<header>",
              "Introductory content for a page or section",
              "Contains logo, nav, search"
            ],
            [
              "<nav>",
              "Major navigation links",
              "Dedicated to primary site menus"
            ],
            [
              "<main>",
              "The page's primary unique content",
              "Normally one visible per document"
            ],
            [
              "<section>",
              "A thematic grouping of content",
              "Usually accompanied by a heading"
            ],
            [
              "<article>",
              "Self-contained independent content",
              "Can stand on its own (blog, card)"
            ],
            [
              "<aside>",
              "Related or supplementary content",
              "Sidebars, callout boxes, ads"
            ],
            [
              "<footer>",
              "Footer information for a page/section",
              "Copyright, legal, sitemaps"
            ],
            [
              "<figure>",
              "Self-contained media (illustration/diagram)",
              "Encapsulates media with caption"
            ],
            [
              "<figcaption>",
              "Caption for a figure",
              "Placed inside <figure>"
            ],
            [
              "<time>",
              "Machine-readable date or time",
              "Standardized datetime value"
            ],
            [
              "<address>",
              "Contact info for author/organization",
              "Email, physical address"
            ]
          ]
        }
      },
      {
        "title": "7.4 Understanding <main>, <section> and <article>",
        "explanation": "These elements are not interchangeable:",
        "bullets": [
          "'<main>': Contains the main unique content. A page normally has one visible main content region.",
          "'<section>': Groups related content, usually with an h2-h6 heading.",
          "'<article>': Represents a self-contained piece of content, such as a news article, blog post, or independently reusable course card."
        ]
      },
      {
        "title": "7.5 Figure & 7.6 Time Element",
        "explanation": "Captioned media and standardized dates:",
        "bullets": [
          "'<figure>' and '<figcaption>': Use when an image, diagram, or code sample has an associated caption.",
          "'<time datetime=\"2026-10-15\">': Standardized representation that software, search engines, and calendars can interpret."
        ]
      },
      {
        "title": "7.7 Why Semantic HTML Matters",
        "explanation": "The four key benefits of writing semantic code:",
        "bullets": [
          "Accessibility: Helps assistive technologies identify page landmarks and content roles.",
          "Maintainability: Makes the code easier for developers to read and understand.",
          "SEO: Helps search engines interpret content hierarchy and keyword relevance.",
          "Consistency: Encourages meaningful, standard document structures."
        ]
      }
    ],
    "questions": [
      {
        "id": "q-07-1",
        "prompt": "What is the primary difference between '<article>' and '<section>'?",
        "options": [
          {
            "id": "a",
            "label": "<article> represents self-contained content that can stand independently; <section> is a thematic grouping of related content"
          },
          {
            "id": "b",
            "label": "<article> is only for newspapers; <section> is for blogs"
          },
          {
            "id": "c",
            "label": "<section> cannot contain headings"
          },
          {
            "id": "d",
            "label": "<article> is an inline element"
          }
        ],
        "correctIndex": 0,
        "explanation": "An <article> stands alone as an independent composition (syndicatable), while a <section> is a thematic grouping."
      },
      {
        "id": "q-07-2",
        "prompt": "How many visible '<main>' landmark elements should be on a single webpage?",
        "options": [
          {
            "id": "a",
            "label": "One visible main region per page"
          },
          {
            "id": "b",
            "label": "One per section"
          },
          {
            "id": "c",
            "label": "Up to six"
          },
          {
            "id": "d",
            "label": "Exactly two (desktop and mobile)"
          }
        ],
        "correctIndex": 0,
        "explanation": "There should only be one visible <main> element representing the primary unique content."
      },
      {
        "id": "q-07-3",
        "prompt": "Which element is appropriate for sidebars or tangentially related content?",
        "options": [
          {
            "id": "a",
            "label": "<aside>"
          },
          {
            "id": "b",
            "label": "<sidebar>"
          },
          {
            "id": "c",
            "label": "<section>"
          },
          {
            "id": "d",
            "label": "<nav>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<aside> is designated for supplementary or tangential content like sidebars."
      },
      {
        "id": "q-07-4",
        "prompt": "Which element pairs with '<figure>' to provide an official caption for an illustration or diagram?",
        "options": [
          {
            "id": "a",
            "label": "<figcaption>"
          },
          {
            "id": "b",
            "label": "<caption>"
          },
          {
            "id": "c",
            "label": "<label>"
          },
          {
            "id": "d",
            "label": "<title>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<figcaption> resides inside a <figure> to provide its caption."
      },
      {
        "id": "q-07-5",
        "prompt": "What is the purpose of the 'datetime' attribute on '<time datetime=\"2026-10-15\">'?",
        "options": [
          {
            "id": "a",
            "label": "Provides a standardized machine-readable date that software and search engines can interpret"
          },
          {
            "id": "b",
            "label": "Starts a digital countdown timer"
          },
          {
            "id": "c",
            "label": "Sets the font size of the date"
          },
          {
            "id": "d",
            "label": "Calculates the user's age in JavaScript"
          }
        ],
        "correctIndex": 0,
        "explanation": "The 'datetime' attribute supplies an unambiguous ISO-formatted date for machines."
      },
      {
        "id": "q-07-6",
        "prompt": "Which element contains contact information for the author or owner of a document?",
        "options": [
          {
            "id": "a",
            "label": "<address>"
          },
          {
            "id": "b",
            "label": "<contact>"
          },
          {
            "id": "c",
            "label": "<author>"
          },
          {
            "id": "d",
            "label": "<mail>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<address> represents contact details for the author or organization."
      },
      {
        "id": "q-07-7",
        "prompt": "Why does semantic HTML improve web accessibility?",
        "options": [
          {
            "id": "a",
            "label": "Screen readers can identify page landmarks and allow users to skip directly to main content or navigation"
          },
          {
            "id": "b",
            "label": "It translates the site into Braille automatically"
          },
          {
            "id": "c",
            "label": "It forces audio playback on page load"
          },
          {
            "id": "d",
            "label": "It enlarges text on all devices"
          }
        ],
        "correctIndex": 0,
        "explanation": "Assistive technologies use semantic landmarks (<nav>, <main>, <header>) to let users navigate efficiently."
      },
      {
        "id": "q-07-8",
        "prompt": "Can a '<main>' element be nested inside a '<header>' or '<footer>'?",
        "options": [
          {
            "id": "a",
            "label": "No, <main> cannot be a descendant of <header>, <nav>, or <footer>"
          },
          {
            "id": "b",
            "label": "Yes, it is encouraged in HTML5"
          },
          {
            "id": "c",
            "label": "Only inside <header>"
          },
          {
            "id": "d",
            "label": "Only if given class='main'"
          }
        ],
        "correctIndex": 0,
        "explanation": "By HTML5 specification, <main> must not be placed inside <header>, <nav>, or <footer>."
      },
      {
        "id": "q-07-9",
        "prompt": "Which element is dedicated to major navigation link groups?",
        "options": [
          {
            "id": "a",
            "label": "<nav>"
          },
          {
            "id": "b",
            "label": "<menu-bar>"
          },
          {
            "id": "c",
            "label": "<links>"
          },
          {
            "id": "d",
            "label": "<header>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<nav> is the landmark element for major navigation links."
      },
      {
        "id": "q-07-10",
        "prompt": "What is 'div soup'?",
        "options": [
          {
            "id": "a",
            "label": "Code overusing generic <div> tags with classes rather than meaningful semantic HTML5 elements"
          },
          {
            "id": "b",
            "label": "A CSS layout library"
          },
          {
            "id": "c",
            "label": "A JavaScript data structure"
          },
          {
            "id": "d",
            "label": "A web design recipe template"
          }
        ],
        "correctIndex": 0,
        "explanation": "'Div soup' describes cluttered code dominated by generic <div> containers lacking semantic meaning."
      }
    ]
  },
  {
    "id": "item-08-intro-css-syntax",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "08. Introduction to CSS and CSS Syntax",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 8,
    "contentHeading": "Lesson 08: Introduction to CSS and CSS Syntax",
    "contentDescription": "Understand what CSS is, rule syntax (selectors, declarations, properties, values), three ways to add CSS (inline, internal, external), CSS comments, and basic properties.",
    "codeSnippet": {
      "language": "CSS",
      "code": "/* Ruleset Anatomy */\nh1 {\n  color: blue;\n  font-size: 32px;\n}\n\n/* Component Styling */\n.card {\n  color: #222222;\n  background-color: white;\n  font-size: 18px;\n  padding: 20px;\n  margin: 16px;\n  border: 1px solid #dddddd;\n  border-radius: 8px;\n}"
    },
    "sections": [
      {
        "title": "8.1 What is CSS? & 8.2 CSS Rule Syntax",
        "explanation": "CSS stands for Cascading Style Sheets. It describes how HTML elements should look and how they should be laid out on the screen (colors, fonts, spacing, borders, positioning).",
        "bullets": [
          "'h1': Selector (identifies which element to style).",
          "'{ ... }': Declaration block.",
          "'color: blue;': A declaration (property + value separated by colon, ending in semicolon)."
        ],
        "diagram": "  SELECTOR       DECLARATION BLOCK\n  +------+     +-----------------------------------+\n  |  h1  |     | {                                 |\n  +------+     |   color: blue;     <-- Declaration|\n               |   font-size: 32px; <-- Declaration|\n               | }                                 |\n               +-----------------------------------+\n                    |         |\n                PROPERTY    VALUE"
      },
      {
        "title": "8.3 Three Ways to Add CSS",
        "explanation": "How styles are connected to HTML documents:",
        "table": {
          "headers": [
            "Method",
            "Where It Is Written",
            "Best Use Case"
          ],
          "rows": [
            [
              "1. Inline CSS",
              "Directly in element's style attribute (<h1 style='...'>)",
              "Quick demonstrations or isolated tests"
            ],
            [
              "2. Internal CSS",
              "Inside <style> element in document's <head>",
              "Small standalone pages or single-file demos"
            ],
            [
              "3. External CSS",
              "In separate .css file linked via <link>",
              "Production standard: reusable across pages, cached"
            ]
          ]
        }
      },
      {
        "title": "8.4 CSS Comments",
        "explanation": "Comments explain the purpose of CSS declarations and are ignored by the parser:",
        "codeSnippet": {
          "language": "CSS",
          "filename": "comments.css",
          "code": "/* Main heading styles */\nh1 {\n  color: navy;\n}"
        }
      },
      {
        "title": "8.5 Basic CSS Properties",
        "explanation": "Core styling properties every developer uses:",
        "table": {
          "headers": [
            "Property",
            "Styling Purpose",
            "Example Syntax"
          ],
          "rows": [
            [
              "color",
              "Sets text color",
              "color: #222222;"
            ],
            [
              "background-color",
              "Sets element backdrop color",
              "background-color: white;"
            ],
            [
              "font-size",
              "Controls text size",
              "font-size: 18px;"
            ],
            [
              "padding",
              "Adds space inside the border",
              "padding: 20px;"
            ],
            [
              "margin",
              "Adds space outside the border",
              "margin: 16px;"
            ],
            [
              "border",
              "Draws a perimeter line",
              "border: 1px solid #dddddd;"
            ],
            [
              "border-radius",
              "Rounds the corners of the box",
              "border-radius: 8px;"
            ]
          ]
        }
      },
      {
        "title": "8.6 CSS Selectors: An Introduction",
        "explanation": "Basic selector types targeting HTML:",
        "bullets": [
          "'p { color: gray; }': Selects paragraph elements.",
          "'.highlight { color: orange; }': Selects elements with class='highlight'.",
          "'#main-title { color: navy; }': Selects the element with id='main-title'.",
          "Common mistakes: Forgetting the semicolon between declarations, misspelling property names, or incorrect stylesheet paths."
        ]
      }
    ],
    "questions": [
      {
        "id": "q-08-1",
        "prompt": "In the CSS declaration 'color: blue;', what is 'color'?",
        "options": [
          {
            "id": "a",
            "label": "Property"
          },
          {
            "id": "b",
            "label": "Value"
          },
          {
            "id": "c",
            "label": "Selector"
          },
          {
            "id": "d",
            "label": "Declaration block"
          }
        ],
        "correctIndex": 0,
        "explanation": "'color' is the CSS property; 'blue' is the assigned value."
      },
      {
        "id": "q-08-2",
        "prompt": "Why is External CSS the preferred approach for production websites?",
        "options": [
          {
            "id": "a",
            "label": "Styles can be reused across multiple pages, cached by browsers, and maintained independently of content"
          },
          {
            "id": "b",
            "label": "Inline styles cannot display colors"
          },
          {
            "id": "c",
            "label": "External CSS runs faster on servers"
          },
          {
            "id": "d",
            "label": "Internal styles require JavaScript"
          }
        ],
        "correctIndex": 0,
        "explanation": "External CSS separates structure and presentation, is cached by browsers, and styles entire multi-page sites."
      },
      {
        "id": "q-08-3",
        "prompt": "What character separates a CSS property from its value?",
        "options": [
          {
            "id": "a",
            "label": "Colon (:)"
          },
          {
            "id": "b",
            "label": "Semicolon (;)"
          },
          {
            "id": "c",
            "label": "Equals (=)"
          },
          {
            "id": "d",
            "label": "Hyphen (-)"
          }
        ],
        "correctIndex": 0,
        "explanation": "A colon separates property from value (e.g. font-size: 16px)."
      },
      {
        "id": "q-08-4",
        "prompt": "What character terminates every CSS declaration?",
        "options": [
          {
            "id": "a",
            "label": "Semicolon (;)"
          },
          {
            "id": "b",
            "label": "Period (.)"
          },
          {
            "id": "c",
            "label": "Comma (,)"
          },
          {
            "id": "d",
            "label": "Colon (:)"
          }
        ],
        "correctIndex": 0,
        "explanation": "A semicolon terminates each declaration, separating it from subsequent declarations."
      },
      {
        "id": "q-08-5",
        "prompt": "Which of the following is a valid CSS comment?",
        "options": [
          {
            "id": "a",
            "label": "/* Main heading styles */"
          },
          {
            "id": "b",
            "label": "// Main heading styles"
          },
          {
            "id": "c",
            "label": "<!-- Main heading styles -->"
          },
          {
            "id": "d",
            "label": "# Main heading styles"
          }
        ],
        "correctIndex": 0,
        "explanation": "CSS comments are enclosed strictly between /* and */."
      },
      {
        "id": "q-08-6",
        "prompt": "Which property adds space INSIDE an element's border?",
        "options": [
          {
            "id": "a",
            "label": "padding"
          },
          {
            "id": "b",
            "label": "margin"
          },
          {
            "id": "c",
            "label": "border-spacing"
          },
          {
            "id": "d",
            "label": "outline"
          }
        ],
        "correctIndex": 0,
        "explanation": "Padding is the breathing room inside the border; margin is outside."
      },
      {
        "id": "q-08-7",
        "prompt": "Which property adds space OUTSIDE an element's border, pushing neighboring elements away?",
        "options": [
          {
            "id": "a",
            "label": "margin"
          },
          {
            "id": "b",
            "label": "padding"
          },
          {
            "id": "c",
            "label": "border-width"
          },
          {
            "id": "d",
            "label": "line-height"
          }
        ],
        "correctIndex": 0,
        "explanation": "Margin creates space outside the element's border."
      },
      {
        "id": "q-08-8",
        "prompt": "What does the selector '.highlight' target?",
        "options": [
          {
            "id": "a",
            "label": "All elements with class=\"highlight\""
          },
          {
            "id": "b",
            "label": "The element with id=\"highlight\""
          },
          {
            "id": "c",
            "label": "A tag named <highlight>"
          },
          {
            "id": "d",
            "label": "All highlighted text on the page"
          }
        ],
        "correctIndex": 0,
        "explanation": "A leading period indicates a class selector (.highlight matches class='highlight')."
      },
      {
        "id": "q-08-9",
        "prompt": "What does the selector '#main-title' target?",
        "options": [
          {
            "id": "a",
            "label": "The unique element with id=\"main-title\""
          },
          {
            "id": "b",
            "label": "All elements with class=\"main-title\""
          },
          {
            "id": "c",
            "label": "The document's <title> tag"
          },
          {
            "id": "d",
            "label": "The first heading on the page"
          }
        ],
        "correctIndex": 0,
        "explanation": "A leading hash indicates an ID selector (#main-title matches id='main-title')."
      },
      {
        "id": "q-08-10",
        "prompt": "Which property rounds the rectangular corners of a card or button?",
        "options": [
          {
            "id": "a",
            "label": "border-radius"
          },
          {
            "id": "b",
            "label": "corner-style"
          },
          {
            "id": "c",
            "label": "round-box"
          },
          {
            "id": "d",
            "label": "border-curve"
          }
        ],
        "correctIndex": 0,
        "explanation": "'border-radius' rounds the corners of an element's outer border edge."
      }
    ]
  },
  {
    "id": "item-09-css-selectors",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "09. CSS Selectors",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 9,
    "contentHeading": "Lesson 09: CSS Selectors",
    "contentDescription": "Target HTML elements with precision: basic element, class, ID, and universal selectors, combinators (descendant, child, adjacent sibling, general sibling), attribute selectors, pseudo-classes, and pseudo-elements.",
    "codeSnippet": {
      "language": "CSS",
      "code": "/* Element & Universal */\n* { box-sizing: border-box; }\np { color: blue; }\n\n/* Class & ID */\n.highlight { color: #ff4d1c; font-weight: bold; }\n#main-heading { color: darkblue; text-align: center; }\n\n/* Combinators */\n.course-card p { color: green; }        /* Descendant: anywhere inside */\n.course-card > p { color: red; }        /* Child: direct child only */\nh2 + p { color: blue; }                 /* Adjacent sibling: immediately following */\nh2 ~ p { color: green; }                /* General sibling: any following sibling */\n\n/* Attribute & Pseudo */\ninput[type=\"email\"] { background-color: #f0f7ff; }\nbutton:hover { background-color: #d63d14; color: white; }\n.notice::before { content: \"✓ \"; color: green; font-weight: bold; }"
    },
    "sections": [
      {
        "title": "9.1 What are CSS selectors?",
        "explanation": "CSS selectors are patterns used to select HTML elements that you want to style. They tell the browser which elements should receive particular CSS rules. For example, if you want every paragraph on a webpage to have blue text, you can use an element selector:\n\nHTML:\n<h1>Welcome to CSS</h1>\n<p>This is the first paragraph.</p>\n<p>This is the second paragraph.</p>\n\nCSS:\np {\n  color: blue;\n}\n\nOutput: Both paragraphs appear in blue, while the heading remains unchanged. In this example, 'p' is the selector, 'color' is the property, and 'blue' is the value.",
        "bullets": [
          "Selector: Defines which element(s) in the DOM tree receive the styling declarations.",
          "Property: The specific visual attribute being altered (e.g. color, font-size, margin).",
          "Value: The specification or measurement applied to that property (e.g. blue, 16px, auto)."
        ]
      },
      {
        "title": "9.2 Element selector",
        "explanation": "An element selector targets all HTML elements with a particular tag name.",
        "bullets": [
          "Syntax: element-name { property: value; }",
          "Example: h1 { color: navy; font-size: 32px; } and p { color: #444; font-size: 16px; }",
          "Every <h1> receives the heading styles, and every <p> receives the paragraph styles.",
          "When to use it: Use element selectors for general styles that should apply consistently to all elements of a particular type.",
          "Best practice: Avoid using element selectors for highly specific styling when only one or two elements should be affected."
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": "h1 {\n  color: navy;\n  font-size: 32px;\n}\n\np {\n  color: #444;\n  font-size: 16px;\n}"
        }
      },
      {
        "title": "9.3 Class selector",
        "explanation": "A class selector targets elements with a particular class attribute. Its CSS syntax begins with a dot (.).",
        "bullets": [
          "Syntax: .classname { property: value; }",
          "HTML: <h2 class=\"highlight\">Featured Course</h2> and <p class=\"highlight\">Learn HTML and CSS.</p>",
          "CSS: .highlight { color: #ff4d1c; font-weight: bold; }",
          "Multiple elements can share the same class, making classes ideal for reusable styles.",
          "Multiple classes on one element: <div class=\"card featured\">HTML Fundamentals</div> receives styles from both .card and .featured.",
          "Common mistake: Writing 'card' instead of '.card' in CSS. Without the dot, the browser looks for an HTML element named <card>."
        ],
        "codeSnippet": {
          "language": "HTML",
          "code": "<div class=\"card featured\">HTML Fundamentals</div>\n\n<style>\n.card {\n  padding: 20px;\n  border: 1px solid #ddd;\n}\n\n.featured {\n  background-color: #fff0e8;\n  color: #b83210;\n}\n</style>"
        }
      },
      {
        "title": "9.4 ID selector & Class vs. ID Comparison",
        "explanation": "An ID selector targets an element with a particular id attribute. Its CSS syntax begins with a hash (#).",
        "bullets": [
          "Syntax: #id-name { property: value; }",
          "HTML: <h1 id=\"main-heading\">Introduction to HTML</h1>",
          "CSS: #main-heading { color: darkblue; text-align: center; }",
          "An ID should be unique within a document. Duplicate IDs are invalid HTML and cause issues for JavaScript, links, and accessibility.",
          "Best practice: Prefer classes for most styling. Use IDs when you need a unique identifier, such as in-page anchor links."
        ],
        "table": {
          "headers": [
            "Feature",
            "Class Selector",
            "ID Selector"
          ],
          "rows": [
            [
              "CSS Syntax",
              "Starts with dot (.) e.g. .card",
              "Starts with hash (#) e.g. #hero"
            ],
            [
              "Reusability",
              "Can be reused on multiple elements",
              "Should identify exactly ONE element per document"
            ],
            [
              "Primary Use",
              "Styling reusable components and layouts",
              "Unique identification, fragment anchor links, JS hooks"
            ],
            [
              "Specificity",
              "Lower specificity (0, 1, 0)",
              "Higher specificity (1, 0, 0)"
            ]
          ]
        }
      },
      {
        "title": "9.5 Universal selector & 9.6 Grouping selector",
        "explanation": "The universal selector (*) matches all elements on the page. Grouping selectors lets you apply the same styles to multiple selectors separated by commas.",
        "bullets": [
          "Universal selector syntax: * { box-sizing: border-box; }",
          "Complete baseline reset: *, *::before, *::after { box-sizing: border-box; }",
          "Caution: Applying expensive or unnecessary styles to every element makes CSS harder to maintain. Use intentionally.",
          "Grouping syntax: h1, h2, h3 { color: navy; } produces the same result as declaring each separately.",
          "You can group element selectors, classes, and IDs together: .page-title, .section-title, #main-heading { font-family: Arial, sans-serif; }"
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": "/* Project-wide universal reset */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* Grouping selectors */\nh1, h2, h3 {\n  color: navy;\n  font-family: Arial, sans-serif;\n}"
        }
      },
      {
        "title": "9.7 Descendant vs. 9.8 Child Combinator",
        "explanation": "Combinators express relationships between elements in the document tree hierarchy.",
        "bullets": [
          "Descendant selector (space): targets elements located anywhere inside an ancestor, regardless of nesting depth.",
          ".course-card p { color: green; } matches all <p> elements inside .course-card.",
          "Child selector (>): targets ONLY direct children of a specified parent element.",
          ".course-card > p { color: red; } matches direct child paragraphs, but ignores paragraphs nested inside child containers like .details."
        ],
        "diagram": "           +----------------------+\n           |     .course-card     | (Parent / Ancestor)\n           +----------------------+\n                  /         \\\n                 / (Direct)  \\ (Direct)\n                v             v\n       [ > p (Direct Child) ]  [ .details (Child) ]\n                                      |\n                                      | (Nested)\n                                      v\n                             [ p (Descendant ONLY) ]\n\n- .course-card p   --> Matches BOTH paragraphs\n- .course-card > p --> Matches ONLY the direct child paragraph",
        "table": {
          "headers": [
            "Combinator",
            "Syntax",
            "Relationship",
            "Example Target"
          ],
          "rows": [
            [
              "Descendant",
              "ancestor descendant",
              "Anywhere inside at any nesting depth",
              ".nav a (all links inside .nav)"
            ],
            [
              "Child",
              "parent > child",
              "Direct children only (1 level deep)",
              "ul > li (direct list items only)"
            ],
            [
              "Adjacent Sibling",
              "elem + sibling",
              "Immediately following sibling with same parent",
              "h2 + p (first paragraph directly following h2)"
            ],
            [
              "General Sibling",
              "elem ~ sibling",
              "All following siblings with same parent",
              "h2 ~ p (all paragraphs following h2)"
            ]
          ]
        }
      },
      {
        "title": "9.9 Adjacent (+) and General (~) Sibling Selectors",
        "explanation": "Sibling selectors target elements that share the exact same parent in document structure.",
        "bullets": [
          "Adjacent sibling (+): Selects the immediately following sibling. In 'h2 + p', only the first paragraph directly after the h2 is styled.",
          "General sibling (~): Selects all matching following siblings under the same parent. In 'h2 ~ p', every following paragraph under the parent is styled."
        ],
        "codeSnippet": {
          "language": "HTML",
          "code": "<h2>Course Details</h2>\n<p>This paragraph follows the heading (Matches h2 + p and h2 ~ p).</p>\n<p>This is another paragraph (Matches h2 ~ p only).</p>\n\n<style>\n/* Matches only the first paragraph */\nh2 + p { color: blue; }\n\n/* Matches both following paragraphs */\nh2 ~ p { font-size: 16px; }\n</style>"
        }
      },
      {
        "title": "9.10 Attribute Selectors",
        "explanation": "Attribute selectors target elements based on the presence, exact match, or substring match of an HTML attribute.",
        "table": {
          "headers": [
            "Attribute Selector",
            "Matching Rule",
            "Practical Example",
            "Targeted Elements"
          ],
          "rows": [
            [
              "[attr]",
              "Attribute is present",
              "input[required]",
              "All inputs with required attribute"
            ],
            [
              "[attr=\"val\"]",
              "Exact attribute value",
              "input[type=\"email\"]",
              "Inputs specifically of type email"
            ],
            [
              "[attr^=\"val\"]",
              "Starts with prefix",
              "a[href^=\"https\"]",
              "All secure external HTTPS links"
            ],
            [
              "[attr$=\"val\"]",
              "Ends with suffix",
              "a[href$=\".pdf\"]",
              "All links downloading PDF files"
            ],
            [
              "[attr*=\"val\"]",
              "Contains substring",
              "a[href*=\"courses\"]",
              "Any link containing 'courses'"
            ],
            [
              "[attr~=\"val\"]",
              "Contains whole word in list",
              "p[class~=\"special\"]",
              "Paragraphs with 'special' in class list"
            ],
            [
              "[attr|=\"val\"]",
              "Exact or hyphen-prefixed",
              "html[lang|=\"en\"]",
              "Matches 'en', 'en-US', 'en-GB'"
            ]
          ]
        }
      },
      {
        "title": "9.11 Pseudo-class Selectors",
        "explanation": "A pseudo-class selects elements based on their dynamic state, user interaction, or position among siblings.",
        "table": {
          "headers": [
            "Pseudo-Class",
            "Trigger Condition",
            "Common Code Example"
          ],
          "rows": [
            [
              ":hover",
              "Pointer hovers over element",
              "button:hover { background-color: #d63d14; }"
            ],
            [
              ":focus",
              "Element receives keyboard focus",
              "input:focus { outline: 2px solid #155eef; }"
            ],
            [
              ":active",
              "Element is being clicked/pressed",
              "button:active { transform: scale(0.98); }"
            ],
            [
              ":first-child",
              "First child of its parent",
              "li:first-child { font-weight: bold; }"
            ],
            [
              ":last-child",
              "Last child of its parent",
              "li:last-child { border-bottom: none; }"
            ],
            [
              ":nth-child(n)",
              "Pattern in sibling positions",
              "li:nth-child(even) { background-color: #f9fafb; }"
            ],
            [
              ":checked",
              "Radio or checkbox is selected",
              "input:checked { accent-color: #ff4d1c; }"
            ],
            [
              ":disabled",
              "Form control is disabled",
              "button:disabled { opacity: 0.5; cursor: not-allowed; }"
            ],
            [
              ":not(selector)",
              "Negation (does not match)",
              "button:not(.primary) { background-color: gray; }"
            ]
          ]
        }
      },
      {
        "title": "9.12 Pseudo-elements",
        "explanation": "Pseudo-elements style a specific part of an element or create generated content. Conventionally use double colons (::).",
        "bullets": [
          "::before: Creates a generated box before an element's content. Requires content property.",
          "::after: Creates a generated box after an element's content. Useful for icons, decorative accents, or badges.",
          "::first-letter: Styles the first letter of a block's text (drop-caps).",
          "::selection: Styles the text highlight color when selected by a user.",
          "Important distinction: Pseudo-classes use one colon (:hover). Pseudo-elements use two colons (::before). Generated content should be decorative, not essential text."
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": "/* Generated icon before notice */\n.notice::before {\n  content: \"✓ \";\n  color: green;\n  font-weight: bold;\n}\n\n/* External link indicator */\n.external-link::after {\n  content: \" ↗\";\n}\n\n/* Custom text highlight */\n::selection {\n  background-color: navy;\n  color: white;\n}"
        }
      },
      {
        "title": "9.13 Combining Selectors & 9.14 Selector Practice",
        "explanation": "Understanding spaces, commas, and combinators is essential for writing predictable CSS.",
        "bullets": [
          ".course-card p: Targets all paragraph descendants anywhere inside .course-card.",
          ".course-card > p: Targets ONLY direct paragraph children of .course-card.",
          ".course-card.highlight: Targets a single element that possesses BOTH the .course-card and .highlight classes (no space).",
          ".course-card .highlight: Targets an element with the .highlight class that is nested inside .course-card (space means descendant)."
        ],
        "codeSnippet": {
          "language": "HTML",
          "code": "<div class=\"card\">\n  <p class=\"intro\">Paragraph A</p>\n  <div>\n    <p>Paragraph B</p>\n  </div>\n</div>\n\n<style>\n/* Targets Paragraph A only (direct child of .card) */\n.card > p {\n  color: red;\n}\n</style>"
        }
      },
      {
        "title": "9.15 Lesson Summary & Practice Assignment",
        "explanation": "Key takeaways: Element, class, ID, and universal selectors provide foundational targeting. Combinators define structural relationships, while attribute selectors, pseudo-classes, and pseudo-elements allow reactive, stateful styling.",
        "bullets": [
          "Summary: Class selectors are the primary workhorse for modular, reusable CSS styling.",
          "Summary: ID selectors carry high specificity and should be reserved for unique anchor links or scripts.",
          "Summary: Direct child combinators (>) prevent unintended leakage into nested components.",
          "Practice assignment: Create a course listing page with at least three course cards. Use class selectors for reusable card styles, a pseudo-class (:hover) for interactive states, a descendant selector for card descriptions, and an attribute selector for required form inputs."
        ]
      }
    ],
    "questions": [
      {
        "id": "q-09-1",
        "prompt": "What happens when the CSS rule '.card > p { color: red; }' is applied to:\n<div class=\"card\">\n  <p>Paragraph A</p>\n  <div><p>Paragraph B</p></div>\n</div>?",
        "options": [
          {
            "id": "a",
            "label": "Only Paragraph A becomes red"
          },
          {
            "id": "b",
            "label": "Both paragraphs become red"
          },
          {
            "id": "c",
            "label": "Only Paragraph B becomes red"
          },
          {
            "id": "d",
            "label": "Neither paragraph becomes red"
          }
        ],
        "correctIndex": 0,
        "explanation": "The child combinator (>) matches only direct children. Paragraph A is a direct child of .card; Paragraph B is inside an intermediate <div>."
      },
      {
        "id": "q-09-2",
        "prompt": "Which character prefix identifies a class selector in CSS?",
        "options": [
          {
            "id": "a",
            "label": "A dot (.card)"
          },
          {
            "id": "b",
            "label": "A hash (#card)"
          },
          {
            "id": "c",
            "label": "An ampersand (&card)"
          },
          {
            "id": "d",
            "label": "An asterisk (*card)"
          }
        ],
        "correctIndex": 0,
        "explanation": "A class selector starts with a period/dot (e.g., .card)."
      },
      {
        "id": "q-09-3",
        "prompt": "What is the primary difference between a class and an ID selector?",
        "options": [
          {
            "id": "a",
            "label": "A class can be reused on multiple elements, while an ID must be unique per document"
          },
          {
            "id": "b",
            "label": "An ID is written with a dot, while a class is written with a hash"
          },
          {
            "id": "c",
            "label": "Classes cannot be styled with CSS"
          },
          {
            "id": "d",
            "label": "IDs have lower specificity than classes"
          }
        ],
        "correctIndex": 0,
        "explanation": "Classes are designed for reusable styles across many elements; IDs are meant to identify a single unique element per document."
      },
      {
        "id": "q-09-4",
        "prompt": "Which selector matches all <a> elements whose href attribute ends with '.pdf'?",
        "options": [
          {
            "id": "a",
            "label": "a[href$=\".pdf\"]"
          },
          {
            "id": "b",
            "label": "a[href^=\".pdf\"]"
          },
          {
            "id": "c",
            "label": "a[href*=\".pdf\"]"
          },
          {
            "id": "d",
            "label": "a[href==\".pdf\"]"
          }
        ],
        "correctIndex": 0,
        "explanation": "The '$=' attribute operator matches values that end with the specified string."
      },
      {
        "id": "q-09-5",
        "prompt": "What does the adjacent sibling combinator (h2 + p) match?",
        "options": [
          {
            "id": "a",
            "label": "The single <p> element immediately following an <h2> sharing the same parent"
          },
          {
            "id": "b",
            "label": "All <p> elements that follow an <h2>"
          },
          {
            "id": "c",
            "label": "A <p> element that is nested inside an <h2>"
          },
          {
            "id": "d",
            "label": "An <h2> that is inside a <p>"
          }
        ],
        "correctIndex": 0,
        "explanation": "The plus sign (+) represents an adjacent sibling: it selects only the element directly following the first element under the same parent."
      },
      {
        "id": "q-09-6",
        "prompt": "What is the difference between '.card.featured' and '.card .featured'?",
        "options": [
          {
            "id": "a",
            "label": "'.card.featured' targets an element with BOTH classes; '.card .featured' targets a descendant with .featured inside .card"
          },
          {
            "id": "b",
            "label": "There is no difference in CSS"
          },
          {
            "id": "c",
            "label": "'.card .featured' targets an element with both classes"
          },
          {
            "id": "d",
            "label": "Neither is valid CSS syntax"
          }
        ],
        "correctIndex": 0,
        "explanation": "Without a space, chained classes match an element containing both classes simultaneously. With a space, it becomes a descendant selector."
      },
      {
        "id": "q-09-7",
        "prompt": "Which pseudo-class styles a form input when the user activates it with keyboard tab navigation?",
        "options": [
          {
            "id": "a",
            "label": ":focus"
          },
          {
            "id": "b",
            "label": ":hover"
          },
          {
            "id": "c",
            "label": ":active"
          },
          {
            "id": "d",
            "label": ":target"
          }
        ],
        "correctIndex": 0,
        "explanation": ":focus applies when an element receives focus via mouse click or keyboard tab navigation."
      },
      {
        "id": "q-09-8",
        "prompt": "What CSS property is required for ::before and ::after pseudo-elements to render?",
        "options": [
          {
            "id": "a",
            "label": "content"
          },
          {
            "id": "b",
            "label": "display"
          },
          {
            "id": "c",
            "label": "margin"
          },
          {
            "id": "d",
            "label": "visibility"
          }
        ],
        "correctIndex": 0,
        "explanation": "Generated pseudo-elements (::before and ::after) require the 'content' property (e.g. content: \"\";) to generate a box in the document layout."
      },
      {
        "id": "q-09-9",
        "prompt": "Which selector excludes elements matching a specific class?",
        "options": [
          {
            "id": "a",
            "label": ":not(.primary)"
          },
          {
            "id": "b",
            "label": ":exclude(.primary)"
          },
          {
            "id": "c",
            "label": "!primary"
          },
          {
            "id": "d",
            "label": ":without(.primary)"
          }
        ],
        "correctIndex": 0,
        "explanation": "The ':not()' negation pseudo-class excludes elements that match its argument selector."
      },
      {
        "id": "q-09-10",
        "prompt": "Why should commas be used in 'h1, h2, h3 { color: navy; }'?",
        "options": [
          {
            "id": "a",
            "label": "To group selectors so the same styles apply to each without duplicating declarations"
          },
          {
            "id": "b",
            "label": "To make h3 a child of h2"
          },
          {
            "id": "c",
            "label": "To create an animation between headings"
          },
          {
            "id": "d",
            "label": "To lower selector specificity"
          }
        ],
        "correctIndex": 0,
        "explanation": "A comma groups distinct selectors, applying the exact same declaration block to each matched selector."
      }
    ]
  },
  {
    "id": "item-10-colors-units-typography",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "10. CSS Colors, Units and Typography",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 10,
    "contentHeading": "Lesson 10: CSS Colors, Units and Typography",
    "contentDescription": "Master visual presentation: Hex, RGB, and HSL color models, absolute (px) vs. relative (%, em, rem, vw, vh) CSS units, typographic hierarchy, responsive clamp(), and custom web fonts via @font-face.",
    "codeSnippet": {
      "language": "CSS",
      "code": "/* Colors */\nbody {\n  color: #222222;                          /* Hex text color */\n  background-color: hsl(210, 30%, 98%);     /* HSL background */\n}\nbutton {\n  background-color: rgb(255 77 28 / 90%);  /* RGB with modern alpha */\n}\n\n/* Units & Container */\n.container {\n  width: 90%;\n  max-width: 1200px;\n  margin-inline: auto;\n  padding: 1.5rem;\n}\n\n/* Typography with responsive clamp */\nh1 {\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: clamp(2rem, 4vw, 3.5rem);\n  font-weight: 700;\n  line-height: 1.2;\n}\np {\n  font-size: 1rem;\n  line-height: 1.6;\n}"
    },
    "sections": [
      {
        "title": "10.1 Learning objectives & 10.2 Understanding CSS colors",
        "explanation": "CSS colors determine the appearance of text, backgrounds, borders, and other visual elements. CSS provides several color formats offering varying degrees of precision.",
        "bullets": [
          "Named colors: Predefined keywords like red, navy, white. Easy to read, but limited to 140 standardized names.",
          "Hexadecimal colors (#RRGGBB): Three pairs of hex digits (00 to FF) representing Red, Green, and Blue. Shorthand #RGB is supported when digits repeat (e.g. #f00 = #ff0000).",
          "RGB colors: rgb(255, 77, 28). Modern CSS supports space syntax and alpha transparency: rgb(255 77 28 / 20%).",
          "HSL colors: hsl(12, 100%, 56%). Hue (0-360 deg on color wheel), Saturation (0% grey to 100% full color), Lightness (0% black to 100% white). Ideal for generating consistent color shades.",
          "Contrast best practice: Ensure sufficient contrast between text and background. Normal text requires at least 4.5:1 contrast to meet WCAG AA accessibility standards."
        ],
        "table": {
          "headers": [
            "Color Format",
            "Syntax Example",
            "Channels / Arguments",
            "Primary Advantage"
          ],
          "rows": [
            [
              "Named Colors",
              "color: navy;",
              "Predefined keyword",
              "Quick prototyping and readability"
            ],
            [
              "Hexadecimal",
              "color: #ff4d1c;",
              "Red, Green, Blue (00-FF)",
              "Industry standard, compact hex codes"
            ],
            [
              "RGB / RGBA",
              "color: rgb(255 77 28 / 0.8);",
              "Red, Green, Blue (0-255) + Alpha",
              "Intuitive color mixing and alpha opacity"
            ],
            [
              "HSL / HSLA",
              "color: hsl(12, 100%, 56%);",
              "Hue (deg), Saturation (%), Lightness (%)",
              "Easiest format for tinting and shading palettes"
            ]
          ]
        }
      },
      {
        "title": "10.3 CSS backgrounds",
        "explanation": "Background properties control the appearance behind an element's content area.",
        "bullets": [
          "background-color: Sets the solid background fill.",
          "background-image: Loads an image via url(\"images/hero.jpg\").",
          "background-size: cover scales the image to fill the entire container, cropping if aspect ratios differ.",
          "background-position: center centers the graphic within the bounding box.",
          "background-repeat: no-repeat prevents image tiling.",
          "Background shorthand: background: #f4f7fb url(\"images/hero.jpg\") center / cover no-repeat;"
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": ".hero {\n  background: #f4f7fb url(\"images/hero.jpg\") center / cover no-repeat;\n  min-height: 400px;\n}"
        }
      },
      {
        "title": "10.4 Understanding CSS units",
        "explanation": "CSS units specify sizes, distances, and other measurements. Choosing the appropriate unit enables layouts to adapt across devices and user zoom settings.",
        "bullets": [
          "Pixels (px): Logical CSS unit. Great for hairline borders and precise fixed details.",
          "Percentages (%): Relative to the parent/containing block's dimension. Great for responsive widths.",
          "em: For font-size, relative to parent font size. For padding/margin, relative to the element's OWN font size. Can compound in nested structures.",
          "rem: Relative to the root element (<html>) computed font size (typically 16px). 1rem = 16px, 2rem = 32px. Preferred for consistent typography.",
          "Viewport units: vw (1% of viewport width) and vh (1% of viewport height). Modern CSS adds svh, lvh, dvh to handle mobile browser address bars."
        ],
        "diagram": "ROOT: html { font-size: 16px; }\n  |\n  +---> rem: Always computes against ROOT (16px)\n  |          1rem = 16px | 1.5rem = 24px | 2rem = 32px\n  |\n  +---> em: Computes against PARENT font-size (compounds when nested!)\n        Container (font-size: 20px)\n           |\n           +---> Child (font-size: 1.5em)  = 30px\n                   |\n                   +---> Subchild (1.5em)  = 45px (compounded!)",
        "table": {
          "headers": [
            "Unit",
            "Relative To",
            "Common Use Case",
            "Behavior on Parent Change"
          ],
          "rows": [
            [
              "px",
              "1 CSS logical pixel",
              "Borders, shadows, fixed icons",
              "Static (does not scale)"
            ],
            [
              "%",
              "Containing block dimension",
              "Responsive fluid column widths",
              "Scales with parent container"
            ],
            [
              "em",
              "Parent font size (or element's own font size)",
              "Component-relative spacing, badges",
              "Compounds with nested font sizes"
            ],
            [
              "rem",
              "Root <html> font size (default 16px)",
              "Global typography and spacing scales",
              "Consistent across all nesting levels"
            ],
            [
              "vw / vh",
              "1% of viewport width / height",
              "Hero sections, fullscreen overlays",
              "Scales dynamically with browser window"
            ]
          ]
        }
      },
      {
        "title": "10.5 CSS typography",
        "explanation": "Typography dictates the visual presentation and readability of web copy.",
        "table": {
          "headers": [
            "Property",
            "Common Values",
            "Purpose",
            "Best Practice"
          ],
          "rows": [
            [
              "font-family",
              "Arial, Helvetica, sans-serif",
              "Typeface font stack",
              "Always end with generic fallback (serif, sans-serif)"
            ],
            [
              "font-size",
              "1rem, 16px, clamp(1rem, 2vw, 1.5rem)",
              "Text size",
              "Use rem or clamp() for fluid accessible sizing"
            ],
            [
              "font-weight",
              "400 (normal), 600, 700 (bold)",
              "Stroke thickness",
              "Ensure custom web fonts load matching weights"
            ],
            [
              "line-height",
              "1.5, 1.6 (unitless values)",
              "Vertical line box spacing",
              "Use unitless multipliers (1.5 to 1.7) for body text"
            ],
            [
              "letter-spacing",
              "1px, 0.05em",
              "Tracking between characters",
              "Use subtly on uppercase headings; avoid on body"
            ],
            [
              "text-align",
              "left, center, right, start, end",
              "Horizontal alignment",
              "Use start/end for internationalization support"
            ],
            [
              "text-decoration",
              "underline, none, line-through",
              "Text lines/decorations",
              "Keep links clearly distinguishable from plain text"
            ],
            [
              "text-transform",
              "uppercase, lowercase, capitalize",
              "Visual casing presentation",
              "Styles presentation without altering underlying HTML"
            ]
          ]
        }
      },
      {
        "title": "10.6 Loading Custom Web Fonts (@font-face)",
        "explanation": "Web fonts let you render typefaces not installed on the user's operating system.",
        "bullets": [
          "@font-face declares custom font files (typically .woff2 for modern web compression).",
          "font-family: Assigns a custom name used across your stylesheet.",
          "src: Specifies the URL path to the font file relative to the CSS file.",
          "font-display: swap: Allows fallback system text to display immediately while the custom font downloads, preventing Flash of Invisible Text (FOIT)."
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": "@font-face {\n  font-family: \"CourseFont\";\n  src: url(\"fonts/course-font.woff2\") format(\"woff2\");\n  font-display: swap;\n}\n\nbody {\n  font-family: \"CourseFont\", Arial, sans-serif;\n}"
        }
      },
      {
        "title": "10.7 Practical Example & 10.8 Common Mistakes",
        "explanation": "Putting everything together into a fully styled, accessible course card.",
        "bullets": [
          "Mistake 1: Insufficient contrast between text and background failing WCAG AA.",
          "Mistake 2: Applying rigid fixed widths that cause horizontal overflow on mobile screens.",
          "Mistake 3: Compounding em units unintentionally in nested navigation or lists.",
          "Mistake 4: Missing generic fallback font families in font-family stacks.",
          "Best practice: Establish a consistent spacing and typography scale using rem units."
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": ".course-card {\n  max-width: 420px;\n  padding: 24px;\n  color: #222222;\n  background-color: #ffffff;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  font-family: Arial, sans-serif;\n}\n\n.course-label {\n  color: #ff4d1c;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 1px;\n}\n\n.course-card h2 {\n  font-size: 1.75rem;\n  line-height: 1.3;\n}\n\n.course-description {\n  font-size: 1rem;\n  line-height: 1.6;\n  color: #555555;\n}"
        }
      }
    ],
    "questions": [
      {
        "id": "q-10-1",
        "prompt": "If the root element (<html>) has a default font size of 16px, what is 2rem equal to?",
        "options": [
          {
            "id": "a",
            "label": "32px"
          },
          {
            "id": "b",
            "label": "24px"
          },
          {
            "id": "c",
            "label": "16px"
          },
          {
            "id": "d",
            "label": "48px"
          }
        ],
        "correctIndex": 0,
        "explanation": "1rem equals the root font size (16px). Therefore, 2rem = 2 * 16px = 32px."
      },
      {
        "id": "q-10-2",
        "prompt": "Which CSS property controls the vertical spacing between lines of text?",
        "options": [
          {
            "id": "a",
            "label": "line-height"
          },
          {
            "id": "b",
            "label": "letter-spacing"
          },
          {
            "id": "c",
            "label": "word-spacing"
          },
          {
            "id": "d",
            "label": "font-weight"
          }
        ],
        "correctIndex": 0,
        "explanation": "line-height determines the height of each line box and controls the vertical space between lines of text."
      },
      {
        "id": "q-10-3",
        "prompt": "What does 'background-size: cover' do?",
        "options": [
          {
            "id": "a",
            "label": "Scales the image to cover the entire container, potentially cropping it"
          },
          {
            "id": "b",
            "label": "Stretches the image to a fixed width only"
          },
          {
            "id": "c",
            "label": "Repeats the image in a tiled grid"
          },
          {
            "id": "d",
            "label": "Shrinks the image until both width and height fit without cropping"
          }
        ],
        "correctIndex": 0,
        "explanation": "'cover' scales the background image so that the entire container is covered, preserving aspect ratio while cropping excess edges if needed."
      },
      {
        "id": "q-10-4",
        "prompt": "What is the primary difference between 'em' and 'rem' units?",
        "options": [
          {
            "id": "a",
            "label": "'rem' is always relative to the root font size; 'em' is relative to parent or element font size"
          },
          {
            "id": "b",
            "label": "'em' is relative to the root; 'rem' is relative to the screen width"
          },
          {
            "id": "c",
            "label": "'em' is an absolute unit like pixels"
          },
          {
            "id": "d",
            "label": "'rem' cannot be used for padding or margin"
          }
        ],
        "correctIndex": 0,
        "explanation": "'rem' (root em) always references the <html> root font size, avoiding compounding issues seen with nested 'em' units."
      },
      {
        "id": "q-10-5",
        "prompt": "In the HSL color model hsl(12, 100%, 56%), what does the first number (12) represent?",
        "options": [
          {
            "id": "a",
            "label": "Hue: the degree angle on the 360-degree color wheel"
          },
          {
            "id": "b",
            "label": "Highlight intensity"
          },
          {
            "id": "c",
            "label": "Horizontal balance"
          },
          {
            "id": "d",
            "label": "Hexadecimal index"
          }
        ],
        "correctIndex": 0,
        "explanation": "Hue represents the angle (from 0 to 360 degrees) on the color wheel: 0 is red, 120 is green, 240 is blue."
      },
      {
        "id": "q-10-6",
        "prompt": "What does 'font-display: swap' accomplish in an @font-face rule?",
        "options": [
          {
            "id": "a",
            "label": "Displays fallback text immediately until the custom web font finishes downloading"
          },
          {
            "id": "b",
            "label": "Swaps italic text for bold text"
          },
          {
            "id": "c",
            "label": "Swaps serif fonts for monospace fonts"
          },
          {
            "id": "d",
            "label": "Prevents custom fonts from loading on mobile devices"
          }
        ],
        "correctIndex": 0,
        "explanation": "'font-display: swap' gives the font face an extremely small block period and an infinite swap period, preventing invisible text while loading."
      },
      {
        "id": "q-10-7",
        "prompt": "Why should unitless numbers (e.g. line-height: 1.6) be used for line-height?",
        "options": [
          {
            "id": "a",
            "label": "They scale proportionally with inherited or modified font sizes across child elements"
          },
          {
            "id": "b",
            "label": "Unitless values are required by CSS specifications"
          },
          {
            "id": "c",
            "label": "They convert all text to uppercase"
          },
          {
            "id": "d",
            "label": "They eliminate font rendering lag"
          }
        ],
        "correctIndex": 0,
        "explanation": "A unitless line-height acts as a multiplier of the current element's computed font-size, preventing clipping when font sizes change in child elements."
      },
      {
        "id": "q-10-8",
        "prompt": "Which WCAG contrast ratio is required for normal body text to meet AA accessibility standards?",
        "options": [
          {
            "id": "a",
            "label": "At least 4.5:1"
          },
          {
            "id": "b",
            "label": "At least 2:1"
          },
          {
            "id": "c",
            "label": "At least 10:1"
          },
          {
            "id": "d",
            "label": "At least 1:1"
          }
        ],
        "correctIndex": 0,
        "explanation": "WCAG AA guidelines mandate a minimum contrast ratio of 4.5:1 for standard text (and 3:1 for large text)."
      },
      {
        "id": "q-10-9",
        "prompt": "What is the result of 'clamp(2rem, 4vw, 3.5rem)' for font-size?",
        "options": [
          {
            "id": "a",
            "label": "Scales fluidly at 4vw between a minimum of 2rem and a maximum of 3.5rem"
          },
          {
            "id": "b",
            "label": "Locks the font size permanently to 4vw"
          },
          {
            "id": "c",
            "label": "Causes text to overflow the screen"
          },
          {
            "id": "d",
            "label": "Cycles between 2rem and 3.5rem every 4 seconds"
          }
        ],
        "correctIndex": 0,
        "explanation": "clamp(MIN, PREFERRED, MAX) clamps the value between an allowed minimum (2rem) and maximum (3.5rem) while scaling with the preferred value (4vw)."
      },
      {
        "id": "q-10-10",
        "prompt": "Which viewport unit represents 1% of the viewport width?",
        "options": [
          {
            "id": "a",
            "label": "vw"
          },
          {
            "id": "b",
            "label": "vh"
          },
          {
            "id": "c",
            "label": "vmax"
          },
          {
            "id": "d",
            "label": "dvh"
          }
        ],
        "correctIndex": 0,
        "explanation": "1vw is equal to 1% of the current browser viewport width."
      }
    ]
  },
  {
    "id": "item-11-css-box-model",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "11. CSS Box Model",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 11,
    "contentHeading": "Lesson 11: CSS Box Model",
    "contentDescription": "Understand the four foundational box layers: Content, Padding, Border, and Margin. Compare content-box vs. border-box sizing calculations, control margin collapsing, and use max-width and margin-inline: auto for centered containers.",
    "codeSnippet": {
      "language": "CSS",
      "code": "/* Standard Box-Sizing Reset */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* Centered Flexible Card */\n.course-card {\n  width: 100%;\n  max-width: 400px;\n  margin: 20px auto;                     /* 20px top/bottom, centered left/right */\n  padding: 24px;                          /* Breathing room inside border */\n  border: 1px solid #e5e7eb;              /* 1px border */\n  border-radius: 12px;                    /* Rounded corners */\n  background-color: #ffffff;\n}\n\n/* Margin vs Padding */\n.course-card h2 {\n  margin: 0 0 12px;                       /* External gap below heading */\n}\n.course-card p {\n  line-height: 1.6;\n}"
    },
    "sections": [
      {
        "title": "11.1 Learning objectives & 11.2 What is the CSS box model?",
        "explanation": "Every HTML element that generates a box in CSS layout is represented by a rectangular box. The CSS box model describes how its content, padding, border, and margin relate to one another.\n\nThink of a course card on a website:\n- Content: The heading, description, and images inside the card.\n- Padding: Space between the content and the card's border.\n- Border: The outline surrounding the content and padding.\n- Margin: Space outside the border separating the card from neighboring elements.",
        "bullets": [
          "Content: The actual text, images, or child elements.",
          "Padding: Internal breathing room between the content and the border (painted with the background).",
          "Border: The visible boundary surrounding padding and content.",
          "Margin: External space separating the element from adjacent sibling or parent elements."
        ],
        "diagram": "+-----------------------------------------------------------+\n|                          MARGIN                           |\n|  +-----------------------------------------------------+  |\n|  |                       BORDER                        |  |\n|  |  +-----------------------------------------------+  |  |\n|  |  |                    PADDING                    |  |  |\n|  |  |  +-----------------------------------------+  |  |  |\n|  |  |  |                 CONTENT                 |  |  |  |\n|  |  |  |        (Text, Images, Child Boxes)      |  |  |  |\n|  |  |  +-----------------------------------------+  |  |  |\n|  |  +-----------------------------------------------+  |  |\n|  +-----------------------------------------------------+  |\n+-----------------------------------------------------------+"
      },
      {
        "title": "11.3 Content & 11.4 Understanding Padding",
        "explanation": "Content dimensions are set by width and height. Padding creates internal space between content and the border.",
        "bullets": [
          "Padding shorthand 1 value: padding: 20px; (All 4 sides).",
          "Padding shorthand 2 values: padding: 10px 20px; (Top/Bottom 10px, Left/Right 20px).",
          "Padding shorthand 3 values: padding: 10px 20px 30px; (Top 10px, Left/Right 20px, Bottom 30px).",
          "Padding shorthand 4 values: padding: 10px 20px 30px 40px; (Top, Right, Bottom, Left - Clockwise TRBL).",
          "Padding background: Element backgrounds extend through the padding area."
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": "/* Directional properties */\n.box {\n  padding-top: 10px;\n  padding-right: 20px;\n  padding-bottom: 30px;\n  padding-left: 40px;\n}"
        }
      },
      {
        "title": "11.5 Borders & 11.6 Understanding Margin",
        "explanation": "Borders frame the padding and content. Margin creates external space outside the border to separate elements.",
        "bullets": [
          "Border shorthand components: width (e.g. 2px), style (solid, dashed, dotted), color (#333).",
          "Border radius: border-radius: 12px rounds the outer edges.",
          "Margin shorthand: Follows the exact same 1, 2, 3, or 4 value TRBL clockwise rules as padding.",
          "Centering a block: Combine max-width with automatic horizontal margins: margin-inline: auto (or margin: 0 auto;).",
          "Negative margins: Margins can be negative to pull elements closer, whereas padding can never be negative."
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": ".container {\n  width: 90%;\n  max-width: 1100px;\n  margin-inline: auto;   /* Distributes available horizontal space equally */\n}"
        }
      },
      {
        "title": "11.7 Margin vs. Padding Comparison",
        "explanation": "Choosing between margin and padding is fundamental to clean layouts:",
        "table": {
          "headers": [
            "Feature",
            "Margin",
            "Padding"
          ],
          "rows": [
            [
              "Location",
              "Space outside the border",
              "Space inside the border"
            ],
            [
              "Role",
              "Separates element from neighboring elements",
              "Separates content from the element's border"
            ],
            [
              "Background",
              "Transparent; shows parent page background",
              "Painted with the element's background color/image"
            ],
            [
              "Collapsing",
              "Vertical margins can collapse in normal block flow",
              "Padding NEVER collapses"
            ],
            [
              "Negative Values",
              "Supported (can pull elements closer or overlap)",
              "Invalid (cannot be negative)"
            ]
          ]
        }
      },
      {
        "title": "11.8 Understanding box-sizing (content-box vs. border-box)",
        "explanation": "The box-sizing property determines how declared width and height are calculated.",
        "bullets": [
          "content-box (default): Declared width applies ONLY to content. Padding and border add to the total width. Total width = width + padding + border (e.g. 200 + 40 + 10 = 250px).",
          "border-box: Declared width includes content, padding, and border. The content area shrinks to accommodate padding and border (e.g. 200 - 40 - 10 = 150px content, total width = 200px).",
          "Project reset: Applying border-box universally prevents unexpected container overflow."
        ],
        "diagram": "box-sizing: content-box (Default)\n+-------------------------------------------------------+\n|  Border (5px) + Padding (20px) + WIDTH: 200px + ...   | --> Total: 250px!\n+-------------------------------------------------------+\n\nbox-sizing: border-box (Modern Standard)\n+-----------------------------------+\n|  [P:20px | Content: 150px | P:20px] | --> Total: EXACTLY 200px!\n+-----------------------------------+",
        "table": {
          "headers": [
            "Box-Sizing Model",
            "Declared Width: 200px (Padding: 20px, Border: 5px)",
            "Final Outer Rendered Width"
          ],
          "rows": [
            [
              "content-box",
              "Width applies to content only: 200 + (20*2) + (5*2)",
              "250px (Grows beyond declared width)"
            ],
            [
              "border-box",
              "Width covers outer border edge: 200px total (content shrinks to 150px)",
              "200px (Matches declared width)"
            ]
          ]
        }
      },
      {
        "title": "11.9 Margin Collapsing",
        "explanation": "In normal block flow, adjacent vertical margins combine into a single margin instead of adding together. The larger positive margin wins.",
        "bullets": [
          "When it occurs: Between adjacent block elements in normal flow, or between parent and first/last child without borders/padding.",
          "Example: Element 1 has margin-bottom: 30px; Element 2 has margin-top: 20px. The vertical gap is 30px (not 50px).",
          "Flexbox and Grid: Margin collapsing does NOT occur between flex items or grid items.",
          "Modern alternative: Use Flexbox/Grid with the 'gap' property for predictable spacing without margin collapsing quirks."
        ],
        "diagram": "+-----------------------------------+\n|        Element 1 (.first)         |\n|        margin-bottom: 30px;       |\n+-----------------------------------+\n         |\n         |  30px Gap (Larger margin wins! NOT 30 + 20 = 50px)\n         v\n+-----------------------------------+\n|        margin-top: 20px;          |\n|        Element 2 (.second)        |\n+-----------------------------------+"
      },
      {
        "title": "11.10 Dimensions & 11.11 Practical Project",
        "explanation": "Using min-width, max-width, min-height, and max-height for resilient layouts.",
        "bullets": [
          "width: 100% with max-width: 500px: Allows an element to shrink fluidly on mobile while capping its width on desktop.",
          "Caution with fixed heights: Fixed heights on text containers risk text overflow when words wrap or users zoom.",
          "Practical project: A centered course card with border-box, internal padding, external margins, and responsive max-width."
        ],
        "codeSnippet": {
          "language": "HTML",
          "code": "<article class=\"course-card\">\n  <p class=\"course-label\">BEGINNER</p>\n  <h2>HTML Fundamentals</h2>\n  <p>Learn the structure of webpages from scratch.</p>\n  <a href=\"#learn\">Start Learning</a>\n</article>"
        }
      }
    ],
    "questions": [
      {
        "id": "q-11-1",
        "prompt": "An element has width: 200px, padding: 10px, and border: 2px solid. What is its total outer width under the default 'box-sizing: content-box'?",
        "options": [
          {
            "id": "a",
            "label": "224px (200 + 20 + 4)"
          },
          {
            "id": "b",
            "label": "200px"
          },
          {
            "id": "c",
            "label": "220px"
          },
          {
            "id": "d",
            "label": "212px"
          }
        ],
        "correctIndex": 0,
        "explanation": "Under content-box: Total width = width (200) + left/right padding (10+10=20) + left/right border (2+2=4) = 224px."
      },
      {
        "id": "q-11-2",
        "prompt": "Which box-model layer creates space inside an element's border, surrounding its content?",
        "options": [
          {
            "id": "a",
            "label": "Padding"
          },
          {
            "id": "b",
            "label": "Margin"
          },
          {
            "id": "c",
            "label": "Outline"
          },
          {
            "id": "d",
            "label": "Gap"
          }
        ],
        "correctIndex": 0,
        "explanation": "Padding is the space between an element's content and its border."
      },
      {
        "id": "q-11-3",
        "prompt": "What does 'box-sizing: border-box' do?",
        "options": [
          {
            "id": "a",
            "label": "Includes padding and border within the declared width and height"
          },
          {
            "id": "b",
            "label": "Removes all padding and margins"
          },
          {
            "id": "c",
            "label": "Forces all elements to 100% width"
          },
          {
            "id": "d",
            "label": "Draws a 1px border around every element"
          }
        ],
        "correctIndex": 0,
        "explanation": "With border-box, the declared width and height specify the outer dimensions inclusive of content, padding, and borders."
      },
      {
        "id": "q-11-4",
        "prompt": "In the shorthand declaration 'margin: 10px 20px 30px 40px;', what does 40px represent?",
        "options": [
          {
            "id": "a",
            "label": "Left margin (Clockwise: Top, Right, Bottom, Left)"
          },
          {
            "id": "b",
            "label": "Top margin"
          },
          {
            "id": "c",
            "label": "Right margin"
          },
          {
            "id": "d",
            "label": "Bottom margin"
          }
        ],
        "correctIndex": 0,
        "explanation": "The 4-value shorthand represents Top (10px), Right (20px), Bottom (30px), and Left (40px) clockwise."
      },
      {
        "id": "q-11-5",
        "prompt": "What is the resulting vertical gap between two adjacent block elements where element A has margin-bottom: 30px and element B has margin-top: 20px?",
        "options": [
          {
            "id": "a",
            "label": "30px (margins collapse to the larger value)"
          },
          {
            "id": "b",
            "label": "50px (they add together)"
          },
          {
            "id": "c",
            "label": "10px (they subtract)"
          },
          {
            "id": "d",
            "label": "20px"
          }
        ],
        "correctIndex": 0,
        "explanation": "In normal block layout, adjacent vertical margins collapse into a single margin equal to the largest positive margin (30px)."
      },
      {
        "id": "q-11-6",
        "prompt": "Can padding have a negative value in CSS?",
        "options": [
          {
            "id": "a",
            "label": "No, padding values must be non-negative (>= 0)"
          },
          {
            "id": "b",
            "label": "Yes, negative padding pulls content inward"
          },
          {
            "id": "c",
            "label": "Only in Flexbox containers"
          },
          {
            "id": "d",
            "label": "Only when using percentages"
          }
        ],
        "correctIndex": 0,
        "explanation": "Negative values are invalid for padding. Only margins may have negative values."
      },
      {
        "id": "q-11-7",
        "prompt": "How does 'margin-inline: auto' center a container on a webpage?",
        "options": [
          {
            "id": "a",
            "label": "It divides the remaining horizontal space in the parent container equally between left and right margins"
          },
          {
            "id": "b",
            "label": "It converts the container into an inline element"
          },
          {
            "id": "c",
            "label": "It forces text alignment to center"
          },
          {
            "id": "d",
            "label": "It locks the container to the center of the screen viewport"
          }
        ],
        "correctIndex": 0,
        "explanation": "margin-inline: auto computes equal left and right margins from the available space within the containing block."
      },
      {
        "id": "q-11-8",
        "prompt": "Does an element's background color show through its margin?",
        "options": [
          {
            "id": "a",
            "label": "No, margins are completely transparent and show the underlying parent background"
          },
          {
            "id": "b",
            "label": "Yes, background color fills the entire margin area"
          },
          {
            "id": "c",
            "label": "Only when border-style is solid"
          },
          {
            "id": "d",
            "label": "Only if box-sizing is border-box"
          }
        ],
        "correctIndex": 0,
        "explanation": "Background colors and images paint through the content and padding areas (and underneath transparent borders), but never through the margin."
      },
      {
        "id": "q-11-9",
        "prompt": "Why is setting a fixed height (e.g. height: 100px) on content-heavy text containers discouraged?",
        "options": [
          {
            "id": "a",
            "label": "Text may wrap on smaller screens and overflow outside the container"
          },
          {
            "id": "b",
            "label": "Fixed heights disable CSS colors"
          },
          {
            "id": "c",
            "label": "Fixed heights prevent browser caching"
          },
          {
            "id": "d",
            "label": "Fixed heights are deprecated in CSS3"
          }
        ],
        "correctIndex": 0,
        "explanation": "Fixed heights restrict container growth; if text wraps or font size increases, the content will spill outside the bounding box."
      },
      {
        "id": "q-11-10",
        "prompt": "Which CSS reset is widely used to ensure all elements adopt border-box sizing across pseudo-elements?",
        "options": [
          {
            "id": "a",
            "label": "*, *::before, *::after { box-sizing: border-box; }"
          },
          {
            "id": "b",
            "label": "body { box-sizing: border-box; }"
          },
          {
            "id": "c",
            "label": "div { box-sizing: border-box; }"
          },
          {
            "id": "d",
            "label": "html { margin: 0; }"
          }
        ],
        "correctIndex": 0,
        "explanation": "The universal selector with ::before and ::after pseudo-elements ensures every generated box on the page adheres to border-box calculations."
      }
    ]
  },
  {
    "id": "item-12-cascade-specificity-inheritance",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "12. CSS Cascade, Inheritance and Specificity",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 12,
    "contentHeading": "Lesson 12: CSS Cascade, Inheritance and Specificity",
    "contentDescription": "Understand the core resolution algorithms of CSS: the Cascade criteria, Specificity 3-part scoring (IDs, classes, elements), source order, inherited vs. non-inherited properties, the 4 reset keywords, !important, and cascade layers.",
    "codeSnippet": {
      "language": "CSS",
      "code": "/* Specificity Competition */\np             { color: blue; }     /* Specificity: (0, 0, 1) - Element */\n.message      { color: green; }    /* Specificity: (0, 1, 0) - Class */\n#welcome      { color: red; }      /* Specificity: (1, 0, 0) - ID wins! */\n\n/* Inheritance */\n.container {\n  color: navy;                      /* Inherited by child text */\n  font-family: Arial, sans-serif;   /* Inherited */\n  border: 1px solid #ddd;           /* NOT inherited */\n}\n\n/* Reset Keywords */\n.child {\n  color: inherit;                   /* Explicitly inherit parent value */\n  margin: initial;                  /* Reset to W3C spec default (0) */\n  all: revert;                      /* Revert to browser stylesheet origin */\n}"
    },
    "sections": [
      {
        "title": "12.1 Learning objectives & 12.2 What is the CSS cascade?",
        "explanation": "The CSS cascade is the algorithm browsers use to resolve conflicting CSS declarations targeting the same property on an element.\n\nImagine three rules targeting text color:\n<p class=\"message\" id=\"welcome\">Welcome to CSS!</p>\np { color: blue; }\n.message { color: green; }\n#welcome { color: red; }\n\nThe paragraph renders red because the ID selector has higher specificity than class and element selectors at the same cascade level.\n\nThe Cascade evaluates:\n1. Origin and Importance (!important user vs. author)\n2. Cascade Layers (@layer)\n3. Specificity ((IDs, classes, elements))\n4. Source Order (Later declarations win if specificity is tied)",
        "bullets": [
          "Origin: Browser default styles vs. user styles vs. author stylesheet declarations.",
          "Importance: !important annotations elevate declaration priority.",
          "Specificity: Resolves conflicts between competing selectors.",
          "Source order: When specificity is equal, the declaration appearing later in stylesheet order wins."
        ]
      },
      {
        "title": "12.3 Understanding CSS Specificity (3-Part Score)",
        "explanation": "Specificity is represented as a 3-category score: (IDs, Classes/Attributes/Pseudo-classes, Type elements/Pseudo-elements).",
        "bullets": [
          "Category 1 - IDs: #welcome -> Specificity: (1, 0, 0)",
          "Category 2 - Classes, attributes, pseudo-classes: .message, [type=\"text\"], :hover -> Specificity: (0, 1, 0)",
          "Category 3 - Elements and pseudo-elements: p, div, ::before -> Specificity: (0, 0, 1)",
          "A higher category always trumps a lower category. No amount of classes (e.g. 20 classes) will ever beat a single ID selector."
        ],
        "diagram": "          /\\\n         /  \\      [ INLINE STYLES ]  style=\"...\"  --> (1, 0, 0, 0)\n        /----\\\n       /      \\    [ ID SELECTORS ]   #welcome     --> (0, 1, 0, 0)\n      /--------\\\n     /          \\  [ CLASSES / ATTR ] .card, :hover -> (0, 0, 1, 0)\n    /------------\\\n   /              \\ [ ELEMENTS ]      p, div, ::after -> (0, 0, 0, 1)\n  /----------------\\\n /                  \\[ UNIVERSAL / :where() ] *     --> (0, 0, 0, 0)",
        "table": {
          "headers": [
            "Selector",
            "Specificity Score",
            "Breakdown",
            "Winning Precedence"
          ],
          "rows": [
            [
              "p",
              "(0, 0, 1)",
              "1 type selector",
              "Lowest"
            ],
            [
              ".message",
              "(0, 1, 0)",
              "1 class selector",
              "Beats element selector"
            ],
            [
              "div.message",
              "(0, 1, 1)",
              "1 class + 1 type",
              "Beats single class"
            ],
            [
              ".card p",
              "(0, 1, 1)",
              "1 class + 1 type",
              "Equal to div.message"
            ],
            [
              "#welcome",
              "(1, 0, 0)",
              "1 ID selector",
              "Beats all classes and types"
            ],
            [
              "#main .card p",
              "(1, 1, 1)",
              "1 ID + 1 class + 1 type",
              "Highest in this list"
            ]
          ]
        }
      },
      {
        "title": "12.4 Specificity in Practice & Source Order",
        "explanation": "Source order resolves ties when specificity is identical.",
        "bullets": [
          "Example: #intro { color: red; } followed later by #intro { color: purple; }.",
          "Both selectors have specificity (1, 0, 0). Because purple is declared later, the text becomes purple.",
          "Important: Source order only matters when cascade priority and specificity are completely tied."
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": "/* Equal specificity tie-breaker */\n#intro {\n  color: red;\n}\n\n#intro {\n  color: purple; /* WINS because it appears later in source order */\n}"
        }
      },
      {
        "title": "12.6 Special Selectors (:where, :is, :not, :has)",
        "explanation": "Modern CSS introduces pseudo-classes with unique specificity rules:",
        "bullets": [
          "Universal selector (*): Contributes (0, 0, 0) specificity.",
          ":where(): Contributes ZERO specificity (0, 0, 0) regardless of its arguments. Perfect for CSS reset libraries that should be easy to override.",
          ":is(), :not(), and :has(): Take the specificity of their most specific argument.",
          "Example: :is(#main, .card) p has specificity (1, 0, 1) because #main is evaluated."
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": "/* Has ZERO specificity: easy to override with a simple class */\n:where(#main, .card) p {\n  color: blue;\n}\n\n/* Takes specificity of #main: (1, 0, 1) */\n:is(#main, .card) p {\n  color: red;\n}"
        }
      },
      {
        "title": "12.7 Inheritance & 12.8 Inheritance vs. Specificity",
        "explanation": "Inheritance passes certain CSS property values from an ancestor element down to its descendants.",
        "table": {
          "headers": [
            "Property Type",
            "Inherited by Default?",
            "Examples",
            "Rationale"
          ],
          "rows": [
            [
              "Typography & Text",
              "YES",
              "color, font-family, font-size, line-height, text-align",
              "Ensures consistent readable styling across document subtrees"
            ],
            [
              "Box Model & Layout",
              "NO",
              "margin, padding, border, width, height, display",
              "Prevents inner elements from collapsing or getting duplicate borders"
            ],
            [
              "Backgrounds",
              "NO",
              "background-color, background-image",
              "Inner boxes show parent background by being transparent"
            ]
          ]
        },
        "bullets": [
          "Direct match beats inheritance: A direct rule targeting an element always overrides an inherited property, regardless of parent specificity.",
          "Example: <div id=\"parent\"><p class=\"child\">Hello</p></div>. Even though #parent has an ID, .child { color: red; } wins because it applies directly to <p>."
        ]
      },
      {
        "title": "12.9 Reset Keywords: inherit, initial, unset, revert",
        "explanation": "CSS provides four global keywords to explicitly manipulate the cascade and inheritance:",
        "table": {
          "headers": [
            "Keyword",
            "Behavior",
            "Use Case Example"
          ],
          "rows": [
            [
              "inherit",
              "Forces the property to take the computed value of its parent",
              "a { color: inherit; } (Makes link inherit body text color)"
            ],
            [
              "initial",
              "Resets the property to the default value specified by W3C CSS spec",
              "p { color: initial; } (Sets color to black)"
            ],
            [
              "unset",
              "Acts like inherit if property is inherited, or initial if not inherited",
              "h2 { font-size: unset; }"
            ],
            [
              "revert",
              "Rolls back to the browser default user-agent stylesheet value",
              "button { all: revert; } (Restores native browser button styles)"
            ]
          ]
        }
      },
      {
        "title": "12.10 Understanding !important & 12.11 Cascade Layers",
        "explanation": "!important boosts declaration priority within the cascade. Cascade layers (@layer) let developers organize stylesheets into ordered priority groups.",
        "bullets": [
          "!important: Elevates a declaration above normal specificity. If two competing rules have !important, specificity then breaks the tie.",
          "Why avoid excessive !important: It creates specificity escalation battles where developers are forced to add more !important declarations.",
          "Cascade Layers (@layer): @layer reset, base, components, utilities; allows utility styles to override component styles without inflated specificity."
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": "@layer reset, base, components, utilities;\n\n@layer base {\n  p { color: #444; }\n}\n\n@layer components {\n  .message { color: navy; }\n}\n\n@layer utilities {\n  .text-red { color: red; } /* Wins over components layer regardless of selector */\n}"
        }
      },
      {
        "title": "12.12 Developer Tools & 12.13 Practical Example",
        "explanation": "Debugging CSS conflicts using browser developer tools and analyzing complete property cascade resolution.",
        "bullets": [
          "Inspect element: Right click element -> Inspect to open DevTools Styles pane.",
          "Strikethrough lines: Indicate rules overridden by higher specificity, layers, or later source order.",
          "Computed tab: Shows the final active computed value after the browser resolves all cascade factors."
        ],
        "codeSnippet": {
          "language": "HTML",
          "code": "<article class=\"course-card\" id=\"html-course\">\n  <h2>HTML Fundamentals</h2>\n  <p>Learn how to structure web pages.</p>\n  <p class=\"highlight\">Beginner-friendly course</p>\n</article>\n\n<style>\n.course-card { color: #333; font-family: Arial, sans-serif; }\n.course-card p { color: #555; }\n.highlight { color: #ff4d1c; font-weight: bold; }\n#html-course p { color: navy; } /* Wins for paragraph text color due to ID specificity! */\n</style>"
        }
      }
    ],
    "questions": [
      {
        "id": "q-12-1",
        "prompt": "Which of the following selectors has the highest specificity?",
        "options": [
          {
            "id": "a",
            "label": "#message (ID Selector)"
          },
          {
            "id": "b",
            "label": ".message (Class Selector)"
          },
          {
            "id": "c",
            "label": "p (Element Selector)"
          },
          {
            "id": "d",
            "label": "p.message (Element + Class)"
          }
        ],
        "correctIndex": 0,
        "explanation": "An ID selector (#message) carries a specificity of (1, 0, 0), beating any number of classes (0, 1, 0) or element selectors (0, 0, 1)."
      },
      {
        "id": "q-12-2",
        "prompt": "Which CSS property is inherited by child elements from their parent by default?",
        "options": [
          {
            "id": "a",
            "label": "font-family"
          },
          {
            "id": "b",
            "label": "margin"
          },
          {
            "id": "c",
            "label": "border"
          },
          {
            "id": "d",
            "label": "padding"
          }
        ],
        "correctIndex": 0,
        "explanation": "Text and typographic properties like font-family, color, and line-height are inherited by default, whereas box-model properties are not."
      },
      {
        "id": "q-12-3",
        "prompt": "When two normal CSS declarations have identical specificity and equal cascade priority, which one wins?",
        "options": [
          {
            "id": "a",
            "label": "The declaration written later in source order"
          },
          {
            "id": "b",
            "label": "The declaration written earlier in source order"
          },
          {
            "id": "c",
            "label": "The declaration with fewer lines of code"
          },
          {
            "id": "d",
            "label": "Neither declaration applies"
          }
        ],
        "correctIndex": 0,
        "explanation": "When specificity is tied, the declaration declared later in the stylesheet (source order) takes precedence."
      },
      {
        "id": "q-12-4",
        "prompt": "What is the specificity score of the selector '.card p'?",
        "options": [
          {
            "id": "a",
            "label": "(0, 1, 1) - One class and one element"
          },
          {
            "id": "b",
            "label": "(1, 0, 1)"
          },
          {
            "id": "c",
            "label": "(0, 2, 0)"
          },
          {
            "id": "d",
            "label": "(0, 0, 2)"
          }
        ],
        "correctIndex": 0,
        "explanation": "'.card' is 1 class (0, 1, 0) and 'p' is 1 element (0, 0, 1), resulting in a combined specificity of (0, 1, 1)."
      },
      {
        "id": "q-12-5",
        "prompt": "What does the pseudo-class ':where()' contribute to specificity calculation?",
        "options": [
          {
            "id": "a",
            "label": "Zero specificity (0, 0, 0)"
          },
          {
            "id": "b",
            "label": "One ID point (1, 0, 0)"
          },
          {
            "id": "c",
            "label": "One class point (0, 1, 0)"
          },
          {
            "id": "d",
            "label": "The highest specificity among its arguments"
          }
        ],
        "correctIndex": 0,
        "explanation": ":where() always contributes (0, 0, 0) to specificity, making styles inside it very easy to override."
      },
      {
        "id": "q-12-6",
        "prompt": "Why does <p class=\"child\"> render red when given:\n#parent { color: blue; }\n.child { color: red; }?",
        "options": [
          {
            "id": "a",
            "label": "Direct declarations applied to an element always defeat inherited declarations from ancestors"
          },
          {
            "id": "b",
            "label": "Classes beat IDs in CSS"
          },
          {
            "id": "c",
            "label": "Blue is not a valid CSS color"
          },
          {
            "id": "d",
            "label": "#parent is ignored by the browser"
          }
        ],
        "correctIndex": 0,
        "explanation": "Inheritance only provides a fallback value when an element has no direct styling. A direct rule (.child) beats inherited values regardless of parent specificity."
      },
      {
        "id": "q-12-7",
        "prompt": "What does the keyword 'inherit' do when assigned to a CSS property?",
        "options": [
          {
            "id": "a",
            "label": "Explicitly forces the element to adopt its parent's computed value"
          },
          {
            "id": "b",
            "label": "Resets the property to browser defaults"
          },
          {
            "id": "c",
            "label": "Deletes the CSS rule"
          },
          {
            "id": "d",
            "label": "Converts the element to inline-block"
          }
        ],
        "correctIndex": 0,
        "explanation": "'inherit' instructs the browser to take the computed value of the parent element, even for non-inherited properties like border or margin."
      },
      {
        "id": "q-12-8",
        "prompt": "What specificity score does the universal selector '*' have?",
        "options": [
          {
            "id": "a",
            "label": "(0, 0, 0) - Zero specificity"
          },
          {
            "id": "b",
            "label": "(0, 0, 1) - One element point"
          },
          {
            "id": "c",
            "label": "(0, 1, 0) - One class point"
          },
          {
            "id": "d",
            "label": "(1, 0, 0) - One ID point"
          }
        ],
        "correctIndex": 0,
        "explanation": "The universal selector '*' has zero specificity (0, 0, 0) and is overridden by any specific selector."
      },
      {
        "id": "q-12-9",
        "prompt": "What is the primary danger of using '!important' frequently in CSS stylesheets?",
        "options": [
          {
            "id": "a",
            "label": "It breaks the natural cascade, creating difficult-to-maintain specificity wars"
          },
          {
            "id": "b",
            "label": "It slows down JavaScript execution"
          },
          {
            "id": "c",
            "label": "It causes memory leaks in the browser"
          },
          {
            "id": "d",
            "label": "It makes web pages crash on mobile"
          }
        ],
        "correctIndex": 0,
        "explanation": "!important bypasses normal specificity, leading to an arms race of competing !important declarations that are hard to debug and override."
      },
      {
        "id": "q-12-10",
        "prompt": "What does the 'revert' keyword do in CSS?",
        "options": [
          {
            "id": "a",
            "label": "Rolls back property value to what the browser's default user-agent stylesheet provides"
          },
          {
            "id": "b",
            "label": "Permanently deletes the HTML tag"
          },
          {
            "id": "c",
            "label": "Reverses text direction from right to left"
          },
          {
            "id": "d",
            "label": "Rotates an element 180 degrees"
          }
        ],
        "correctIndex": 0,
        "explanation": "'revert' rolls the property back to the value established by the preceding cascade origin (e.g. the browser's default user-agent stylesheet)."
      }
    ]
  },
  {
    "id": "item-13-css-display-visibility",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "13. CSS Display and Visibility",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 13,
    "contentHeading": "Lesson 13: CSS Display and Visibility",
    "contentDescription": "Control how elements participate in page layout and whether they can be seen. Compare block, inline, inline-block, flex, and grid display modes, distinguish display: none vs. visibility: hidden vs. opacity: 0, and manage overflow.",
    "codeSnippet": {
      "language": "CSS",
      "code": "/* Display modes */\n.block        { display: block; width: 100%; margin-bottom: 8px; }\n.inline-block { display: inline-block; padding: 6px 10px; border-radius: 5px; }\n\n/* Hiding techniques */\n.vanished  { display: none; }        /* 0px space, removed from layout flow */\n.hidden    { visibility: hidden; }   /* Invisible, but reserves layout footprint */\n.faded     { opacity: 0; }           /* Transparent, clickable unless pointer-events: none */\n\n/* Overflow control */\n.description {\n  width: 240px;\n  height: 70px;\n  overflow: auto;                    /* Shows scrollbars only when needed */\n}"
    },
    "sections": [
      {
        "title": "13.1 What does the display property do? & Block Elements",
        "explanation": "The CSS display property determines the layout behavior of an element: whether it starts on a new line, how much width it occupies, whether width and height apply as expected, and whether its children are laid out using a special layout system.\n\nA block-level box normally starts on a new line and takes the available width of its containing block. Width, height, padding, and margins can be set. Common HTML elements with block-like default behavior include div, p, h1–h6, section, article, and header.",
        "bullets": [
          "Block characteristics: Always begins on a fresh line, spans 100% of available containing block width by default.",
          "Box-model support: Fully honors declared width, height, padding, and margin properties.",
          "Common elements: <div>, <p>, <h1>–<h6>, <section>, <article>, <header>, <main>, <footer>."
        ],
        "diagram": "+-----------------------------------------------------------+\n| [ BLOCK ELEMENT 1 ]  (Starts on new line, spans 100% width)|\n+-----------------------------------------------------------+\n+-----------------------------------------------------------+\n| [ BLOCK ELEMENT 2 ]  (Pushed to next line automatically)  |\n+-----------------------------------------------------------+"
      },
      {
        "title": "13.2 Inline vs. Inline-Block Elements",
        "explanation": "An inline element participates in the current line of text. It takes only the space needed by its content. Inline elements do not normally start a new line. Width and height generally do not control a non-replaced inline box the way they control a block box. Common examples are span, a, strong, and em.\n\ninline-block combines useful parts of inline and block behavior. The element can sit beside other inline-level content, while width and height can be applied. It is useful for small badges, buttons, labels, and compact cards.",
        "bullets": [
          "Inline (span, a, strong): Flows within text; width, height, and top/bottom margins are IGNORED.",
          "Inline-block (badges, buttons): Sits side-by-side with adjacent text/inline content, but respects declared width, height, padding, and vertical margins.",
          "Badges example: <span class=\"badge\">Beginner</span> remains on the same line while accepting padding and dimensions."
        ],
        "diagram": "Inline Flow:\n[ Sentence text... ] <span class=\"highlight\">HTML</span> and <span class=\"highlight\">CSS</span> [ ...continues ]\n                                ^                             ^\n                       (No line breaks, ignores width/height)\n\nInline-Block Flow:\n[ [Badge 1: Beginner] ]  [ [Badge 2: HTML] ]  [ [Badge 3: CSS] ]\n          ^                        ^                     ^\n   (Side-by-side on same line, but respects width, height, padding, & border-radius!)"
      },
      {
        "title": "13.3 Three Ways to Hide: display: none vs. visibility: hidden vs. opacity: 0",
        "explanation": "Controlling element visibility requires choosing the appropriate mechanism based on whether space should be reserved and whether user interaction is expected:",
        "bullets": [
          "display: none: Removes the element's box from layout entirely. It takes up 0px space, as though it were not rendered. Descendants are also not rendered. Not accessible to screen readers.",
          "visibility: hidden: Makes an element invisible but preserves its layout space. Surrounding content does NOT shift into the gap.",
          "opacity: 0: Sets transparency to 100%. The element remains invisible and preserves space, but CAN still receive mouse clicks and keyboard focus unless explicitly disabled."
        ],
        "table": {
          "headers": [
            "Property",
            "Visible on Screen?",
            "Keeps Layout Space?",
            "Accessibility / Interaction Note"
          ],
          "rows": [
            [
              "display: none",
              "No",
              "No (0px footprint)",
              "Not rendered in layout; ignored by screen readers; cannot receive focus/clicks"
            ],
            [
              "visibility: hidden",
              "No",
              "Yes (Blank physical gap)",
              "Normally not focusable or clickable while hidden"
            ],
            [
              "opacity: 0",
              "No (100% transparent)",
              "Yes (Full footprint)",
              "Still interactive! Receives mouse clicks and keyboard tab focus unless disabled"
            ]
          ]
        }
      },
      {
        "title": "13.4 Flex, Grid, and Other Useful Display Values",
        "explanation": "Modern CSS introduces dedicated layout systems and specialized display modes:",
        "bullets": [
          "display: flex: Creates a flex formatting context for direct children (one-dimensional rows or columns).",
          "display: grid: Creates a grid formatting context for direct children (two-dimensional rows and columns).",
          "display: list-item: Behaves like a list item and generates a bullet/number marker.",
          "display: contents: The container box itself is not generated; its children participate directly in the parent layout context.",
          "display: flow-root: Establishes a new block formatting context, containing internal floats without older clearfix hacks."
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": "/* Flex container */\n.navigation {\n  display: flex;\n  gap: 1rem;\n}\n\n/* Grid container */\n.course-layout {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}"
        }
      },
      {
        "title": "13.5 Overflow: When Content Does Not Fit",
        "explanation": "The overflow property controls what happens when content exceeds its container's bounding box. Commonly paired with constrained width or height.",
        "bullets": [
          "visible (default): Excess content spills out outside the box boundaries.",
          "hidden: Excess content is clipped cleanly; no scrollbars appear.",
          "clip: Clipped with no scrolling mechanism allowed.",
          "scroll: Scrolling mechanism (scrollbars) is always provided, even if content fits.",
          "auto: Browser shows scrollbars only when content overflows container dimensions.",
          "Best practice: Avoid fixed heights for text containers unless necessary; content can expand due to zoom, translation, or long words."
        ],
        "table": {
          "headers": [
            "overflow Value",
            "Visual Clipping",
            "Scrollbars Shown",
            "Recommended Use"
          ],
          "rows": [
            [
              "visible",
              "No clipping (spills over)",
              "Never",
              "Default behavior for unconstrained containers"
            ],
            [
              "hidden",
              "Clips content cleanly",
              "Never",
              "Card image corners with border-radius, slider containers"
            ],
            [
              "scroll",
              "Clips content",
              "Always visible",
              "Consistent UI width where scrollbar gutter must not shift layout"
            ],
            [
              "auto",
              "Clips content",
              "Only when needed",
              "Scrollable text panels, code blocks, and data tables"
            ]
          ]
        }
      },
      {
        "title": "13.6 Practical Mini-Project: Course Status Panel & Best Practices",
        "explanation": "A practical component combining inline-block badges, block headings, and overflow-safe typography.",
        "bullets": [
          "Use display based on layout architecture, not just to fix an isolated visual symptom.",
          "Never use opacity: 0 to hide buttons without disabling pointer-events or keyboard focus.",
          "Avoid overflow: hidden on parents if it accidentally clips dropdown menus or focus outlines.",
          "Prefer semantic HTML tags; CSS changes presentation, not semantic meaning."
        ],
        "codeSnippet": {
          "language": "HTML",
          "code": "<section class=\"course\">\n  <span class=\"status\">In progress</span>\n  <h2>CSS Foundations</h2>\n  <p>Learn selectors, the box model, and layout.</p>\n  <a href=\"#lesson\">Continue lesson</a>\n</section>\n\n<style>\n  .course {\n    max-width: 360px;\n    padding: 20px;\n    border: 1px solid #d5dce3;\n    border-radius: 12px;\n  }\n  .status {\n    display: inline-block;\n    padding: 4px 8px;\n    background: #e4f4e8;\n    border-radius: 999px;\n    font-size: 0.85rem;\n  }\n  .course p {\n    display: block;\n  }\n</style>"
        }
      }
    ],
    "questions": [
      {
        "id": "q-13-1",
        "prompt": "Which display value normally starts on a new line and takes the full available width of its containing block?",
        "options": [
          {
            "id": "a",
            "label": "display: block"
          },
          {
            "id": "b",
            "label": "display: inline"
          },
          {
            "id": "c",
            "label": "display: none"
          },
          {
            "id": "d",
            "label": "display: contents"
          }
        ],
        "correctIndex": 0,
        "explanation": "Block-level elements (like <div> and <p>) start on a new line and fill the available width of their containing block."
      },
      {
        "id": "q-13-2",
        "prompt": "Which hiding method removes the element's box completely from layout flow (occupying 0px space)?",
        "options": [
          {
            "id": "a",
            "label": "display: none"
          },
          {
            "id": "b",
            "label": "visibility: hidden"
          },
          {
            "id": "c",
            "label": "opacity: 0"
          },
          {
            "id": "d",
            "label": "overflow: hidden"
          }
        ],
        "correctIndex": 0,
        "explanation": "'display: none' removes the element from the document layout flow entirely, taking up zero physical space."
      },
      {
        "id": "q-13-3",
        "prompt": "What is the primary difference between 'visibility: hidden' and 'display: none'?",
        "options": [
          {
            "id": "a",
            "label": "'visibility: hidden' preserves the element's physical layout space; 'display: none' removes the space entirely"
          },
          {
            "id": "b",
            "label": "'display: none' makes an element semi-transparent"
          },
          {
            "id": "c",
            "label": "'visibility: hidden' deletes the element from the DOM"
          },
          {
            "id": "d",
            "label": "There is no difference"
          }
        ],
        "correctIndex": 0,
        "explanation": "visibility: hidden makes the element invisible while preserving its exact physical dimensions in layout flow."
      },
      {
        "id": "q-13-4",
        "prompt": "Can an element styled with 'opacity: 0' still receive mouse clicks and keyboard focus?",
        "options": [
          {
            "id": "a",
            "label": "Yes, unless interaction is separately disabled (e.g. pointer-events: none or disabled attribute)"
          },
          {
            "id": "b",
            "label": "No, opacity: 0 disables all click events automatically"
          },
          {
            "id": "c",
            "label": "Only in Google Chrome"
          },
          {
            "id": "d",
            "label": "Only if display is set to inline"
          }
        ],
        "correctIndex": 0,
        "explanation": "opacity: 0 only modifies visual transparency; the element remains interactive and can still receive clicks and tab focus."
      },
      {
        "id": "q-13-5",
        "prompt": "What does 'overflow: auto' do when an element's content exceeds its declared height?",
        "options": [
          {
            "id": "a",
            "label": "Displays scrollbars only when the content exceeds the container boundaries"
          },
          {
            "id": "b",
            "label": "Permanently deletes the extra content"
          },
          {
            "id": "c",
            "label": "Always shows vertical and horizontal scrollbars even if content fits"
          },
          {
            "id": "d",
            "label": "Expands the screen resolution"
          }
        ],
        "correctIndex": 0,
        "explanation": "'overflow: auto' provides scrollbars dynamically when content overflows, but leaves scrollbars hidden when content fits."
      },
      {
        "id": "q-13-6",
        "prompt": "Why are width and height properties ignored on a standard <span> element?",
        "options": [
          {
            "id": "a",
            "label": "Because <span> defaults to 'display: inline', which ignores width and height"
          },
          {
            "id": "b",
            "label": "Because spans can only contain numbers"
          },
          {
            "id": "c",
            "label": "Because <span> is a deprecated HTML tag"
          },
          {
            "id": "d",
            "label": "Because CSS cannot style spans"
          }
        ],
        "correctIndex": 0,
        "explanation": "Non-replaced inline boxes (like span and strong) participate in inline text flow and do not respect declared width and height."
      },
      {
        "id": "q-13-7",
        "prompt": "Which display value allows elements to sit on the same line like inline text while still respecting width, height, and padding?",
        "options": [
          {
            "id": "a",
            "label": "inline-block"
          },
          {
            "id": "b",
            "label": "block"
          },
          {
            "id": "c",
            "label": "inline"
          },
          {
            "id": "d",
            "label": "table-row"
          }
        ],
        "correctIndex": 0,
        "explanation": "'display: inline-block' combines inline line-flowing placement with full block-level dimension and padding control."
      },
      {
        "id": "q-13-8",
        "prompt": "What does 'display: contents' do to an element's container box?",
        "options": [
          {
            "id": "a",
            "label": "The element's own box is not generated, while its children participate directly in the parent layout"
          },
          {
            "id": "b",
            "label": "It hides the contents of the page"
          },
          {
            "id": "c",
            "label": "It creates a table of contents"
          },
          {
            "id": "d",
            "label": "It locks content in place"
          }
        ],
        "correctIndex": 0,
        "explanation": "'display: contents' causes the element itself not to produce a box, making its child elements behave as direct children of the element's parent."
      },
      {
        "id": "q-13-9",
        "prompt": "Why is setting fixed heights (e.g. height: 80px) on text paragraphs discouraged?",
        "options": [
          {
            "id": "a",
            "label": "Text may wrap on narrow screens or during user zoom, causing content overflow"
          },
          {
            "id": "b",
            "label": "Fixed heights disable CSS color inheritance"
          },
          {
            "id": "c",
            "label": "Fixed heights cause browser security warnings"
          },
          {
            "id": "d",
            "label": "Fixed heights force all text to uppercase"
          }
        ],
        "correctIndex": 0,
        "explanation": "Fixed heights limit container growth. If text wraps, font size increases, or users zoom, text spills out of the container."
      },
      {
        "id": "q-13-10",
        "prompt": "What layout formatting context is initiated when an element has 'display: flex'?",
        "options": [
          {
            "id": "a",
            "label": "A flex container where direct children become flex items"
          },
          {
            "id": "b",
            "label": "A standard block formatting context"
          },
          {
            "id": "c",
            "label": "A print formatting context"
          },
          {
            "id": "d",
            "label": "A 3D perspective context"
          }
        ],
        "correctIndex": 0,
        "explanation": "'display: flex' turns the element into a flex container and lays out its direct children as flex items in a flex formatting context."
      }
    ]
  },
  {
    "id": "item-14-css-positioning-stacking",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "14. CSS Positioning and Stacking",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 14,
    "contentHeading": "Lesson 14: CSS Positioning and Stacking",
    "contentDescription": "Place elements in normal flow, offset them, and control which elements appear on top. Master static, relative, absolute, fixed, and sticky positioning, containing blocks, and z-index stacking contexts.",
    "codeSnippet": {
      "language": "CSS",
      "code": "/* Containing Block Parent */\n.card {\n  position: relative;               /* Establishes containing block for badge */\n  max-width: 320px;\n  padding: 24px;\n}\n\n/* Absolute Corner Badge */\n.badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;                       /* Anchored 10px from top-right of .card */\n}\n\n/* Sticky Section Header */\n.sticky-header {\n  position: sticky;\n  top: 0;                            /* Sticks to viewport top when scrolled */\n  z-index: 20;\n  background: white;\n}\n\n/* Fixed Floating Button */\n.help-button {\n  position: fixed;\n  right: 20px;\n  bottom: 20px;                      /* Stays fixed at bottom-right of viewport */\n  z-index: 50;\n}"
    },
    "sections": [
      {
        "title": "14.1 Normal Document Flow & The position Property",
        "explanation": "By default, block elements follow one another in document order. This is called normal flow. Inline content flows along text lines. Positioning properties can change where an element is placed relative to that normal flow or to a containing block.",
        "bullets": [
          "Normal Flow: The standard layout mechanism where elements render in document source order.",
          "The position property accepts 5 core values: static, relative, absolute, fixed, sticky.",
          "Offsets: top, right, bottom, left (and modern inset) reposition non-static elements."
        ],
        "table": {
          "headers": [
            "Position Value",
            "In Normal Flow?",
            "Reserves Original Space?",
            "Containing Block / Reference Frame",
            "Common Use Case"
          ],
          "rows": [
            [
              "static",
              "Yes",
              "Yes",
              "Normal parent flow (offsets ignored)",
              "Default behavior"
            ],
            [
              "relative",
              "Yes",
              "Yes",
              "Its own original normal-flow position",
              "Micro-offsets, containing block parent"
            ],
            [
              "absolute",
              "No",
              "No",
              "Nearest positioned ancestor (relative/absolute/fixed)",
              "Badges, tooltips, dropdown menus"
            ],
            [
              "fixed",
              "No",
              "No",
              "The browser viewport",
              "Back-to-top buttons, modal overlays, fixed navbars"
            ],
            [
              "sticky",
              "Hybrid",
              "Yes",
              "Nearest scrolling ancestor & parent container",
              "Table column headers, sticky section titles"
            ]
          ]
        }
      },
      {
        "title": "14.2 static vs. relative Positioning",
        "explanation": "static is the default where offsets (top, left, etc.) have no effect. relative offsets an element from its normal position while preserving its reserved layout footprint.",
        "bullets": [
          "static: position: static; top: 20px does NOT move the element.",
          "relative: Moves visually via top, left, etc., but surrounding elements do NOT fill the vacated space.",
          "Crucial role: Setting position: relative on a parent establishes a containing block for absolutely positioned children."
        ],
        "codeSnippet": {
          "language": "HTML",
          "code": "<div class=\"box\">First</div>\n<div class=\"box relative\">Second (Offset, but space is reserved)</div>\n<div class=\"box\">Third</div>\n\n<style>\n.relative {\n  position: relative;\n  top: 12px;\n  left: 18px;\n  background: #ffd9c9;\n}\n</style>"
        }
      },
      {
        "title": "14.3 absolute Positioning & Containing Blocks",
        "explanation": "An absolutely positioned element is removed completely from normal flow. Its offsets are calculated against its containing block (the nearest ancestor with position other than static).",
        "bullets": [
          "Removed from flow: Other elements act as if the absolute element does not exist.",
          "Containing block: If no ancestor has position: relative/absolute/fixed, offsets calculate against the initial containing block (the viewport/page).",
          "Corner badge pattern: Parent card has position: relative; child badge has position: absolute; top: 10px; right: 10px;."
        ],
        "diagram": "+-----------------------------------------------+\n| .card (position: relative)                    |\n|                                [ BADGE ]      | <-- position: absolute;\n|                                (top: 10px;    |     right: 10px;\n|                                 right: 10px)  |     (Anchored to .card!)\n|                                               |\n|  <h2>HTML Basics</h2>                         |\n|  <p>Start building web pages.</p>             |\n+-----------------------------------------------+"
      },
      {
        "title": "14.4 fixed and sticky Positioning",
        "explanation": "fixed locks an element relative to the viewport. sticky toggles between relative flow and fixed pinning during scrolling.",
        "bullets": [
          "fixed: Stays at the exact viewport coordinates during page scroll (e.g. Floating Action Buttons, modal backdrops).",
          "sticky: Scrolls naturally like relative until it reaches a defined threshold (e.g. top: 0), where it sticks to the viewport edge until its parent container ends.",
          "Sticky requirement: A sticky element MUST specify a threshold offset like top: 0 to function."
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": "/* Sticky section heading */\n.chapter-title {\n  position: sticky;\n  top: 0;\n  padding: 12px;\n  background: white;\n  border-bottom: 1px solid #ddd;\n}\n\n/* Fixed Help Button */\n.help-button {\n  position: fixed;\n  right: 20px;\n  bottom: 20px;\n}"
        }
      },
      {
        "title": "14.5 z-index and Stacking Contexts",
        "explanation": "z-index controls stacking order along the 3D Z-axis perpendicular to the screen. It only works on positioned elements (or flex/grid items).",
        "bullets": [
          "Stacking contexts: Self-contained layer groups. A child with z-index: 9999 CANNOT paint above an element in a higher parent stacking context.",
          "Triggers for stacking contexts: Positioned element with z-index != auto, opacity < 1, transform, filter, will-change.",
          "Layer scale best practice: Establish an organized scale (Base 0, Dropdown 10, Sticky header 20, Modal backdrop 100, Modal dialog 110)."
        ],
        "diagram": "Stacking Context Trap:\n+-----------------------------------+   +-----------------------------------+\n| Parent A (z-index: 1)             |   | Parent B (z-index: 2)             |\n|                                   |   |                                   |\n|   +---------------------------+   |   |                                   |\n|   | Child A (z-index: 9999!)  |   |   |   Parent B paints ABOVE Child A!  |\n|   +---------------------------+   |   |   (Child cannot escape Parent A)  |\n+-----------------------------------+   +-----------------------------------+",
        "table": {
          "headers": [
            "Layer Level",
            "Recommended z-index",
            "Target Component"
          ],
          "rows": [
            [
              "Default / Base",
              "0 / auto",
              "Standard page content, text, images"
            ],
            [
              "Elevated Content",
              "1 - 5",
              "Cards, hovered elements, relative badges"
            ],
            [
              "Dropdown / Menus",
              "10",
              "Flyout navigation, select menus, tooltips"
            ],
            [
              "Sticky Navigation",
              "20",
              "Persistent sticky header, pinned table headers"
            ],
            [
              "Modal Backdrop",
              "100",
              "Full-screen dark overlay for dialogs"
            ],
            [
              "Modal Dialog / Toast",
              "110",
              "Active confirmation modal, urgent toast notification"
            ]
          ]
        }
      },
      {
        "title": "14.6 Common UI Pattern: Modal Dialog Overlay",
        "explanation": "A production modal overlay structure using fixed positioning, full-screen inset, and layered dialogs.",
        "bullets": [
          "Backdrop: position: fixed; inset: 0; z-index: 100; dark semi-transparent background.",
          "Dialog: Centered using modern display: grid; place-items: center; on the backdrop.",
          "Accessibility: Ensure role=\"dialog\", aria-modal=\"true\", keyboard focus trapping, and Escape key handling."
        ],
        "codeSnippet": {
          "language": "HTML",
          "code": "<div class=\"backdrop\">\n  <section class=\"dialog\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"dialog-title\">\n    <h2 id=\"dialog-title\">Confirm action</h2>\n    <p>Do you want to continue?</p>\n    <button type=\"button\">Cancel</button>\n    <button type=\"button\">Continue</button>\n  </section>\n</div>\n\n<style>\n.backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  display: grid;\n  place-items: center;\n  padding: 1rem;\n  background: rgb(0 0 0 / 55%);\n}\n.dialog {\n  width: min(100%, 440px);\n  padding: 24px;\n  border-radius: 12px;\n  background: white;\n}\n</style>"
        }
      }
    ],
    "questions": [
      {
        "id": "q-14-1",
        "prompt": "Which CSS position value is the default for HTML elements?",
        "options": [
          {
            "id": "a",
            "label": "static"
          },
          {
            "id": "b",
            "label": "relative"
          },
          {
            "id": "c",
            "label": "absolute"
          },
          {
            "id": "d",
            "label": "fixed"
          }
        ],
        "correctIndex": 0,
        "explanation": "Elements have position: static by default, rendering in normal document source order."
      },
      {
        "id": "q-14-2",
        "prompt": "Which position value removes the element from normal flow and offsets it relative to its nearest positioned ancestor?",
        "options": [
          {
            "id": "a",
            "label": "absolute"
          },
          {
            "id": "b",
            "label": "relative"
          },
          {
            "id": "c",
            "label": "static"
          },
          {
            "id": "d",
            "label": "sticky"
          }
        ],
        "correctIndex": 0,
        "explanation": "'position: absolute' removes the element from normal flow and positions it relative to the nearest ancestor with a non-static position."
      },
      {
        "id": "q-14-3",
        "prompt": "What must be specified for a 'position: sticky' element to stick when scrolling?",
        "options": [
          {
            "id": "a",
            "label": "At least one inset threshold (such as top: 0)"
          },
          {
            "id": "b",
            "label": "float: left"
          },
          {
            "id": "c",
            "label": "z-index: 9999"
          },
          {
            "id": "d",
            "label": "display: inline"
          }
        ],
        "correctIndex": 0,
        "explanation": "Sticky positioning requires a threshold offset (like top: 0 or bottom: 0) to know where to stick relative to the scrolling container."
      },
      {
        "id": "q-14-4",
        "prompt": "Why might an element with 'z-index: 9999' still appear underneath an element with 'z-index: 1'?",
        "options": [
          {
            "id": "a",
            "label": "Because its parent belongs to a lower stacking context"
          },
          {
            "id": "b",
            "label": "Because 9999 is too large for CSS to process"
          },
          {
            "id": "c",
            "label": "Because z-index only works on static elements"
          },
          {
            "id": "d",
            "label": "Because z-index only works in Safari"
          }
        ],
        "correctIndex": 0,
        "explanation": "A child cannot escape its parent's stacking context. If Parent A has a lower stacking level than Parent B, all of Parent A's children render below Parent B."
      },
      {
        "id": "q-14-5",
        "prompt": "Does an absolutely positioned element reserve its original layout space in normal document flow?",
        "options": [
          {
            "id": "a",
            "label": "No, it is taken out of flow and takes 0 space in the document flow"
          },
          {
            "id": "b",
            "label": "Yes, it always leaves a blank space behind"
          },
          {
            "id": "c",
            "label": "Only if display is block"
          },
          {
            "id": "d",
            "label": "Only if margin is auto"
          }
        ],
        "correctIndex": 0,
        "explanation": "Absolutely positioned elements are removed from normal flow and do not reserve any layout space."
      },
      {
        "id": "q-14-6",
        "prompt": "What does 'position: relative' do to an element when top: 10px and left: 20px are applied?",
        "options": [
          {
            "id": "a",
            "label": "Visually offsets the element from where it would normally sit, while preserving its original space in flow"
          },
          {
            "id": "b",
            "label": "Locks the element to the top-left corner of the browser viewport"
          },
          {
            "id": "c",
            "label": "Removes the element from layout flow"
          },
          {
            "id": "d",
            "label": "Deletes adjacent sibling elements"
          }
        ],
        "correctIndex": 0,
        "explanation": "relative positioning offsets an element visually from its natural position, but its original layout space remains reserved."
      },
      {
        "id": "q-14-7",
        "prompt": "Which containing block is used by 'position: fixed' under normal circumstances?",
        "options": [
          {
            "id": "a",
            "label": "The browser viewport"
          },
          {
            "id": "b",
            "label": "The nearest <div> element"
          },
          {
            "id": "c",
            "label": "The closest <h1> heading"
          },
          {
            "id": "d",
            "label": "The parent section"
          }
        ],
        "correctIndex": 0,
        "explanation": "Fixed elements are positioned relative to the browser viewport, staying in the same location during page scrolling."
      },
      {
        "id": "q-14-8",
        "prompt": "What is 'inset: 0' a modern CSS shorthand for?",
        "options": [
          {
            "id": "a",
            "label": "top: 0; right: 0; bottom: 0; left: 0;"
          },
          {
            "id": "b",
            "label": "margin: 0; padding: 0;"
          },
          {
            "id": "c",
            "label": "border: 0; outline: 0;"
          },
          {
            "id": "d",
            "label": "width: 0; height: 0;"
          }
        ],
        "correctIndex": 0,
        "explanation": "'inset: 0' is the modern shorthand setting top, right, bottom, and left simultaneously to 0."
      },
      {
        "id": "q-14-9",
        "prompt": "Why should you set 'position: relative' on a card container when adding a corner badge?",
        "options": [
          {
            "id": "a",
            "label": "To establish the card as the containing block for the absolutely positioned badge"
          },
          {
            "id": "b",
            "label": "To make the card round"
          },
          {
            "id": "c",
            "label": "To enable hover animations"
          },
          {
            "id": "d",
            "label": "To prevent text selection"
          }
        ],
        "correctIndex": 0,
        "explanation": "Without a positioned ancestor, an absolute badge would position itself relative to the entire page rather than the card."
      },
      {
        "id": "q-14-10",
        "prompt": "Which CSS property can accidentally create a new stacking context on an ancestor?",
        "options": [
          {
            "id": "a",
            "label": "opacity below 1 or transform"
          },
          {
            "id": "b",
            "label": "color: blue"
          },
          {
            "id": "c",
            "label": "font-size: 16px"
          },
          {
            "id": "d",
            "label": "text-align: center"
          }
        ],
        "correctIndex": 0,
        "explanation": "Properties like opacity < 1, transform, filter, and will-change establish new stacking contexts for their descendant subtrees."
      }
    ]
  },
  {
    "id": "item-15-intro-flexbox",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "15. Introduction to Flexbox",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 15,
    "contentHeading": "Lesson 15: Introduction to Flexbox",
    "contentDescription": "Arrange items in one dimension and control alignment, spacing, and wrapping. Master main axis and cross axis, justify-content, align-items, gap, flex-wrap, flex-grow, flex-shrink, and flex-basis.",
    "codeSnippet": {
      "language": "CSS",
      "code": "/* Flex Container */\n.site-header {\n  display: flex;\n  align-items: center;              /* Cross axis: vertical center */\n  justify-content: space-between;   /* Main axis: spread items across */\n  gap: 24px;                        /* Spacing between items without margins */\n  padding: 16px 24px;\n}\n\n/* Fluid Flex Item */\n.brand {\n  margin-right: auto;               /* Pushes adjacent nav links to the right */\n}\n.nav-links {\n  display: flex;\n  flex-wrap: wrap;                  /* Wraps to next line when space runs out */\n  gap: 16px;\n}\n\n/* Responsive Shrinking */\n.flex-child {\n  flex: 1 1 0;                      /* grow: 1, shrink: 1, basis: 0 */\n  min-width: 0;                     /* Prevents long text overflow bug */\n}"
    },
    "sections": [
      {
        "title": "15.1 What is Flexbox? & Main Axis vs. Cross Axis",
        "explanation": "CSS Flexible Box Layout (Flexbox) is a one-dimensional layout system. It is especially useful when arranging items in a row or column and distributing extra space. The parent is the flex container; its direct children are flex items.\n\nThe layout is governed by two axes:\n- Main axis: Defined by flex-direction (horizontal in row, vertical in column).\n- Cross axis: Runs perpendicular to the main axis.",
        "bullets": [
          "flex-direction: row: Main axis runs horizontally (left to right); cross axis runs vertically.",
          "flex-direction: column: Main axis runs vertically (top to bottom); cross axis runs horizontally.",
          "justify-content: Aligns and distributes items along the MAIN axis.",
          "align-items: Aligns items along the CROSS axis within each flex line."
        ],
        "diagram": "flex-direction: row (Default)\nMAIN AXIS -----------------------------------------------------> (justify-content)\n+---------------------------------------------------------------+\n|  [ Item 1 ]         [ Item 2 ]         [ Item 3 ]             |\n+---------------------------------------------------------------+\n  |\n  | CROSS AXIS (align-items)\n  v\n\nflex-direction: column\nMAIN AXIS | +-----------------------+\n          | |      [ Item 1 ]       |\n          | +-----------------------+\n          | |      [ Item 2 ]       |\n          | +-----------------------+\n          v |      [ Item 3 ]       |\n(justify)   +-----------------------+\n            <------- CROSS AXIS ------> (align-items)"
      },
      {
        "title": "15.2 Container Properties: justify-content, align-items, and gap",
        "explanation": "Control distribution along the main axis, alignment along the cross axis, and spacing between items:",
        "table": {
          "headers": [
            "Property",
            "Axis",
            "Common Values",
            "Visual Behavior"
          ],
          "rows": [
            [
              "justify-content",
              "Main Axis",
              "flex-start, center, flex-end, space-between, space-around, space-evenly",
              "Distributes items and extra positive space along the main axis"
            ],
            [
              "align-items",
              "Cross Axis",
              "stretch (default), center, flex-start, flex-end, baseline",
              "Aligns items perpendicular to the main axis across the flex line"
            ],
            [
              "gap",
              "Both",
              "12px, 1rem, row-gap, column-gap",
              "Creates uniform space between items without requiring margins on children"
            ],
            [
              "flex-wrap",
              "Multi-line",
              "nowrap (default), wrap, wrap-reverse",
              "Allows items to break into multiple lines when available space is exceeded"
            ]
          ]
        }
      },
      {
        "title": "15.3 Sizing Flex Items: flex-grow, flex-shrink, and flex-basis",
        "explanation": "How flex items expand, compress, and establish initial size suggestions:",
        "bullets": [
          "flex-grow: Determines how much an item grows relative to siblings when positive free space exists (e.g. flex-grow: 1).",
          "flex-shrink: Determines how much an item shrinks when container space is insufficient (e.g. flex-shrink: 1).",
          "flex-basis: The initial main-size suggestion before space distribution (e.g. 240px or auto).",
          "Shorthand flex: flex: 1 1 0 (or flex: 1) expands items to evenly divide available space.",
          "Fixed sidebar pattern: flex: 0 0 240px creates a fixed-width 240px sidebar that neither grows nor shrinks."
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": "/* Sidebar layout */\n.main {\n  flex: 1 1 0;      /* Fluidly absorbs all remaining space */\n  min-width: 0;     /* Allows text truncation/shrinkage */\n}\n\n.sidebar {\n  flex: 0 0 240px;  /* Locked at exactly 240px */\n}"
        }
      },
      {
        "title": "15.4 The 'min-width: 0' Flexbox Overflow Bug",
        "explanation": "A common Flexbox surprise occurs when long text or wide tables force a flex item wider than its container.",
        "bullets": [
          "Default behavior: Flex items default to min-width: auto, meaning an item will refuse to shrink smaller than its content's intrinsic size.",
          "The fix: Add min-width: 0 to the flex item. This allows it to shrink below its content minimum, enabling text wrapping or truncation.",
          "Text wrapping: Combine with overflow-wrap: anywhere or white-space: nowrap + text-overflow: ellipsis."
        ],
        "diagram": "Without min-width: 0:\n+-------------------+\n| [ https://very-lo | ng-unbroken-url-spills-outside-the-box.com ] <-- OVERFLOW!\n+-------------------+\n\nWith min-width: 0 and overflow-wrap: anywhere:\n+-------------------+\n| [ https://very-lo |\n| ng-unbroken-url.. | <-- Wraps cleanly within the flex item boundary!\n+-------------------+"
      },
      {
        "title": "15.5 align-self, align-content, and order",
        "explanation": "Individual item overrides, multi-line distribution, and visual ordering:",
        "bullets": [
          "align-self: Allows an individual flex item to override the container's align-items setting (e.g. align-self: flex-start;).",
          "align-content: Distributes space between multiple lines when flex-wrap: wrap is active. Does not affect single-line layouts.",
          "order: Reorders flex items visually (ascending order). CAUTION: Does not change DOM source order or keyboard tab sequence!"
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": ".profile-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.special-badge {\n  align-self: flex-start; /* Overrides center alignment for this item only */\n  order: -1;              /* Moves visually to the start */\n}"
        }
      },
      {
        "title": "15.6 Complete Example: Responsive Site Navigation",
        "explanation": "A production responsive navbar utilizing flex, space-between, auto margins, and media queries.",
        "bullets": [
          "Desktop: Items align horizontally with brand on the left and CTA button on the right.",
          "Mobile: Wraps cleanly into a column layout using flex-direction: column.",
          "Source order integrity: Preserves logical tab flow for keyboard and screen-reader users."
        ],
        "codeSnippet": {
          "language": "HTML",
          "code": "<header class=\"site-header\">\n  <a class=\"brand\" href=\"/\">LearnWeb</a>\n  <nav class=\"nav-links\" aria-label=\"Main navigation\">\n    <a href=\"#courses\">Courses</a>\n    <a href=\"#projects\">Projects</a>\n    <a href=\"#about\">About</a>\n  </nav>\n  <a class=\"cta\" href=\"#start\">Get started</a>\n</header>\n\n<style>\n.site-header {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  padding: 16px 24px;\n  border-bottom: 1px solid #d5dce3;\n}\n.brand {\n  font-weight: 800;\n  margin-right: auto;\n}\n.nav-links {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n</style>"
        }
      }
    ],
    "questions": [
      {
        "id": "q-15-1",
        "prompt": "What is a flex container in CSS Flexbox?",
        "options": [
          {
            "id": "a",
            "label": "The parent element that has 'display: flex' or 'display: inline-flex'"
          },
          {
            "id": "b",
            "label": "Any child element inside a div"
          },
          {
            "id": "c",
            "label": "A browser extension"
          },
          {
            "id": "d",
            "label": "An HTML form element"
          }
        ],
        "correctIndex": 0,
        "explanation": "The flex container is the element on which 'display: flex' is applied, establishing a flex formatting context for its direct children."
      },
      {
        "id": "q-15-2",
        "prompt": "Which CSS property distributes or aligns flex items along the MAIN axis?",
        "options": [
          {
            "id": "a",
            "label": "justify-content"
          },
          {
            "id": "b",
            "label": "align-items"
          },
          {
            "id": "c",
            "label": "align-content"
          },
          {
            "id": "d",
            "label": "place-self"
          }
        ],
        "correctIndex": 0,
        "explanation": "justify-content aligns and distributes flex items along the container's main axis."
      },
      {
        "id": "q-15-3",
        "prompt": "Which CSS property aligns flex items along the CROSS axis within a single flex line?",
        "options": [
          {
            "id": "a",
            "label": "align-items"
          },
          {
            "id": "b",
            "label": "justify-content"
          },
          {
            "id": "c",
            "label": "flex-basis"
          },
          {
            "id": "d",
            "label": "flex-direction"
          }
        ],
        "correctIndex": 0,
        "explanation": "align-items controls cross-axis alignment for flex items within each flex line."
      },
      {
        "id": "q-15-4",
        "prompt": "Which property enables flex items to wrap onto multiple lines when container space runs out?",
        "options": [
          {
            "id": "a",
            "label": "flex-wrap: wrap"
          },
          {
            "id": "b",
            "label": "overflow: wrap"
          },
          {
            "id": "c",
            "label": "display: multi-line"
          },
          {
            "id": "d",
            "label": "flex-flow: nowrap"
          }
        ],
        "correctIndex": 0,
        "explanation": "'flex-wrap: wrap' allows flex items to wrap onto additional lines rather than shrinking or overflowing on a single line."
      },
      {
        "id": "q-15-5",
        "prompt": "What does 'flex-basis' define in a flex item?",
        "options": [
          {
            "id": "a",
            "label": "The initial main-size basis before positive or negative free space is distributed"
          },
          {
            "id": "b",
            "label": "The maximum border thickness"
          },
          {
            "id": "c",
            "label": "The background opacity"
          },
          {
            "id": "d",
            "label": "The number of lines an item spans"
          }
        ],
        "correctIndex": 0,
        "explanation": "flex-basis specifies the initial size of the item along the main axis before flex-grow or flex-shrink distribute remaining space."
      },
      {
        "id": "q-15-6",
        "prompt": "Does changing an item's visual order with the 'order' property change its DOM sequence or keyboard focus tab order?",
        "options": [
          {
            "id": "a",
            "label": "No, order only affects visual presentation, leaving DOM and tab order unchanged"
          },
          {
            "id": "b",
            "label": "Yes, it completely re-orders the HTML document"
          },
          {
            "id": "c",
            "label": "Only for links and buttons"
          },
          {
            "id": "d",
            "label": "Only in mobile browsers"
          }
        ],
        "correctIndex": 0,
        "explanation": "The 'order' property modifies visual layout only; keyboard navigation and screen readers follow the underlying HTML source order."
      },
      {
        "id": "q-15-7",
        "prompt": "Why is 'min-width: 0' frequently added to flex children containing long unbroken text or URLs?",
        "options": [
          {
            "id": "a",
            "label": "To override the default min-width: auto, allowing the item to shrink and wrap text"
          },
          {
            "id": "b",
            "label": "To remove the item's padding"
          },
          {
            "id": "c",
            "label": "To disable flex-shrink"
          },
          {
            "id": "d",
            "label": "To hide the item on mobile"
          }
        ],
        "correctIndex": 0,
        "explanation": "By default, flex items have min-width: auto and refuse to shrink smaller than their content. 'min-width: 0' allows the item to shrink and wrap."
      },
      {
        "id": "q-15-8",
        "prompt": "What happens when 'flex-direction: column' is applied to a flex container?",
        "options": [
          {
            "id": "a",
            "label": "The main axis becomes vertical and the cross axis becomes horizontal"
          },
          {
            "id": "b",
            "label": "The container turns into a CSS Grid"
          },
          {
            "id": "c",
            "label": "Items are placed backwards"
          },
          {
            "id": "d",
            "label": "Items can no longer use gap"
          }
        ],
        "correctIndex": 0,
        "explanation": "'flex-direction: column' switches the main axis to vertical (top to bottom) and the cross axis to horizontal."
      },
      {
        "id": "q-15-9",
        "prompt": "How does 'justify-content: space-between' distribute flex items along the main axis?",
        "options": [
          {
            "id": "a",
            "label": "Places first item at start and last item at end, distributing remaining space equally between items"
          },
          {
            "id": "b",
            "label": "Centers all items in a tight group"
          },
          {
            "id": "c",
            "label": "Packs items to the end of the container"
          },
          {
            "id": "d",
            "label": "Leaves equal space outside the first and last items"
          }
        ],
        "correctIndex": 0,
        "explanation": "'space-between' flushes the outer items against the container edges and distributes all remaining free space evenly in between."
      },
      {
        "id": "q-15-10",
        "prompt": "Which shorthand declaration defines a fixed-width 240px sidebar that neither grows nor shrinks?",
        "options": [
          {
            "id": "a",
            "label": "flex: 0 0 240px;"
          },
          {
            "id": "b",
            "label": "flex: 1 1 240px;"
          },
          {
            "id": "c",
            "label": "flex: 1 0 0;"
          },
          {
            "id": "d",
            "label": "flex: auto;"
          }
        ],
        "correctIndex": 0,
        "explanation": "'flex: 0 0 240px' sets flex-grow to 0, flex-shrink to 0, and flex-basis to 240px, locking the item at 240px."
      }
    ]
  },
  {
    "id": "item-16-intro-css-grid",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "16. Introduction to CSS Grid",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 16,
    "contentHeading": "Lesson 16: Introduction to CSS Grid",
    "contentDescription": "Create two-dimensional layouts with rows, columns, tracks, gaps, and named areas. Understand the fr unit, repeat(), minmax(), auto-fit, line-based placement, and compare Grid vs. Flexbox.",
    "codeSnippet": {
      "language": "CSS",
      "code": "/* Auto-Fit Responsive Card Grid */\n.course-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));\n  gap: 20px;\n}\n\n/* Page Layout with Named Areas */\n.page {\n  display: grid;\n  grid-template-columns: 220px minmax(0, 1fr);\n  grid-template-areas:\n    \"header header\"\n    \"nav    main\"\n    \"footer footer\";\n  gap: 16px;\n}\nheader { grid-area: header; }\nnav    { grid-area: nav; }\nmain   { grid-area: main; }\nfooter { grid-area: footer; }"
    },
    "sections": [
      {
        "title": "16.1 What is CSS Grid? & Defining Columns and Rows",
        "explanation": "CSS Grid Layout is a two-dimensional layout system. It can control rows and columns together, making it well suited to page layouts, dashboards, galleries, and card collections. The parent is the grid container; its direct children are grid items.",
        "bullets": [
          "Two-dimensional: Controls rows and columns simultaneously.",
          "grid-template-columns: Defines width and count of vertical column tracks.",
          "grid-template-rows: Defines height and count of horizontal row tracks.",
          "A track is the space between two adjacent grid lines (a row or a column)."
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": ".layout {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  grid-template-rows: auto 1fr auto;\n  gap: 16px;\n}"
        }
      },
      {
        "title": "16.2 Understanding the fr Unit, repeat(), and minmax()",
        "explanation": "The fr unit represents a fraction of the available space in the grid container after fixed sizes, gaps, and content constraints are satisfied.",
        "bullets": [
          "The fr unit: grid-template-columns: 2fr 1fr gives the first track twice the fractional space of the second.",
          "repeat(): repeat(3, 1fr) avoids writing 1fr three times.",
          "minmax(min, max): Sets a flexible size range. minmax(0, 1fr) is essential to prevent long content from causing track overflow."
        ],
        "diagram": "Container (Width: 900px, Gap: 0px)\n+-----------------------------------+-----------------+\n|          Track 1 (2fr)            |  Track 2 (1fr)  |\n|              600px                |      300px      |\n+-----------------------------------+-----------------+\n (Total fractions = 3fr. 1fr = 300px. Track 1 = 600px)"
      },
      {
        "title": "16.3 Responsive Grids with auto-fit and auto-fill",
        "explanation": "auto-fit and auto-fill let the browser automatically create as many repeated tracks as fit in the container, achieving responsive card grids without media queries.",
        "bullets": [
          "auto-fit: Drops empty tracks and expands occupied tracks to fill remaining container space.",
          "auto-fill: Retains empty tracks in the grid structure even if unoccupied.",
          "Standard responsive pattern: repeat(auto-fit, minmax(min(100%, 220px), 1fr)) creates fluid columns adapting to any screen width."
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": ".cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));\n  gap: 16px;\n}"
        }
      },
      {
        "title": "16.4 Line-Based Item Placement & Named Grid Areas",
        "explanation": "Placing items explicitly using 1-indexed grid line numbers or semantic layout names.",
        "bullets": [
          "Grid lines: Numbered lines starting at 1 on both axes. grid-column: 1 / 3 spans from column line 1 to column line 3 (covering two tracks).",
          "span keyword: grid-row: span 2 spans across two row tracks.",
          "grid-template-areas: Defines an ASCII-like template map. Every row must have identical cell counts, and named areas must form contiguous rectangles."
        ],
        "diagram": "Grid Lines Diagram (3 columns = 4 vertical lines):\nLine 1           Line 2           Line 3           Line 4\n  |                |                |                |\n  v                v                v                v\n  +----------------+----------------+----------------+\n  |    Column 1    |    Column 2    |    Column 3    |\n  +----------------+----------------+----------------+\n  <------- grid-column: 1 / 3 -----> (Spans 2 tracks!)",
        "codeSnippet": {
          "language": "CSS",
          "code": ".page {\n  display: grid;\n  grid-template-columns: 220px minmax(0, 1fr);\n  grid-template-areas:\n    \"header header\"\n    \"nav    main\"\n    \"nav    sidebar\"\n    \"footer footer\";\n  gap: 12px;\n}\nheader { grid-area: header; }\nnav    { grid-area: nav; }\nmain   { grid-area: main; }\naside  { grid-area: sidebar; }\nfooter { grid-area: footer; }"
        }
      },
      {
        "title": "16.5 Grid vs. Flexbox: When to Use Which",
        "explanation": "Grid and Flexbox are complementary layout systems designed to solve different layout challenges:",
        "table": {
          "headers": [
            "Comparison Question",
            "CSS Flexbox",
            "CSS Grid"
          ],
          "rows": [
            [
              "Primary Layout Dimension",
              "One-dimensional (Rows OR Columns)",
              "Two-dimensional (Rows AND Columns simultaneously)"
            ],
            [
              "Best Use Cases",
              "Navbars, button toolbars, aligned card internals, badges",
              "Page layouts, dashboards, photo galleries, responsive card matrices"
            ],
            [
              "Item Placement",
              "Flow-based with automatic distribution",
              "Explicit placement by numbered lines, spans, or named areas"
            ],
            [
              "Can they be combined?",
              "Yes! Flexbox inside Grid items is an industry best practice",
              "Yes! Grid page structure containing Flexbox components"
            ]
          ]
        }
      },
      {
        "title": "16.6 Complete Example: Course Dashboard",
        "explanation": "A dashboard combining Grid for outer responsive cards and Flexbox for internal card alignment.",
        "codeSnippet": {
          "language": "HTML",
          "code": "<main class=\"dashboard\">\n  <section class=\"course-grid\">\n    <article class=\"course-card\">\n      <h2>HTML Foundations</h2>\n      <p>Build meaningful page structure.</p>\n      <a href=\"#html\">Continue</a>\n    </article>\n    <article class=\"course-card\">\n      <h2>CSS Layout</h2>\n      <p>Style pages with modern layout tools.</p>\n      <a href=\"#css\">Continue</a>\n    </article>\n  </section>\n</main>\n\n<style>\n.course-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));\n  gap: 20px;\n}\n.course-card {\n  display: flex;\n  flex-direction: column;\n  padding: 22px;\n  border: 1px solid #d5dce3;\n  border-radius: 12px;\n}\n.course-card p { flex: 1; }\n</style>"
        }
      }
    ],
    "questions": [
      {
        "id": "q-16-1",
        "prompt": "What is the primary architectural difference between CSS Grid and Flexbox?",
        "options": [
          {
            "id": "a",
            "label": "Grid is two-dimensional (rows and columns); Flexbox is primarily one-dimensional"
          },
          {
            "id": "b",
            "label": "Flexbox is two-dimensional; Grid is one-dimensional"
          },
          {
            "id": "c",
            "label": "Grid only works with images"
          },
          {
            "id": "d",
            "label": "Flexbox cannot be used on mobile devices"
          }
        ],
        "correctIndex": 0,
        "explanation": "CSS Grid manages rows and columns simultaneously in two dimensions, whereas Flexbox aligns content along a single primary axis."
      },
      {
        "id": "q-16-2",
        "prompt": "What does the 'fr' unit represent in CSS Grid?",
        "options": [
          {
            "id": "a",
            "label": "A fractional share of available space in the grid container"
          },
          {
            "id": "b",
            "label": "Fixed resolution pixels"
          },
          {
            "id": "c",
            "label": "Font resize multiplier"
          },
          {
            "id": "d",
            "label": "Frame rate per second"
          }
        ],
        "correctIndex": 0,
        "explanation": "'fr' stands for fraction: it divides the available free space after accounting for fixed tracks and gaps."
      },
      {
        "id": "q-16-3",
        "prompt": "What does 'grid-template-columns: repeat(3, 1fr)' create?",
        "options": [
          {
            "id": "a",
            "label": "Three equal-width column tracks sharing the available space"
          },
          {
            "id": "b",
            "label": "Three rows of fixed height"
          },
          {
            "id": "c",
            "label": "A grid with only 3 pixels width"
          },
          {
            "id": "d",
            "label": "Three overlapping layers"
          }
        ],
        "correctIndex": 0,
        "explanation": "repeat(3, 1fr) creates three equal-width columns, each taking one equal fraction of the container width."
      },
      {
        "id": "q-16-4",
        "prompt": "What is the difference between a grid line and a grid track?",
        "options": [
          {
            "id": "a",
            "label": "A line is a boundary/divider; a track is the row or column space between two adjacent lines"
          },
          {
            "id": "b",
            "label": "They are completely identical"
          },
          {
            "id": "c",
            "label": "Lines are horizontal only; tracks are vertical only"
          },
          {
            "id": "d",
            "label": "Tracks cannot have gaps"
          }
        ],
        "correctIndex": 0,
        "explanation": "Grid lines are the 1-indexed border boundaries; grid tracks are the actual rows and columns between adjacent grid lines."
      },
      {
        "id": "q-16-5",
        "prompt": "What does 'grid-column: 1 / 3' specify for a grid item?",
        "options": [
          {
            "id": "a",
            "label": "The item starts at grid line 1 and ends at grid line 3, spanning 2 column tracks"
          },
          {
            "id": "b",
            "label": "The item spans column 1 through column 3 (3 full columns)"
          },
          {
            "id": "c",
            "label": "The item is placed in row 1, column 3"
          },
          {
            "id": "d",
            "label": "The item scales to 33% width"
          }
        ],
        "correctIndex": 0,
        "explanation": "Grid line numbering starts at 1. Line 1 to line 3 covers two tracks (columns 1 and 2)."
      },
      {
        "id": "q-16-6",
        "prompt": "How does 'auto-fit' behave differently from 'auto-fill' when using repeat()?",
        "options": [
          {
            "id": "a",
            "label": "'auto-fit' collapses empty tracks allowing occupied tracks to expand; 'auto-fill' preserves empty tracks"
          },
          {
            "id": "b",
            "label": "'auto-fill' shrinks cards to 0px"
          },
          {
            "id": "c",
            "label": "'auto-fit' only works with flexbox"
          },
          {
            "id": "d",
            "label": "There is no difference in modern browsers"
          }
        ],
        "correctIndex": 0,
        "explanation": "'auto-fit' collapses empty tracks down to 0px so the actual filled cards expand across the full container width."
      },
      {
        "id": "q-16-7",
        "prompt": "Why is 'minmax(0, 1fr)' often preferred over plain '1fr' for flexible columns?",
        "options": [
          {
            "id": "a",
            "label": "It allows tracks to shrink to 0, preventing long unbroken content from expanding the track"
          },
          {
            "id": "b",
            "label": "It disables grid gaps"
          },
          {
            "id": "c",
            "label": "It makes the grid compile faster"
          },
          {
            "id": "d",
            "label": "Plain 1fr is not valid CSS"
          }
        ],
        "correctIndex": 0,
        "explanation": "By default, 1fr has an automatic minimum content size. Setting minmax(0, 1fr) ensures the track can shrink below content size without overflowing."
      },
      {
        "id": "q-16-8",
        "prompt": "What rule must be followed when defining 'grid-template-areas'?",
        "options": [
          {
            "id": "a",
            "label": "Each named area must form a solid rectangle and each row string must have the same number of cells"
          },
          {
            "id": "b",
            "label": "Areas must be circular"
          },
          {
            "id": "c",
            "label": "Areas can only be used once per website"
          },
          {
            "id": "d",
            "label": "Named areas cannot contain text"
          }
        ],
        "correctIndex": 0,
        "explanation": "Named grid areas must form contiguous rectangles. L-shaped or disconnected area geometries are invalid CSS Grid syntax."
      },
      {
        "id": "q-16-9",
        "prompt": "Can CSS Grid and CSS Flexbox be used together within the same application?",
        "options": [
          {
            "id": "a",
            "label": "Yes, using Grid for overall page/card layout and Flexbox inside items is a recommended best practice"
          },
          {
            "id": "b",
            "label": "No, the browser disables Flexbox if Grid is active"
          },
          {
            "id": "c",
            "label": "Only if JavaScript enables both"
          },
          {
            "id": "d",
            "label": "Only in dark mode"
          }
        ],
        "correctIndex": 0,
        "explanation": "Grid and Flexbox are complementary: Grid excels at macro 2D page structure, while Flexbox excels at micro 1D alignment within components."
      },
      {
        "id": "q-16-10",
        "prompt": "Which shorthand aligns grid items along BOTH the block and inline axes simultaneously inside their grid areas?",
        "options": [
          {
            "id": "a",
            "label": "place-items: center;"
          },
          {
            "id": "b",
            "label": "grid-align: all;"
          },
          {
            "id": "c",
            "label": "center-grid: true;"
          },
          {
            "id": "d",
            "label": "align-content: justify;"
          }
        ],
        "correctIndex": 0,
        "explanation": "'place-items: center' is the shorthand combining align-items and justify-items, centering items in their cells along both axes."
      }
    ]
  },
  {
    "id": "item-17-responsive-web-design",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "17. Responsive Web Design",
    "duration": "25 mins",
    "type": "cheatsheet",
    "position": 17,
    "contentHeading": "Lesson 17: Responsive Web Design",
    "contentDescription": "Create interfaces that adapt to different screen sizes, input methods, and user settings. Master the viewport meta tag, mobile-first media queries, fluid sizing with clamp(), responsive media, and horizontal overflow prevention.",
    "codeSnippet": {
      "language": "HTML",
      "code": "<!-- Essential Mobile Viewport Meta Tag -->\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\n<style>\n/* Mobile-First Fluid Base */\n.container {\n  width: min(100% - 2rem, 72rem);\n  margin-inline: auto;\n}\n\n/* Fluid Responsive Typography */\n.hero-title {\n  font-size: clamp(2rem, 5vw, 4rem);\n  line-height: 1.1;\n}\n\n/* Mobile-First Media Queries */\n.content-grid {\n  display: grid;\n  grid-template-columns: 1fr;         /* 1 column on mobile */\n  gap: 16px;\n}\n@media (min-width: 48rem) {          /* Tablet: 2 columns */\n  .content-grid { grid-template-columns: 1fr 1fr; }\n}\n@media (min-width: 70rem) {          /* Desktop: 3 columns */\n  .content-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n}\n\n/* Responsive Media */\nimg, video {\n  max-width: 100%;\n  height: auto;\n  display: block;\n}\n</style>"
    },
    "sections": [
      {
        "title": "17.1 What is Responsive Web Design? & The Viewport Meta Tag",
        "explanation": "Responsive web design is an approach where a page adapts to available space and user environment rather than assuming one fixed screen size.\n\nThe viewport meta tag is essential:\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\nWithout it, mobile browsers render desktop-width layouts and scale them down until text is unreadably tiny.",
        "bullets": [
          "width=device-width: Sets the layout viewport width to match the physical device screen width in CSS pixels.",
          "initial-scale=1.0: Sets the initial zoom ratio when the page loads.",
          "Accessibility rule: Never disable user zoom with user-scalable=no or restrictive maximum-scale."
        ],
        "diagram": "Without Viewport Meta Tag:\n[ Mobile Phone Screen ] ---> Simulates 980px desktop view, shrinks page down (Tiny, unreadable text!)\n\nWith <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">:\n[ Mobile Phone Screen ] ---> Matches actual 390px device width (Readable text, mobile layout!)"
      },
      {
        "title": "17.2 Mobile-First CSS & Media Query Syntax",
        "explanation": "Mobile-first CSS writes base styles for small screens first, then uses min-width media queries to progressively enhance the layout as more screen real estate becomes available.",
        "bullets": [
          "Simpler architecture: Base single-column styles work on all devices; complex columns are only added when screen space permits.",
          "Media query syntax: @media (min-width: 48rem) { ... } activates when viewport width >= 48rem.",
          "Content-driven breakpoints: Breakpoints should follow content breakdown points, not specific device model dimensions."
        ],
        "table": {
          "headers": [
            "Media Query Pattern",
            "Syntax Example",
            "Condition for Activation"
          ],
          "rows": [
            [
              "Mobile-First (Recommended)",
              "@media (min-width: 48rem)",
              "Screen width is 48rem (768px) or wider"
            ],
            [
              "Desktop-First Max Width",
              "@media (max-width: 40rem)",
              "Screen width is 40rem (640px) or narrower"
            ],
            [
              "Range Query",
              "@media (min-width: 40rem) and (max-width: 60rem)",
              "Screen width is strictly between 40rem and 60rem"
            ],
            [
              "Accessibility / Preference",
              "@media (prefers-reduced-motion: reduce)",
              "User requested reduced motion in OS settings"
            ],
            [
              "Pointer Capability",
              "@media (hover: hover) and (pointer: fine)",
              "Device has a precise mouse/trackpad pointer with hover"
            ]
          ]
        }
      },
      {
        "title": "17.3 Fluid Sizing, clamp(), and Responsive Images",
        "explanation": "Avoid fixed pixel widths. Use fluid math functions and responsive image rules to keep content flexible:",
        "bullets": [
          "Fluid container: width: min(100% - 2rem, 72rem); fills available space on mobile, stops growing beyond 72rem.",
          "clamp(min, preferred, max): font-size: clamp(2rem, 5vw, 4rem) scales smoothly with viewport width while enforcing boundaries.",
          "Responsive images: max-width: 100%; height: auto; display: block; ensures images shrink within containers without distortion.",
          "Thumbnail cropping: aspect-ratio: 16 / 9; object-fit: cover; preserves consistent dimensions without stretching."
        ],
        "codeSnippet": {
          "language": "CSS",
          "code": "/* Responsive Images & Media */\nimg, video, iframe {\n  max-width: 100%;\n}\nimg {\n  height: auto;\n  display: block;\n}\n\n/* Fluid Heading with clamp */\n.hero-title {\n  font-size: clamp(2rem, 5vw, 4.5rem);\n  line-height: 1.1;\n}"
        }
      },
      {
        "title": "17.4 Preventing Horizontal Page Overflow",
        "explanation": "Unexpected horizontal scrolling is a frequent responsive defect caused by elements exceeding viewport width:",
        "table": {
          "headers": [
            "Common Cause of Overflow",
            "Underlying Problem",
            "Standard CSS Fix"
          ],
          "rows": [
            [
              "Fixed-width elements",
              "width: 600px exceeds 390px mobile screens",
              "Replace with width: 100%; max-width: 600px;"
            ],
            [
              "Unbroken URLs or long words",
              "Text cannot break across lines",
              "overflow-wrap: anywhere; or word-break: break-word;"
            ],
            [
              "Unconstrained images",
              "Image renders at raw file pixel size",
              "img { max-width: 100%; height: auto; }"
            ],
            [
              "Flex item refusing to shrink",
              "min-width: auto content minimum constraint",
              "Add min-width: 0; to the flex child item"
            ],
            [
              "Wide data tables",
              "Table columns cannot compress",
              "Wrap table in <div class=\"table-scroll\"> with overflow-x: auto;"
            ]
          ]
        }
      },
      {
        "title": "17.5 Responsive Testing Checklist & Complete Example",
        "explanation": "A robust testing checklist covering devices, zoom, keyboards, and complete page implementation.",
        "bullets": [
          "Test narrow phone (360-390px), tablet (768px), laptop (1024px), and desktop (1440px).",
          "Test 200% zoom: Ensure text remains readable and functional without horizontal page scroll.",
          "Keyboard navigation: Verify focus outlines remain visible and aren't obscured behind sticky headers.",
          "Avoid hiding mobile navigation without providing an accessible alternative (such as a working toggle button)."
        ],
        "codeSnippet": {
          "language": "HTML",
          "code": "<header class=\"site-header\">\n  <div class=\"container header-inner\">\n    <a class=\"brand\" href=\"/\">LearnWeb</a>\n    <nav class=\"nav\" aria-label=\"Main navigation\">\n      <a href=\"#courses\">Courses</a>\n      <a href=\"#about\">About</a>\n    </nav>\n  </div>\n</header>\n\n<style>\n.container { width: min(100% - 2rem, 72rem); margin-inline: auto; }\n.header-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }\n@media (max-width: 40rem) {\n  .header-inner { flex-direction: column; align-items: flex-start; }\n}\n</style>"
        }
      }
    ],
    "questions": [
      {
        "id": "q-17-1",
        "prompt": "What does the '<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">' tag help mobile browsers do?",
        "options": [
          {
            "id": "a",
            "label": "Sets the layout viewport to match physical device width, rendering mobile CSS styles correctly"
          },
          {
            "id": "b",
            "label": "Forces the phone screen into landscape mode"
          },
          {
            "id": "c",
            "label": "Disables mobile data caching"
          },
          {
            "id": "d",
            "label": "Speeds up cellular download speeds"
          }
        ],
        "correctIndex": 0,
        "explanation": "Without the viewport tag, mobile browsers assume a desktop viewport (e.g. 980px) and scale down the entire page."
      },
      {
        "id": "q-17-2",
        "prompt": "What does a 'mobile-first' CSS architecture mean in practice?",
        "options": [
          {
            "id": "a",
            "label": "Base styles target small screens, and min-width media queries progressively enhance the layout for wider screens"
          },
          {
            "id": "b",
            "label": "The website only works on mobile devices"
          },
          {
            "id": "c",
            "label": "Styles are written using max-width queries only"
          },
          {
            "id": "d",
            "label": "JavaScript must load before CSS"
          }
        ],
        "correctIndex": 0,
        "explanation": "Mobile-first writes base styles for smaller screens without media queries, then uses @media (min-width: ...) to enhance wider viewports."
      },
      {
        "id": "q-17-3",
        "prompt": "What is a breakpoint in responsive design?",
        "options": [
          {
            "id": "a",
            "label": "A viewport threshold where CSS media queries alter the layout arrangement"
          },
          {
            "id": "b",
            "label": "A browser crash"
          },
          {
            "id": "c",
            "label": "An error in the HTML document"
          },
          {
            "id": "d",
            "label": "A broken hyperlink"
          }
        ],
        "correctIndex": 0,
        "explanation": "A breakpoint is the specific viewport dimension threshold where layout styles adapt to accommodate content comfortably."
      },
      {
        "id": "q-17-4",
        "prompt": "How can you prevent an <img> from exceeding its parent container width while preserving aspect ratio?",
        "options": [
          {
            "id": "a",
            "label": "img { max-width: 100%; height: auto; }"
          },
          {
            "id": "b",
            "label": "img { width: 1000px; }"
          },
          {
            "id": "c",
            "label": "img { overflow: hidden; }"
          },
          {
            "id": "d",
            "label": "img { display: inline; }"
          }
        ],
        "correctIndex": 0,
        "explanation": "'max-width: 100%; height: auto;' constrains the image to its parent's width while preserving its natural aspect ratio."
      },
      {
        "id": "q-17-5",
        "prompt": "Which of the following is a common cause of unexpected horizontal scrolling on mobile viewports?",
        "options": [
          {
            "id": "a",
            "label": "Fixed-width elements (e.g. width: 600px), unconstrained images, or long unbroken URLs"
          },
          {
            "id": "b",
            "label": "Using rem units"
          },
          {
            "id": "c",
            "label": "Using semantic HTML elements"
          },
          {
            "id": "d",
            "label": "Having multiple headings"
          }
        ],
        "correctIndex": 0,
        "explanation": "Fixed widths wider than the mobile screen, oversized media, and unbroken strings force the viewport wider, causing horizontal overflow."
      },
      {
        "id": "q-17-6",
        "prompt": "What does 'clamp(2rem, 5vw, 4rem)' allow you to accomplish for font sizing?",
        "options": [
          {
            "id": "a",
            "label": "Sets a fluid font size scaling with 5vw between an enforced 2rem minimum and 4rem maximum"
          },
          {
            "id": "b",
            "label": "Locks the font size permanently to 5vw"
          },
          {
            "id": "c",
            "label": "Causes text to blink"
          },
          {
            "id": "d",
            "label": "Changes font colors across screens"
          }
        ],
        "correctIndex": 0,
        "explanation": "clamp(MIN, VAL, MAX) enables fluid responsive typography between guaranteed minimum and maximum boundaries."
      },
      {
        "id": "q-17-7",
        "prompt": "Why is 'user-scalable=no' discouraged in the viewport meta tag?",
        "options": [
          {
            "id": "a",
            "label": "It prevents users with low vision from zooming into content, violating accessibility standards"
          },
          {
            "id": "b",
            "label": "It slows down browser rendering"
          },
          {
            "id": "c",
            "label": "It disables touch clicks"
          },
          {
            "id": "d",
            "label": "It crashes iOS devices"
          }
        ],
        "correctIndex": 0,
        "explanation": "Disabling zoom prevents visually impaired users from magnifying text, which violates WCAG accessibility criteria."
      },
      {
        "id": "q-17-8",
        "prompt": "How should wide tabular data be handled responsively without breaking the page layout?",
        "options": [
          {
            "id": "a",
            "label": "Wrap the table in a container with 'overflow-x: auto' and tabindex='0' for keyboard accessibility"
          },
          {
            "id": "b",
            "label": "Delete all table columns"
          },
          {
            "id": "c",
            "label": "Convert the table to an image"
          },
          {
            "id": "d",
            "label": "Hide the table on all mobile devices"
          }
        ],
        "correctIndex": 0,
        "explanation": "An overflowing scroll wrapper confines horizontal scrolling strictly to the table element, keeping the rest of the page stable."
      },
      {
        "id": "q-17-9",
        "prompt": "What media query feature detects if a user has requested reduced motion in their operating system?",
        "options": [
          {
            "id": "a",
            "label": "@media (prefers-reduced-motion: reduce)"
          },
          {
            "id": "b",
            "label": "@media (motion: none)"
          },
          {
            "id": "c",
            "label": "@media (animation: stop)"
          },
          {
            "id": "d",
            "label": "@media (speed: slow)"
          }
        ],
        "correctIndex": 0,
        "explanation": "'prefers-reduced-motion' detects whether the user has enabled motion-reduction preferences in their OS to prevent vestibular discomfort."
      },
      {
        "id": "q-17-10",
        "prompt": "Why should breakpoints be based on content rather than specific device model screen sizes (e.g. iPhone 14)?",
        "options": [
          {
            "id": "a",
            "label": "New device sizes appear constantly; designing for where content wraps awkwardly future-proofs the layout"
          },
          {
            "id": "b",
            "label": "CSS cannot target phone brands"
          },
          {
            "id": "c",
            "label": "Device-based media queries are illegal"
          },
          {
            "id": "d",
            "label": "Browsers ignore pixel-based media queries"
          }
        ],
        "correctIndex": 0,
        "explanation": "Targeting specific devices quickly becomes obsolete. Content-driven breakpoints ensure the interface looks great on any viewport size."
      }
    ]
  },
  {
    "id": "item-18-html-css-practice",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "18. Comprehensive HTML & CSS Practice Lab",
    "duration": "45 mins",
    "type": "practice",
    "position": 18,
    "contentHeading": "18. Comprehensive HTML & CSS Practice Lab",
    "contentDescription": "Test your skills across all 17 lessons: HTML document structure, semantics, forms, tables, media, CSS selectors, box model, cascade, display, positioning, flexbox, grid, and responsive design.",
    "questions": [
      {
        "id": "prac-01",
        "prompt": "Which declaration must be the very first line of an HTML5 file to prevent Quirks Mode?",
        "options": [
          {
            "id": "a",
            "label": "<!DOCTYPE html>"
          },
          {
            "id": "b",
            "label": "<html>"
          },
          {
            "id": "c",
            "label": "<meta charset=\"UTF-8\">"
          },
          {
            "id": "d",
            "label": "<!HTML5>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<!DOCTYPE html> instructs browser rendering engines to parse the document in modern HTML5 standards mode."
      },
      {
        "id": "prac-02",
        "prompt": "Why should every modern HTML document include '<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">'?",
        "options": [
          {
            "id": "a",
            "label": "It matches page width to the device screen width at 1:1 scale, preventing mobile zoom-out"
          },
          {
            "id": "b",
            "label": "It compiles CSS code"
          },
          {
            "id": "c",
            "label": "It translates the site into mobile apps"
          },
          {
            "id": "d",
            "label": "It encrypts local storage"
          }
        ],
        "correctIndex": 0,
        "explanation": "The viewport meta tag ensures mobile devices render at physical screen width instead of zooming out a 980px desktop view."
      },
      {
        "id": "prac-03",
        "prompt": "Which element is an accessible landmark that must only appear once per page for unique main content?",
        "options": [
          {
            "id": "a",
            "label": "<main>"
          },
          {
            "id": "b",
            "label": "<header>"
          },
          {
            "id": "c",
            "label": "<section>"
          },
          {
            "id": "d",
            "label": "<div>"
          }
        ],
        "correctIndex": 0,
        "explanation": "There should only be one visible <main> element per document representing the central unique content."
      },
      {
        "id": "prac-04",
        "prompt": "Which tag is a void (self-closing) element that cannot contain child content?",
        "options": [
          {
            "id": "a",
            "label": "<img src=\"logo.png\" alt=\"Logo\">"
          },
          {
            "id": "b",
            "label": "<p>Hello</p>"
          },
          {
            "id": "c",
            "label": "<button>Submit</button>"
          },
          {
            "id": "d",
            "label": "<textarea></textarea>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<img> is a void element in HTML5 and never has a closing tag."
      },
      {
        "id": "prac-05",
        "prompt": "What is the security risk of opening external links with 'target=\"_blank\"' without 'rel=\"noopener noreferrer\"'?",
        "options": [
          {
            "id": "a",
            "label": "Reverse tabnabbing: The opened page can access window.opener and redirect the origin tab to a phishing site"
          },
          {
            "id": "b",
            "label": "It causes memory leaks on mobile"
          },
          {
            "id": "c",
            "label": "It deletes browser history"
          },
          {
            "id": "d",
            "label": "It disables HTTPS"
          }
        ],
        "correctIndex": 0,
        "explanation": "'rel=\"noopener\"' severs the window.opener reference, preventing malicious target sites from controlling the origin tab."
      },
      {
        "id": "prac-06",
        "prompt": "What is the correct alt text for a purely decorative icon?",
        "options": [
          {
            "id": "a",
            "label": "alt=\"\""
          },
          {
            "id": "b",
            "label": "Omit the alt attribute"
          },
          {
            "id": "c",
            "label": "alt=\"decorative icon\""
          },
          {
            "id": "d",
            "label": "alt=\"null\""
          }
        ],
        "correctIndex": 0,
        "explanation": "alt='' signals screen readers to skip the decorative image without reciting raw filenames."
      },
      {
        "id": "prac-07",
        "prompt": "In a table, what attribute connects a header cell to all the data cells in its column for screen readers?",
        "options": [
          {
            "id": "a",
            "label": "scope=\"col\""
          },
          {
            "id": "b",
            "label": "align=\"column\""
          },
          {
            "id": "c",
            "label": "header=\"col\""
          },
          {
            "id": "d",
            "label": "col=\"true\""
          }
        ],
        "correctIndex": 0,
        "explanation": "scope='col' informs screen readers that the header applies to the column of cells below it."
      },
      {
        "id": "prac-08",
        "prompt": "How do you connect a '<label>' explicitly to an '<input id=\"user-email\">'?",
        "options": [
          {
            "id": "a",
            "label": "<label for=\"user-email\">Email</label>"
          },
          {
            "id": "b",
            "label": "<label input=\"user-email\">Email</label>"
          },
          {
            "id": "c",
            "label": "<label name=\"user-email\">Email</label>"
          },
          {
            "id": "d",
            "label": "<label target=\"user-email\">Email</label>"
          }
        ],
        "correctIndex": 0,
        "explanation": "The 'for' attribute on the label must match the 'id' on the input."
      },
      {
        "id": "prac-09",
        "prompt": "Why should login and password submissions use 'method=\"POST\"'?",
        "options": [
          {
            "id": "a",
            "label": "POST sends data in the request body; GET exposes sensitive data in the visible URL query string"
          },
          {
            "id": "b",
            "label": "POST is 10x faster"
          },
          {
            "id": "c",
            "label": "GET cannot transmit characters"
          },
          {
            "id": "d",
            "label": "POST automatically verifies passwords"
          }
        ],
        "correctIndex": 0,
        "explanation": "GET places fields into the browser address bar where credentials would be logged in history and proxy logs."
      },
      {
        "id": "prac-10",
        "prompt": "What attribute allows multiple radio buttons to function as a single mutually exclusive group?",
        "options": [
          {
            "id": "a",
            "label": "Sharing the exact same 'name' attribute"
          },
          {
            "id": "b",
            "label": "Sharing the same 'id'"
          },
          {
            "id": "c",
            "label": "Wrapping in a <div>"
          },
          {
            "id": "d",
            "label": "Setting 'type=\"radio-group\"'"
          }
        ],
        "correctIndex": 0,
        "explanation": "Radio buttons sharing the same 'name' attribute automatically become mutually exclusive."
      },
      {
        "id": "prac-11",
        "prompt": "What is the universal CSS box-sizing reset that includes padding and borders in element width?",
        "options": [
          {
            "id": "a",
            "label": "*, *::before, *::after { box-sizing: border-box; }"
          },
          {
            "id": "b",
            "label": "body { box-sizing: content-box; }"
          },
          {
            "id": "c",
            "label": "html { box-sizing: border-box; }"
          },
          {
            "id": "d",
            "label": "* { margin: 0; }"
          }
        ],
        "correctIndex": 0,
        "explanation": "Applying box-sizing: border-box across *, *::before, and *::after ensures padding and borders are absorbed inside declared widths."
      },
      {
        "id": "prac-12",
        "prompt": "An element has 'width: 400px; padding: 25px; border: 5px solid black; box-sizing: border-box;'. What is its total width?",
        "options": [
          {
            "id": "a",
            "label": "400px"
          },
          {
            "id": "b",
            "label": "460px"
          },
          {
            "id": "c",
            "label": "430px"
          },
          {
            "id": "d",
            "label": "340px"
          }
        ],
        "correctIndex": 0,
        "explanation": "With border-box, the total rendered width is strictly the declared 400px."
      },
      {
        "id": "prac-13",
        "prompt": "What is the result of margin collapse when two stacked block elements have 'margin-bottom: 40px' and 'margin-top: 30px'?",
        "options": [
          {
            "id": "a",
            "label": "40px"
          },
          {
            "id": "b",
            "label": "70px"
          },
          {
            "id": "c",
            "label": "10px"
          },
          {
            "id": "d",
            "label": "35px"
          }
        ],
        "correctIndex": 0,
        "explanation": "Vertical margins collapse into the largest single margin: max(40px, 30px) = 40px."
      },
      {
        "id": "prac-14",
        "prompt": "Which selector has the highest specificity?",
        "options": [
          {
            "id": "a",
            "label": "#nav"
          },
          {
            "id": "b",
            "label": "header.main-nav .menu-item a.active"
          },
          {
            "id": "c",
            "label": "ul > li.active"
          },
          {
            "id": "d",
            "label": "body div section p"
          }
        ],
        "correctIndex": 0,
        "explanation": "The ID selector #nav has specificity (0,1,0,0) = 100, which overpowers any number of classes and elements."
      },
      {
        "id": "prac-15",
        "prompt": "Which CSS property naturally passes down from parent to child through inheritance?",
        "options": [
          {
            "id": "a",
            "label": "font-family"
          },
          {
            "id": "b",
            "label": "margin"
          },
          {
            "id": "c",
            "label": "padding"
          },
          {
            "id": "d",
            "label": "border"
          }
        ],
        "correctIndex": 0,
        "explanation": "Typography properties like font-family, color, and line-height are naturally inherited."
      },
      {
        "id": "prac-16",
        "prompt": "What is the difference between 'display: none' and 'visibility: hidden'?",
        "options": [
          {
            "id": "a",
            "label": "'display: none' removes the element from flow taking 0 space; 'visibility: hidden' hides it while preserving its physical gap"
          },
          {
            "id": "b",
            "label": "'display: none' is visible in printing"
          },
          {
            "id": "c",
            "label": "'visibility: hidden' deletes element styles"
          },
          {
            "id": "d",
            "label": "They are completely identical"
          }
        ],
        "correctIndex": 0,
        "explanation": "display: none takes up 0px space, while visibility: hidden leaves an empty box of identical dimensions."
      },
      {
        "id": "prac-17",
        "prompt": "What must you set on a parent element so that its child with 'position: absolute;' anchors inside it?",
        "options": [
          {
            "id": "a",
            "label": "position: relative; (or any non-static position)"
          },
          {
            "id": "b",
            "label": "display: block;"
          },
          {
            "id": "c",
            "label": "overflow: hidden;"
          },
          {
            "id": "d",
            "label": "z-index: 1;"
          }
        ],
        "correctIndex": 0,
        "explanation": "A non-static position (typically relative) on the parent establishes the containing block for absolute children."
      },
      {
        "id": "prac-18",
        "prompt": "Which positioning scheme pins an element relative to the browser window so it never scrolls?",
        "options": [
          {
            "id": "a",
            "label": "position: fixed;"
          },
          {
            "id": "b",
            "label": "position: absolute;"
          },
          {
            "id": "c",
            "label": "position: sticky;"
          },
          {
            "id": "d",
            "label": "position: relative;"
          }
        ],
        "correctIndex": 0,
        "explanation": "position: fixed locks an element to the viewport."
      },
      {
        "id": "prac-19",
        "prompt": "In a flex container with 'flex-direction: row', which property distributes space along the horizontal main axis?",
        "options": [
          {
            "id": "a",
            "label": "justify-content"
          },
          {
            "id": "b",
            "label": "align-items"
          },
          {
            "id": "c",
            "label": "align-content"
          },
          {
            "id": "d",
            "label": "flex-wrap"
          }
        ],
        "correctIndex": 0,
        "explanation": "justify-content distributes free space along the main axis (horizontal in row mode)."
      },
      {
        "id": "prac-20",
        "prompt": "In Flexbox, which property vertically centers items across the cross axis in 'flex-direction: row'?",
        "options": [
          {
            "id": "a",
            "label": "align-items: center;"
          },
          {
            "id": "b",
            "label": "justify-content: center;"
          },
          {
            "id": "c",
            "label": "text-align: center;"
          },
          {
            "id": "d",
            "label": "vertical-align: middle;"
          }
        ],
        "correctIndex": 0,
        "explanation": "align-items aligns items along the cross axis (vertical in row mode)."
      },
      {
        "id": "prac-21",
        "prompt": "What does the 'repeat(auto-fit, minmax(280px, 1fr))' CSS Grid formula achieve?",
        "options": [
          {
            "id": "a",
            "label": "An auto-responsive column grid that wraps dynamically without media queries"
          },
          {
            "id": "b",
            "label": "A fixed 280-column grid"
          },
          {
            "id": "c",
            "label": "A grid that only works on desktop"
          },
          {
            "id": "d",
            "label": "A grid that animates cards"
          }
        ],
        "correctIndex": 0,
        "explanation": "auto-fit + minmax creates a responsive column layout that wraps seamlessly across all screen sizes."
      },
      {
        "id": "prac-22",
        "prompt": "How many columns does 'grid-column: span 3;' cause an item to span?",
        "options": [
          {
            "id": "a",
            "label": "3 columns"
          },
          {
            "id": "b",
            "label": "1 column"
          },
          {
            "id": "c",
            "label": "4 columns"
          },
          {
            "id": "d",
            "label": "All columns"
          }
        ],
        "correctIndex": 0,
        "explanation": "'grid-column: span 3' instructs the element to cover 3 horizontal column tracks."
      },
      {
        "id": "prac-23",
        "prompt": "What does 'img { max-width: 100%; height: auto; }' prevent?",
        "options": [
          {
            "id": "a",
            "label": "Images overflowing their parent container or distorting their aspect ratio"
          },
          {
            "id": "b",
            "label": "Images from loading on mobile"
          },
          {
            "id": "c",
            "label": "Images from displaying in color"
          },
          {
            "id": "d",
            "label": "Right-clicking on images"
          }
        ],
        "correctIndex": 0,
        "explanation": "max-width: 100% prevents image overflow, and height: auto preserves natural aspect ratio."
      },
      {
        "id": "prac-24",
        "prompt": "What does '@media (min-width: 1024px)' target?",
        "options": [
          {
            "id": "a",
            "label": "Screens with a viewport width of 1024 pixels or wider"
          },
          {
            "id": "b",
            "label": "Screens narrower than 1024 pixels"
          },
          {
            "id": "c",
            "label": "Only 1024x768 screens"
          },
          {
            "id": "d",
            "label": "Print stylesheets"
          }
        ],
        "correctIndex": 0,
        "explanation": "min-width: 1024px applies styles to screens that are 1024px wide or wider."
      },
      {
        "id": "prac-25",
        "prompt": "Why is 'rem' preferred over 'px' for font sizing?",
        "options": [
          {
            "id": "a",
            "label": "It scales proportionally with user browser font-size accessibility preferences"
          },
          {
            "id": "b",
            "label": "It compiles faster in CSS"
          },
          {
            "id": "c",
            "label": "'px' is removed in HTML5"
          },
          {
            "id": "d",
            "label": "It makes text bold by default"
          }
        ],
        "correctIndex": 0,
        "explanation": "'rem' is relative to the root font size, respecting user-configured accessibility font scales."
      }
    ]
  },
  {
    "id": "item-19-html-css-quiz",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "19. Module Assessment: HTML & CSS Certification Quiz",
    "duration": "45 mins",
    "type": "quiz",
    "position": 19,
    "contentHeading": "19. Module Assessment: HTML & CSS Certification Quiz",
    "contentDescription": "Final comprehensive module assessment. Answer all 25 questions covering full-stack web foundations, modern HTML5 semantics, accessible forms, tables, CSS cascade, layout systems, and responsive design.",
    "questions": [
      {
        "id": "quiz-01",
        "prompt": "In the client-server model, what software initiates the HTTP GET request when a user visits a website?",
        "options": [
          {
            "id": "a",
            "label": "The web browser (client)"
          },
          {
            "id": "b",
            "label": "The web server (Nginx/Apache)"
          },
          {
            "id": "c",
            "label": "The database (PostgreSQL)"
          },
          {
            "id": "d",
            "label": "The operating system kernel"
          }
        ],
        "correctIndex": 0,
        "explanation": "The browser acts as the client, initiating HTTP requests to the server."
      },
      {
        "id": "quiz-02",
        "prompt": "What is the critical problem with omitting '<!DOCTYPE html>'?",
        "options": [
          {
            "id": "a",
            "label": "The browser parses in Quirks Mode, breaking standard CSS box model and layout behaviors"
          },
          {
            "id": "b",
            "label": "The webpage refuses to display"
          },
          {
            "id": "c",
            "label": "HTML5 tags are converted to plain text"
          },
          {
            "id": "d",
            "label": "SSL encryption fails"
          }
        ],
        "correctIndex": 0,
        "explanation": "Without <!DOCTYPE html>, browsers fall back to Quirks Mode, emulating 1990s layout bugs."
      },
      {
        "id": "quiz-03",
        "prompt": "What attribute inside '<script src=\"app.js\" defer></script>' allows non-blocking background downloads?",
        "options": [
          {
            "id": "a",
            "label": "defer"
          },
          {
            "id": "b",
            "label": "async-wait"
          },
          {
            "id": "c",
            "label": "delay"
          },
          {
            "id": "d",
            "label": "rel"
          }
        ],
        "correctIndex": 0,
        "explanation": "'defer' downloads the script asynchronously and runs it only after DOM parsing finishes."
      },
      {
        "id": "quiz-04",
        "prompt": "Which element represents the main topic of a webpage and should only occur ONCE per document?",
        "options": [
          {
            "id": "a",
            "label": "<h1>"
          },
          {
            "id": "b",
            "label": "<h6>"
          },
          {
            "id": "c",
            "label": "<title>"
          },
          {
            "id": "d",
            "label": "<header>"
          }
        ],
        "correctIndex": 0,
        "explanation": "Exactly one <h1> should be present to establish a clear document outline for SEO and screen readers."
      },
      {
        "id": "quiz-05",
        "prompt": "What is the semantic difference between '<strong>' and '<b>'?",
        "options": [
          {
            "id": "a",
            "label": "<strong> conveys semantic importance to assistive tech; <b> is purely visual bold styling"
          },
          {
            "id": "b",
            "label": "<b> is modern; <strong> is deprecated"
          },
          {
            "id": "c",
            "label": "<strong> cannot be styled with CSS"
          },
          {
            "id": "d",
            "label": "There is no difference"
          }
        ],
        "correctIndex": 0,
        "explanation": "<strong> imparts semantic importance and urgency that screen readers interpret vocally."
      },
      {
        "id": "quiz-06",
        "prompt": "Which tag is a self-closing void element in HTML5?",
        "options": [
          {
            "id": "a",
            "label": "<input>"
          },
          {
            "id": "b",
            "label": "<button>"
          },
          {
            "id": "c",
            "label": "<p>"
          },
          {
            "id": "d",
            "label": "<select>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<input> is a void element and never has a closing tag."
      },
      {
        "id": "quiz-07",
        "prompt": "What does the path 'images/logo.png' indicate in a relative URL?",
        "options": [
          {
            "id": "a",
            "label": "Look inside an 'images' subfolder located in the current directory"
          },
          {
            "id": "b",
            "label": "Look in the parent folder"
          },
          {
            "id": "c",
            "label": "Look at the root of the server"
          },
          {
            "id": "d",
            "label": "Fetch from a remote CDN"
          }
        ],
        "correctIndex": 0,
        "explanation": "'images/logo.png' enters the images subfolder within the current directory."
      },
      {
        "id": "quiz-08",
        "prompt": "Which attribute provides screen-reader descriptions for images and fallbacks if images fail to load?",
        "options": [
          {
            "id": "a",
            "label": "alt"
          },
          {
            "id": "b",
            "label": "title"
          },
          {
            "id": "c",
            "label": "src"
          },
          {
            "id": "d",
            "label": "desc"
          }
        ],
        "correctIndex": 0,
        "explanation": "The 'alt' attribute supplies alternative text for assistive tech and broken image states."
      },
      {
        "id": "quiz-09",
        "prompt": "What is the only valid direct child element of a '<ul>' or '<ol>'?",
        "options": [
          {
            "id": "a",
            "label": "<li>"
          },
          {
            "id": "b",
            "label": "<div>"
          },
          {
            "id": "c",
            "label": "<a>"
          },
          {
            "id": "d",
            "label": "<p>"
          }
        ],
        "correctIndex": 0,
        "explanation": "In valid HTML5, <li> is the only permitted direct child of <ul> or <ol>."
      },
      {
        "id": "quiz-10",
        "prompt": "Which table element encapsulates the column headers?",
        "options": [
          {
            "id": "a",
            "label": "<thead>"
          },
          {
            "id": "b",
            "label": "<tbody>"
          },
          {
            "id": "c",
            "label": "<tfoot>"
          },
          {
            "id": "d",
            "label": "<caption>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<thead> groups the header rows containing column titles (<th>)."
      },
      {
        "id": "quiz-11",
        "prompt": "How do you bind a '<label>' to '<input id=\"user-phone\">' so clicking the label focuses the phone input?",
        "options": [
          {
            "id": "a",
            "label": "<label for=\"user-phone\">"
          },
          {
            "id": "b",
            "label": "<label to=\"user-phone\">"
          },
          {
            "id": "c",
            "label": "<label target=\"user-phone\">"
          },
          {
            "id": "d",
            "label": "<label bind=\"user-phone\">"
          }
        ],
        "correctIndex": 0,
        "explanation": "The 'for' attribute links the label to the input matching that id."
      },
      {
        "id": "quiz-12",
        "prompt": "Which form method transmits data invisibly inside the HTTP request body instead of the URL?",
        "options": [
          {
            "id": "a",
            "label": "method=\"POST\""
          },
          {
            "id": "b",
            "label": "method=\"GET\""
          },
          {
            "id": "c",
            "label": "method=\"URL\""
          },
          {
            "id": "d",
            "label": "method=\"FETCH\""
          }
        ],
        "correctIndex": 0,
        "explanation": "POST sends form data safely in the body, which is required for passwords and private data."
      },
      {
        "id": "quiz-13",
        "prompt": "What is the semantic tag for an independent, self-contained piece of content like a blog post or product card?",
        "options": [
          {
            "id": "a",
            "label": "<article>"
          },
          {
            "id": "b",
            "label": "<section>"
          },
          {
            "id": "c",
            "label": "<aside>"
          },
          {
            "id": "d",
            "label": "<div>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<article> represents an independent composition that could theoretically be syndicated on its own."
      },
      {
        "id": "quiz-14",
        "prompt": "Which element provides contact details for the author of a webpage?",
        "options": [
          {
            "id": "a",
            "label": "<address>"
          },
          {
            "id": "b",
            "label": "<contact>"
          },
          {
            "id": "c",
            "label": "<author>"
          },
          {
            "id": "d",
            "label": "<mail>"
          }
        ],
        "correctIndex": 0,
        "explanation": "<address> is the semantic element for contact information."
      },
      {
        "id": "quiz-15",
        "prompt": "What is the correct syntax to link an external CSS file named 'theme.css'?",
        "options": [
          {
            "id": "a",
            "label": "<link rel=\"stylesheet\" href=\"theme.css\">"
          },
          {
            "id": "b",
            "label": "<style src=\"theme.css\"></style>"
          },
          {
            "id": "c",
            "label": "<css href=\"theme.css\">"
          },
          {
            "id": "d",
            "label": "<script rel=\"css\" href=\"theme.css\">"
          }
        ],
        "correctIndex": 0,
        "explanation": "<link rel='stylesheet' href='theme.css'> is the official syntax for attaching stylesheets."
      },
      {
        "id": "quiz-16",
        "prompt": "What does the child combinator 'ul > li' select?",
        "options": [
          {
            "id": "a",
            "label": "Only <li> elements that are direct, immediate children of <ul>"
          },
          {
            "id": "b",
            "label": "All <li> elements nested at any depth inside <ul>"
          },
          {
            "id": "c",
            "label": "The <ul> element after an <li>"
          },
          {
            "id": "d",
            "label": "Only the first <li>"
          }
        ],
        "correctIndex": 0,
        "explanation": "The '>' combinator strictly matches direct children, ignoring deeper grandchildren."
      },
      {
        "id": "quiz-17",
        "prompt": "What unit is relative to the font-size of the root '<html>' element?",
        "options": [
          {
            "id": "a",
            "label": "rem"
          },
          {
            "id": "b",
            "label": "em"
          },
          {
            "id": "c",
            "label": "px"
          },
          {
            "id": "d",
            "label": "vw"
          }
        ],
        "correctIndex": 0,
        "explanation": "rem stands for Root EM, scaling relative to <html> (default 16px)."
      },
      {
        "id": "quiz-18",
        "prompt": "Under 'box-sizing: border-box', does adding 30px padding expand the overall width of a 300px box?",
        "options": [
          {
            "id": "a",
            "label": "No, the total width remains exactly 300px (content area shrinks)"
          },
          {
            "id": "b",
            "label": "Yes, it expands to 360px"
          },
          {
            "id": "c",
            "label": "Yes, it expands to 330px"
          },
          {
            "id": "d",
            "label": "It depends on the browser"
          }
        ],
        "correctIndex": 0,
        "explanation": "border-box absorbs padding inside the declared width, keeping total width fixed."
      },
      {
        "id": "quiz-19",
        "prompt": "What specificity tuple does an ID selector '#main' carry?",
        "options": [
          {
            "id": "a",
            "label": "(0, 1, 0, 0)"
          },
          {
            "id": "b",
            "label": "(0, 0, 1, 0)"
          },
          {
            "id": "c",
            "label": "(0, 0, 0, 1)"
          },
          {
            "id": "d",
            "label": "(1, 0, 0, 0)"
          }
        ],
        "correctIndex": 0,
        "explanation": "IDs occupy the second column: (0, 1, 0, 0) = 100 points."
      },
      {
        "id": "quiz-20",
        "prompt": "Which display value allows elements to sit inline while supporting explicit width and height?",
        "options": [
          {
            "id": "a",
            "label": "inline-block"
          },
          {
            "id": "b",
            "label": "inline"
          },
          {
            "id": "c",
            "label": "block"
          },
          {
            "id": "d",
            "label": "none"
          }
        ],
        "correctIndex": 0,
        "explanation": "inline-block allows inline text flow while respecting width, height, and margins."
      },
      {
        "id": "quiz-21",
        "prompt": "Where does an element with 'position: absolute;' align itself?",
        "options": [
          {
            "id": "a",
            "label": "Relative to its nearest non-static ancestor (or the viewport if none exists)"
          },
          {
            "id": "b",
            "label": "Always to the <body>"
          },
          {
            "id": "c",
            "label": "To its immediate preceding sibling"
          },
          {
            "id": "d",
            "label": "To the mouse cursor"
          }
        ],
        "correctIndex": 0,
        "explanation": "Absolute elements align to the nearest positioned containing block."
      },
      {
        "id": "quiz-22",
        "prompt": "Which Flexbox property controls how extra space along the main axis is distributed between items?",
        "options": [
          {
            "id": "a",
            "label": "justify-content"
          },
          {
            "id": "b",
            "label": "align-items"
          },
          {
            "id": "c",
            "label": "flex-wrap"
          },
          {
            "id": "d",
            "label": "flex-flow"
          }
        ],
        "correctIndex": 0,
        "explanation": "justify-content distributes free space along the main axis."
      },
      {
        "id": "quiz-23",
        "prompt": "What does 'align-items: center;' do in a default horizontal flex row?",
        "options": [
          {
            "id": "a",
            "label": "Vertically centers items along the cross axis"
          },
          {
            "id": "b",
            "label": "Horizontally centers items along the main axis"
          },
          {
            "id": "c",
            "label": "Centers the text inside buttons"
          },
          {
            "id": "d",
            "label": "Centers the flex container on the screen"
          }
        ],
        "correctIndex": 0,
        "explanation": "align-items operates on the cross axis, which is vertical in row mode."
      },
      {
        "id": "quiz-24",
        "prompt": "What does 'grid-template-columns: repeat(3, 1fr);' create in CSS Grid?",
        "options": [
          {
            "id": "a",
            "label": "Three equal-width fractional columns"
          },
          {
            "id": "b",
            "label": "Three rows of fixed height"
          },
          {
            "id": "c",
            "label": "A single column repeated 3 times"
          },
          {
            "id": "d",
            "label": "A 3-pixel border"
          }
        ],
        "correctIndex": 0,
        "explanation": "repeat(3, 1fr) creates three equal columns sharing available space."
      },
      {
        "id": "quiz-25",
        "prompt": "Why should media queries in a mobile-first responsive strategy use 'min-width' rather than 'max-width'?",
        "options": [
          {
            "id": "a",
            "label": "They establish lightweight base styles for mobile and progressively enhance layout as screen space grows"
          },
          {
            "id": "b",
            "label": "Mobile phones crash on max-width"
          },
          {
            "id": "c",
            "label": "min-width is required by Google"
          },
          {
            "id": "d",
            "label": "max-width only works in print stylesheets"
          }
        ],
        "correctIndex": 0,
        "explanation": "Mobile-first builds upward progressively with min-width, avoiding heavy desktop style overrides."
      }
    ]
  },
  {
    "id": "item-20-html-css-capstone",
    "moduleId": "mod-html-css-intro",
    "moduleTitle": "Introduction to HTML & CSS",
    "modulePosition": 1,
    "title": "20. Capstone Project: Responsive Course Landing Page",
    "duration": "90 mins",
    "type": "assignment",
    "position": 20,
    "contentHeading": "Final Practical Assignment: Responsive Course Landing Page",
    "contentDescription": "Combine display behavior, positioning, Flexbox, Grid, and responsive rules in one coherent, production-ready interface based on Lessons 13–17.",
    "assignmentPrompt": {
      "instructions": "Use the concepts from Lessons 13–17 to build a small course landing page. The goal is to combine display behavior, positioning, Flexbox, Grid, and responsive rules in one coherent interface.\n\nRequirements:\n1. A semantic header with brand, navigation, and a call-to-action link.\n2. A hero section with a heading, description, and button.\n3. A course section with at least four cards.\n4. A \"New\" or \"Popular\" badge positioned in one card using a relative card wrapper and an absolute badge.\n5. Use Flexbox for the header or card-internal alignment.\n6. Use Grid for the course card collection.\n7. Use responsive styles so the layout works at narrow and wide widths.\n8. Include an image that scales without distortion, if images are used.\n9. Avoid horizontal page overflow at all tested sizes.\n10. Keep keyboard focus visible and maintain a meaningful HTML source order.\n\nSuggested build sequence:\n- Step 1: Write semantic HTML first and confirm the content order.\n- Step 2: Apply box-sizing: border-box and base typography.\n- Step 3: Build the header using Flexbox.\n- Step 4: Build the course collection using Grid.\n- Step 5: Add a positioned badge with a relative card wrapper and an absolute badge.\n- Step 6: Add mobile-first responsive rules and fluid typography with clamp().\n- Step 7: Test the page at narrow (phone), medium (tablet), and wide (desktop) viewport sizes.\n- Step 8: Inspect overflow, focus order, contrast, and reduced-motion behavior.\n- Step 9: Refactor repeated CSS values and remove unused rules.",
      "deliverables": [
        "A semantic header with brand, navigation, and a call-to-action link.",
        "A hero section with a heading, description, and button.",
        "A course section with at least four cards laid out using CSS Grid.",
        "A 'New' or 'Popular' badge positioned in one card using a relative wrapper and absolute badge.",
        "Flexbox used for header or card-internal alignment.",
        "Responsive styles ensuring the layout functions seamlessly at narrow and wide widths.",
        "Images and media that scale without distortion (max-width: 100%, height: auto).",
        "Zero horizontal page overflow at all tested screen sizes.",
        "Visible keyboard focus and meaningful HTML source order."
      ]
    }
  }
];

// --- MODULE 1: INTRODUCTION TO WEB & SEMANTIC HTML (LESSONS 1-7) ---
const htmlMod1Lessons = rawHtmlItems.slice(0, 7);

const htmlModule01Quiz: CurriculumItem = {
  id: "item-html-m1-quiz",
  subCourseId: "mod-html-css-intro",
  subCourseTitle: "Fundamentals of HTML & CSS",
  subCoursePosition: 1,
  moduleId: "module-html-01-web-structure",
  moduleTitle: "Module 1: Introduction to Web & Semantic HTML",
  modulePosition: 1,
  title: "Module 1 MCQs: Web Architecture, HTML5 Structure & Forms",
  duration: "25 mins",
  type: "quiz",
  position: 8,
  isModuleQuiz: true,
  contentHeading: "Module 1 Assessment: HTML Fundamentals Knowledge Check",
  contentDescription: "Evaluate your understanding of client-server requests, HTML document anatomy, tags/attributes, links, lists, tables, form inputs, and semantic accessibility.",
  questions: [
    ...htmlMod1Lessons[0].questions!.slice(0, 3),
    ...htmlMod1Lessons[1].questions!.slice(0, 2),
    ...htmlMod1Lessons[2].questions!.slice(0, 2),
    ...htmlMod1Lessons[3].questions!.slice(0, 2),
    ...htmlMod1Lessons[4].questions!.slice(0, 2),
    ...htmlMod1Lessons[5].questions!.slice(0, 2),
    ...htmlMod1Lessons[6].questions!.slice(0, 2)
  ]
};

const htmlModule01Assessment: CurriculumItem = {
  id: "item-html-m1-assessment",
  subCourseId: "mod-html-css-intro",
  subCourseTitle: "Fundamentals of HTML & CSS",
  subCoursePosition: 1,
  moduleId: "module-html-01-web-structure",
  moduleTitle: "Module 1: Introduction to Web & Semantic HTML",
  modulePosition: 1,
  title: "Module 1 Assessment: Accessible Semantic Product Showcase Page",
  duration: "45 mins",
  type: "assignment",
  position: 9,
  isModuleAssessment: true,
  contentHeading: "Module 1 Practical Challenge: Building an Accessible Semantic Webpage",
  contentDescription: "Code a fully accessible semantic HTML5 product webpage using proper landmarks (header, nav, main, section, article, aside, footer), tables, and an interactive contact form.",
  assignmentPrompt: {
    instructions: "Develop a semantic HTML5 webpage:\n1. Use <!DOCTYPE html>, correct <meta> tags for charset and responsive viewport.\n2. Structure the body using semantic landmarks: header, nav, main, section, article, and footer.\n3. Include a comparison table with <thead>, <tbody>, and proper <th> headers.\n4. Create a registration/order form with labeled inputs, radio buttons, select dropdown, and submit button.",
    deliverables: [
      "Well-formed index.html file validating cleanly against W3C HTML validator",
      "Correct semantic tag usage without redundant div nesting",
      "Accessible form inputs with explicit label-for associations"
    ]
  }
};

const htmlModule01: CurriculumSubModule = {
  id: "module-html-01-web-structure",
  subCourseId: "mod-html-css-intro",
  title: "Module 1: Introduction to Web & Semantic HTML",
  description: "Learn how the web functions from scratch: DNS and HTTP request lifecycle, HTML document anatomy, elements, attributes, media, tables, accessible forms, and semantic tags.",
  position: 1,
  duration: "3 hours, 20 mins",
  lessons: htmlMod1Lessons,
  moduleQuiz: htmlModule01Quiz,
  moduleAssessment: htmlModule01Assessment,
  items: [...htmlMod1Lessons, htmlModule01Quiz, htmlModule01Assessment]
};

// --- MODULE 2: CSS CORE & THE BOX MODEL (LESSONS 8-14) ---
const htmlMod2Lessons = rawHtmlItems.slice(7, 14);

const htmlModule02Quiz: CurriculumItem = {
  id: "item-html-m2-quiz",
  subCourseId: "mod-html-css-intro",
  subCourseTitle: "Fundamentals of HTML & CSS",
  subCoursePosition: 1,
  moduleId: "module-html-02-css-box-model",
  moduleTitle: "Module 2: CSS Core & The Box Model",
  modulePosition: 2,
  title: "Module 2 MCQs: CSS Selectors, Cascade, Specificity & Box Model",
  duration: "25 mins",
  type: "quiz",
  position: 17,
  isModuleQuiz: true,
  contentHeading: "Module 2 Assessment: CSS Core Knowledge Check",
  contentDescription: "Evaluate your understanding of CSS syntax, combinators, specificity hierarchy, color systems, units (rem/em/vh/vw), the box model, display types, and positioning.",
  questions: [
    ...htmlMod2Lessons[0].questions!.slice(0, 2),
    ...htmlMod2Lessons[1].questions!.slice(0, 3),
    ...htmlMod2Lessons[2].questions!.slice(0, 2),
    ...htmlMod2Lessons[3].questions!.slice(0, 3),
    ...htmlMod2Lessons[4].questions!.slice(0, 2),
    ...htmlMod2Lessons[5].questions!.slice(0, 2),
    ...htmlMod2Lessons[6].questions!.slice(0, 2)
  ]
};

const htmlModule02Assessment: CurriculumItem = {
  id: "item-html-m2-assessment",
  subCourseId: "mod-html-css-intro",
  subCourseTitle: "Fundamentals of HTML & CSS",
  subCoursePosition: 1,
  moduleId: "module-html-02-css-box-model",
  moduleTitle: "Module 2: CSS Core & The Box Model",
  modulePosition: 2,
  title: "Module 2 Assessment: Pixel-Perfect Component & Layout Lab",
  duration: "45 mins",
  type: "assignment",
  position: 18,
  isModuleAssessment: true,
  contentHeading: "Module 2 Practical Challenge: CSS Box Model & Pricing Cards",
  contentDescription: "Build a set of responsive pricing tier cards using pure CSS: border-box box-sizing, rem typography, card hovering shadows, badge positioning, and display properties.",
  assignmentPrompt: {
    instructions: "Style a multi-tier subscription card UI:\n1. Set global *, *::before, *::after { box-sizing: border-box; }.\n2. Style 3 pricing cards with margin, padding, border-radius, and box-shadows.\n3. Use absolute positioning inside relative parent cards for a 'POPULAR' ribbon badge.\n4. Implement smooth CSS transitions on hover (transform, box-shadow).",
    deliverables: [
      "Clean CSS stylesheet with organized selectors and custom properties",
      "Demonstration of padding, margin-collapse handling, and relative/absolute positioning",
      "Responsive wrapping behavior without horizontal scrollbars"
    ]
  }
};

const htmlModule02: CurriculumSubModule = {
  id: "module-html-02-css-box-model",
  subCourseId: "mod-html-css-intro",
  title: "Module 2: CSS Core & The Box Model",
  description: "Master CSS syntax: selectors, specificity math, inheritance, modern units (rem/em/vh), typography, the Box Model (margin, border, padding, content), display properties, and positioning contexts.",
  position: 2,
  duration: "3 hours, 45 mins",
  lessons: htmlMod2Lessons,
  moduleQuiz: htmlModule02Quiz,
  moduleAssessment: htmlModule02Assessment,
  items: [...htmlMod2Lessons, htmlModule02Quiz, htmlModule02Assessment]
};

// --- MODULE 3: MODERN LAYOUTS WITH FLEXBOX, GRID & RESPONSIVE DESIGN (LESSONS 15-18) ---
const htmlMod3Lessons = rawHtmlItems.slice(14, 18); // 15: Flexbox, 16: Grid, 17: Responsive, 18: Practice Lab

const htmlModule03Quiz: CurriculumItem = {
  id: "item-html-m3-quiz",
  subCourseId: "mod-html-css-intro",
  subCourseTitle: "Fundamentals of HTML & CSS",
  subCoursePosition: 1,
  moduleId: "module-html-03-modern-layouts",
  moduleTitle: "Module 3: Modern Layouts with Flexbox & CSS Grid",
  modulePosition: 3,
  title: "Module 3 MCQs: Flexbox, CSS Grid & Media Queries",
  duration: "25 mins",
  type: "quiz",
  position: 23,
  isModuleQuiz: true,
  contentHeading: "Module 3 Assessment: Modern Layout Systems Knowledge Check",
  contentDescription: "Evaluate your understanding of flex-direction, justify-content, align-items, flex-grow/shrink, grid-template-columns, fr units, minmax, auto-fit/auto-fill, and mobile-first media queries.",
  questions: [
    ...htmlMod3Lessons[0].questions!.slice(0, 4),
    ...htmlMod3Lessons[1].questions!.slice(0, 4),
    ...htmlMod3Lessons[2].questions!.slice(0, 4),
    ...htmlMod3Lessons[3].questions!.slice(0, 3)
  ]
};

const htmlModule03Assessment: CurriculumItem = {
  id: "item-html-m3-assessment",
  subCourseId: "mod-html-css-intro",
  subCourseTitle: "Fundamentals of HTML & CSS",
  subCoursePosition: 1,
  moduleId: "module-html-03-modern-layouts",
  moduleTitle: "Module 3: Modern Layouts with Flexbox & CSS Grid",
  modulePosition: 3,
  title: "Module 3 Assessment: Responsive Multi-Device Dashboard Layout",
  duration: "50 mins",
  type: "assignment",
  position: 24,
  isModuleAssessment: true,
  contentHeading: "Module 3 Practical Challenge: Responsive Holy-Grail Grid Layout",
  contentDescription: "Create a modern responsive dashboard layout combining CSS Grid for the macro layout (sidebar, header, content area) and Flexbox for micro-alignments, adapting fluidly across mobile, tablet, and desktop viewports.",
  assignmentPrompt: {
    instructions: "Build a responsive dashboard shell:\n1. Macro layout using CSS Grid with grid-template-areas or repeat(auto-fit, minmax(280px, 1fr)).\n2. Navigation bar and widget controls aligned using Flexbox (justify-content: space-between, align-items: center).\n3. Mobile-first media queries collapsing sidebar on screens narrower than 768px.\n4. Fluid images and responsive typography.",
    deliverables: [
      "Responsive HTML/CSS files without CSS layout frameworks",
      "Clean CSS Grid and Flexbox implementation",
      "Tested viewports: 375px mobile, 768px tablet, 1280px desktop"
    ]
  }
};

const htmlModule03: CurriculumSubModule = {
  id: "module-html-03-modern-layouts",
  subCourseId: "mod-html-css-intro",
  title: "Module 3: Modern Layouts with Flexbox & CSS Grid",
  description: "Master modern CSS layout engines: 1-dimensional Flexbox, 2-dimensional CSS Grid (fr units, repeat, minmax), auto-fit/auto-fill responsive grids, media queries, and mobile-first design patterns.",
  position: 3,
  duration: "3 hours, 40 mins",
  lessons: htmlMod3Lessons,
  moduleQuiz: htmlModule03Quiz,
  moduleAssessment: htmlModule03Assessment,
  items: [...htmlMod3Lessons, htmlModule03Quiz, htmlModule03Assessment]
};

// =========================================================================
// SUB-COURSE FINAL ASSESSMENT
// =========================================================================

const htmlSubCourseExam: CurriculumItem = {
  ...rawHtmlItems[18], // item-19-html-css-quiz
  title: "Sub-Course Assessment: HTML & CSS Comprehensive Certification Exam",
  isSubCourseAssessment: true,
  position: 25
};

const htmlSubCourseProject: CurriculumItem = {
  ...rawHtmlItems[19], // item-20-html-css-capstone
  title: "Sub-Course Capstone Project: Responsive Course Landing Page",
  isSubCourseAssessment: true,
  position: 26
};

export const htmlCssSubCourse: CurriculumSubCourse = {
  id: "mod-html-css-intro",
  title: "Fundamentals of HTML & CSS",
  position: 1,
  duration: "10 hours, 45 mins",
  description: "A complete beginner-to-professional masterclass. Learn how the web works: web architecture, modern HTML5 document structure, semantic markup, forms, tables, media, CSS selectors, specificity, the box model, Flexbox, CSS Grid, and responsive design.",
  modules: [htmlModule01, htmlModule02, htmlModule03],
  courseAssessment: htmlSubCourseExam,
  courseProject: htmlSubCourseProject,
  items: [
    ...htmlModule01.items,
    ...htmlModule02.items,
    ...htmlModule03.items,
    htmlSubCourseExam,
    htmlSubCourseProject
  ]
};

export const htmlCssModule = htmlCssSubCourse;
