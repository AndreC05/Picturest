import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import NewUserForm from "@/components/NewUserForm";
import Link from "next/link";

import {
  handleDeletePost,
  handleEditPost,
  handleGetPostsAsc,
  handleGetPostsByLikes,
  handleGetPostsDesc,
  handleNewPost,
} from "@/utils/actions";

import PostDeleteBtn from "@/components/postDeleteBtn";
import EditPostBtn from "@/components/EditPostBtn";
import LikePost from "@/components/LikePost";
import PostSort from "@/components/PostSort";

export default async function Posts({ searchParams }) {
  const { userId } = await auth();
  const sort = (await searchParams).sort;

  let posts = await handleGetPostsDesc();

  const numCount = (
    await db.query(`SELECT * FROM users WHERE clerk_id='${userId}'`)
  ).rowCount;

  //Sort posts
  if (sort === "asc") {
    posts = await handleGetPostsAsc();
  } else if (sort === "desc") {
    posts = await handleGetPostsDesc();
  } else if (sort === "likes") {
    posts = await handleGetPostsByLikes();
  }

  return (
    <div>
      <SignedIn>
        {" "}
        {numCount === 1 ? (
          <div className="flex justify-center ">
            <button
              className="bg-blue-500 p-3 flex justify-center rounded-lg  "
              onClick={handleNewPost}
            >
              Add Post
            </button>
          </div>
        ) : (
          <NewUserForm />
        )}
      </SignedIn>

      <SignedOut>
        {" "}
        <Link
          href={"/sign-in"}
          className="flex justify-center font-bold text-xl"
        >
          Sign-in before making a post
        </Link>
      </SignedOut>

      <PostSort />

      <div className="flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-2 lg:gap-1 lg:grid-cols-3 lg:grid-rows-3 ">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex  border bg-neutral-200 p-5 sm:p-5 flex-col m-5 w-80  rounded-2xl lg:w-[400px]"
          >
            <div className="flex flex-row justify-between">
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
                <LikePost post={post} />
                {userId == post.clerk_id && (
                  <EditPostBtn
                    postId={post.id}
                    handleEditPost={handleEditPost}
                  />
                )}
                {userId == post.clerk_id && (
                  <PostDeleteBtn
                    post={post}
                    handleDeletePost={handleDeletePost}
                  />
                )}
              </div>
              <Link href={`/posts/${post.id}`} className="pt-5">
                <img
                  width={18}
                  height={10}
                  src={"images/comment.png"}
                  title="Comments"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
