import { db } from '@/utils/db';
import { redirect } from 'next/navigation';

export default async function EditPostForm({ postId }) {
  async function handleSubmit(formData) {
    'use server';
    const title = formData.get('title');
    const content = formData.get('content');
    const imgSrc = formData.get('imgSrc');
    db.query('UPDATE posts SET title=$1,content=$2,image=$3 WHERE id=$4', [
      title,
      content,
      imgSrc,
      postId,
    ]);
    redirect('/posts');
  }
  return (
    <form action={handleSubmit}>
      <label htmlFor="title">Post Title</label>
      <input type="text" name="title" required minLength={5} maxLength={30} />

      <label htmlFor="content">Content</label>

      <textarea
        type="text"
        name="content"
        required
        minLength={10}
        maxLength={100}
      ></textarea>
      <label htmlFor="imgSrc">Image</label>
      <input type="text" name="imgSrc" required />
    </form>
  );
}
