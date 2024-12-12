'use client';

import { HeartIcon } from '@radix-ui/react-icons';

export default function PostLikeBtn({ post, handlePostLikeBtn }) {
  async function handleLikeClick() {
    await handlePostLikeBtn(post);
  }

  return (
    <button title="Like Post" onClick={() => handleLikeClick(post)}>
      <HeartIcon />
    </button>
  );
}
