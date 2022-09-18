import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOutsideClick";

const UserDropdown = () => {
  const { data } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)}>
        <Image
          src={data?.user?.picture as string}
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
            <Link href={`/user/${data?.user?.id}`}>
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
