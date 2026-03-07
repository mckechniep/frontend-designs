# Error Taxonomy

Use this contract for blocking failures so reporting is consistent and actionable.

## Canonical Error Shape

Always format blocking errors like:

```text
ERROR_CODE: <CODE>
CATEGORY: <Category Name>
STEP: <Operation being performed>
DETAIL: <Concise explanation of what failed>
IMPACT: <What could not proceed>
RECOMMENDED_ACTION:
  - <Action the user should take>
  - <Optional additional guidance>
```

Rules:

- Use stable all-caps `ERROR_CODE` values.
- Keep `DETAIL` concise and specific.
- Keep `IMPACT` explicit about what is blocked.
- Include at least one concrete `RECOMMENDED_ACTION`.
- If partial progress is possible, clearly separate completed vs blocked work.

## Taxonomy Catalog

### Environment Constraint

- `ENV_TOOLCHAIN_MISSING`
- `ENV_NETWORK_BLOCKED`
- `ENV_INSTALL_PERMISSION_DENIED`

### Repository Configuration

- `REPO_PACKAGE_JSON_MISSING`
- `REPO_SCRIPT_NOT_FOUND`
- `REPO_STACK_CONFLICT`

### Build Failure

- `BUILD_TYPESCRIPT_ERROR`
- `BUILD_LINT_ERROR`
- `BUILD_FONT_IMPORT_ERROR`
- `BUILD_FONT_FAMILY_UNRESOLVED`
- `BUILD_ICON_IMPORT_ERROR`

### Skill Constraint

- `SKILL_STACK_AMBIGUOUS`
- `SKILL_EFFECTS_LAYER_INVALID`
- `SKILL_PROTOCOL_VIOLATION`

### Input Issue

- `INPUT_REQUIREMENTS_INCOMPLETE`
- `INPUT_PROFILE_INVALID`
- `INPUT_LAYER_CONFLICT`

## Canonical Examples

```text
ERROR_CODE: ENV_NETWORK_BLOCKED
CATEGORY: Environment Constraint
STEP: npm install
DETAIL: Network access required for dependency resolution is unavailable.
IMPACT: Dependencies could not be installed.
RECOMMENDED_ACTION:
  - Run installation in a local environment.
```

```text
ERROR_CODE: SKILL_STACK_AMBIGUOUS
CATEGORY: Skill Constraint
STEP: scope lock
DETAIL: Multiple plausible frontend stacks were detected and no explicit choice was provided.
IMPACT: Cannot safely generate framework-specific output.
RECOMMENDED_ACTION:
  - Specify target output: vanilla, react, or nextjs.
```

```text
ERROR_CODE: ENV_INSTALL_PERMISSION_DENIED
CATEGORY: Environment Constraint
STEP: npm install
DETAIL: Dependency installation is required for the requested verification step, but permission was not granted.
IMPACT: Build/verification step requiring installed dependencies could not proceed.
RECOMMENDED_ACTION:
  - Grant permission to run dependency installation.
  - Or run installation locally, then re-run the requested step.
```
