---
name: Skill Manager & Orchestrator
description: The "Meta-Skill" that defines which agentic experts to deploy and when. Use this guide to select the right skill combination for any task.
---

# 🧠 Skill Manager & Orchestrator

**Role:** The Dispatcher.
**Goal:** Route user requests to the correct specialized agent(s) to maximize efficiency and maintain architectural integrity.

This document describes the **Best Practice Workflows** for combining the expertise in your `.agent/skills` folder.

---

## 🗺️ The Decision Matrix

Identify your current objective to see which skills to activate.

| **Objective** | **Primary Skill** | **Secondary Support** | **Workflow Phase** |
| :--- | :--- | :--- | :--- |
| **New Feature / Scaffolding** | `🧱 Architect` | `💅 UI/UX Audit` | **Planning**: Define file tree -> **Execution**: Validate Design System. |
| **Complex Bug Fix** | `🧪 Test Automation` | `🔍 Code Quality` | **Diagnose**: Write repro test -> **Fix**: Refactor safely. |
| **Database/Schema Changes** | `🗄️ DB Optimizer` | `� Deployment` | **Plan**: Validate schema -> **Release**: Standardize migration. |
| **Visual Polish / Redesign** | `💅 UI/UX Audit` | `🧱 Architect` | **Audit**: Check tokens -> **Refactor**: Enforce colocation. |
| **Preparing for Release** | `🚢 Release Manager` | `🚀 Deployment` | **Merge**: Gated Commit -> **Verify**: Health Check. |

---

## 🛠️ The Specialized Squads

### 1. The "feature-crew" (New Implementation)
**Trigger:** "I want to build a [Feature Name]."
1.  **Activator**: `architect`
    *   *Action*: Run "Blueprint" to define `src/features/[name]` structure.
2.  **Builder**: (You/Agent writes logic)
3.  **Auditor**: `ui-ux-audit`
    *   *Action*: Ensure no magic pixels/colors were introduced.

### 2. The "stabilizer-crew" (Refactoring & Debt)
**Trigger:** "Clean up this messy file."
1.  **Activator**: `code-quality`
    *   *Action*: Scan for complexity and lint errors.
2.  **Validator**: `test-automation`
    *   *Action*: Run smoke tests to ensure refactor didn't break flows.

### 3. The "scaler-crew" (Performance & Data)
**Trigger:** "The query is slow" or "Add a new table."
1.  **Activator**: `db-optimizer`
    *   *Action*: Audit schema and check for missing indexes.
2.  **Reviewer**: `architect`
    *   *Action*: Ensure `actions.ts` is used, not generic service classes.

### 4. The "shipper-crew" (Production)
**Trigger:** "Deploy this."
1.  **Gatekeeper**: `release-manager` (Self)
    *   *Action*: Run `gated-commit` (runs all lints/tests).
2.  **Pilot**: `deployment-strategist`
    *   *Action*: Verify environment variables and perform post-deploy health check.

---

## 📂 Skill Directory (Quick Reference)

*   **`architect`**: File structure, naming conventions, blueprinting.
*   **`code-quality`**: Linting, cyclomatic complexity, dead code removal.
*   **`db-optimizer`**: Prisma schema validation, query performance.
*   **`deployment-strategist`**: CI/CD pipelines, env vars, production verifications.
*   **`release-manager`**: The Gated Commit pipeline (Coordinator).
*   **`test-automation`**: E2E, Unit, and Smoke testing.
*   **`ui-ux-audit`**: Design system compliance, token usage, accessibility.

---

## 🧠 Pro-Tip: The "Gated Commit"
Regardless of which squad you used, **ALWAYS** finish with the `release-manager` Gated Commit workflow. It is the final safety net that aggregates the checks from all other skills.

```bash
# The final step of EVERY workflow
node .agent/skills/release-manager/scripts/gated-commit.js "feat: complete workflow"
```
