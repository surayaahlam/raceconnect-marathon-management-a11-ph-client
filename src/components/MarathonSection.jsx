import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const MarathonSection = ({ marathonSection }) => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    return (
        <div className="container mx-auto mb-28">
            <h2 className={`text-3xl md:text-4xl font-extrabold text-center mb-8 font-lato ${theme === "light" ? "text-font_primary" : "text-font_tertiary"}`}>
                Marathons
            </h2>
            <section className="w-11/12 lg:w-9/12 mx-auto">
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                    {marathonSection.map(marathon => (
                        <div key={marathon._id} className={`card p-8 ${theme === "light" ? "bg-[#f5f6f5]" : "bg-footer"}`}>
                            <h3 className={`text-[26px] font-lato font-extrabold ${theme === "light" ? "text-font_primary" : "text-font_tertiary"} mb-4`}>{marathon.title}</h3>
                            <div className="mb-1">
                                <p className={`${theme === "light" ? "text-font_secondary" : "text-font_quaternary"}`}><strong className={`${theme !== "light" && "text-font_tertiary"} font-lato`}>Location: </strong>{marathon.location}</p>
                                <p className={`${theme === "light" ? "text-font_secondary" : "text-font_quaternary"}`}><strong className={`${theme !== "light" && "text-font_tertiary"} font-lato`}>Registration Start:</strong> {new Date(marathon.registrationStart).toLocaleString('en-Gb').slice(0, 10)}</p>
                                <p className={`${theme === "light" ? "text-font_secondary" : "text-font_quaternary"}`}><strong className={`${theme !== "light" && "text-font_tertiary"} font-lato`}>Registration End:</strong> {new Date(marathon.registrationEnd).toLocaleString('en-Gb').slice(0, 10)}</p>
                            </div>

                            <div>
                                <button
                                    onClick={() => navigate(`/marathon/${marathon._id}`)}
                                    className={`btn mt-4 px-6 py-2 font-bold text-sm text-white rounded-lg border-none bg-secondary font-lato`}
                                >
                                    See Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MarathonSection;