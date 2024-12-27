import { NavLink, Outlet } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const DashboardLayout = () => {
    const { theme } = useTheme();
    return (
        <div className="container mx-auto mt-10 mb-28">
            <h2 className={`text-4xl font-extrabold text-center mb-8 font-lato text-primary`}>Dashboard</h2>
            <div className="w-11/12 mx-auto flex flex-col lg:flex-row gap-8">

                <div className={`w-full lg:w-2/12 flex flex-col px-5 py-6 ${theme === "light" ? "bg-[#f2f2f2]" : "bg-footer"}`}>
                    <NavLink
                        to="/dashboard/addMarathon"
                        className={({ isActive }) =>`py-4 text-center border font-lato text-lg ${theme === "light" ? "text-font_primary " : "text-font_tertiary border-[#4a4a4a]"} ${isActive ? `font-extrabold bg-primary border-none text-white` : 'hover:scale-95'}`} >Add Marathon</NavLink>
                    <NavLink
                        to="/dashboard/myMarathonList"
                        className={({ isActive }) =>`py-4 text-center border font-lato text-lg ${theme === "light" ? "text-font_primary " : "text-font_tertiary border-[#4a4a4a]"} ${isActive ? `font-extrabold bg-primary border-none text-white` : 'hover:scale-95'}`} >My Marathon List</NavLink>
                    <NavLink
                        to="/dashboard/myApplyList"
                        className={({ isActive }) =>`py-4 text-center border font-lato text-lg ${theme === "light" ? "text-font_primary" : "text-font_tertiary border-[#4a4a4a]"} ${isActive ? `font-extrabold bg-primary border-none text-white` : 'hover:scale-95'}`} >My Apply List</NavLink>
                </div>

                <div className={`w-full lg:w-10/12 ${theme === "light" ? "bg-[#f2f2f2]" : "bg-footer"} p-6`}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;