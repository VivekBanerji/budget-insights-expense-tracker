# Budget Insights – UI and functionality update

## Included improvements
- Header search now routes to Transactions and searches across title, category, type, date, and amount.
- Transaction search, income/expense filter, category filter, and clear filters work together.
- Add transaction form validates input; transaction totals update automatically.
- Delete action asks for confirmation before removing a transaction.
- Transactions persist in browser localStorage after refresh.
- Dashboard summary, Budget spent totals, and Analytics summary use the shared transaction data.
- Added a My Profile page with editable name, email, location, and account label, saved locally.
- Refreshed visual styles with responsive layout, better spacing, focus states, badges, table empty state, modal styling, and mobile adjustments.

## Run locally
1. Extract the project folder.
2. Open a terminal in `Budget-Insights`.
3. Run `npm install`.
4. Run `npm run dev`.

## Notes
- This is a frontend demo; there is no backend or authentication.
- Transaction/profile data are stored in this browser's localStorage. Clearing site data will remove them.
- Analytics monthly chart remains sample/demo data; its summary cards use the current transaction totals.
- Budget limits are demo values; spent values are calculated from the current transactions for the matching categories.
