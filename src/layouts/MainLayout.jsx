import NavbarContainer from "../components/NavbarContainer";
import FooterContainer from "../components/FooterContainer";
import { Outlet } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const MainLayout = () => {
    const { theme } = useTheme;
    return (
        <div className={`font-nunito ${theme === "light" ? "bg-white" : "bg-d_body"}`}>
            <NavbarContainer></NavbarContainer>
            <div>
                <Outlet></Outlet>
            </div>
            {/* <FooterContainer></FooterContainer> */}
        </div>
    );
};

export default MainLayout;