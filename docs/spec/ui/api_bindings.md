### Component to Endpoint Mapping

- **CalendarMonth** → `GET /projection?start&end`
- **TxList** → `GET /transactions?start&end`
- **TxForm** → `POST /transactions`
- **CategoryEditor** → `GET /categories`, `POST /categories`, `PATCH /categories`
- **A11yPanel** → `PATCH /users/{id}/preferences` (or reuse `/me`)

