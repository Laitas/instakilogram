import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import { useQueryClient } from "react-query";
import { trpc } from "../utils/trpc";

const UserImage = ({ img }: { img: string }) => {
  const { data: session } = useSession();
  const { id } = useRouter().query;
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);

  const { mutate } = trpc.useMutation("media.uploadAvi", {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("user.get");
      setFile(undefined);
      setLoading(false);
    },
  });

  const handleUpload = useCallback(async () => {
    setLoading(true);
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
      url: res.url,
    });
  }, [file, mutate, session?.user?.id]);

  useEffect(() => {
    if (file) handleUpload();
  }, [file, handleUpload]);

  if (session?.user?.id === id) {
    return (
      <div className="group relative">
        <input
          type="file"
          className="absolute inset-0 z-10 rounded-full opacity-0 cursor-pointer"
          aria-label="visually hidden upload button"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
        />
        <div className="bg-black bg-opacity-0 group-hover:bg-opacity-70 w-full h-full absolute rounded-full flex flex-col justify-center duration-300 transition-colors">
          <span className="opacity-0 text-white group-hover:opacity-100 text-center">
            Change
          </span>
        </div>
        {loading ? (
          <span className="w-[200px] h-[205px] flex flex-col justify-center text-center">
            Loading
          </span>
        ) : (
          <Image
            src={img}
            width={200}
            height={200}
            alt="user image"
            className="rounded-full -z-[1]"
            objectFit="contain"
          />
        )}
      </div>
    );
  } else {
    return (
      <Image
        src={img}
        width={200}
        height={200}
        alt="user image"
        className="rounded-full"
        objectFit="contain"
      />
    );
  }
};

export default UserImage;
