# Graph Report - . (2026-07-13)

## Corpus Check

- Corpus is ~26,334 words - fits in a single context window. You may not need a graph.

## Summary

- 282 nodes · 312 edges · 34 communities (19 shown, 15 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)

- [[_COMMUNITY_Checkout Page Objects|Checkout Page Objects]]
- [[_COMMUNITY_Package Configuration|Package Configuration]]
- [[_COMMUNITY_Test Suite and Setup|Test Suite and Setup]]
- [[_COMMUNITY_Page Object Model|Page Object Model]]
- [[_COMMUNITY_CI Config and Reporting|CI Config and Reporting]]
- [[_COMMUNITY_Dev Tooling and Linting|Dev Tooling and Linting]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Graphify Knowledge Graph|Graphify Knowledge Graph]]
- [[_COMMUNITY_Code Formatting|Code Formatting]]
- [[_COMMUNITY_Custom Test Reporter|Custom Test Reporter]]
- [[_COMMUNITY_Playwright CLI Tools|Playwright CLI Tools]]
- [[_COMMUNITY_Graphify Core Concepts|Graphify Core Concepts]]
- [[_COMMUNITY_YAML Utilities|YAML Utilities]]
- [[_COMMUNITY_Graph Query Interface|Graph Query Interface]]
- [[_COMMUNITY_Test Generation and Auth|Test Generation and Auth]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_Product Info Page|Product Info Page]]
- [[_COMMUNITY_OWASP ZAP Security|OWASP ZAP Security]]
- [[_COMMUNITY_Trace and Video Capture|Trace and Video Capture]]
- [[_COMMUNITY_ZAP Global Setup|ZAP Global Setup]]
- [[_COMMUNITY_Graph DB Exports|Graph DB Exports]]
- [[_COMMUNITY_Playwright Config|Playwright Config]]
- [[_COMMUNITY_ReportPortal Config|ReportPortal Config]]
- [[_COMMUNITY_Graphify Watch|Graphify Watch]]
- [[_COMMUNITY_MCP Server|MCP Server]]
- [[_COMMUNITY_Token Benchmark|Token Benchmark]]
- [[_COMMUNITY_Multi-Repo Merge|Multi-Repo Merge]]
- [[_COMMUNITY_Media Transcription|Media Transcription]]
- [[_COMMUNITY_Graph Clustering|Graph Clustering]]
- [[_COMMUNITY_Element Targeting|Element Targeting]]
- [[_COMMUNITY_Page Snapshot|Page Snapshot]]
- [[_COMMUNITY_Captured Page State|Captured Page State]]

## God Nodes (most connected - your core abstractions)

1. `compilerOptions` - 12 edges
2. `scripts` - 11 edges
3. `ProductInfo` - 11 edges
4. `Graphify Skill` - 11 edges
5. `Checkout` - 10 edges
6. `ProductCartPage` - 10 edges
7. `Knowledge Graph Pipeline` - 10 edges
8. `Project README` - 10 edges
9. `HomePage` - 8 edges
10. `DatadogRUM` - 8 edges

## Surprising Connections (you probably didn't know these)

- `InfluxDB Docker Service (time-series DB for test trends)` --semantically_similar_to--> `ReportPortal Docker Compose Stack` [INFERRED]
  [semantically similar] docker-compose.yml → docker-compose-reportportal.yml
- `Graphify Skill` --semantically_similar_to--> `Playwright CLI Skill` [INFERRED] [semantically similar] .claude/skills/graphify/SKILL.md →
  .claude/skills/playwright-cli/SKILL.md
- `Project README` --references--> `Docker Registry GitHub Actions Workflow` [EXTRACTED] README.md → .github/workflows/docker-registry.yml
- `Playwright Test GitHub Actions Workflow` --conceptually_related_to--> `SauceDemo Playwright TypeScript Test Suite` [INFERRED]
  .github/workflows/playwright-test.yml → README.md
- `Test From Docker GitHub Actions Workflow` --conceptually_related_to--> `SauceDemo Playwright TypeScript Test Suite` [INFERRED]
  .github/workflows/test-from-docker.yml → README.md

