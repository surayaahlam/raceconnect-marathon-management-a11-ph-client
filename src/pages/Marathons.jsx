import { Helmet } from "react-helmet-async";
import useTheme from "../hooks/useTheme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Marathons = () => {
    const { theme } = useTheme();
    const [marathons, setMarathons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMarathons = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/marathons`)
            setMarathons(data)
        };

        fetchMarathons()
    }, [])


    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>RaceConnect | Marathons</title>
            </Helmet>
            <h2 className={`text-3xl md:text-4xl font-extrabold text-center mb-8 font-lato text-primary`}>Marathons</h2>

            <section className="w-11/12 lg:w-9/12 mx-auto">
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                    {marathons.map(marathon => (
                        <div key={marathon._id} className={`card p-6 ${theme === "light" ? "bg-[#f5f6f5]" : "bg-footer"}`}>
                            <img className="w-full h-[200px] object-cover rounded-xl mb-2" src={marathon.image} alt="image" />
                            <h3 className={`text-[26px] font-lato font-extrabold ${theme === "light" ? "text-font_primary" : "text-font_tertiary"} mb-3`}>{marathon.title}</h3>
                            <div>
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

export default Marathons;