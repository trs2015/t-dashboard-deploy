import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Sidebar from "../../components/Sidebar/index.jsx";
import Navbar from "../../components/Navbar/index.jsx";
import {Undo2} from "lucide-react";

import {useGetUserByIdQuery, useUpdateUserMutation} from "../../redux/services/userApi.js";
import toast from "react-hot-toast";

const UpdateDealerPage = () => {
    const isSidebarCollapsed = useSelector((state) => state.global.isSidebarCollapsed);
    const [formData, setFormData] = useState({});

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/")
    }

    const { id: dealerId } = useParams();
    const { data } = useGetUserByIdQuery(dealerId);
    const [updateUser, { isLoading }] = useUpdateUserMutation();


    useEffect(() => {
        setFormData({
            username: data?.username || "",
            email: data?.email || ""
        })
    }, [dealerId, data]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Update Dealer
            const updated = await updateUser({ updateData: formData, id: dealerId});

            if (updated.error || updated?.error?.data?.success === false) {
                toast.error("Failed to fetch")
                return;
            }
            setFormData({});
            toast.success("Dealer was updated successfully");

        } catch (error) {
            toast.error("Something was wrong!")
        } finally {
            navigate("/")
        }
    }

    return (
        <div
            className="flex bg-gray-50 text-gray-900 w-full min-h-screen"
        >
            <Sidebar />
            <main
                className={`flex flex-col w-full h-full py-7 px-4 bg-gray-50 ${isSidebarCollapsed ? "md:pl-24" : "md:pl-72"}`}
            >
                <Navbar>
                    <nav className="w-full rounded-md">
                        <ol className="list-reset flex">
                            <li>
                                <Link
                                    to="/"
                                    className="breadcrubm-home"
                                >Owner</Link>
                            </li>
                            <li>
                                <span className="mx-2 text-neutral-400">/</span>
                            </li>
                            <li className="text-neutral-400">Dealer</li>
                            <li>
                                <span className="mx-2 text-neutral-400">/</span>
                            </li>
                            <li className="text-neutral-400">Update Dealer</li>
                        </ol>
                    </nav>
                </Navbar>


                <div className="flex gap-3 items-center pl-1">
                    <button className="icon-button" onClick={handleGoBack}>
                        <Undo2 className="w-4 h-4" />
                    </button>
                    <h2 className="font-semibold text-lg">Update Dealer</h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full md:w-[60%] mt-8">
                    <input
                        type="text"
                        name="username"
                        placeholder="Dealer name"
                        className="input"
                        onChange={handleChange}
                        value={formData.username}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Dealer email"
                        className="input"
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />
                    <div className="flex justify-end items-center">
                        <button className="primary-button" disabled={isLoading}>
                            Save
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default UpdateDealerPage;