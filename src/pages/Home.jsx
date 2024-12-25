import Banner from "../components/Banner";
import FAQ from "../components/FAQ";
import Gallery from "../components/Gallery";
import MissionVision from "../components/MissionVision";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Gallery></Gallery>
            <MissionVision></MissionVision>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;