import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function UpdateUserForm() {
  const { userId } = await auth();
  console.log(userId);
  async function handleSubmit(formData) {
    "use server";
    const username = formData.get("username");
    const bio = formData.get("bio");
    await db.query(
      `UPDATE users SET username =$1, bio =$2 WHERE clerk_id =$3`,
      [username, bio, userId]
    );

    revalidatePath("/posts");
    redirect("/posts");
  }
  return (
    <form action={handleSubmit}>
      <label>Username :</label>
      <input
        required
        name="username"
        placeholder="Username"
        minLength={5}
        maxLength={50}
        type="text"
      />
      <label>Bio : </label>
      <textarea
        required
        name="bio"
        placeholder="bio"
        minLength={15}
        maxLength={500}
        type="text"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}
