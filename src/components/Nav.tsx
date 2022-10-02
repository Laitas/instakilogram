import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineUpload } from "react-icons/ai";
import UserDropdown from "./UserDropdown";
const SignIn = dynamic(() => import("./SignIn"), {
  suspense: true,
});
const UploadModal = dynamic(() => import("./UploadModal"), {
  suspense: true,
});
const Nav = () => {
  const [open, setOpen] = useState<"none" | "signin" | "upload">("none");
  const { status } = useSession();

  useEffect(() => {
    const useEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.document.body.style.overflow = "auto";
        setOpen("none");
      }
    };
    window.addEventListener("keydown", useEsc);
    () => removeEventListener("keydown", useEsc);
  }, []);

  return (
    <nav className="sticky top-0 flex justify-between px-6 py-4 bg-white w-full shadow">
      <Link href={"/"}>
        <a className="flex gap-4 items-center">
          <BsInstagram className="w-8 h-8" />
          <span className="font-semibold">The Gram</span>
        </a>
      </Link>
      <section className={status === "loading" ? "invisible" : ""}>
        {status === "authenticated" ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setOpen("upload");
                document.body.style.overflow = "hidden";
              }}
            >
              <AiOutlineUpload className="w-6 h-6" title="upload media" />
            </button>
            <UserDropdown />
            {open === "upload" && (
              <Suspense fallback={<p>loading</p>}>
                <UploadModal
                  closeModal={() => {
                    setOpen("none");
                    document.body.style.overflow = "auto";
                  }}
                />
              </Suspense>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                setOpen("signin");
                document.body.style.overflow = "hidden";
              }}
            >
              Log in
            </button>
            {open === "signin" && (
              <Suspense fallback={<p>loading</p>}>
                <SignIn
                  closeModal={() => {
                    setOpen("none");
                    document.body.style.overflow = "auto";
                  }}
                />
              </Suspense>
            )}
          </>
        )}
      </section>
    </nav>
  );
};

export default Nav;
