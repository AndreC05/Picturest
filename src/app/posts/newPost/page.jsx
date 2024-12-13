import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { db } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function NewPost() {
  const { userId } = await auth();

  async function handleSubmit(formData) {
    'use server';
    const title = formData.get('title');
    const discription = formData.get('discription');
    const image = formData.get('imageSrc');
    await db.query(
      `INSERT INTO posts(title, content, image, clerk_id) VALUES($1, $2, $3, $4)`,
      [title, discription, image, userId]
    );

    revalidatePath('/posts');
    redirect('/posts');
  }
  return (
    <form action={handleSubmit}>
      <label>Title :</label>
      <input
        required
        name="title"
        placeholder="Title"
        type="text"
        minLength={5}
        maxLength={30}
      />
      <label>Discription : </label>
      <textarea
        required
        name="discription"
        placeholder="discription"
        type="text"
        minLength={10}
        maxLength={100}
      ></textarea>
      <label>Image: </label>
      <input name="imageSrc" />
      <button type="submit">Submit</button>
    </form>
  );
}
