import { db } from '@/utils/db';
import { auth } from '@clerk/nextjs/server';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import NewUserForm from '@/components/NewUserForm';
import Link from 'next/link';

import { handleDeletePost, handleEditPost, handleNewPost } from '@/utils/actions';

import PostLikeBtn from '@/components/postLikeBtn';
import PostDeleteBtn from '@/components/postDeleteBtn';
import EditPostBtn from '@/components/EditPostBtn';
import Comments from '@/components/comment';
import Image from 'next/image';

export default async function Posts() {
  const { userId } = await auth();

  const posts = (
    await db.query(`SELECT posts.id, posts.title, posts.clerk_id, posts.content, posts.image, users.username, users.id AS user_Id,
         TO_CHAR(posts.post_date, 'YYYY-MM-DD') AS date, posts.likes FROM posts JOIN users ON posts.clerk_id=users.clerk_id 
         ORDER BY posts.id DESC`)
  ).rows;

  const numCount = (
    await db.query(`SELECT * FROM users WHERE clerk_id='${userId}'`)
  ).rowCount;

  return (
    <div className="flex flex-row">
      <SignedIn>
        {' '}
        {numCount === 1 ? (
          <button onClick={handleNewPost}>Add Post</button>
        ) : (
          <NewUserForm />
        )}
      </SignedIn>

      <SignedOut>
        {' '}
        <Link href={'/sign-in'}>Sign-in before making a post</Link>
      </SignedOut>

      {posts.map((post) => (
        <div
          key={post.id}
          className="flex  border bg-neutral-200 p-5 flex-col m-5 w-96 rounded-2xl"
        >
          <h3 className="text-xl">
            <Link href={`/users/${post.user_Id}`}>{post.username}</Link>
          </h3>
          <h3 className="text-2xl">{post.title}</h3>
          <p>{post.content}</p>
          <img src={post.image} />
          <p>{post.date}</p>
          <p>{post.likes} likes</p>
          <div className='flex flex-row'>
            <PostLikeBtn post={post.id}  />
              {userId==post.clerk_id && 

              <EditPostBtn postId={post.id} handleEditPost={handleEditPost} />
              }
              {userId==post.clerk_id &&
              <PostDeleteBtn post={post} handleDeletePost={handleDeletePost} />
              }
              <Link href={`/posts/${post.id}`}>
                <img width={18} height={10} src={'images/comment.png'} />
              </Link>
              

          </div>
          
        </div>
      ))}
    </div>
  );
}
