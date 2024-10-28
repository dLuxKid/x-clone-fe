import LeftSidebar from "@/components/left-sidebar";
import ProfilePage from "@/components/profile/profile-page";
import RightSidebar from "@/components/right-sidebar";

export default function UserProfile() {
  return (
    <div className="relative w-full h-full flex justify-center items-center mx-auto">
      <div className="min-h-screen w-full relative flex mx-auto">
        <LeftSidebar />
        <ProfilePage />
        <RightSidebar />
      </div>
    </div>
  );
}
