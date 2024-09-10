import React from 'react';
import {
    useDeleteUserMutation,
    useGetUsersQuery
} from "../../redux/services/userApi.js";

import {Link} from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { roles } from "../../constants";
import toast from "react-hot-toast";

const OwnerPage = () => {
    const { data, isLoading } = useGetUsersQuery();

    const isSidebarCollapsed = useSelector((state) => state.global.isSidebarCollapsed);

    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = async (userId) => {
        const shouldDelete = confirm(`Are you sure?`);
        if (!shouldDelete) return;
        try {
            const deleted = await deleteUser(userId);
            if (!deleted) {
                toast.error("Failed to delete!")
            }
            toast.success("Dealer was deleted successfully")
        } catch (error) {
            toast.error("Something was wrong!")
        }
    }

    return (
        <div className="flex bg-gray-50 text-gray-900 w-full min-h-screen">
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
                                >Dealer</Link>
                            </li>
                            <li>
                                <span className="mx-2 text-neutral-400">/</span>
                            </li>
                            <li className="text-neutral-400">Customers</li>
                        </ol>
                    </nav>
                </Navbar>
                <div>
                    {
                        isLoading
                        ? <div>Loading...</div>
                        : (
                            <ul>
                                {
                                    data?.length > 0
                                    ? data.map((row) => (
                                        <li key={row._id} className="flex items-center justify-between gap-3 px-5 py-7 border-b">
                                            <span className="flex items-center gap-3">{row.username}</span>

                                            <div className="text-xs flex items-center">
                                                <button className="primary-button">
                                                    Subscriptions
                                                </button>
                                                <button className="icon-button">
                                                    <Link to={`/update/${roles.DEALER}/${row._id}`}><Pencil className="w-4 h-4"/></Link>
                                                </button>
                                                <button
                                                    className="icon-button"
                                                    onClick={() => handleDelete(row._id)}
                                                >
                                                    <Trash className="w-4 h-4"/>
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                    : <div>You don't have any customers yet.</div>
                                }
                            </ul>
                        )
                    }
                </div>
            </main>
        </div>
    );
};

export default OwnerPage;