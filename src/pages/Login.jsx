import React, { useContext, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        toast.success("Login successful!");
        setUser(result.user);
        navigate(from, { replace: true });
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error when login", err.message);
      })
      .finally(() => setLoading(false));
  };

  // google Login
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Successfully Login!");
        setUser(result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
        <div className="w-full max-w-md shadow-2xl bg-base-100 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-center text-primary mb-6">
            Login to Savor Book
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="card-body py-4">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  name="email"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="input"
                  placeholder="Email"
                  required
                />
                <label className="label">Password</label>
                <input
                  ref={passwordRef}
                  type="password"
                  className="input"
                  placeholder="Password"
                />
              </fieldset>
            </div>

            <div className="text-right mb-4">
              <Link
                to="/forget-password"
                className="text-sm text-secondary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full disabled={loading}"
            >
              {loading ? "Login in..." : "Login"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline btn-secondary w-full mb-4"
          >
            <FaGoogle className="mr-2" />
            Login with Google
          </button>

          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-secondary hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
