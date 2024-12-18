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
    <form className="p-2 border border-black border-dotted rounded w-72" action={handleComment}>
      <input className='outline-none' name="content" type="text" placeholder="Add comment" />
      <button type="submit">Comment</button>
    </form>
  );
}
