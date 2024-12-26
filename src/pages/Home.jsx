import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import FAQ from "../components/FAQ";
import Gallery from "../components/Gallery";
import MissionVision from "../components/MissionVision";
import MarathonSection from "../components/MarathonSection";
import UpcomingMarathons from "../components/UpcomingMarathons";
import { useLoaderData } from "react-router-dom";

const Home = () => {
    const marathonSection = useLoaderData();

    return (
        <div>
            <Helmet>
                <title>RaceConnect | Home</title>
            </Helmet>
            <Banner></Banner>
            <MarathonSection marathonSection={marathonSection}></MarathonSection>
            <Gallery></Gallery>
            <UpcomingMarathons></UpcomingMarathons>
            <MissionVision></MissionVision>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;