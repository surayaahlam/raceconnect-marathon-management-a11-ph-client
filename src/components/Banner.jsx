import { Carousel } from "flowbite-react";
import BannerImg1 from "../assets/Banner1.jpg"
import BannerImg2 from "../assets/Banner2.jpg"
import BannerImg3 from "../assets/Banner3.jpg"
import ShapeImg from "../assets/shapes.png"

const Banner = () => {
    return (
        <div className="mx-auto mb-28 mt-0">
            <div className="h-[700px]">
                <Carousel
                    slideInterval={5000}
                    className="overflow-hidden relative"
                >
                    {/* Slide 1 */}
                    <div className="relative shadow-lg">
                        <img
                            className="w-full h-[700px] object-cover"
                            src={BannerImg1}
                            alt="Slide 1"
                        />
                        <div className="absolute left-[30px] bottom-[140px] md:left-[90px] lg:bottom-[85px] lg:left-[220px] z-10 p-6">
                            <img className="h-16 md:h-20 lg:h-24" src={ShapeImg} alt="" />
                            <h2 className="text-5xl md:text-6xl lg:text-8xl text-white font-extrabold font-lato italic">Start <br />Your Marathon <br />Journey</h2>
                            <p className="text-base md:text-lg lg:text-xl font-medium text-white mt-3 mb-9">Join Race<span className="text-primary">Connect</span> to organize or participate in marathons. <br />Start your race today!</p>
                            <button className={`btn bg-primary text-white hover:bg-font_quaternary font-lato px-7 font-bold text-base border-none`}>Join a Marathon</button>
                        </div>
                    </div>

                    {/* Slide 2 */}
                    <div className="relative shadow-lg">
                        <img
                            className="w-full h-[700px] object-cover"
                            src={BannerImg2}
                            alt="Slide 2"
                        />
                        <div className="absolute right-[15px] md:right-[40px] top-[160px] lg:right-[150px] z-10 p-6">
                            <h2 className="text-5xl md:text-7xl lg:text-8xl text-white font-extrabold font-lato italic text-right"><span className="text-button">Connect</span> with <br />Fellow <span className="text-button">Runners</span></h2>
                            <p className="text-base md:text-lg lg:text-xl font-medium text-white mt-3 mb-9 text-right">Join the community, track progress, and motivate <br />each other in every race.</p>
                            <div className="text-right">
                                <button className={`btn bg-button text-white hover:bg-font_quaternary font-lato px-7 font-bold text-base border-none`}>Join the Community</button>
                            </div>
                        </div>
                    </div>

                    {/* Slide 3 */}
                    <div className="relative shadow-lg">
                        <img
                            className="w-full h-[700px] object-cover"
                            src={BannerImg3}
                            alt="Slide 3"
                        />
                        <div className="absolute top-[180px] md:right-[35px] lg:top-[200px] lg:right-[300px] z-10 p-6">
                            <h2 className="text-5xl md:text-7xl lg:text-8xl text-white font-extrabold font-lato italic text-center">Track Your <span className="text-secondary">Progress...</span></h2>
                            <p className="text-base md:text-lg lg:text-xl font-bold text-white mt-3 mb-9 text-center">Monitor your race results, personal bests, and set new goals with ease.</p>
                            <div className="text-center">
                                <button className={`btn bg-secondary text-white hover:bg-font_quaternary font-lato px-7 font-bold text-base border-none`}>Track Your Progress</button>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>

        </div>
    );
};

export default Banner;