## Import Cycles

- None detected.

## Hyperedges (group relationships)

- **Graphify Core Output Artifacts** — \_claude_skills_graphify_skill_md_graph_json, \_claude_skills_graphify_skill_md_graph_report_md,
  \_claude_skills_graphify_skill_md_html_visualization [EXTRACTED 1.00]
- **Graphify Extraction Pipeline (AST + Semantic + Merge)** — \_claude_skills_graphify_skill_md_ast_extraction,
  \_claude_skills_graphify_skill_md_semantic_extraction, \_claude_skills_graphify_references_extraction_spec_md_extraction_subagent_prompt
  [EXTRACTED 1.00]
- **Graphify Query, Path, and Explain Tools** — \_claude_skills_graphify_skill_md_graph_query,
  \_claude_skills_graphify_references_query_md_graphify_path, \_claude_skills_graphify_references_query_md_graphify_explain,
  \_claude_skills_graphify_references_query_md_save_result_feedback [EXTRACTED 1.00]
- **CI/CD Deployment Pipeline (GitHub Actions + Docker + K8s)** — github_workflows_playwright_test_yml_playwright_test_workflow,
  github_workflows_docker_registry_yml_docker_registry_workflow, github_workflows_test_from_docker_yml_test_from_docker_workflow,
  k8s_manifests_job_yml_kubernetes_test_job [INFERRED 0.85]
- **Test Report Persistent Storage Pipeline (PV + PVC + K8s Job)** — k8s_manifests_job_yml_kubernetes_test_job,
  k8s_manifests_pv_yml_persistent_volume, k8s_manifests_pvc_yml_persistent_volume_claim [EXTRACTED 1.00]
- **Playwright CLI Debug and Capture Tools (Tracing + Video + Storage State)** —
  claude_skills_playwright_cli_references_tracing_md_tracing_reference,
  claude_skills_playwright_cli_references_video_recording_md_video_recording_reference,
  claude_skills_playwright_cli_references_storage_state_md_storage_management [INFERRED 0.85]

## Communities (34 total, 15 thin omitted)

### Community 0 - "Checkout Page Objects"

Cohesion: 0.08 Nodes (9): Checkout, pageObject, pageWithDatadog, test, DatadogRUM, DatadogRUMConfig, Window, NewFile (+1 more)

### Community 1 - "Package Configuration"

Cohesion: 0.09 Nodes (21): author, description, keywords, license, lint-staged, _/\*\*/_.{js,ts}, _/\*\*/_.ts, main (+13 more)

### Community 2 - "Test Suite and Setup"

Cohesion: 0.13 Nodes (7): pageObject, pageObject1, test, test2, dbSingleton, MongoClientSingelton, Student

### Community 3 - "Page Object Model"

Cohesion: 0.15 Nodes (4): HomePage, ProductCartPage, \_replacePlaceholders(), Steps()

### Community 4 - "CI Config and Reporting"

Cohesion: 0.16 Nodes (19): Commitlint Message Format ([ENV][Tag] - message), TypeScript Path Aliases (@utilities, @pageobjects, @reporter,
@tests), Project CLAUDE.md Documentation, ReportPortal Auto-Analyzer Service, ReportPortal Traefik Gateway Service, ReportPortal OpenSearch
Service, ReportPortal PostgreSQL Service, ReportPortal RabbitMQ Service (+11 more)

### Community 5 - "Dev Tooling and Linting"

Cohesion: 0.11 Nodes (18): husky.sh script, devDependencies, @commitlint/cli, @commitlint/config-conventional, eslint, @eslint/js,
eslint-plugin-ascii, eslint-plugin-jsonc (+10 more)

### Community 6 - "TypeScript Config"

Cohesion: 0.11 Nodes (17): compilerOptions, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, module, moduleResolution,
noImplicitThis, paths (+9 more)

### Community 7 - "Graphify Knowledge Graph"

