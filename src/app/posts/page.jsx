import { db } from '@/utils/db';
import { auth } from '@clerk/nextjs/server';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import NewUserForm from '@/components/NewUserForm';
import Link from 'next/link';

export default async function Posts() {
  const { userId } = await auth();
  const numCount = (
    await db.query(`SELECT * FROM users WHERE clerk_id=${userId}`)
  ).rowCount;
  const posts = (
    await db.query(`SELECT posts.id, posts.title, posts.clerk_id, posts.content, users.username, users.id AS user_Id,
         TO_CHAR(posts.post_date, 'YYYY-MM-DD') AS date, posts.likes FROM posts JOIN users ON posts.clerk_id=users.clerk_id 
         ORDER BY posts.id DESC`)
  ).rows;

  return (
    <div>
      <SignedIn>
        {' '}
        {numCount === 1 ? <button>Add Post</button> : <NewUserForm />}
      </SignedIn>
      <SignedOut>
        {' '}
        <Link href={'/sign-in'}>Sign-in before making a post</Link>
      </SignedOut>

      {posts.map((post) => (
        <div key={post.id}>
          <h3>
            Username:
            <Link href={`/users/${post.userId}`}>{post.username}</Link>
          </h3>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>{post.date}</p>
          <p>{post.likes}</p>
        </div>
      ))}
    </div>
  );
}
