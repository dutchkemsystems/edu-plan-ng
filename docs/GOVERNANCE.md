# Engineering Governance & Branch Protection — EduPlan NG

---

## 1. Branch Protection Rules (Target: `main`)

Acquisition-grade software repositories mandate strict branch protection to prevent regressions and maintain audit integrity:

1. **Require Pull Request**: No direct pushes to `main`. All changes enter through reviewed pull requests.
2. **Require Passing CI Checks**:
   - `npm run lint` (TypeScript typechecking)
   - `npm run test` (Core entity and payments verification)
   - `npm run build` (Vite production bundle compilation)
3. **Require Linear Git History**: Enforce squash or rebase commits with Conventional Commit headers (`feat:`, `fix:`, `chore:`, `docs:`, `test:`).
4. **No Force Pushes & No Branch Deletion**: Protect commit history for technical due diligence audits.

---

## 2. Release Management

- Tags follow Semantic Versioning: `vMajor.Minor.Patch`.
- Each release triggers automated CycloneDX SBOM generation and structured release notes.
