import { Helmet } from "react-helmet-async";
import useTheme from "../hooks/useTheme";
import useAxiosSecure from "../hooks/useAxiosSecure";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AddMarathon = () => {
    const { theme } = useTheme();
    const [registrationStartDate, setRegistrationStartDate] = useState(new Date());
    const [registrationEndDate, setRegistrationEndDate] = useState(new Date());
    const [marathonStartDate, setMarathonStartDate] = useState(new Date());

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // React Query mutation for adding a marathon
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (marathonData) => {
            const { data } = await axiosSecure.post('/addMarathon', marathonData);
            return data;
        },
        onSuccess: () => {
            Swal.fire({
                title: 'Success!',
                text: 'Marathon created successfully!',
                icon: 'success',
                timer: 2000,
            });
            queryClient.invalidateQueries({ queryKey: ['marathons'] }); // Refetch marathon data
            navigate('/dashboard/myMarathonList'); // Redirect after successful creation
        },
        onError: (err) => {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to create marathon. Please try again.',
                icon: 'error',
            });
            console.error(err);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const registrationStart = registrationStartDate;
        const registrationEnd = registrationEndDate;
        const marathonStartAt = marathonStartDate;
        const location = form.location.value;
        const runningDistance = form.runningDistance.value;
        const description = form.description.value;
        const image = form.image.value;
        const createdAt = new Date();
        const registrationCount = 0;

        const marathonData = {
            title,
            registrationStart,
            registrationEnd,
            marathonStartAt,
            location,
            runningDistance,
            description,
            image,
            createdAt,
            registrationCount,
            user: {
                email: user?.email,
                name: user?.displayName
            }
        };

        // Call mutation function
        await mutateAsync(marathonData);
        form.reset();
    };

    return (
        <div>
            <Helmet>
                <title>RaceConnect | Add Marathon</title>
            </Helmet>
            <div className={`w-full mx-auto p-4 md:p-10 lg:px-20`}>
                <h2 className={`text-2xl md:text-3xl font-extrabold text-center mb-4 font-lato ${theme === "light" ? "text-font_primary " : "text-font_tertiary"}`}>Add Marathon Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
                    <div>
                        <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Marathon Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter marathon title"
                            className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                        <div>
                            <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Start Registration Date</label>
                            <DatePicker
                                className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                                selected={registrationStartDate}
                                onChange={date => setRegistrationStartDate(date)}
                            />
                        </div>

                        <div>
                            <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>End Registration Date</label>
                            <DatePicker
                                className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                                selected={registrationEndDate}
                                onChange={date => setRegistrationEndDate(date)}
                            />
                        </div>

                        <div>
                            <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Marathon Start Date</label>
                            <DatePicker
                                className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                                selected={marathonStartDate}
                                onChange={date => setMarathonStartDate(date)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Enter location"
                            className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                            required
                        />
                    </div>

                    <div>
                        <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Running Distance</label>
                        <select
                            name="runningDistance"
                            className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                            defaultValue=""
                        >
                            <option value="" disabled>Select running distance</option>
                            <option value="25k">25k</option>
                            <option value="10k">10k</option>
                            <option value="3k">3k</option>
                        </select>
                    </div>

                    <div>
                        <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Description</label>
                        <textarea
                            name="description"
                            placeholder="Write a brief description"
                            className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Marathon Image</label>
                        <input
                            type="text"
                            name="image"
                            placeholder="Enter image URL"
                            className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full btn bg-primary text-white hover:bg-font_quaternary font-lato px-10 font-bold text-lg rounded border-none`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMarathon;