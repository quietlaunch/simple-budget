### API Endpoints

#### Health
- `GET   /health`

#### Authentication
- `POST  /auth/login`
- `POST  /auth/register`

#### Accounts
- `GET   /accounts`
- `POST  /accounts`
- `PATCH /accounts/{id}`

#### Categories
- `GET   /categories`
- `POST  /categories`
- `PATCH /categories/{id}`

#### Budgets
- `GET   /budgets`
- `POST  /budgets/clone`
- `GET   /projection?start={date}&end={date}`

#### Transactions
- `GET    /transactions?start={date}&end={date}`
- `POST   /transactions`
- `PATCH  /transactions/{id}`
- `DELETE /transactions/{id}`

---

### Rules
- All endpoints **require authentication** except `/health` and `/auth/*`.
- Responses **must match models exactly** — no extra fields allowed.
