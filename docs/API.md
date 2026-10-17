# REST API Documentation — EduPlan NG
*Specification: OpenAPI 3.1 compatible*

---

## 1. Authentication & Teacher Profile

### `POST /api/auth/sign-up`
- **Request Body**:
  ```json
  {
    "name": "Mrs. Amina Balogun",
    "email": "amina.balogun@schools.ng",
    "schoolName": "King's College, Lagos",
    "state": "Lagos",
    "lga": "Lagos Island"
  }
  ```
- **Response**: `201 Created` with `{ success: true, user: {...}, token: "..." }`

### `POST /api/auth/sign-in`
- **Request Body**: `{ "email": "amina.balogun@schools.ng" }`
- **Response**: `200 OK` with user profile and token.

---

## 2. Curriculum

### `GET /api/curriculum/levels`
Returns all 6 secondary levels (JSS 1–3, SSS 1–3).

### `GET /api/curriculum/levels/:levelId/subjects/:subjectId`
Returns complete 3 terms of weekly topics for the specified class and subject.

---

## 3. Lesson Plans

### `GET /api/lesson-plans`
Returns array of user's lesson plans with parsed JSON objectives and Bloom tags.

### `POST /api/lesson-plans`
Creates new draft lesson plan.

### `PATCH /api/lesson-plans/:id`
Autosaves fields (title, objectives, differentiation, steps, evaluation).

### `POST /api/lesson-plans/:id/duplicate`
Clones an existing lesson plan.

---

## 4. Payment Gateway (Kora Pay)

### `POST /api/payment/initialize`
- **Body**: `{ "plan": "pro_annual", "amount": 22000, "interval": "annual" }`
- **Response**: `{ "success": true, "reference": "kora_...", "checkoutUrl": "..." }`

### `POST /api/payment/webhook`
Receives Kora Pay charge success notifications and activates user subscriptions.
