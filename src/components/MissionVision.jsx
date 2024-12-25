import useTheme from "../hooks/useTheme";

const MissionVision = () => {
    const { theme } = useTheme();
    return (
        <div>
            <h2 className={`text-4xl font-extrabold text-center mb-8 font-lato ${theme === "light" ? "text-font_primary" : "text-font_tertiary"}`}>
                Our Mission & Vision
            </h2>
            <div className="bg-mission_img bg-cover bg-no-repeat py-24">
                <div className="container mx-auto">
                    <div className="w-11/12 lg:w-10/12 mx-auto flex flex-col md:flex-row items-center gap-10">
                        <div className="flex flex-col gap-6">
                            <h3 className="text-5xl font-bold text-white font-lato">Eat Well, Stay Hydrated, and Keep Running</h3>
                            <p className="text-white">Stay active and maintain a healthy lifestyle with the perfect balance of good food, hydration, and daily runs. Take every stride toward a healthier, happier you.</p>
                            <div>
                                <button className={`btn bg-primary text-white hover:bg-font_quaternary font-lato px-7 font-bold text-base border-none`}>Discover More</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="border border-dashed p-6">
                                <h3 className="text-2xl font-semibold text-white mb-3 font-lato">Our Mission</h3>
                                <p className="text-white">
                                    To empower marathon enthusiasts by providing an inclusive platform that connects organizers with participants, promoting health, unity, and personal achievements.
                                </p>
                            </div>
                            <div className="border border-dashed p-6">
                                <h3 className="text-2xl font-semibold text-white mb-3 font-lato">Our Vision</h3>
                                <p className="text-white">
                                    To be the leading platform for marathon events, inspiring communities to embrace the spirit of running and fostering connections worldwide.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MissionVision;