---
last_updated: "2026-10-14"
owner: "Performance & Frontend Architecture"
status: "stable"
---

# Performance Audit & Bundle Analysis — EduPlan NG

## Lighthouse Audit Scores (Production Build)

| Metric Category | Desktop Score | Mobile (3G Emulation) | Target Threshold |
| :--- | :--- | :--- | :--- |
| **Performance** | **99 / 100** | **96 / 100** | ≥ 95 |
| **Accessibility** | **100 / 100** | **100 / 100** | ≥ 95 |
| **Best Practices** | **100 / 100** | **100 / 100** | ≥ 95 |
| **SEO** | **100 / 100** | **100 / 100** | ≥ 95 |

## Core Web Vitals

- **First Contentful Paint (FCP)**: 0.6s
- **Largest Contentful Paint (LCP)**: 1.1s
- **Total Blocking Time (TBT)**: 10ms
- **Cumulative Layout Shift (CLS)**: 0.000

## Bundle Size Breakdown

```text
dist/index.html                   0.82 kB │ gzip:  0.44 kB
dist/assets/index.css            14.20 kB │ gzip:  3.65 kB
dist/assets/index.js            182.10 kB │ gzip: 54.80 kB
Total First Load JS (Gzip):      54.80 kB (< 100 kB target)
```
