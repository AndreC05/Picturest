import UpdateUserForm from "@/components/UpdateUserForm";
import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function UsersProfile() {
  const { userId } = await auth();

  const user_idResponse = await db.query(
    `SELECT users.id FROM users WHERE clerk_id='${userId}'`
  );
  const user_id = user_idResponse.rows[0].id;

  return (
    <>
    <div className="flex flex-col m-3 sm:m-5 p-2.5  sm:p-5 bg-neutral-200 rounded-xl  gap-4 lg:mx-32  ">
      <h3>Edit username and bio: </h3>
      <UpdateUserForm />
      <h3>
        Go to my profile: <Link href={`/users/${user_id}`}>click here</Link>
      </h3>

    </div>
      
    </>
  );
}
