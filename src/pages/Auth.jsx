import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, seterror] = useState(true);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, Email, Password);
      setUser(userCred.user);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Password === "") {
      seterror(false);
    } else {
      if (Password.length <= 5) {
        seterror(true);
      } else {
        seterror(false);
      }
    }
  }, [Password]);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-zinc-900 text-white hidden md:flex flex-col justify-between p-10 ">
        <div className="text-2xl font-bold">Trackr</div>
        <div className="text-sm">
          <p className="text-lg font-bold mb-2">
            “This tracker has saved me countless hours of work and helped me
            organize my job applications faster than ever before.”
          </p>
          <span className="text-sm text-zinc-400">Sofia Davis</span>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-black text-white flex flex-col items-center justify-center px-8">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Sign in to your account
          </h2>
          <p className="text-sm text-zinc-400 text-center">
            Enter your email and password below to sign in to your account
          </p>

          <form onSubmit={handleSignin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="text-red-500 text-sm text-center mt-1">
                {" "}
                Password must be at least 6 characters long.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-md font-semibold hover:bg-gray-200 transition flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="flex items-center gap-4">
            <hr className="flex-1 border-zinc-700" />
            <span className="text-sm text-zinc-500">OR CONTINUE WITH</span>
            <hr className="flex-1 border-zinc-700" />
          </div>

          <button
            className="w-full bg-zinc-800 border border-zinc-700 text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-zinc-700 transition"
            onClick={() =>
              alert("Sign in with Google is not available right now")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.12 0 5.91 1.07 8.1 2.84l6.04-6.04C34.53 2.39 29.58 0 24 0 14.85 0 6.96 5.53 3.12 13.55l7.4 5.75C12.29 13.58 17.68 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.15 24.55c0-1.55-.14-3.04-.41-4.49H24v8.5h12.45c-.54 2.9-2.17 5.36-4.56 7.06l7.27 5.67c4.24-3.92 6.99-9.7 6.99-16.74z"
              />
              <path
                fill="#FBBC05"
                d="M10.52 28.7a14.5 14.5 0 010-9.4L3.12 13.55a24 24 0 000 20.9l7.4-5.75z"
              />
              <path
                fill="#4285F4"
                d="M24 48c6.48 0 11.91-2.14 15.88-5.8l-7.27-5.67a14.96 14.96 0 01-22.21-5.76l-7.4 5.75C6.96 42.47 14.85 48 24 48z"
              />
            </svg>
            Google
          </button>

          <p className="text-center text-xs text-zinc-500">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
