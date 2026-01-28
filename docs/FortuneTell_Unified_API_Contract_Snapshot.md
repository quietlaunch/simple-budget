## **1\. Global Rules**

### **1.1 Base path**

All endpoints are exposed under:

- `BASE_PATH = /api/v1`

Examples:

- `GET /api/v1/health`

- `GET /api/v1/accounts`

- `POST /api/v1/projection/run`

---

### **1.2 Success envelope**

Every successful response MUST be wrapped in:

{

"data": \<payload\>

}

For “empty” responses:

{

"data": {}

}

---

### **1.3 Error envelope**

All errors MUST use:

{

"error": {

    "type": "ERROR\_CONSTANT",

    "message": "Human-readable message",

    "details": { ...optional object... }

}

}

#### **Error types (v1)**

- `AUTH_REQUIRED`

- `AUTH_INVALID`

- `AUTH_EXPIRED`

- `AUTH_FORBIDDEN`

- `AUTH_TIER_RESTRICTED`

- `VALIDATION_FAILED`

- `PAYLOAD_INVALID`

- `PAYLOAD_TOO_LARGE`

- `NOT_FOUND`

- `CONFLICT`

- `ALREADY_EXISTS`

- `TIER_LIMIT_EXCEEDED`

- `FREE_TIER_OPERATION_NOT_ALLOWED`

- `PROJECTION_WINDOW_EXCEEDED`

- `PROJECTION_INVALID_REQUEST`

- `PROJECTION_ENGINE_ERROR`

- `INTERNAL_ERROR`

- `SERVICE_UNAVAILABLE`

- `DEPENDENCY_FAILURE`

Mapping to HTTP status is fixed (e.g. VALIDATION_FAILED → 422, AUTH_REQUIRED → 401, PROJECTION_WINDOW_EXCEEDED → 403, etc.) and enforced centrally.

---

### **1.4 Field normalization**

- All JSON keys: `camelCase`

- IDs: string UUIDs (where applicable)

- Dates:

  - date-only fields: `"YYYY-MM-DD"`

  - no time component in v1 for projection/accounting dates

- Timestamps (createdAt/updatedAt): ISO 8601 datetime strings

- Money:

  - `number` (two decimal semantics; no strings)

- Booleans: strict JSON booleans

- Nullability:

  - Only explicitly nullable fields can be `null`

  - Otherwise, field either present with a value or omitted

---

### **1.5 Authentication**

- Auth mechanism: **Supabase JWT** (or equivalent external) carried in:

  - `Authorization: Bearer <token>`

- Backend **does not** issue or refresh tokens; it only validates and derives auth context.

Unified auth context in handlers:

interface AuthContext {

userId: string;

email: string;

tier: "free" | "essential";

preferences: {

    fontScale: number;

    highContrast: boolean;

    motionReduced: boolean;

    narrationEnabled: boolean;

};

}

- `request.auth` is always present on authenticated routes.

- In tests, `request.auth` may be stubbed, but shape is identical.

---

## **2\. Domain → API Shapes (v1)**

Final v1 API shapes (high-level):

### **2.1 Account**

AccountApi \= {

id: string;

name: string;

type: "operating" | "savings" | "investment" | "credit" | "cash";

accountNature: "asset" | "liability";

startBalance: number;

currentBalance: number;

includeInProjection: boolean;

createdAt: string; // ISO datetime

updatedAt: string; // ISO datetime

}

### **2.2 Transaction**

TransactionApi \= {

id: string;

accountId: string;

categoryId: string | null;

amount: number;

direction: "credit" | "debit";

date: string; // YYYY-MM-DD

postedDate: string | null; // ISO datetime or null

transType: "account" | "transfer" | "external";

recurrenceId: string | null;

txState: "created" | "planned" | "posted" | "reconciled" | "voided";

externalRef: string | null;

matchScore: number | null;

reconciliationState: "none" | "matched" | "mismatched" | "ignored" | null;

createdAt: string;

updatedAt: string;

}

### **2.3 Category**

CategoryApi \= {

id: string;

userId: string;

name: string;

type: "income" | "expense" | "saving" | "debt";

parentId: string | null;

budgeted: number;

spent: number;

rolloverMode: "none" | "carryover" | "accumulate" | "reset";

createdAt: string;

updatedAt: string;

}

### **2.4 Budget**

BudgetApi \= {

id: string;

userId: string;

name: string;

type: "monthly" | "duration" | "template" | "scenario";

startDate: string; // YYYY-MM-DD

endDate: string | null; // YYYY-MM-DD or null

durationMonths: number;

isTemplate: boolean;

createdAt: string;

updatedAt: string;

}

### **2.5 Projection**

