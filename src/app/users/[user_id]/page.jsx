import NotFound from "@/app/not-found";
import { db } from "@/utils/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default async function UserProfie({ params }) {
  const profileId = (await params).user_id;

  const userResponse = await db.query(
    `SELECT id, username, bio, TO_CHAR(date_joined, 'YYYY-MM-DD') AS date, clerk_id FROM users WHERE users.id = $1`,
    [profileId]
  );

  const userData = userResponse.rows;

  if (userData.length === 0) {
    return <NotFound />;
  }

  const clerk_id = userData[0].clerk_id;

  const postsResponse = await db.query(
    `SELECT posts.id, posts.title, posts.content, TO_CHAR(posts.post_date, 'YYYY-MM-DD') AS date, posts.likes, posts.image, users.username, users.id as user_id
    FROM posts
    JOIN users ON posts.clerk_id = users.clerk_id
    WHERE posts.clerk_id = $1
    ORDER BY posts.id DESC`,
    [clerk_id]
  );

  const posts = postsResponse.rows;

  return (
    <>
      <SignedIn>
        <h1>Profile: </h1>
        {userData.map((user) => (
          <div key={user.id}>
            <h2>Username: {user.username}</h2>
            <p>Bio: {user.bio}</p>
            <h4>Date Joined: {user.date}</h4>
          </div>
        ))}

        <h2>Posts:</h2>
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex  border bg-neutral-200 p-5 flex-col m-5 w-96 rounded-2xl"
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <img src={post.image} />
            <h4>{post.date}</h4>
            <p>{post.likes} likes</p>
          </div>
        ))}
      </SignedIn>
      <SignedOut>
        <Link href={"/sign-in"}>Please Sign-in</Link>
      </SignedOut>
    </>
  );
}
