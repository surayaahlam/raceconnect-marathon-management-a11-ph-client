import { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";


const Login = () => {
  const { userLogin, setUser, googleLogin } = useAuth();
  const { theme } = useTheme();
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();

  const handleGoogleLogIn = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          title: "Login Successful!",
          text: `Welcome back, ${user.displayName}!`,
          icon: "success",
          timer: 3000,
          willClose: () => {
            navigate(location.state?.from || "/");
          }
        });
      })
      .catch((err) => {
        toast.error(`Google login error: ${err.message}`, {
          position: "top-center",
        });
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          title: "Login Successful!",
          text: `Welcome back, ${user.displayName}!`,
          icon: "success",
          timer: 3000,
          willClose: () => {
            navigate(location.state?.from || "/");
          }
        });
      })
      .catch((err) => {
        setError({ ...error, login: "Your email or password is incorrect. Please try again." })
      });
  };

  return (
    <div className="container mx-auto mt-5 mb-28">
      <Helmet>
        <title>RaceConnect | Login</title>
      </Helmet>
      <div className="w-11/12 mx-auto flex items-center justify-center">
        <div className={`${theme === "light" ? "bg-gray-100" : "bg-footer"} w-full max-w-xl p-6 md:p-9 rounded-xl flex flex-col items-center`}>
          <button onClick={handleGoogleLogIn} className={`w-9/12 btn font-lato ${theme === "light" ? "bg-base-100" : "bg-font_quaternary hover:bg-base-300"} rounded-full`}>
            <FcGoogle size={25} />
            Login with Google</button>
          <div className={`divider ${theme === "light" ? "text-font_primary" : "text-font_tertiary"}`} >OR</div>
          <h2 className={`text-2xl font-lato font-semibold mb-6 ${theme === "light" ? "text-font_primary" : "text-font_tertiary"}`}>Login Your Account</h2>
          <div className={`card ${theme === "light" ? "bg-base-100" : "bg-font_quaternary"} w-full shrink-0`}>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-lato font-medium">Email Address</span>
                </label>
                <input name="email" type="email" ref={emailRef} placeholder="Enter your email address" className={`input input-bordered ${theme === "light" ? "bg-white" : "bg-font_tertiary"}`} required />
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
                {error.login && (
                  <label className="label">
                    <p className="text-sm font-normal text-red-700">
                      {error.login}
                    </p>
                  </label>
                )}
              </div>
              <div className="form-control mt-4">
                <button type="submit" className="btn bg-button border-none text-white hover:bg-font_secondary font-lato text-base">Login</button>
              </div>
              <div className="form-control items-center">
                <label className="label">
                  <p className="text-sm font-normal">
                    Don't Have An Account? <Link to="/register" className="link link-hover text-[15px] text-primary hover:scale-110 font-bold">Register</Link>
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

export default Login;