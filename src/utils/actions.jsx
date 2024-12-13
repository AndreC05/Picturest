'use server';

import { redirect } from 'next/navigation';
import { db } from './db';

export async function handleNewPost(params) {
  redirect('/posts/newPost');
}
export async function handleEditPost(postId) {
  redirect(`/posts/EditPost?postId=${postId}`);
}
export async function handleDeletePost(post) {
  db.query(`DELETE FROM comments WHERE post_id=${post.id}`)
  db.query(`DELETE FROM posts WHERE id=${post.id}`)
  redirect(`/posts`)
}

export async function handlePostLikeBtn(post) {
  db.query(`SELECT *, users.username from likes
     JOIN users on likes.post_id = ${post.id}`)
}
