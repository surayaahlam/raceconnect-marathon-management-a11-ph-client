import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";

const useTheme = () => {
    const context = useContext(ThemeContext);
    return context;
};

export default useTheme;