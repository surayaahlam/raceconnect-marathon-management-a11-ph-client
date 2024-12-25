import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import useTheme from "../hooks/useTheme";

const Gallery = () => {
    const { theme } = useTheme();
    const images = [
        {
            original: "https://i.ibb.co.com/D9CznFr/young-people-encouraging-runners-at-finish-line-PJ8-YWBU.jpg",
            thumbnail: "https://i.ibb.co.com/D9CznFr/young-people-encouraging-runners-at-finish-line-PJ8-YWBU.jpg",
        },
        {
            original: "https://i.ibb.co.com/GJZH4b1/marathon-runners-on-the-street-healthy-lifestyle-5-DADDUB.jpg",
            thumbnail: "https://i.ibb.co.com/GJZH4b1/marathon-runners-on-the-street-healthy-lifestyle-5-DADDUB.jpg",
        },
        {
            original: "https://i.ibb.co.com/2y7Rwpq/pexels-photo-2168292.jpg",
            thumbnail: "https://i.ibb.co.com/2y7Rwpq/pexels-photo-2168292.jpg",
        },
        {
            original: "https://i.ibb.co.com/GQrt0jJ/323-708.jpg",
            thumbnail: "https://i.ibb.co.com/GQrt0jJ/323-708.jpg",
        },
        {
            original: "https://i.ibb.co.com/3BGB8Kr/360-F-853005172-XJAFmu-Sjv51-Fyvvh3-CLZp-Iro-Q5z-Xmq-Gh.jpg",
            thumbnail: "https://i.ibb.co.com/3BGB8Kr/360-F-853005172-XJAFmu-Sjv51-Fyvvh3-CLZp-Iro-Q5z-Xmq-Gh.jpg",
        },
        {
            original: "https://i.ibb.co.com/589PV43/pexels-runffwpu-10226364.jpg",
            thumbnail: "https://i.ibb.co.com/589PV43/pexels-runffwpu-10226364.jpg",
        },
    ];

    return (
        <div className="container mx-auto mb-28">
            <div className="w-11/12 mx-auto">
                <h2 className={`text-4xl font-extrabold text-center mb-8 font-lato ${theme === "light" ? "text-font_primary" : "text-font_tertiary"}`}>
                    Race<span className="text-primary">Connect</span> Gallery
                </h2>
                <ImageGallery
                    items={images}
                    autoPlay={true}
                    slideInterval={10000}
                    showThumbnails={true}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showNav={false}
                />
            </div>
        </div>
    );
};

export default Gallery;