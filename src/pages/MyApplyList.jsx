import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyApplyList = () => {
    const { theme } = useTheme();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [myApplyList, setMyApplyList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedList, setSelectedList] = useState(null);

    useEffect(() => {
        fetchAllApplyList()
    }, [user, searchTerm])

    const fetchAllApplyList = async () => {
        const { data } = await axiosSecure.get(`/myApplyList/${user?.email}?search=${searchTerm}`);
        setMyApplyList(data)
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
            const { data } = await axiosSecure.delete(`/myApplyList/${id}`);
            toast.success("Marathon Applied Deleted Successfully!!!", {
                position: "top-center",
            });
            fetchAllApplyList();
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || "Failed to delete marathon applied.", {
                position: "top-center",
            });
        }
    };

    const openUpdateModal = (list) => {
        setSelectedList(list);
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
        const firstName = form.firstName.value
        const lastName = form.lastName.value
        const contactNumber = form.contactNo.value
        const additionalInfo = form.info.value

        const updatedList = {
            firstName,
            lastName,
            contactNumber,
            additionalInfo
        };

        try {
            const { data } = await axiosSecure.put(`/myApplyList/${selectedList._id}`,
                updatedList
            );
            toast.success("Marathon applied updated successfully!", {
                position: "top-center",
            });
            document.getElementById('updateModal').close()
            fetchAllApplyList();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to update marathon applied.", {
                position: "top-center"
            }
            );
        }
    };


    return (
        <div>
            <Helmet>
                <title>RaceConnect | My Apply List</title>
            </Helmet>
            <div className={`w-full mx-auto p-2 lg:py-5 lg:px-14`}>
                <h2 className={`text-2xl md:text-3xl font-extrabold text-center mb-7 font-lato ${theme === "light" ? "text-font_primary " : "text-font_tertiary"}`}>My Apply List</h2>
                <div className="flex items-center justify-end">
                    <input
                        type="text"
                        placeholder="Search by Marathon Title"
                        className={`w-full md:w-[50%] lg:w-[35%] border rounded px-3 py-2 mb-4 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                        onKeyUp={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <table className="min-w-full table-auto border-collapse border overflow-x-auto">
                    <thead>
                        <tr>
                            <th className={`px-4 py-2 border ${theme === "light" ? "text-font_primary" : "text-font_tertiary border-font_secondary"} font-lato`}>Marathon Title</th>
                            <th className={`px-4 py-2 border ${theme === "light" ? "text-font_primary" : "text-font_tertiary border-font_secondary"} font-lato`}>Marathon Start At</th>
                            <th className={`px-4 py-2 border ${theme === "light" ? "text-font_primary" : "text-font_tertiary border-font_secondary"} font-lato`}>First Name</th>
                            <th className={`px-4 py-2 border ${theme === "light" ? "text-font_primary" : "text-font_tertiary border-font_secondary"} font-lato`}>Contact Number</th>
                            <th className={`px-4 py-2 border ${theme === "light" ? "text-font_primary" : "text-font_tertiary border-font_secondary"} font-lato`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myApplyList.map((list) => (
                            <tr key={list._id}>
                                <td className={`px-4 py-2 border text-center font-medium ${theme === "light" ? "text-font_primary" : "text-font_quaternary border-font_secondary"}`}>{list.marathonTitle}</td>
                                <td className={`px-4 py-2 border text-center ${theme === "light" ? "text-font_primary" : "text-font_quaternary border-font_secondary"}`}>{list.marathonStartAt}</td>
                                <td className={`px-4 py-2 border text-center ${theme === "light" ? "text-font_primary" : "text-font_quaternary border-font_secondary"}`}>{list.firstName}</td>
                                <td className={`px-4 py-2 border text-center font-medium ${theme === "light" ? "text-font_primary" : "text-font_quaternary border-font_secondary"}`}>{list.contactNumber}</td>
                                <td className={`border px-4 py-2 text-center ${theme !== "light" && "border-font_secondary"}`}>
                                    <button
                                        className={`hover:scale-110 p-1 text-button`}
                                        onClick={() => openUpdateModal(list)}
                                    >
                                        <FaEdit size={22} />
                                    </button>
                                    <button
                                        className={`hover:scale-110 p-1 text-red-700`}
                                        onClick={() => modernDelete(list._id)}
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
            {selectedList && (
                <dialog id="updateModal" className="modal">
                    <div className={`modal-box w-11/12 max-w-5xl ${theme === "light" ? "bg-[#f5f6f5]" : "bg-footer"}`}>
                        <h3 id="modal-title" className={`text-2xl md:text-3xl font-extrabold text-center mb-4 font-lato ${theme === "light" ? "text-font_primary " : "text-font_tertiary"}`}>Update Marathon Applied</h3>
                        <div className="w-full lg:w-9/12 mx-auto">
                            <form method="dialog" onSubmit={handleUpdate} className="space-y-4 lg:space-y-5">
                                <div>
                                    <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Marathon Title</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedList.marathonTitle}
                                        readOnly
                                        className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`} />
                                </div>
                                <div>
                                    <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Marathon Start Date</label>
                                    <input
                                        type="text"
                                        value={new Date(selectedList.marathonStartAt).toLocaleString('en-Gb').slice(0, 10)}
                                        readOnly
                                        className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`} />
                                </div>
                                <div>
                                    <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        defaultValue={selectedList.firstName}
                                        className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                                        required />
                                </div>
                                <div>
                                    <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        defaultValue={selectedList.lastName}
                                        className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                                        required />
                                </div>
                                <div>
                                    <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Contact Number</label>
                                    <input
                                        type="tel"
                                        name="contactNo"
                                        defaultValue={selectedList.contactNumber}
                                        className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                                        required />
                                </div>
                                <div>
                                    <label className={`block font-lato font-semibold mb-1 ${theme === "light" ? "text-font_primary" : "text-font_quaternary"}`}>Additional Info</label>
                                    <textarea
                                        name="info"
                                        defaultValue={selectedList.additionalInfo}
                                        className={`w-full border rounded px-3 py-2 ${theme === "light" ? "bg-white text-black border-white" : "bg-d_body text-font_tertiary border-font_secondary"}`}
                                    ></textarea>
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

        </div>
    );
};

export default MyApplyList;