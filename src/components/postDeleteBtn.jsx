'use client';
import { EraserIcon } from '@radix-ui/react-icons';

export default function PostDeleteBtn({ post, handleDeletePost }) {
  async function handleDeleteClick() {
    await handleDeletePost(post);
  }

  return (
    <button title="Delete Post" onClick={() => handleDeleteClick(post)}>
      <EraserIcon />
    </button>
  );
}
