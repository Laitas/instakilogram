import React, { useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOutsideClick";

const signIn = ({ closeModal }: { closeModal: () => void }) => {
  const [signIn, setSignIn] = useState(true);
  const ref = useRef(null);
  useOnClickOutside(ref, closeModal);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60">
      <dialog ref={ref} open className="fixed inset-0 rounded-md text-center">
        {signIn ? (
          <>
            <h1 className="font-semibold text-xl">Sign in</h1>
            <form className="flex flex-col gap-4 my-6">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="border-b"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border-b"
                required
              />
              <button className="rounded-md border w-fit px-2 py-1 ">
                Log in
              </button>
            </form>
            <p>
              Don't have an account yet?{" "}
              <button
                className="text-blue-400 hover:text-blue-700 transition-colors"
                onClick={() => setSignIn(false)}
              >
                Sign up
              </button>
            </p>
            <p>Forgot your password? Too bad lol</p>
          </>
        ) : (
          <>
            <h1 className="font-semibold text-xl text-center">Sign up</h1>
            <form className="flex flex-col gap-4 my-6">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="border-b"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border-b"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border-b"
                required
              />
              <input
                type="password"
                name="repeat_password"
                placeholder="Repeat password"
                className="border-b"
                required
              />
              <button className="rounded-md border w-fit px-2 py-1">
                Sign up
              </button>
            </form>
            <p>
              Already have an account?{" "}
              <button
                className="text-blue-400 hover:text-blue-700 transition-colors"
                onClick={() => setSignIn(true)}
              >
                Sign up
              </button>
            </p>
          </>
        )}
      </dialog>
    </div>
  );
};

export default signIn;
