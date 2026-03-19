# Demo / first-run data

These JSON files are **copied once** into `data/` when the server starts **only if** the target file does not exist yet (e.g. fresh Render disk or new clone).

- **Do not put real PHI or secrets here.** Replace with empty arrays on production if you prefer a blank admin.

After the first copy, the live files (`submissions.json`, etc.) are managed by the app and stay **gitignored**.
