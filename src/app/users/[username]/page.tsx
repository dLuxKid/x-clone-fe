import LeftSidebar from "@/components/left-sidebar";
import ProfilePage from "@/components/profile/profile-page";
import RightSidebar from "@/components/right-sidebar";
import { fetchProfile } from "@/functions/queries";

export default async function UserProfile({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  const profile = await fetchProfile(username);

  return (
    <div className="relative w-full h-full flex justify-center items-center mx-auto">
      <div className="min-h-screen w-full relative flex mx-auto">
        <LeftSidebar />
        <ProfilePage user={profile} />
        <RightSidebar />
      </div>
    </div>
  );
}
