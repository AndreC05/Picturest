import EditCommentBtn from '@/components/EditCommentBtn';
import { db } from '@/utils/db';
import React from 'react';

export default async function editComment({ searchParams }) {
  const postId = (await searchParams).postId;
  const commentId = (await searchParams).commentId;
  async function handleEdit(formData) {
    'use server';
    const content = formData.get('edit');
    await db.query(`UPDATE comments SET content=$1 WHERE id=$2`, [
      content,
      commentId,
    ]);
  }
  return (
    <form className="p-5" action={handleEdit}>
      <input name="edit" type="text" placeholder="comment" />
      <button type="submit">Edit Comment</button>
    </form>
  );
}
