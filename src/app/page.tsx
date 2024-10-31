import LeftSidebar from "@/components/left-sidebar";
import MainComponent from "@/components/main-component";
import RightSidebar from "@/components/right-sidebar";

export const revalidate = 0;

export default function Home() {
  return (
    <div className="relative w-full h-full flex justify-center items-center mx-auto">
      <div className="min-h-screen w-full relative flex mx-auto gap-0">
        <LeftSidebar />
        <MainComponent />
        <RightSidebar />
      </div>
    </div>
  );
}
