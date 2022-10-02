import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../utils/trpc";

const Media = () => {
  const { id } = useRouter().query;
  const { data } = trpc.useQuery(["media.getAll", { id: id as string }]);

  return (
    <main className="grid grid-cols-4 gap-6 my-6">
      {data?.posts.map((img) => (
        <div key={img.id} className="relative h-64 border">
          <Image
            src={img.url}
            alt={img.desc ?? ""}
            layout="fill"
            objectFit="contain"
          />
        </div>
      ))}
    </main>
  );
};

export default Media;
