import React, { FormEvent, useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOutsideClick";
import { trpc } from "../utils/trpc";
import { signIn } from "next-auth/react";

const SignInModal = ({ closeModal }: { closeModal: () => void }) => {
  const [error, setError] = useState("");
  const { mutate: mutateSignIn } = trpc.useMutation("user.checkCredentials", {
    onSuccess: async (data) => {
      await signIn("credentials", { ...data, callbackUrl: "/" });
    },
    onError: (error) => setError(error.message),
  });
  const { mutate: mutateSignUp } = trpc.useMutation("user.signup", {
    onSuccess: async (data) => {
      await signIn("credentials", { ...data, callbackUrl: "/" });
    },
    onError: (error) => setError(error.message),
  });
  const [signInState, setSignIn] = useState(true);
  const ref = useRef(null);
  useOnClickOutside(ref, closeModal);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (signInState) {
      mutateSignIn(data as signIn);
    } else {
      if (data.password !== data.repeat_password) {
        setError("Passwords don't match");
        return;
      }
      mutateSignUp(data as signUp);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60">
      <dialog ref={ref} open className="fixed inset-0 rounded-md text-center">
        {signInState ? (
          <>
            <h1 className="font-semibold text-xl">Sign in</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-6">
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
                minLength={6}
                required
              />
              <button className="rounded-md border w-fit px-2 py-1 ">
                Log in
              </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            <p>
              {"Don't"} have an account yet?{" "}
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-6">
              <input
                type="text"
                name="name"
                placeholder="Username"
                className="border-b"
                minLength={3}
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
                minLength={6}
                required
              />
              <input
                type="password"
                name="repeat_password"
                placeholder="Repeat password"
                className="border-b"
                minLength={6}
                required
              />
              <button className="rounded-md border w-fit px-2 py-1">
                Sign up
              </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            <p>
              Already have an account?{" "}
              <button
                className="text-blue-400 hover:text-blue-700 transition-colors"
                onClick={() => setSignIn(true)}
              >
                Sign in
              </button>
            </p>
          </>
        )}
      </dialog>
    </div>
  );
};

export default SignInModal;

type signIn = {
  name: string;
  email: string;
  password: string;
};
type signUp = signIn & {
  repeat_password: string;
};
