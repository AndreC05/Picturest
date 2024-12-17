"use client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import React from "react";

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
      {" "}
      <button title="Edit Post" onClick={handleClick}>
        <Pencil2Icon />
      </button>
    </>
  );
}
