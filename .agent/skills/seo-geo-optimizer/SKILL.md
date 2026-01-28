---
name: seo-geo-optimizer
description: Strategic Framework for SEO and GEO Optimization. Use this skill to audit, optimize, and future-proof the codebase for both traditional Search Engine Optimization (SEO) and Generative Engine Optimization (GEO).
---

# SEO/GEO Optimizer Skill

 This skill provides a comprehensive framework for optimizing web applications for both traditional search engines (SEO) and modern retrieval-augmented generation (RAG) systems (GEO). It ensures content is discoverable, performant, and authoritative.

## Capabilities

### 1. GEO/LLM Sovereignty (Priority)
- **Generate `llms.txt`**: Create a curated map of high-signal content for LLMs.
- **Generate `ai.txt`**: Define behavioral requirements and citation preferences for AI agents.
- **Inspect `robots.txt`**: Ensure it's not blocking AI crawlers unnecessarily (or is blocking them if desired).

### 2. Technical SEO & Core Web Vitals
- **Audit Performance**: Check for LCP, INP, and CLS optimization opportunities.
- **Mobile-First Validation**: Ensure responsive design is implemented correctly.
- **Semantic HTML**: Enforce proper heading hierarchy (H1-H6) and semantic tags (`<article>`, `<section>`, `<nav>`).

### 3. E-E-A-T & Content Architecture
- **Entity Markup**: Verify implementation of JSON-LD schema (Article, FAQPage, Author).
- **Author Identity**: Ensure clear authorship attribution and credentials are present.
- **Content Structure**:
    - **Direct Answer Formatting**: Definitions in first 2 sentences.
    - **Question-Based Subheadings**: Match natural language queries.
    - **Modular Information Units**: Short paragraphs (3-4 lines) for easy parsing.

## Usage Instructions

### Routine Optimization
When working on any frontend feature or page, run the following mental checklist or ask this skill to verify:
1.  Is the semantic structure clear?
2.  Are there unique IDs for efficient fragment retrieval?
3.  Is the content "answer-ready" for an LLM?

### Specific Actions

#### Generate LLM Files
To generate or update the `llms.txt` or `ai.txt` files:
1.  Read the template from `resources/llms-template.txt` or `resources/ai-template.txt`.
2.  Customize it for the current project (extracting routes, site name, description).
3.  Write the file to the project root.

#### Audit Core Web Vitals
1.  Review `index.css` or component styles for performance anti-patterns (e.g., non-content-visibility, massive layout shifts).
2.  Suggest optimizations using `next/image` or lazy loading.

## Resources

- **`resources/llms-template.txt`**: Template for the `llms.txt` file.
- **`resources/ai-template.txt`**: Template for the `ai.txt` file.

## Strategic Framework Reference
(Based on "Strategic Framework for SEO and GEO Optimization 2025-2026")

- **GEO Goal**: Integration and citation in synthesized AI answers.
- **Success Metric**: Citation frequency and branded search spikes.
- **Mechanism**: Semantic retrieval and RAG synthesis.
- **Key Insight**: 97% of citations in AI Overviews come from top 20 organic results. SEO is the foundation for GEO.
