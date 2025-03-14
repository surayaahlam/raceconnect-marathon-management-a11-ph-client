import { NavLink, Outlet } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const DashboardLayout = () => {
    const { theme } = useTheme();
    return (
        <div className="mx-auto mt-10 mb-28">
            <h2 className={`text-3xl md:text-4xl font-extrabold text-center mb-8 font-lato text-primary`}>Dashboard</h2>
            <div className="flex flex-col lg:flex-row gap-8">

                <div className={`w-full lg:w-2/12 grid grid-flow-row auto-rows-min grid-cols-1 md:grid-cols-3 lg:grid-cols-1 px-5 py-6 ${theme === "light" ? "bg-[#f5f6f5]" : "bg-footer"}`}>
                    <NavLink
                        to="/dashboard/addMarathon"
                        className={({ isActive }) =>`py-4 text-center border font-lato text-lg ${theme === "light" ? "text-font_primary " : "text-font_tertiary border-[#4a4a4a]"} ${isActive ? `font-extrabold bg-primary border-none text-white` : 'hover:bg-font_tertiary hover:text-font_secondary'}`} >Add Marathon</NavLink>
                    <NavLink
                        to="/dashboard/myMarathonList"
                        className={({ isActive }) =>`py-4 text-center border font-lato text-lg ${theme === "light" ? "text-font_primary " : "text-font_tertiary border-[#4a4a4a]"} ${isActive ? `font-extrabold bg-primary border-none text-white` : 'hover:bg-font_tertiary hover:text-font_secondary'}`} >My Marathon List</NavLink>
                    <NavLink
                        to="/dashboard/myApplyList"
                        className={({ isActive }) =>`py-4 text-center border font-lato text-lg ${theme === "light" ? "text-font_primary" : "text-font_tertiary border-[#4a4a4a]"} ${isActive ? `font-extrabold bg-primary border-none text-white` : 'hover:bg-font_tertiary hover:text-font_secondary'}`} >My Apply List</NavLink>
                </div>

                <div className={`w-full lg:w-10/12 ${theme === "light" ? "bg-[#f5f6f5]" : "bg-footer"} p-6`}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;