ProjectionPointApi \= {

date: string; // YYYY-MM-DD

balance: number;

colorState: "green" | "yellow" | "red";

label: null; // v1 always null

message: null; // v1 always null

};

ProjectionSummaryApi \= {

daysOfCashRemaining: number;

firstNegativeDate: string | null; // YYYY-MM-DD or null

minBalance: number;

minBalanceDate: string | null; // YYYY-MM-DD or null

thresholdBreached: boolean;

};

ProjectionRunResponseApi \= {

points: ProjectionPointApi\[\];

summary: ProjectionSummaryApi;

};

### **2.6 User \+ Profile**

UserProfileApi \= {

id: string;

email: string;

fontScale: number;

highContrast: boolean;

motionReduced: boolean;

narrationEnabled: boolean;

};

UserWithProfileApi \= {

id: string;

email: string;

tier: "free" | "essential";

profile: UserProfileApi;

};

---

## **3\. Pagination**

Standard pagination response:

Paginated\<T\> \= {

items: T\[\];

page: number; // 1-based

pageSize: number; // up to 200

total: number;

};

Query params shared:

- `page?: number` (default 1, min 1\)

- `pageSize?: number` (default 50, min 1, max 200\)

Applies to:

- GET `/api/v1/accounts`

- GET `/api/v1/categories`

- GET `/api/v1/budgets`

- GET `/api/v1/transactions`

---

## **4\. Per-route Contract (v1)**

I’ll keep this concise but complete.

### **4.1 `/health`**

`GET /api/v1/health`

- Auth: public

- Request: none

- Response:

data: {

status: "ok";

version: string; // app version

commit: string; // git SHA or "unknown"

db: "connected" | "disconnected";

projectionEngine: "ready";

}

- Errors: only INTERNAL_ERROR / DEPENDENCY_FAILURE in extreme cases.

---

### **4.2 `/auth/me`**

`GET /api/v1/auth/me`

- Auth: required

- Request: none

- Response:

data: {

user: UserWithProfileApi;

}

- Errors:

  - `AUTH_REQUIRED` (401)

  - `AUTH_INVALID` / `AUTH_EXPIRED` / `AUTH_FORBIDDEN` (401/403)

No login/register/refresh endpoints in v1 backend (they are handled externally).

---

### **4.3 `/accounts`**

#### **GET `/api/v1/accounts`**

- Auth: required

- Tier: **blocked for free** (`FREE_TIER_OPERATION_NOT_ALLOWED`)

- Query:

  - `page?`

  - `pageSize?`

- Response:

data: Paginated\<AccountApi\>;

- Errors:

  - `AUTH_REQUIRED`

  - `FREE_TIER_OPERATION_NOT_ALLOWED`

  - `VALIDATION_FAILED`

#### **POST `/api/v1/accounts`**

- Auth: required

- Tier:

  - free → blocked (`FREE_TIER_OPERATION_NOT_ALLOWED`)

  - essential → limited by account count (`TIER_LIMIT_EXCEEDED`)

- Body:

{

name: string;

type: AccountApi\["type"\];

accountNature: AccountApi\["accountNature"\];

startBalance: number;

includeInProjection?: boolean;

}

- Response:

data: AccountApi;

- Errors:

  - `AUTH_REQUIRED`

  - `FREE_TIER_OPERATION_NOT_ALLOWED`

  - `TIER_LIMIT_EXCEEDED`

  - `VALIDATION_FAILED`

#### **GET / PATCH / DELETE `/api/v1/accounts/{id}`**

- Auth: required

- Tier: free blocked, essential allowed

- Path:

  - `id: uuid`

- PATCH body: partial of create shape.

- Responses:

  - GET/PATCH: `data: AccountApi`

  - DELETE: `data: {}`

- Errors:

  - `AUTH_REQUIRED`

  - `FREE_TIER_OPERATION_NOT_ALLOWED`

  - `NOT_FOUND`

  - `VALIDATION_FAILED`

---

### **4.4 `/categories`**

#### **GET `/api/v1/categories`**

- Auth: required

- Tier: free blocked

- Query: page/pageSize

- Response:

data: Paginated\<CategoryApi\>;

#### **POST `/api/v1/categories`**

- Auth: required

- Tier: free blocked

- Body:

{

name: string;

type: CategoryApi\["type"\];

parentId?: string | null;

budgeted?: number;

spent?: number;

rolloverMode?: CategoryApi\["rolloverMode"\];

}

- Response: `data: CategoryApi`

#### **GET / PATCH / DELETE `/api/v1/categories/{id}`**

- Same pattern as accounts: id path param, partial update, delete empty `data`.

Errors for all:

- `AUTH_REQUIRED`

