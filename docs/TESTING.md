# Testing Strategy & Philosophy — EduPlan NG

---

## 1. Quality Target & Principles

EduPlan NG targets **100% pass rates** across critical paths:
1. **Curriculum Hierarchy**: Guarantee all 936 weekly topics load without schema parse failures.
2. **Pedagogical Integrity**: Ensure Bloom's taxonomy tags and differentiated matrices validate.
3. **Financial Invariance**: Ensure Kora Pay payment state machine cannot transition to `active` without valid webhook confirmation.

---

## 2. Test Execution

Execute the full automated test suite:

```bash
npm run test
```

### Coverage Scope:
- `test/run-tests.ts`:
  - Database schema initialization
  - NERDC curriculum count verification (≥900 topics)
  - Teacher demo user authentication
  - Lesson plan CRUD, autosave, and duplication
  - Bloom's cognitive taxonomy tag validation
  - Kora Pay subscription state reconciliation
