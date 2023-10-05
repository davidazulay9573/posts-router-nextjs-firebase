import { getServerSession } from "next-auth";
import FormEditProfile from "@/components/FormEditProfile";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUser } from "@/services/users";

export default async function EditProfile() {
  const session = await getServerSession(authOptions);
  const user  = (await getUser(session?.user.id)).data
  return <FormEditProfile user={user} />;
}
