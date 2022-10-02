import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const Hero = ({ user }: { user: User }) => {
  const { id } = useRouter().query;
  const { data } = useSession();

  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return (
    <header className="my-6 flex gap-4">
      <Image
        src={user.image}
        width={200}
        height={200}
        alt="user image"
        className="rounded-full"
        objectFit="contain"
      />
      <section className="flex flex-col gap-2 flex-1">
        <div className="flex gap-8 items-center">
          <h2 className="font-semibold text-xl">{user.name}</h2>
          {id !== data?.user?.id && (
            <button className="shadow px-2 py-1 rounded-md hover:text-blue-500 transition-colors">
              Follow
            </button>
          )}
        </div>
        <div className="flex gap-4">
          <p>
            Following:{" "}
            <span className="font-semibold">
              {formatter.format(user.following)}
            </span>
          </p>
          <p>
            Followers:{" "}
            <span className="font-semibold">
              {formatter.format(user.followers)}
            </span>
          </p>
          <p>
            Posts:{" "}
            <span className="font-semibold">
              {formatter.format(user.posts)}
            </span>
          </p>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
          facilis quas saepe laboriosam aliquam consequuntur quia, non minima
          beatae voluptate accusantium.
        </p>
      </section>
    </header>
  );
};

export default Hero;

type User = {
  id: string;
  image: string;
  name: string;
  followers: number;
  following: number;
  posts: number;
};
