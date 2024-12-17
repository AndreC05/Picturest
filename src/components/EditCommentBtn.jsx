'use client';
import React from 'react';

export default function EditCommentBtn({
  postId,
  commentId,
  handleEditCommentBtn,
}) {
  async function handleClick() {
    await handleEditCommentBtn(postId, commentId);
  }
  return (
    <>
      {' '}
      <button onClick={handleClick}>Edit Comment</button>
    </>
  );
}
