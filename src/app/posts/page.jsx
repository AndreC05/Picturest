import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import NewUserForm from "@/components/NewUserForm";
import Link from "next/link";

import {
  handleDeletePost,
  handleEditPost,
  handleNewPost,
} from "@/utils/actions";

import PostLikeBtn from "@/components/postLikeBtn";
import PostDeleteBtn from "@/components/postDeleteBtn";
import EditPostBtn from "@/components/EditPostBtn";

export default async function Posts() {
  const { userId } = await auth();

  const posts = (
    await db.query(`SELECT posts.id, posts.title, posts.clerk_id, posts.content, posts.image, users.username, users.id AS user_id,
         TO_CHAR(posts.post_date, 'YYYY-MM-DD') AS date, posts.likes FROM posts JOIN users ON posts.clerk_id=users.clerk_id 
         ORDER BY posts.id DESC`)
  ).rows;

  const numCount = (
    await db.query(`SELECT * FROM users WHERE clerk_id='${userId}'`)
  ).rowCount;

  return (
    <div >
      <SignedIn>
        {" "}
        {numCount === 1 ? (
          <button onClick={handleNewPost}>Add Post</button>
        ) : (
          <NewUserForm />
        )}
      </SignedIn>

      <SignedOut>
        {" "}
        <Link href={"/sign-in"}>Sign-in before making a post</Link>
      </SignedOut>

    <div className="flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-2 lg:gap-1 lg:grid-cols-3 lg:grid-rows-3 ">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex  border bg-neutral-200 p-5 sm:p-5 flex-col m-5 w-80  rounded-2xl"
        >
          <div className="flex flex-row justify-between" >
            <h3 className="text-xl">
              <Link href={`/users/${post.user_id}`}>{post.username}</Link>
            </h3>
            <p className="pt-1 flex justify-end">{post.date}</p>
          </div>
          
          <h3 className="text-2xl">{post.title}</h3>
          <p>{post.content}</p>
          <img src={post.image} className="w-full h-full p-2" />
          
          
          <div className="flex flex-row gap-1">

            <div className="flex flex-col">
              <p>{post.likes} likes</p>
              <PostLikeBtn post={post.id} />
                {userId == post.clerk_id && (
                  <EditPostBtn postId={post.id} handleEditPost={handleEditPost} />
                )}
                {userId == post.clerk_id && (
                  <PostDeleteBtn post={post} handleDeletePost={handleDeletePost} />
                )}
                
            </div>
                <Link href={`/posts/${post.id}`} className="pt-5">
                  <img width={18} height={10} src={"images/comment.png"} />
                </Link>
            
            </div>
            
        </div>
      ))}
      </div>
    </div>
  );
}
