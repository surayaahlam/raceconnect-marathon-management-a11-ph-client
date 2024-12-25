import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import FAQ from "../components/FAQ";
import Gallery from "../components/Gallery";
import MissionVision from "../components/MissionVision";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>RaceConnect | Home</title>
            </Helmet>
            <Banner></Banner>
            <Gallery></Gallery>
            <MissionVision></MissionVision>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;