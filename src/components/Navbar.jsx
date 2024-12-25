import logoImg from "../assets/logo1.png"
import navImg from "../assets/dots.png"
import { Link, NavLink, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";
import { FaBars } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMoon } from "react-icons/hi2";


const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const links = <>
        <NavLink
            to="/"
            className={({ isActive }) => `text-lg md:text-base  ${theme === "light" ? "text-font_primary" : "text-font_tertiary"} ${isActive ? `font-extrabold text-primary` : 'hover:scale-105'}`}>Home</NavLink>
        <NavLink
            to="/marathons"
            className={({ isActive }) => `text-lg md:text-base ${theme === "light" ? "text-font_primary" : "text-font_tertiary"} ${isActive ? `font-extrabold text-primary` : 'hover:scale-105'}`}>Marathons</NavLink>
        {
            user?.email &&
            <NavLink
                to="/dashboard"
                className={({ isActive }) => `text-lg md:text-base ${theme === "light" ? "text-font_primary" : "text-font_tertiary"} ${isActive ? `font-extrabold text-primary` : 'hover:scale-105'}`}>Dashboard</NavLink>
        }
        {
            user?.email ?
                (
                    <Link onClick={logOut} className={`text-lg md:text-base ${theme === "light" ? "text-font_primary" : "text-font_tertiary"} hover:scale-105`}>Logout</Link>
                ) :
                (
                    <>
                        <NavLink
                            to="/login"
                            className={({ isActive }) => `text-lg md:text-base ${theme === "light" ? "text-font_primary" : "text-font_tertiary"} ${isActive ? `font-extrabold text-primary` : 'hover:scale-105'}`}>Login</NavLink>
                        <NavLink
                            to="/register"
                            className={({ isActive }) => `text-lg md:text-base ${theme === "light" ? "text-font_primary" : "text-font_tertiary"} ${isActive ? `font-extrabold text-primary` : 'hover:scale-105'}`}>Register</NavLink>
                    </>
                )

        }

    </>


    return (
        <div className={`py-3 font-lato relative ${theme === "light" ? "bg-white" : "bg-d_body"} shadow-lg`}>
            <img className="absolute top-0 h-[88px] w-[60px] md:w-[66px] lg:w-[88px]" src={navImg} alt="" />
            <div className="container mx-auto">
                <div className="w-11/12 mx-auto">
                    <div className="drawer drawer-end">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col">
                            {/* Navbar */}
                            <div className="navbar w-full">
                                <div className="mx-2 flex-1 px-2">
                                    <div onClick={() => navigate("/")} className="btn btn-ghost flex justify-center hover:bg-transparent px-0">
                                        <img className="w-10 h-10" src={logoImg} alt="logo" />
                                        <h2 className={`text-2xl md:text-3xl ${theme === "light" ? "text-font_primary" : "text-font_tertiary"} font-extrabold`}>Race<span className="text-primary">Connect</span></h2>
                                    </div>
                                </div>
                                <div className="flex-none">
                                    <ul className="menu menu-horizontal font-medium lg:flex gap-5 hidden">
                                        {/* Navbar menu content here */}
                                        {links}
                                    </ul>
                                    <label className="swap swap-rotate ml-4">
                                        {/* this hidden checkbox controls the state */}
                                        <input
                                            type="checkbox"
                                            onChange={toggleTheme}
                                            checked={theme === 'dark'} />

                                        {/* sun icon */}
                                        <div className="swap-on text-font_tertiary flex items-center">
                                            <FiSun className="hidden md:block" size={26} />
                                            <FiSun className="md:hidden" size={23} />
                                        </div>

                                        {/* moon icon */}
                                        <div className="swap-off text-font_primary flex items-center">
                                            <HiOutlineMoon className="hidden md:block" size={26} />
                                            <HiOutlineMoon className="md:hidden" size={23} />
                                        </div>
                                    </label>

                                    {
                                        user?.email &&
                                        <div className="ml-4">
                                            {
                                                user?.photoURL ?
                                                    <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                                                        <img className={`w-12 h-12 md:w-[52px] md:h-[52px] rounded-full`} src={user?.photoURL} alt="" />
                                                    </div>
                                                    :
                                                    <div className={`tooltip tooltip-bottom ${theme === "light" ? "text-font_primary" : "text-font_tertiary"}`} data-tip={user?.displayName}>
                                                        <FaUserCircle size={45} />
                                                    </div>
                                            }
                                        </div>
                                    }

                                    <div className="flex-none lg:hidden">
                                        <label htmlFor="my-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                            <div className={`btn btn-ghost lg:hidden ${theme === "light" ? "text-font_primary" : "text-font_tertiary"}`}>
                                                <FaBars size={25} />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className={`menu ${theme === "light" ? "bg-white" : "bg-d_body"} flex gap-3 min-h-full w-60 md:w-72 px-6 py-8 z-10`}>
                                {links}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;