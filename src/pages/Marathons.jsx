import { Helmet } from "react-helmet-async";

const Marathons = () => {
    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>RaceConnect | Marathons</title>
            </Helmet>
            <h2 className={`text-3xl md:text-4xl font-extrabold text-center mb-8 font-lato text-primary`}>Marathons</h2>

        </div>
    );
};

export default Marathons;