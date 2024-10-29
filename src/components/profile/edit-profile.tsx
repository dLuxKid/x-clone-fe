import Image from "next/image";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import black from "@/assets/black.jpeg";
import pfp from "@/assets/default-pfp.png";
import { toast } from "react-toastify";
import { FiUpload } from "react-icons/fi";

export default function EditProfile({ user }: { user: userType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    displayname: user.displayname || "",
    username: user.username || "",
    banner_picture: user.banner_picture || "",
    profile_picture: user.profile_picture || "",
    bio: user.bio || "",
    dob: user.dob || "",
    location: user.location || "",
    occupation: user.occupation || "",
    profile_url: user.profile_url || "",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];

    if (!selectedFile.type.includes("image"))
      return toast.error("Please select images only");
    if (selectedFile.size > 5 * 1024 * 1024)
      return toast.error("Images cannot be larger than 10mb");

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: reader.result as string,
      }));
    };
    reader.onerror = (err) => {
      return toast.error("An error occured while reading the image");
    };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="mb-4 self-end">
      <button
        onClick={toggleModal}
        title="edit profile"
        aria-label="edit profile"
        type="button"
        className=" border-white border rounded-3xl px-6 py-1.5 bg-transparent text-white font-medium text-base md:text-lg"
      >
        Edit profile
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-10 flex justify-center items-center">
          <div className="bg-black rounded-lg shadow-lg overflow-y-auto h-[80%] w-[90%] md:w-[65%] xl:w-[50%]">
            <div className="flex items-center justify-between px-4 py-2 sticky top-0 bg-transparent  z-10 backdrop-filter backdrop-blur-lg">
              <div className="flex items-center justify-center gap-8">
                <button
                  title="cancel"
                  onClick={toggleModal}
                  className="flex items-center justify-center my-auto rounded-full cursor-pointer transition duration-200"
                >
                  <MdOutlineCancel className="text-lg md:text-xl" />
                </button>
                <h2 className="text-white text-lg md:text-xl font-bold">
                  Edit Profile
                </h2>
              </div>
              <button
                title="save"
                aria-label="save"
                type="button"
                className="bg-white rounded-3xl px-4 py-1 text-black font-semibold text-base md:text-lg"
              >
                Save
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="h-48 w-full relative overflow-hidden">
                <Image
                  src={formData.banner_picture || black}
                  alt="banner picture"
                  layout="fill"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="flex items-center justify-center gap-4 absolute inset-[50%]">
                  <label htmlFor="bannerPhoto">
                    <FiUpload className="text-4xl cursor-pointer text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition duration-200" />
                  </label>
                  <input
                    type="file"
                    name="banner_picture"
                    accept="image/*"
                    id="bannerPhoto"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <span>
                    <button
                      title="remove photo"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, banner_picture: "" }))
                      }
                      className="flex items-center justify-center my-auto rounded-full cursor-pointer transition duration-200"
                    >
                      <MdOutlineCancel className="text-4xl cursor-pointer text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition duration-200" />
                    </button>
                  </span>
                </div>
              </div>
              <div className="px-6 py-2 relative z-10 flex flex-col gap-6 md:gap-8">
                <div className="-mt-16 w-32 h-32 rounded-full border-[3px] border-black relative">
                  <Image
                    src={formData.profile_picture || pfp}
                    alt="profile picture"
                    className={`rounded-full h-full w-full object-fill object-center opacity-70`}
                  />

                  <label
                    htmlFor="pfp"
                    className="absolute top-[44px] left-[44px]"
                  >
                    <FiUpload className="text-4xl cursor-pointer text-white p-2 rounded-full  bg-white/10 hover:bg-white/20 transition duration-200" />
                  </label>
                  <input
                    type="file"
                    name="profile_picture"
                    accept="image/*"
                    id="pfp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                <label className="px-2 py-1 border border-gray-500 focus-within:border-blue-pry focus-within:border-2 rounded-md">
                  <p className="text-sm sm:text-base text-gray-500">Name</p>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formData.displayname}
                    name="displayname"
                    className="mt-0.5 w-full bg-transparent text-white border-0 outline-none ring-0"
                  />
                </label>
                <label className="px-2 py-1 border border-gray-500 focus-within:border-blue-pry focus-within:border-2 rounded-md">
                  <p className="text-sm sm:text-base text-gray-500">Bio</p>
                  <textarea
                    onChange={handleChange}
                    value={formData.bio}
                    name="bio"
                    className="mt-0.5 min-h-40 w-full bg-transparent text-white border-0 outline-none ring-0"
                  />
                </label>
                <label className="px-2 py-1 border border-gray-500 focus-within:border-blue-pry focus-within:border-2 rounded-md">
                  <p className="text-sm sm:text-base text-gray-500">Location</p>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formData.location}
                    name="location"
                    className="mt-0.5 w-full bg-transparent text-white border-0 outline-none ring-0"
                  />
                </label>
                <label className="px-2 py-1 border border-gray-500 focus-within:border-blue-pry focus-within:border-2 rounded-md">
                  <p className="text-sm sm:text-base text-gray-500">Website</p>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formData.profile_url}
                    name="profile_url"
                    className="mt-0.5 w-full bg-transparent text-white border-0 outline-none ring-0"
                  />
                </label>
                <label className="px-2 py-1 border border-gray-500 focus-within:border-blue-pry focus-within:border-2 rounded-md">
                  <p className="text-sm sm:text-base text-gray-500">
                    Occupation
                  </p>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formData.occupation}
                    name="occupation"
                    className="mt-0.5 w-full bg-transparent text-white border-0 outline-none ring-0"
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
