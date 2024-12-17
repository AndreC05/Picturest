import { db } from '@/utils/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export default async function Comments({ postId }) {
  const { userId } = await auth();

  async function handleComment(formData) {
    'use server';
    const comment = formData.get('content');
    await db.query(
      `INSERT INTO comments(clerk_id, content, post_id) 
            VALUES($1, $2, $3)`,
      [userId, comment, postId]
    );

    revalidatePath(`/posts/${postId}`);
  }

  return (
    <form className="p-5" action={handleComment}>
      <input name="content" type="text" placeholder="comment" />
      <button type="submit">Comment</button>
    </form>
  );
}
