## Picturest

## Setup instructions

1. Fork the repository and clone your fork to your local machine.
2. Run `npm install`.
3. Create a `.env.local` file in the root directory and add the following environment variables:
   - `DATABASE_URL` - the URL of your Postgres database.
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Publishable key for clerk (https://clerk.com/)
   - `CLERK_SECRET_KEY` - Secret key for clerk (https://clerk.com/)
4. Create the database schema by running the SQL commands in `schema.sql` in your database.
5. Run `npm run dev` to start the development server.
6. Open [http://localhost:3000] with your browser to see the site.
