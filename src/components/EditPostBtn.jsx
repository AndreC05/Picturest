'use client';

export default function EditPostBtn({ postId, handleEditPost }) {
  async function handleClick() {
    await handleEditPost(postId);
  }
  return (
    <>
      {' '}
      <button onClick={handleClick}>Edit Post</button>
    </>
  );
}
