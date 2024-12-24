import logoImg from "../assets/logo1.png"
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { NavLink } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";

const NavbarContainer = () => {
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();
    const links = <>
        <NavLink
            to="/"
            className={({ isActive }) => `text-base ${theme === "light" ? "text-primary" : "text-font_tertiary"} ${isActive ? `font-extrabold ${theme === "light" ? "text-secondary" : "text-button"}` : 'hover:scale-105'}`}>Home</NavLink>
        <NavLink
            to="/marathons"
            className={({ isActive }) => `text-base ${theme === "light" ? "text-primary" : "text-font_tertiary"} ${isActive ? `font-extrabold ${theme === "light" ? "text-secondary" : "text-button"}` : 'hover:scale-105'}`}>Marathons</NavLink>
        {
            user?.email &&
            <NavLink
                to="/dashboard"
                className={({ isActive }) => `text-base ${theme === "light" ? "text-primary" : "text-font_tertiary"} ${isActive ? `font-extrabold ${theme === "light" ? "text-secondary" : "text-button"}` : 'hover:scale-105'}`}>Dashboard</NavLink>
        }

        <NavLink
            to="/login"
            className={({ isActive }) => `text-base ${theme === "light" ? "text-primary" : "text-font_tertiary"} ${isActive ? `font-extrabold ${theme === "light" ? "text-secondary" : "text-button"}` : 'hover:scale-105'}`}>Login</NavLink>
        <NavLink
            to="/register"
            className={({ isActive }) => `text-base ${theme === "light" ? "text-primary" : "text-font_tertiary"} ${isActive ? `font-extrabold ${theme === "light" ? "text-secondary" : "text-button"}` : 'hover:scale-105'}`}>Register</NavLink>


    </>

    return (
        <div>
            <Navbar fluid rounded>
                <NavbarBrand>
                    <img src={logoImg} alt="" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
                </NavbarBrand>
                <NavbarToggle />
                <NavbarCollapse>
                    {links}
                </NavbarCollapse>
            </Navbar>
        </div>
    );
};

export default NavbarContainer;