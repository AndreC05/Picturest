'use client';
import { EraserIcon } from '@radix-ui/react-icons';

export default function PostDeleteBtn({ post }) {
  async function handleDeleteClick() {
    await handlePostDeleteBtn(post);
  }

  return (
    <button title="Delete Post" onClick={() => handleDeleteClick(post)}>
      <EraserIcon />
    </button>
  );
}
