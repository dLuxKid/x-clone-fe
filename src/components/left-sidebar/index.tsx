import Link from "next/link";
import LeftSidebarMenu from "./left-sidebar-menu";
import LeftSidebarProfile from "./left-sidebar-profile";

export default function LeftSidebar() {
  return (
    <header className="sticky top-0 h-screen min-w-[275px] w-full max-w-xs hidden lg:flex flex-col items-center justify-between text-white pl-8 px-4 ml-auto">
      <div className="w-full flex flex-col items-stretch h-full md:mt-8 my-4 max-w-[275px] ml-auto">
        <LeftSidebarMenu />
        <Link href={"/post"} className="w-full flex">
          <button
            title="post"
            type="button"
            className="w-full flex items-center justify-center bg-blue-pry my-4 rounded-full p-4 text-xl max-w-[275px] font-semibold text-center hover:bg-opacity-80 transition duration-200"
          >
            Post
          </button>
        </Link>
      </div>
      <LeftSidebarProfile />
    </header>
  );
}
