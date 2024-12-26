import { Helmet } from "react-helmet-async";

const MarathonDetails = () => {
    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>{`RaceConnect | ${product_title}`}</title>
            </Helmet>
            <h2 className={`text-4xl font-extrabold text-center mb-8 font-lato text-primary`}>Marathon Details</h2>

        </div>
    );
};

export default MarathonDetails;