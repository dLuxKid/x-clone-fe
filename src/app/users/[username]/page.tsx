import LeftSidebar from "@/components/left-sidebar";
import TweetSkeletonLoader from "@/components/loader/tweet-skeleton-loader";
import ProfilePage from "@/components/profile/profile-page";
import RightSidebar from "@/components/right-sidebar";
import TweetCard from "@/components/tweet-card";
import { fetchProfile, fetchUserPosts } from "@/functions/queries";

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
        <ProfilePage
          user={profile}
          children={[
            <UserPosts username={username} key={1} />,
            <UserPosts username={username} key={2} />,
            <UserPosts username={username} key={3} />,
          ]}
        />
        <RightSidebar />
      </div>
    </div>
  );
}

async function UserPosts({ username }: { username: string }) {
  const { tweets, error } = await fetchUserPosts(username);

  return (
    <div className="flex flex-col">
      {error && (
        <div className="w-full flex items-center justify-center p-10">
          <p className="text-white text-lg font-medium">
            Error fetching tweets
          </p>
        </div>
      )}
      {!tweets && !error && (
        <>
          <TweetSkeletonLoader />
          <TweetSkeletonLoader />
        </>
      )}
      {tweets &&
        tweets.map((tweet: tweetType) => (
          <TweetCard tweet={tweet} key={tweet._id} />
        ))}
    </div>
  );
}
