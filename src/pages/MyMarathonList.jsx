import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyMarathonList = () => {
    const { theme } = useTheme();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [marathons, setMarathons] = useState([]);
    const [selectedMarathon, setSelectedMarathon] = useState(null);
    const [registrationStartDate, setRegistrationStartDate] = useState(null);
    const [registrationEndDate, setRegistrationEndDate] = useState(null);
    const [marathonStartDate, setMarathonStartDate] = useState(null);
    const [sortOrder, setSortOrder] = useState("");

    useEffect(() => {
        fetchAllMarathons()
    }, [user, sortOrder])

    const fetchAllMarathons = async () => {
        const { data } = await axiosSecure.get(`/marathons/${user?.email}?sortOrder=${sortOrder}`);
        setMarathons(data)
    };

    // Example button handlers to change sortOrder
    const handleSortAscending = () => {
        setSortOrder('asc');
    };

    const handleSortDescending = () => {
        setSortOrder('desc');
    };

    useEffect(() => {
        if (selectedMarathon) {
            // Update date states when a marathon is selected
            setRegistrationStartDate(new Date(selectedMarathon?.registrationStart || Date.now()));
            setRegistrationEndDate(new Date(selectedMarathon?.registrationEnd || Date.now()));
            setMarathonStartDate(new Date(selectedMarathon?.marathonStartAt || Date.now()));
        }
    }, [selectedMarathon]);

    const openUpdateModal = (marathon) => {
        setSelectedMarathon(marathon);
        // Wait for state update and ensure modal exists
        setTimeout(() => {
            const modal = document.getElementById('updateModal');
            if (modal) {
                modal.showModal();
            } else {
                console.error('Modal element not found in the DOM.');
            }
        }, 0);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const location = form.location.value;
        const runningDistance = form.runningDistance.value;
        const description = form.description.value;
        const image = form.image.value;

        const updatedMarathon = {
            title,
            location,
            registrationStart: registrationStartDate,
            registrationEnd: registrationEndDate,
            marathonStartAt: marathonStartDate,
            runningDistance,
            description,
            image,
        };

        try {
            const { data } = await axiosSecure.put(`/updateMarathon/${selectedMarathon._id}`,
                updatedMarathon
            );
            toast.success("Marathon updated successfully!", {
                position: "top-center",
            });
            document.getElementById('updateModal').close()
            fetchAllMarathons();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to update marathon.", {
                position: "top-center"
            }
            );
        }
    };

    const modernDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id); // Call the delete function
            }
        });
    };

    // delete functionality
    const handleDelete = async (id) => {
        try {
            const { data } = await axiosSecure.delete(`/marathon/${id}`);
            toast.success("Marathon Deleted Successfully!!!", {
                position: "top-center",
            });
            fetchAllMarathons();
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || "Failed to delete marathon.", {
                position: "top-center",
            });
        }
    };

    return (
        <div>
            <Helmet>
                <title>RaceConnect | My Marathon List</title>
            </Helmet>
            <div className={`w-full mx-auto p-2 lg:py-5 lg:px-14`}>
                <h2 className={`text-2xl md:text-3xl font-extrabold text-center mb-4 font-lato ${theme === "light" ? "text-font_primary " : "text-font_tertiary"}`}>My Marathons List</h2>

                {/* Sorting Buttons */}
                <div className="mb-4 text-center md:text-end">
                    <button
                        className={`btn btn-ghost mt-4 px-6 py-2 text-sm ${theme === "light" ? "text-font_primary border-[#d7dbdb]" : "text-font_tertiary border-font_secondary hover:bg-font_quaternary"} rounded-l-lg font-lato ${sortOrder === "asc" ? "bg-secondary text-white font-bold border-none" : ""}`}
                        onClick={handleSortAscending}
                    >
                        Oldest First
                    </button>
                    <button
                        className={`btn btn-ghost mt-4 px-6 py-2 text-sm ${theme === "light" ? "text-font_primary border-[#d7dbdb]" : "text-font_tertiary border-font_secondary hover:bg-font_quaternary"} rounded-r-lg font-lato ${sortOrder === "desc" ? "bg-secondary text-white font-bold border-none" : ""}`}
                        onClick={handleSortDescending}
                    >
                        Newest First
                    </button>
                </div>

                <table className="min-w-full table-auto border-collapse border overflow-x-auto">
                    <thead>
                        <tr>
                            <th className={`px-4 py-2 border ${theme === "light" ? "text-font_primary" : "text-font_tertiary border-font_secondary"} font-lato`}>Image</th>
                            <th className={`px-4 py-2 border ${theme === "light" ? "text-font_primary" : "text-font_tertiary border-font_secondary"} font-lato`}>Name</th>
                            <th className={`px-4 py-2 border ${theme === "light" ? "text-font_primary" : "text-font_tertiary border-font_secondary"} font-lato`}>Date</th>
                            <th className={`px-4 py-2 border ${theme === "light" ? "text-font_primary" : "text-font_tertiary border-font_secondary"} font-lato`}>Location</th>
                            <th className={`px-4 py-2 border ${theme === "light" ? "text-font_primary" : "text-font_tertiary border-font_secondary"} font-lato`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marathons.map((marathon) => (
                            <tr key={marathon._id}>
                                <td className={`px-4 py-2 text-center border ${theme !== "light" && "border-font_secondary"}`}>
                                    <img src={marathon.image} alt="image" className="w-24 h-14 object-cover rounded" />
                                </td>
                                <td className={`px-4 py-2 border text-center font-medium ${theme === "light" ? "text-font_primary" : "text-font_quaternary border-font_secondary"}`}>{marathon.title}</td>
                                <td className={`px-4 py-2 border text-center ${theme === "light" ? "text-font_primary" : "text-font_quaternary border-font_secondary"}`}>{new Date(marathon.marathonStartAt).toLocaleString('en-Gb').slice(0, 10)}</td>
                                <td className={`px-4 py-2 border text-center ${theme === "light" ? "text-font_primary" : "text-font_quaternary border-font_secondary"}`}>{marathon.location}</td>
                                <td className={`border px-4 py-2 text-center ${theme !== "light" && "border-font_secondary"}`}>
                                    <button
                                        className={`hover:scale-110 p-1 text-button`}
                                        onClick={() => openUpdateModal(marathon)}
                                    >
                                        <FaEdit size={22} />
                                    </button>
                                    <button
                                        className={`hover:scale-110 p-1 text-red-700`}
                                        onClick={() => modernDelete(marathon._id)}
                                    >
                                        <RiDeleteBin5Line size={22} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            {selectedMarathon && (
                <dialog id="updateModal" className="modal">
                    <div className={`modal-box w-11/12 max-w-5xl ${theme === "light" ? "bg-[#f5f6f5]" : "bg-footer"}`}>
                        <h3 id="modal-title" className={`text-2xl md:text-3xl font-extrabold text-center mb-4 font-lato ${theme === "light" ? "text-font_primary " : "text-font_tertiary"}`}>Update Marathon</h3>
                        <div className="w-full lg:w-9/12 mx-auto">
                            <form method="dialog" onSubmit={handleUpdate} className="space-y-4 lg:space-y-5">
                                <div>
                                    <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Marathon Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        defaultValue={selectedMarathon.title}
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
                                        defaultValue={selectedMarathon.location}
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
                                        defaultValue={selectedMarathon.runningDistance}
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
                                        defaultValue={selectedMarathon.description}
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
                                        defaultValue={selectedMarathon.image}
                                        placeholder="Enter image URL"
                                        className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                                        required
                                    />
                                </div>
                                <div className="modal-action justify-center">
                                    <button type="submit" className={`btn bg-secondary text-white hover:bg-font_quaternary font-lato px-10 font-bold text-lg rounded-lg border-none`}>
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('updateModal').close()}
                                        className={`btn bg-button text-white hover:bg-font_quaternary font-lato px-10 font-bold text-lg rounded-lg border-none`}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}


        </div >
    );
};

export default MyMarathonList;