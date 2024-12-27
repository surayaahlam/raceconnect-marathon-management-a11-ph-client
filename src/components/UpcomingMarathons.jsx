import axios from "axios";
import { useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";

const UpcomingMarathons = () => {
    const [upcomingMarathons, setUpcomingMarathons] = useState([]);
    const { theme } = useTheme();

    useEffect(() => {
        const fetchUpcomingMarathons = async () => {
            const { data } = await axios.get("http://localhost:5000/upcomingMarathons");
            setUpcomingMarathons(data);
        };

        fetchUpcomingMarathons();
    }, []);

    return (
        <div className="container mx-auto mb-28">
            <h2 className={`text-4xl font-extrabold text-center mb-8 font-lato ${theme === "light" ? "text-font_primary" : "text-font_tertiary"}`}>
                Upcoming Marathons
            </h2>

            <section className="w-11/12 lg:w-9/12 mx-auto">
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                    {upcomingMarathons.map(marathon => (
                        <div
                            key={marathon._id}
                            className={`relative bg-cover bg-no-repeat rounded-sm p-3`}
                            style={{ backgroundImage: `url(${marathon.image})` }}
                        >
                            {/* <img className="w-full h-full object-cover" src={marathon.image} alt="image" /> */}
                            <div className="rounded bg-white bg-opacity-40 p-4 text-black text-center">
                                <h3 className={`text-2xl font-lato font-extrabold mb-2 text-primary`}>{marathon.title}</h3>
                                <p className="font-semibold">
                                    <strong className="font-lato">Location:</strong> {marathon.location}
                                </p>
                                <p className=" font-semibold">
                                    <strong className="font-lato">Date:</strong> {new Date(marathon.marathonStartAt).toLocaleString('en-Gb').slice(0, 10)}
                                </p>
                                <p className="font-semibold">
                                    <strong className="font-lato">Distance:</strong> {marathon.runningDistance}
                                </p>
                                <p className="mt-2 font-semibold">{marathon.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </section>
        </div>
    );
};

export default UpcomingMarathons;