Cohesion: 0.15 Nodes (16): Graphify Add URL Command, graphify.ingest Module, Wiki Export, Confidence Score Rubric, Extraction Subagent
Prompt Spec, Hyperedge Schema, Node ID Format Convention, GitHub Clone and Cross-Repo Merge (+8 more)

### Community 8 - "Code Formatting"

Cohesion: 0.14 Nodes (13): arrowParens, bracketSameLine, bracketSpacing, endOfLine, jsxSingleQuote, printWidth, proseWrap, quoteProps (+5
more)

### Community 9 - "Custom Test Reporter"

Cohesion: 0.18 Nodes (3): MyReporter, influx, InfluxDb

### Community 10 - "Playwright CLI Tools"

Cohesion: 0.20 Nodes (11): Element Attribute Inspection via eval, Debug CLI Mode (--debug=cli), Running and Debugging Playwright Tests,
Request Mocking and Routing, Route Command (Network Interception), run-code Command (Custom Playwright Code), Attach to Running Browser via
CDP, Named Browser Sessions (+3 more)

### Community 11 - "Graphify Core Concepts"

Cohesion: 0.22 Nodes (10): AST Structural Extraction, Community Detection, God Nodes, graph.json Output, GRAPH_REPORT.md Output, Graphify
Honesty Rules, Interactive HTML Visualization, Knowledge Graph Pipeline (+2 more)

### Community 13 - "Graph Query Interface"

Cohesion: 0.29 Nodes (8): BFS Graph Traversal, DFS Graph Traversal, Graphify Explain Command, Graphify Path Command, Graphify Reflect
(LESSONS.md), Constrained Query Vocabulary Expansion, Save-Result Feedback Loop, Graph Query (BFS/DFS Traversal)

### Community 14 - "Test Generation and Auth"

Cohesion: 0.25 Nodes (8): Authentication State Reuse Pattern, Storage Management Reference, Storage State File Format (cookies +
origins/localStorage), Test Heal Workflow, Plan Spec File (specs/<feature>.plan.md), Seed Test Concept, Semantic Locators Pattern
(role-based), Test Generation Workflow (Plan → Generate → Heal)

### Community 15 - "Runtime Dependencies"

Cohesion: 0.25 Nodes (8): dependencies, bson, dd-trace, dotenv, @influxdata/influxdb-client, js-yaml, mongodb, tsx

### Community 17 - "OWASP ZAP Security"

Cohesion: 0.53 Nodes (5): generateHTMLReport(), generateJSONAlerts(), globalTeardown(), printScanSummary(), ZAPConfig

### Community 18 - "Trace and Video Capture"

Cohesion: 0.67 Nodes (4): Trace File Format (.trace + .network + resources/), Tracing Reference, Screencast Overlay API, Video Recording
Reference

## Knowledge Gaps

- **124 isolated node(s):** `husky.sh script`, `singleQuote`, `jsxSingleQuote`, `tabWidth`, `useTabs` (+119 more) These have ≤1 connection -
  possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `Graphify Skill` connect `Graphify Knowledge Graph` to `Playwright CLI Tools`, `Graphify Core Concepts`,
  `Graph Query Interface`?** _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Tooling and Linting` to `Package Configuration`?** _High betweenness centrality (0.018) - this
  node is a cross-community bridge._
- **Why does `ProductInfo` connect `Product Info Page` to `Checkout Page Objects`, `Test Suite and Setup`, `Page Object Model`?** _High
  betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `husky.sh script`, `singleQuote`, `jsxSingleQuote` to the rest of the system?** _128 weakly-connected nodes found -
  possible documentation gaps or missing edges._
- **Should `Checkout Page Objects` be split into smaller, more focused modules?** _Cohesion score 0.08262108262108261 - nodes in this
  community are weakly interconnected._
- **Should `Package Configuration` be split into smaller, more focused modules?** _Cohesion score 0.09090909090909091 - nodes in this
  community are weakly interconnected._
- **Should `Test Suite and Setup` be split into smaller, more focused modules?** _Cohesion score 0.12857142857142856 - nodes in this
  community are weakly interconnected._
