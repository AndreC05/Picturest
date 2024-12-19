## Picturest

A platform where users can share their interests in the form of images and other users will then be able to create interact with it by liking the post or commenting about it.

# Instuctions

1. Make sure you are signed in before making or interacting with a post.
2. Create a username and a bio for your profile by completing the form found in the /posts page.
3. You can update your bio and username by clicking the User Profile link at the top of tthe page.
4. Click on the Posts link at the top to view all posts.
5. Interact with a post by liking it or creating a comment for it.
6. Comments of a post can be viewed by clicking the comments button on a post.
7. Authors of posts and comments can edit or delete them.
8. Click on the about section for more information.

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

## User Stories

- As a user I'd like to be able to sign in and sign out of the website.
- As a user I'd like to be able to create a username to use on the website.
- As a user I'd like to be able to comment on a post that I find interesting.
- As a user I'd like to be able to like posts.
- As a user I'd like to be able to create posts and upload images to the website.
- As a user I'd like to be able to delete or update old posts.
- As a user I'd like to see pages and menus that are organised and intuitive.
- As a user I'd like to be able to see my own profile and other users' profiles that include information about them and the posts they have made.

## Supabase

1. Install Supabase:
   npm install @supabase/supabase-js
2. Create a new folder in the src folder. In this folder, add a new file named supabase.js and use the following code to initialize
   the Supabase client.
   import { createClient } from '@supabase/supabase-js'
   export const supabase = createClient(
   process.env.SUPABASE_PROJECT_URL,
   process.env.SUPABASE_ANON_KEY
   );.
3. Create storage Bucket- click public.
4. Under Bucket policies, click the New policy button.
5. Select the For full customization option to create a policy from scratch.
6. In the Add policy dialog, enter a name for your policy (e.g. "Allow Insert and Read").
7. Select INSERT and SELECT permissions from the Allowed operations dropdown menu.
8. Click the Review button to review the policies.
9. Click the Save button to add the policy.