- `FREE_TIER_OPERATION_NOT_ALLOWED`

- `NOT_FOUND`

- `VALIDATION_FAILED`

---

### **4.5 `/budgets`**

#### **GET `/api/v1/budgets`**

- Auth: required

- Tier: free blocked

- Query: page/pageSize

- Response: `data: Paginated<BudgetApi>`

#### **POST `/api/v1/budgets`**

- Auth: required

- Tier: free blocked

- Body:

{

name: string;

type: BudgetApi\["type"\];

isTemplate: boolean;

parentBudgetId?: string | null;

startDate: string; // YYYY-MM-DD

endDate?: string | null; // YYYY-MM-DD

durationMonths?: number;

}

- Response: `data: BudgetApi`

#### **GET / PATCH / DELETE `/api/v1/budgets/{id}`**

- Same core patterns as accounts/categories.

Errors:

- `AUTH_REQUIRED`

- `FREE_TIER_OPERATION_NOT_ALLOWED`

- `NOT_FOUND`

- `VALIDATION_FAILED`

---

### **4.6 `/transactions`**

#### **GET `/api/v1/transactions`**

- Auth: required

- Tier: free blocked

- Query:

  - `page?`

  - `pageSize?`

  - `startDate` (required, `YYYY-MM-DD`)

  - `endDate` (required, `YYYY-MM-DD`)

  - `accountId?` (uuid)

- Response:

data: Paginated\<TransactionApi\>;

- Errors:

  - `AUTH_REQUIRED`

  - `FREE_TIER_OPERATION_NOT_ALLOWED`

  - `VALIDATION_FAILED`

#### **POST `/api/v1/transactions`**

- Auth: required

- Tier: free blocked

- Body is one of:

Transfer:

{

transType: "transfer";

fromAccountId: string;

toAccountId: string;

amount: number;

date: string;

postedDate?: string | null;

recurrenceId?: string | null;

txState?: TransactionApi\["txState"\];

externalRef?: string | null;

matchScore?: number | null;

reconciliationState?: TransactionApi\["reconciliationState"\];

}

Standard:

{

transType?: "account" | "external"; // default "account"

accountId: string;

categoryId?: string | null;

amount: number;

direction: TransactionApi\["direction"\]; // "credit" | "debit"

date: string;

postedDate?: string | null;

recurrenceId?: string | null;

txState?: TransactionApi\["txState"\];

externalRef?: string | null;

matchScore?: number | null;

reconciliationState?: TransactionApi\["reconciliationState"\];

}

- Response:

data: TransactionApi | TransactionApi\[\]; // depending on recurrence/expansion

- Errors:

  - `AUTH_REQUIRED`

  - `FREE_TIER_OPERATION_NOT_ALLOWED`

  - `VALIDATION_FAILED`

  - `NOT_FOUND` (e.g., missing account)

#### **GET / PATCH / DELETE `/api/v1/transactions/{id}`**

- Auth: required

- Tier: free blocked

- GET: `data: TransactionApi`

- PATCH: partial of transaction update shape

- DELETE: `data: {}`

Errors:

- `AUTH_REQUIRED`

- `FREE_TIER_OPERATION_NOT_ALLOWED`

- `NOT_FOUND`

- `VALIDATION_FAILED`

---

### **4.7 `/projection/run`**

`POST /api/v1/projection/run`

- Auth: required

- Tier: both **free** and **essential** allowed, with different window limits and data sources.

#### **Request body (high-level)**

{

accounts?: AccountProjectionInput\[\];

transactions?: TransactionProjectionInput\[\];

startDate: string; // YYYY-MM-DD

endDate: string; // YYYY-MM-DD

threshold?: number;

}

- Free tier:

  - MUST provide `accounts` and `transactions` in body (no DB dependence).

  - Window ≤ 30 days.

- Essential tier:

  - MAY omit accounts/transactions to use DB; window ≤ 90 days.

#### **Response**

data: {

points: ProjectionPointApi\[\];

summary: ProjectionSummaryApi;

}

- Points:

  - sorted by date

  - date-only strings

  - colorState computed against the same threshold used in `summary.thresholdBreached`

  - label/message always null in v1

#### **Errors**

- `AUTH_REQUIRED` (401)

- `FREE_TIER_OPERATION_NOT_ALLOWED` (if a later plan blocks projection for free; currently allowed)

- `PROJECTION_WINDOW_EXCEEDED` (403)

- `PROJECTION_INVALID_REQUEST` (422; e.g. startDate \>= endDate, invalid horizon)

- `VALIDATION_FAILED` (422; schema errors)

- `PROJECTION_ENGINE_ERROR` (500; wrapped engine exceptions)
