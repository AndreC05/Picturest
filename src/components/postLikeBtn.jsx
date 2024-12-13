'use client';

import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export default function PostLikeBtn({ post, handlePostLikeBtn }) {
  
  const [like, setLike] = useState(false)

  async function handleLikeClick() {
    await handlePostLikeBtn(post);
    setLike(!like)
  }

  return (
    <button title="Like Post" onClick={() => handleLikeClick(post)}>
     {like ? <HeartFilledIcon/> : <HeartIcon/>}
    </button>
  );
}
