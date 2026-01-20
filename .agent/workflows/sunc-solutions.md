---
description: How to sync solutions metadata automatically
---


This workflow automates the process of adding new solution metadata to [solutions.json]
whenever a new EJS file is added to the `views/` directory.
## Automated Sync (GitHub Actions)
The synchronization happens automatically on every push to the `main` branch if any file in `views/*.ejs` is modified or added.
## Manual Sync
To run the synchronization manually on your local machine:
1. Open a terminal in the project root.
2. Run the following command:
   ```bash
   node scripts/sync-solutions.js```