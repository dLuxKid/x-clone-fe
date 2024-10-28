import LeftSidebarMenu from "./left-sidebar-menu";
import LeftSidebarProfile from "./left-sidebar-profile";

export default function LeftSidebar() {
  return (
    <header className="sticky top-0 h-screen min-w-[275px] w-full max-w-xs hidden lg:flex flex-col items-center justify-between text-white pl-8 px-4 ml-auto">
      <div className="w-full flex flex-col items-stretch h-full md:mt-8 my-4 space-y-4 max-w-[275px]">
        <LeftSidebarMenu />
        <button
          title="tweet"
          type="button"
          className="bg-blue-pry my-4 rounded-full p-4 text-xl max-w-[275px] font-semibold text-center hover:bg-opacity-80 transition duration-200"
        >
          Tweet
        </button>
      </div>
      <LeftSidebarProfile />
    </header>
  );
}
