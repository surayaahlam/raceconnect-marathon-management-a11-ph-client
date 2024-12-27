import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { isWithinInterval } from 'date-fns'
import axios from "axios";
import useTheme from "../hooks/useTheme";

const MarathonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [marathon, setMarathon] = useState({});
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

    useEffect(() => {
        // Fetch marathon details by ID
        axios
            .get(`http://localhost:5000/marathon/${id}`)
            .then((res) => {
                const marathonData = res.data;
                setMarathon(marathonData);

                const today = new Date();
                const registrationStart = new Date(marathonData.registrationStart);
                const registrationEnd = new Date(marathonData.registrationEnd);

                setIsRegistrationOpen(
                    isWithinInterval(today, { start: registrationStart, end: registrationEnd })
                );
            })
            .catch((err) => console.error(err));
    }, [id]);

    const { title, registrationStart, registrationEnd, marathonStartAt, location, runningDistance, description, image, registrationCount } = marathon || {};

    const handleRegister = () => {
        navigate(`/marathonRegistration/${id}`);
    };

    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>{`RaceConnect | ${title}`}</title>
            </Helmet>
            <h2 className={`text-3xl md:text-4xl font-extrabold text-center mb-8 font-lato text-primary`}>Marathon Details</h2>
            <div className="w-11/12 lg:w-10/12 mx-auto">
                <div className={`p-5 md:p-8 flex flex-col md:flex-row gap-6 lg:gap-10 rounded-3xl ${theme === "light" ? "bg-[#f5f6f5]" : "bg-footer"}`}>
                    <div className="md:w-[45%]">
                        <img src={image} alt={title}
                            className="w-full h-full object-cover rounded-2xl" />
                    </div>

                    <div className="md:w-[55%]">
                        {/* Marathon Details */}
                        <div className="mb-6">
                            <h1 className={`text-3xl font-extrabold font-lato ${theme === "light" ? "text-font_primary" : "text-font_tertiary"}`}>{title}</h1>
                            <p className={`${theme === "light" ? "text-font_primary" : "text-font_tertiary"} text-lg mt-2`}>{description}</p>
                            <div className="flex my-3">
                                <div className={`rounded-[32px] py-[7px] px-6 border ${isRegistrationOpen ? 'border-[#309C08] bg-[#309C081A]' : 'border-red-600 bg-[#dc262610]'}`}>
                                    <p className={`text-base font-medium font-lato ${isRegistrationOpen ? 'text-[#309C08]' : 'text-red-600'}`}>
                                        {isRegistrationOpen ? "Registration Open" : "Registration Closed"}
                                    </p>
                                </div>
                            </div>
                            <p className={`${theme === "light" ? "text-font_primary" : "text-font_tertiary"} text-[17px]`}>
                                <strong className="font-lato">Location:</strong> {location}
                            </p>
                            <p className={`${theme === "light" ? "text-font_primary" : "text-font_tertiary"} text-[17px] mt-2`}>
                                <strong className="font-lato">Registration Start:</strong> {new Date(registrationStart).toLocaleString('en-Gb').slice(0, 10)}
                            </p>
                            <p className={`${theme === "light" ? "text-font_primary" : "text-font_tertiary"} text-[17px] mt-2`}>
                                <strong className="font-lato">Registration End:</strong> {new Date(registrationEnd).toLocaleString('en-Gb').slice(0, 10)}
                            </p>
                            <p className={`${theme === "light" ? "text-font_primary" : "text-font_tertiary"} text-[17px] mt-2`}>
                                <strong className="font-lato">Marathon Start Date:</strong> {new Date(marathonStartAt).toLocaleString('en-Gb').slice(0, 10)}
                            </p>
                            <p className={`${theme === "light" ? "text-font_primary" : "text-font_tertiary"} text-[17px] mt-2`}>
                                <strong className="font-lato">Distance:</strong> {runningDistance}
                            </p>
                            <p className={`${theme === "light" ? "text-font_primary" : "text-font_tertiary"} text-lg font-semibold mt-2 mb-4`}>
                                <strong className="font-lato">Total Registration:</strong> {registrationCount}
                            </p>
                            <button
                                className={`btn bg-primary text-white hover:bg-font_quaternary font-lato px-10 font-bold text-xl border-none`}
                                onClick={handleRegister}
                                disabled={!isRegistrationOpen}
                            >
                                Register
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MarathonDetails;