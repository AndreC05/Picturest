'use server';

import EditPostForm from '@/components/EditPostForm';

export default async function EditPost({ searchParams }) {
  const postId = (await searchParams).postId;

  return <EditPostForm postId={postId} />;
}
