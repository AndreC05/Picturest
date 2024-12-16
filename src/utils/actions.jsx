"use server";

import { redirect } from "next/navigation";
import { db } from "./db";
import { revalidatePath } from "next/cache";

export async function handleNewPost(params) {
  redirect("/posts/newPost");
}
export async function handleEditPost(postId) {
  redirect(`/posts/EditPost?postId=${postId}`);
}
export async function handleDeletePost(post) {
  db.query(`DELETE FROM comments WHERE post_id=${post.id}`);
  db.query(`DELETE FROM posts WHERE id=${post.id}`);
  redirect(`/posts`);
}

export async function handleEditCommentBtn(postId, commentId) {
  redirect(
    `/posts/${postId}/editComment?commentId=${commentId}&postId=${postId}`
  );
}

//-------------------------------------------Post Likes

export async function handlefetchPostLikes(post, userId) {
  const allLikes = await db.query(
    `SELECT * FROM likes WHERE post_id = $1 AND clerk_id = $2 `,
    [post.id, userId]
  );

  const like = allLikes.rows;

  return like;
}

export async function handleInsertPostLike(userId, post) {
  db.query(
    `INSERT INTO likes (clerk_id, post_id, like_state) VALUES ($1,$2,$3)`,
    [userId, post.id, true]
  );
}

export async function handleUpdatePostLike(state, userId, post) {
  db.query(
    `UPDATE likes SET like_state =$1 WHERE post_id = $2 AND clerk_id = $3`,
    [state, post.id, userId]
  );
}

export async function handleDecreasePostLikes(post) {
  db.query(`UPDATE posts SET likes = likes - 1 WHERE id = $1`, [post.id]);
}

export async function handleIncreasePostLikes(post) {
  db.query(`UPDATE posts SET likes = likes + 1 WHERE id = $1`, [post.id]);
}

export async function handleRevalidateAfterLike() {
  revalidatePath("/posts");
}

