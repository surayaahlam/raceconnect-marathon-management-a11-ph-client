import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import logoImg from "../assets/logo1.png"

const Footer = () => {
    return (
        <footer className={`bg-footer_img px-10 py-12`}>
            <div className="container mx-auto">
                <div className="w-11/12 mx-auto footer md:p-5 lg:p-10 place-items-stretch grid-cols-1 md:grid-cols-2 md:grid-flow-row lg:grid-cols-4">
                  <nav className="flex flex-col justify-center items-center md:col-span-2 lg:col-span-1 lg:items-start">
                    <div className="flex items-center gap-3">
                        <img className="w-10 md:w-12" src={logoImg} alt="logo" />
                        <h2 className="text-2xl md:text-3xl text-font_tertiary font-extrabold font-lato">Race<span className="text-primary">Connect</span></h2>
                    </div>
                    <p className="text-base font-normal mb-4 text-font_quaternary text-center lg:text-start">RaceConnect connects organizers and participants, simplifying marathon management and registration while keeping you motivated to reach your goals.</p>
                  </nav>
                  <nav className="flex flex-col items-center lg:items-start lg:ml-10 text-font_quaternary">
                    <h6 className="footer-title text-base text-primary font-lato">Quick Links</h6>
                    <a className="link link-hover text-base font-normal">About Us</a>
                    <a className="link link-hover text-base font-normal">Careers</a>
                    <a className="link link-hover text-base font-normal">Upcoming Events</a>
                    <a className="link link-hover text-base font-normal">Contact Us</a>
                    <a className="link link-hover text-base font-normal">FAQs</a>
                  </nav>
                  <nav className="flex flex-col items-center lg:items-start text-font_quaternary">
                    <h6 className="footer-title text-primary text-base font-lato">Stay Connected</h6>
                    <p className="text-base font-normal mb-3 text-center lg:text-start">Follow us for marathon updates<br /> and tips.</p>
                    <div className="flex items-center gap-5">
                        <a className="hover:scale-110" href=""><FaLinkedinIn size={20}/></a>
                        <a className="hover:scale-110" href=""><FaInstagram size={20}/></a>
                        <a className="hover:scale-110" href=""><FaFacebookF size={20}/></a>
                        <a className="hover:scale-110" href=""><FaTwitter size={20}/></a>
                    </div>
                  </nav>
                  <nav className="flex flex-col items-center lg:items-start text-font_quaternary md:col-span-2 lg:col-span-1">
                    <h6 className="footer-title text-primary text-base font-lato">Newsletter</h6>
                    <p className="text-base font-normal mb-3 text-center lg:text-start">Subscribe to receive inspiration, ideas, <br />and news in your inbox.</p>
                    <div className="flex relative w-full md:w-8/12 lg:w-full">
                        <input className="input rounded-xl input-bordered bg-font_tertiary mb-4 font-normal text-base w-full text-font_secondary" type="email" placeholder="Enter your email" />
                        <button className="btn rounded-xl hover:bg-font_quaternary bg-secondary border-none rounded-tl-none rounded-bl-none border-l-0 text-base font-bold text-font_primary px-7 absolute right-0">Subscribe</button>
                    </div>
                  </nav>
                </div>

                <div className="footer md:w-11/12 mx-auto text-font_quaternary border-base-300 border-t px-10 py-4">
                  <aside className="grid-flow-col items-center">
                    <p className="text-base font-medium">Copyright &copy; {new Date().getFullYear()} RaceConnect. All right reserved</p>
                  </aside>
                  <nav className="justify-self-center md:place-self-center md:justify-self-end">
                    <p>Designed with ❤️ by RaceConnect Team</p>
                  </nav>
                </div>
            </div> 
        </footer>
    );
};

export default Footer;