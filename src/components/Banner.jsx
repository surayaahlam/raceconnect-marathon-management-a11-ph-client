import { Carousel } from "flowbite-react";

const Banner = () => {
    return (
        <div>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel className="rounded-none" slideInterval={5000}>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                </Carousel>
            </div>

        </div>
    );
};

export default Banner;
