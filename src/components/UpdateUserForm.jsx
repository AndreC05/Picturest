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
    <form className="flex flex-col gap-3" action={handleSubmit}>
      <div>
        <label>Username :</label>
        <input className="bg-neutral-200 border border-dotted border-black p-2 rounded mx-3"
          required
          name="username"
          placeholder="Username"
          minLength={5}
          maxLength={50}
          type="text"
        />
      </div>
      
      <div className="flex items-center ">
        <label>Bio : </label>
        <textarea className="bg-neutral-200 border border-dotted border-black p-2 rounded mx-3" 
          required
          name="bio"
          placeholder="bio"
          minLength={15}
          maxLength={500}
          type="text"
        ></textarea>
      </div>
      

      <button className="flex justify-start bg-blue-400 rounded-lg p-2 w-[70px] hover:bg-blue-600" type="submit">Submit</button>
    </form>
  );
}
