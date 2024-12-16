import EditPostBtn from "@/components/EditPostBtn";
import PostDeleteBtn from "@/components/postDeleteBtn";
import PostLikeBtn from "@/components/postLikeBtn";
import { auth } from "@clerk/nextjs/server";
import { handleEditPost } from "@/utils/actions";
import { db } from "@/utils/db";
import Comments from "@/components/Comment";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

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
            <PostLikeBtn />
            {userId == p.clerk_id && (
              <EditPostBtn postId={p.id} handleEditPost={handleEditPost} />
            )}

            {userId == p.clerk_id && <PostDeleteBtn post={p.id} />}
          </div>
        ))}
        {comments.map((comment) => (
          <div key={comment.id}>
            <h3>
              Username:{" "}
              <Link href={`/users/${comment.user_id}`}>{comment.username}</Link>
            </h3>
            <p>{comment.content}</p>
            <p>{comment.date}</p>
            <p>{comment.likes}</p>
          </div>
        ))}
        <Comments postId={postId} />
      </SignedIn>
      <SignedOut>
        <Link href={"/sign-in"}>Please Sign In</Link>
      </SignedOut>
    </>
  );
}
