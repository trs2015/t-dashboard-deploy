import React from 'react';
import {useSelector} from "react-redux";
import Sidebar from "../../components/Sidebar/index.jsx";
import Navbar from "../../components/Navbar/index.jsx";
import {Link} from "react-router-dom";

const DashboardPage = () => {
    const isSidebarCollapsed = useSelector((state) => state.global.isSidebarCollapsed);

    return (
        <div className="flex bg-gray-50 text-gray-900 w-full min-h-screen">
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
                                >Customer</Link>
                            </li>
                            <li>
                                <span className="mx-2 text-neutral-400">/</span>
                            </li>
                            <li className="text-neutral-400">Dashboard</li>
                        </ol>
                    </nav>
                </Navbar>
                <div>
                    <h2 className="font-semibold text-lg">Customer Dashboard</h2>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;