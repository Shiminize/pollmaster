---
description: Step-by-step workflow for auditing and optimizing SEO/GEO settings.
---

# SEO/GEO Optimization Workflow

1. **Verification of Sovereignty Files**
   - **Command**: `ls -la public/robots.txt public/llms.txt public/ai.txt`
   - **Action**: Verify these files exist.
   - **Fill in**: If missing, generate `llms.txt` and `ai.txt` using the templates in `.agent/skills/seo-geo-optimizer/resources/`. Update `robots.txt` to allow legitimate bots but control sensitive areas.

2. **Metadata Audit**
   - **Command**: `view_file app/layout.tsx`
   - **Action**: Check `metadata` export.
   - **Fill in**:
     - `title.default` & `title.template`
     - `description` (150-160 chars)
     - `keywords` (5-10 strategic terms)
     - `openGraph` (title, description, images)
     - `twitter` (card type, site, creator)

3. **E-E-A-T Compliance Check**
   - **Action**: Verify presence of "About Us", Contact Info, and Authorship.
   - **Fill in**: Ensure the footer contains physical address or contact email. Ensure blog posts have author profiles.

4. **Sitemap Generation**
   - **Action**: Ensure `sitemap.xml` is generated dynamically or statically.
   - **Command**: `npm run build` (often generates sitemaps in Next.js if configured) OR check for `app/sitemap.ts`.

## Skill Directory Reference
- **Skill Location**: `.agent/skills/seo-geo-optimizer/`
- **Instruction File**: `.agent/skills/seo-geo-optimizer/SKILL.md`
- **Resource Templates**:
  - `llms.txt` Template: `.agent/skills/seo-geo-optimizer/resources/llms-template.txt`
  - `ai.txt` Template: `.agent/skills/seo-geo-optimizer/resources/ai-template.txt`
