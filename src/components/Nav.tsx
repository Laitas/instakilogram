import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { BsInstagram } from "react-icons/bs";
const SignIn = dynamic(() => import("./SignIn"), {
  suspense: true,
});
const Nav = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    const useEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.document.body.style.overflow = "auto";
        setOpen(false);
      }
    };
    window.addEventListener("keydown", useEsc);
    () => removeEventListener("keydown", useEsc);
  }, []);

  return (
    <nav className="sticky top-0 flex justify-between px-6 py-4 bg-white w-full">
      <section className="flex gap-4 items-center">
        <BsInstagram className="w-8 h-8" />
        <span className="font-semibold">The Gram</span>
      </section>
      <section>
        {status === "authenticated" ? (
          <button onClick={() => signOut()}>Sign out</button>
        ) : (
          <>
            <button
              onClick={() => {
                setOpen(true);
                document.body.style.overflow = "hidden";
              }}
            >
              Log in
            </button>
            {open && (
              <Suspense fallback={<p>loading</p>}>
                <SignIn
                  closeModal={() => {
                    setOpen(false);
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
