'use server';

import { redirect } from 'next/navigation';

export async function handleNewPost(params) {
  redirect('/posts/newPost');
}
export async function handleEditPost(postId) {
  redirect(`/posts/EditPost?postId=${postId}`);
}
