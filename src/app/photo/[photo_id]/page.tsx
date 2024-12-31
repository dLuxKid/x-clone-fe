import Image from "next/image";

export default async function page({
  params,
}: {
  params: { photo_id: string };
}) {
  const { photo_id } = await params;

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto">
        <Image
          src={photo_id}
          alt="tweet image"
          className="size-full object-fill object-center"
        />
      </div>
    </main>
  );
}
