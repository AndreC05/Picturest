"use client";

import { Pencil2Icon } from "@radix-ui/react-icons";

export default function EditPostBtn({ postId, handleEditPost }) {
  async function handleClick() {
    await handleEditPost(postId);
  }
  return (
    <>
      {" "}
      <button title="Edit Post" onClick={handleClick}>
        <Pencil2Icon />
      </button>
    </>
  );
}
