# DIME

An intuitive personal finance app.

## Backend Setup

1. Download the database dump files from the "database" branch of the repository.
2. Inside of the "backend" directory create a `.env` file.
3. Inside of the `.env` file:
   ```bash
       DB_HOST = "localhost"
       DB_USERNAME = "root"
       DB_PASSWORD = "<your-mysql-password>"
       DB_NAME = "<data-base-name>"
   ```
4. Run `npm install`
5. Then `npm start`

## Frontend setup

1. Inside of the "client" directory, run `npm install`
2. Then `npm start`

### Known issues:

- Application loses user profile upon page refresh, causing the application to crash.
