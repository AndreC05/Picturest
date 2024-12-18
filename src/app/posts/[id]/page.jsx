import EditPostBtn from "@/components/EditPostBtn";
import PostDeleteBtn from "@/components/postDeleteBtn";
import { auth } from "@clerk/nextjs/server";
import { handleEditCommentBtn, handleEditPost } from "@/utils/actions";
import { db } from "@/utils/db";
import Comments from "@/components/Comment";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import EditCommentBtn from "@/components/EditCommentBtn";
import LikePost from "@/components/LikePost";
import LikeComment from "@/components/LikeComment";

//Page with a single post and comments //Also has form to create and another to edit comments
export default async function SinglePostPage({ params }) {
  const { userId } = await auth();

  const postId = (await params).id;
  const postResponse = await db.query(
    `SELECT posts.id, posts.title, posts.clerk_id, posts.content, posts.image, users.username, users.id AS user_Id,
        TO_CHAR(posts.post_date, 'YYYY-MM-DD') AS date, posts.likes FROM posts JOIN users ON posts.clerk_id=users.clerk_id WHERE posts.id =$1 
        ORDER BY posts.id DESC`,
    [postId]
  );
  const post = postResponse.rows;

  const commentsResponse = await db.query(
    `SELECT comments.id, comments.content, comments.clerk_id, comments.post_id, TO_CHAR(comments.comment_date, 'YYYY-MM-DD') AS date, comments.likes, users.username, users.id AS user_id
        FROM comments
        JOIN users ON comments.clerk_id = users.clerk_id
        WHERE comments.post_id = $1
        ORDER BY comments.id DESC`,
    [postId]
  );
  const comments = commentsResponse.rows;

  return (
    <>
    
      <SignedIn>
        <div className="flex flex-col md:grid sm:grid-cols-2 sm:grid-rows-2 lg:gap-1 lg:grid-cols-3 lg:grid-rows-3 ">

          {post.map((p) => (
            <div
              key={p.id}
              className="flex  border bg-neutral-200 p-5 flex-col m-5 w-96 rounded-2xl"
            >
              <h3 className="text-xl">
                <Link href={`/users/${p.user_id}`}>{p.username}</Link>
              </h3>
              <h3 className="text-2xl">{p.title}</h3>
              <p>{p.content}</p>
              <img src={p.image} />
              <p>{p.date}</p>
              <p>{p.likes} likes</p>
              <LikePost post={p} />
              {userId == p.clerk_id && (
                <EditPostBtn postId={p.id} handleEditPost={handleEditPost} />
              )}

              {userId == p.clerk_id && <PostDeleteBtn post={p.id} />}
            </div>
          ))}
          <div className="flex flex-col m-5">
            {comments.map((comment) => (
              <div className="mb-3" key={comment.id}>
                <div className="flex flex-row gap-16">
                  <div className="flex  gap-3">
                    <img
                      className="rounded-full"
                      width={50}
                      src={
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                    />
                    <h3 className="pt-3">
                      <Link href={`/users/${comment.user_id}`}>{comment.username}</Link>
                    </h3>
                  </div>
                <p className="pt-2">{comment.date}</p>
              </div>
                <p className="ml-16  pt-1">{comment.content}</p>
                <div className="flex flex-row gap-16 ml-16 pt-2">
                  <div>
                    <LikeComment comment={comment} />
                    <p>{comment.likes}</p>
                  </div>
                  <div>
                      <EditCommentBtn className="pb-4"
                        postId={postId}
                        commentId={comment.id}
                        handleEditCommentBtn={handleEditCommentBtn}
                      />
                  </div>
                </div>
              </div>
            ))}
            <Comments postId={postId} />

          </div>
          
        </div>
        

      </SignedIn>
      <SignedOut>
        <Link href={"/sign-in"}>Please Sign In</Link>
      </SignedOut>
    </>
  );
}
