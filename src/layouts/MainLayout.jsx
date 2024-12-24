import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const MainLayout = () => {
    const { theme } = useTheme();
    return (
        <div className={`font-nunito ${theme === "light" ? "bg-white" : "bg-d_body"}`}>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-512.8px)]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;