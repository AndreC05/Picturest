import NewUserForm from "@/components/NewUserForm";
import { auth } from "@clerk/nextjs/server";

export default async function UsersProfile() {
  const { userId } = await auth();

  return (
    <NewUserForm />
    //TODO change to editUserForm
  );
}
