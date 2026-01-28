---
description: Perform a gated git commit using protection gates
---

1. Review `.agent/skills/release-manager/SKILL.md` to understand the gates and Recovery Protocol.
2. Run the Gated Commit Orchestrator.
// turbo
3. `node .agent/skills/release-manager/scripts/gated-commit.js "feat: <message>"`
4. **IF PASS**: The script will auto-commit. Update `Agent/git-status.md`.
5. **IF FAIL**: Consult the "Recovery Protocol" in the SKILL.md.
    - **Fix Forward**: Fix the specific error (lint, test).
    - **Revert**: If logic is broken, undo changes.
    - **Bypass**: Only for emergency or docs (`--bypass`).
