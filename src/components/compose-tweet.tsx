"use client";

import { sendTweet } from "@/functions/mutation";
import Image from "next/image";
import { useState } from "react";
import { GoFileMedia } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "sonner";
import Loader from "./loader/loader";

export default function ComposeTweet({ back }: { back?: () => void }) {
  const [pending, setPending] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ text: string; media: string[] }>({
    text: "",
    media: [],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];

    if (selectedFile.size > 5 * 1024 * 1024)
      return toast.error("media cannot be larger than 10mb");

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        media: [...prev.media, reader.result as string],
      }));
    };
    reader.onerror = (err) => {
      return toast.error("An error occured while reading the image");
    };
  };

  const removeMediaItem = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((_, index) => index !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.text) return;

    setPending(true);

    try {
      await sendTweet(formData);

      setFormData({ text: "", media: [] });
      toast.success("post sent successfully");

      if (back) back();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="flex flex-col w-full gap-1" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col pl-2 gap-2">
        <input
          type="text"
          name="text"
          disabled={pending}
          value={formData.text}
          maxLength={150}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, text: e.target.value }))
          }
          placeholder="What's happening?!"
          className="w-full bg-transparent pt-6 outline-none border-none ring-0 text-lg placeholder:text-gray-600 resize-y"
        />
        {!!formData.media.length && (
          <div className="flex items-center justify-start gap-2 w-full overflow-x-scroll h-full min-h-[240px] right-section">
            {formData.media.map((url, i) =>
              url.startsWith("data:image/") ? (
                <div
                  key={i}
                  className="relative w-full max-w-[320px] h-full flex items-center justify-center max-h-[240px] flex-shrink-0"
                >
                  <button
                    disabled={pending}
                    title="cancel"
                    onClick={() => removeMediaItem(i)}
                    className="flex items-center justify-center absolute right-2 top-2 z-10 rounded-full cursor-pointer transition duration-200 bg-black/10 p-2"
                  >
                    <MdOutlineCancel className="text-lg md:text-xl" />
                  </button>
                  <Image
                    src={url}
                    alt={`Media ${i + 1}`}
                    className="rounded-3xl w-full h-full"
                    width={320}
                    height={240}
                    objectFit="contain"
                  />
                </div>
              ) : (
                <div
                  key={i}
                  className="relative w-full max-w-[320px] h-full flex items-center justify-center max-h-[240px] overflow-hidden flex-shrink-0"
                >
                  <button
                    disabled={pending}
                    title="cancel"
                    onClick={() => removeMediaItem(i)}
                    className="flex items-center justify-center absolute right-2 top-2 z-10 rounded-full cursor-pointer transition duration-200 bg-black/10 p-2"
                  >
                    <MdOutlineCancel className="text-lg md:text-xl" />
                  </button>
                  <video
                    key={i}
                    className="w-full h-full rounded-3xl"
                    controls
                    src={url}
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>
      <div className="w-full flex justify-between items-end">
        <label
          htmlFor="media"
          className="p-2 rounded-full hover:bg-blue-pry/10"
        >
          <GoFileMedia className="text-lg cursor-pointer text-blue-pry" />
        </label>
        <input
          type="file"
          name="media"
          accept="image/*,video/*"
          id="media"
          className="hidden"
          disabled={pending || formData.media.length >= 4}
          onChange={handleFileChange}
        />
        <div className="mt-3">
          <button
            title="tweet"
            type="submit"
            className="bg-blue-pry rounded-full px-6 py-2 w-full text-sm md:text-base font-semibold text-center hover:bg-opacity-80 transition duration-200 disabled:opacity-80 flex items-center justify-center"
            disabled={pending}
          >
            {pending ? <Loader /> : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
}
