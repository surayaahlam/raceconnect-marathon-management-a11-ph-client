import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";


const Register = () => {
  const { createNewUser, setUser, updateUserProfile, googleLogin } = useAuth();
  const { theme } = useTheme();
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignUp = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          title: "Sign up Successful!",
          text: `Welcome, ${user.displayName}!`,
          icon: "success",
          timer: 3000,
          willClose: () => {
            navigate("/");
          }
        });
      })
      .catch((err) => {
        toast.error(`Google sign up error: ${err.message}`, {
          position: "top-center",
        });
      });
  };

  const validatePassword = (password) => {
    const errors = [];
    if (!/[A-Z]/.test(password)) errors.push("Must include at least one uppercase letter. ");
    if (!/[a-z]/.test(password)) errors.push("Must include at least one lowercase letter. ");
    if (password.length < 6) errors.push("Must be at least 6 characters long. ");
    return errors;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");
    const terms = e.target.terms.checked;

    // Validate the password
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setError({ ...error, password: passwordErrors });
      return;
    };

    if (!terms) {
      setError({ ...error, terms: "Please accept our terms & conditions." });
      return;
    };

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            Swal.fire({
              title: "Register Successful!",
              text: `Welcome, ${user.displayName}!`,
              icon: "success",
              timer: 3000,
              willClose: () => {
                navigate("/");
              }
            });
          });
      })
      .catch((err) => {
        setError({ ...error, errorMsg: err.message });
      });
  };

  return (
    <div className="container mx-auto mt-5 mb-28">
      <Helmet>
        <title>RaceConnect | Register</title>
      </Helmet>
      <div className="w-11/12 mx-auto flex items-center justify-center">
        <div className={`${theme === "light" ? "bg-gray-100" : "bg-footer"} w-full max-w-xl p-6 md:p-9 rounded-xl flex flex-col items-center`}>
          <button onClick={handleGoogleSignUp} className={`w-9/12 btn font-lato ${theme === "light" ? "bg-base-100" : "bg-font_quaternary hover:bg-base-300"} rounded-full`}>
            <FcGoogle size={25} />
            Sign up with Google</button>
          <div className={`divider ${theme === "light" ? "text-font_primary" : "text-font_tertiary"}`}>OR</div>
          <h2 className={`text-2xl font-lato font-semibold mb-6 ${theme === "light" ? "text-font_primary" : "text-font_tertiary"}`}>Register Your Account</h2>
          <div className={`card ${theme === "light" ? "bg-base-100" : "bg-font_quaternary"} w-full shrink-0`}>
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-lato font-medium">Name</span>
                </label>
                <input name="name" type="text" placeholder="Enter your name" className={`input input-bordered ${theme === "light" ? "bg-white" : "bg-font_tertiary"}`} required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-lato font-medium">Email Address</span>
                </label>
                <input name="email" type="email" placeholder="Enter your email address" className={`input input-bordered ${theme === "light" ? "bg-white" : "bg-font_tertiary"}`} required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-lato font-medium">Photo-URL</span>
                </label>
                <input name="photo" type="text" placeholder="Enter your photo url" className={`input input-bordered ${theme === "light" ? "bg-white" : "bg-font_tertiary"}`} required />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text font-lato font-medium">Password</span>
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`input input-bordered ${theme === "light" ? "bg-white" : "bg-font_tertiary"}`}
                  required />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-xs bg-transparent border-none outline-none hover:bg-transparent absolute right-2 top-12">
                  {
                    showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />
                  }
                </button>
              </div>
              {error.password && (
                <label className="label">
                  <p className="text-sm font-normal text-red-700">
                    {error.password}
                  </p>
                </label>
              )}
              <div className="form-control">
                <label className="label justify-start cursor-pointer">
                  <input type="checkbox" name="terms" className="checkbox w-5 h-5" />
                  <span className="ml-3 label-text">Agree to Terms & Conditions</span>
                </label>
              </div>
              <div className="form-control mt-4">
                <button type="submit" className="btn bg-primary border-none text-white hover:bg-font_secondary text-base font-lato">Register</button>
              </div>
              {error.terms && (
                <label className="label">
                  <p className="text-sm font-normal text-red-700">
                    {error.terms}
                  </p>
                </label>
              )}
              {error.errorMsg && (
                <label className="label">
                  <p className="text-sm font-normal text-red-700">
                    {error.errorMsg}
                  </p>
                </label>
              )}
              <div className="form-control items-center">
                <label className="label">
                  <p className="text-sm font-normal">
                    Already Have An Account? <Link to="/login" className="link link-hover text-[15px] text-button hover:scale-110 font-bold">Login</Link>
                  </p>
                </label>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;