import useTheme from "../hooks/useTheme";
import ErrorImg from "../assets/Error.png"
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    return (
        <div className={`container mx-auto ${theme === "light" ? "bg-white" : "bg-d_body"}`}>
            <Helmet>
                <title>RaceConnect | Error</title>
            </Helmet>
            <div className="w-11/12 mx-auto flex flex-col lg:flex-row gap-4 items-center justify-center h-[100vh]">
                <img className="h-[450px] lg:h-[500px]" src={ErrorImg} alt="404" />
                <div className="flex flex-col items-center gap-4 md:gap-6">
                    <h2 className={`text-4xl md:text-5xl lg:text-6xl ${theme === "light" ? "text-font_primary" : "text-font_tertiary"} font-bold font-roboto text-center`}>Oops! Page Not Found.</h2>
                    <p className={`${theme === "light" ? "text-font_primary" : "text-font_tertiary"} text-lg`}>Sorry, the page you are looking for doesn't exist.</p>
                    <button onClick={() => navigate("/")} className={`btn bg-primary text-white hover:bg-font_quaternary font-lato px-7 font-bold text-base border-none`}>Back to Home</button>
                </div>
            </div>

        </div>
    );
};

export default ErrorPage;