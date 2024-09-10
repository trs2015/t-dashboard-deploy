import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Sidebar from "../../components/Sidebar/index.jsx";
import Navbar from "../../components/Navbar/index.jsx";

import {useCreateUserMutation} from "../../redux/services/userApi.js";
import toast from "react-hot-toast";
import {Undo2} from "lucide-react";

const CreateCustomerPage = () => {
    const isSidebarCollapsed = useSelector((state) => state.global.isSidebarCollapsed);
    const [formData, setFormData] = useState({});

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/")
    }
    const [createUser, { isLoading }] = useCreateUserMutation();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create Dealer
            const created = await createUser(formData);
            if (created.error || created?.error?.data?.success === false) {
                toast.error("Something was wrong!")
                return;
            }
            setFormData({});
            toast.success("Customer was created successfully")

        } catch (error) {
            console.log(error, 'error')
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
                className={`flex flex-col w-full h-full py-7 px-4 bg-gray-50 ${
                    isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
                }`}
            >
                <Navbar>
                    <nav className="w-full rounded-md">
                        <ol className="list-reset flex">
                            <li>
                                <Link
                                    to="/"
                                    className="breadcrubm-home"
                                >Dealer</Link>
                            </li>
                            <li>
                                <span className="mx-2 text-neutral-400">/</span>
                            </li>
                            <li className="text-neutral-400">Customer</li>
                            <li>
                                <span className="mx-2 text-neutral-400">/</span>
                            </li>
                            <li className="text-neutral-400">Create Customer</li>
                        </ol>
                    </nav>
                </Navbar>

                <div className="flex gap-3 items-center pl-1">
                    <button className="icon-button" onClick={handleGoBack}>
                        <Undo2 className="w-4 h-4" />
                    </button>
                    <h2 className="font-semibold text-lg">Create Customer</h2>
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

export default CreateCustomerPage;