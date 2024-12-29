import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const RegistrationMarathon = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { theme } = useTheme();
    const [marathon, setMarathon] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchMarathonData()
    }, [id])

    const fetchMarathonData = async () => {
        const { data } = await axiosSecure.get(`/marathon/${id}`)
        setMarathon(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        const email = user?.email
        const marathonTitle = marathon?.title
        const marathonStartAt = marathon?.marathonStartAt
        const firstName = form.firstName.value
        const lastName = form.lastName.value
        const contactNumber = form.contactNo.value
        const additionalInfo = form.info.value

        const registrationData = {
            email,
            marathonTitle,
            marathonStartAt,
            firstName,
            lastName,
            contactNumber,
            additionalInfo
        };

        try {
            // Send registration data to server
            const { data } = await axiosSecure.post(
                `/registrations`,
                registrationData
            );

            // Reset form on success
            form.reset();

            // Display success notification
            await Swal.fire({
                title: "Success!",
                text: "Registration Successful!",
                icon: "success",
                timer: 2000,
            });

            // Update marathon registration count
            await axiosSecure.patch(
                `/marathon/${id}/increment`
            );

            // Navigate to myApplyList
            navigate("/dashboard/myApplyList"); 
        }
        catch (err) {
            Swal.fire({
                title: "Error",
                text: "Registration Failed!",
                icon: "error",
            });
            console.error("Error during registration:", err);
        };
    };

    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>{`RaceConnect | Registration - ${marathon.title}`}</title>
            </Helmet>
            <h2 className={`text-3xl md:text-4xl font-extrabold text-center mb-8 font-lato text-primary`}>Marathon Registration</h2>
            <div className={`w-11/12 lg:w-7/12 mx-auto px-5 py-10 md:px-10 lg:px-20 md:py-14 ${theme === "light" ? "bg-[#f5f6f5]" : "bg-footer"}`}>
                <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
                    <div>
                        <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Email</label>
                        <input
                            type="email"
                            defaultValue={user?.email}
                            readOnly
                            className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`} />
                    </div>
                    <div>
                        <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Marathon Title</label>
                        <input
                            type="text"
                            defaultValue={marathon?.title}
                            readOnly
                            className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`} />
                    </div>
                    <div>
                        <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Marathon Start Date</label>
                        <input
                            type="text"
                            value={new Date(marathon?.marathonStartAt).toLocaleString('en-Gb').slice(0, 10)}
                            readOnly
                            className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`} />
                    </div>
                    <div>
                        <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                            required />
                    </div>
                    <div>
                        <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                            required />
                    </div>
                    <div>
                        <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Contact Number</label>
                        <input
                            type="tel"
                            name="contactNo"
                            className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                            required />
                    </div>
                    <div>
                        <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Additional Info</label>
                        <textarea
                            name="info"
                            className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                        ></textarea>
                    </div>
                    <button type="submit" className={`w-full btn bg-secondary text-white hover:bg-font_quaternary font-lato px-10 font-bold text-lg rounded border-none`}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationMarathon;