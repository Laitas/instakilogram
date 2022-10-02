import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useQueryClient } from "react-query";
import useOnClickOutside from "../hooks/useOutsideClick";
import { trpc } from "../utils/trpc";

const UploadModal = ({ closeModal }: { closeModal: () => void }) => {
  const [file, setFile] = useState<File>();
  const ref = useRef(null);
  const router = useRouter();
  const descRef = useRef<HTMLTextAreaElement>(null);
  useOnClickOutside(ref, closeModal);
  const { data: session } = useSession();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };
  const queryClient = useQueryClient();

  const { mutate } = trpc.useMutation("media.upload", {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      if (router.asPath === `/user/${session?.user?.id}`) {
        queryClient.invalidateQueries("media.getAll");
        closeModal();
      } else {
        router.push(`/user/${session?.user?.id}`);
      }
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file as File);
    data.append("upload_preset", "zfozeoyx");

    const fetchData = await fetch(
      "https://api.cloudinary.com/v1_1/dfzejvvsl/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const res = await fetchData.json();
    mutate({
      id: session?.user?.id as string,
      desc: descRef.current?.value,
      url: res.url,
    });
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60">
      <dialog ref={ref} open className="fixed inset-0 rounded-md">
        {file ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="w-[50vh] h-[50vh] relative">
              <Image alt="" src={URL.createObjectURL(file)} layout="fill" />
            </div>
            <textarea
              ref={descRef}
              className="shadow"
              placeholder="Description"
              name=""
            />
            <div className="grid grid-cols-2 gap-2">
              <button className="shadow px-1 py-2">Upload</button>
              <button
                type="button"
                onClick={closeModal}
                className="shadow px-1 py-2 bg-red-500 text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <label className="relative cursor-pointer">
            Upload
            <input
              type="file"
              className="invisible absolute inset-0"
              onChange={handleChange}
            />
          </label>
        )}
      </dialog>
    </div>
  );
};

export default UploadModal;
