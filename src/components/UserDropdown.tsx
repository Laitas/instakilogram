import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOutsideClick";
import { trpc } from "../utils/trpc";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  const { data } = trpc.useQuery(
    [
      "user.get",
      {
        id: session?.user?.id as string,
      },
    ],
    {
      onError: () => signOut(),
      retry: 0,
    }
  );
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)}>
        <Image
          src={data?.image as string}
          width={30}
          height={30}
          className="rounded-full"
          alt="User profile picture"
        />
      </button>
      <section
        className={`absolute right-0 whitespace-nowrap bg-white p-2 rounded-md shadow-md ${
          open ? "" : "invisible"
        }`}
      >
        <ul className="flex flex-col gap-4">
          <li className="hover:text-blue-500 transition-colors">
            <Link href={`/user/${data?.id}`}>
              <a>Profile</a>
            </Link>
          </li>
          <li className="hover:text-blue-500 transition-colors">
            <button onClick={() => signOut()}>Sign out</button>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default UserDropdown;
