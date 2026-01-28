### Contraints

- `Transaction.amount` is **absolute**. `direction` applies the **sign**.
- `transType = budget` never reaches **posted** or **reconciled** states.
- **Transfers** are paired by `pairId` at the **service level**.  
  → **Net effect on global liquidity = 0**
- Only `includeInProjection = true` **accounts** are used.
- **Monetary math** is **fixed-point**:  
  → Store to **4 decimal places**  
  → Display **2 decimal places**
- **Timezone** = user **local midnight boundaries**