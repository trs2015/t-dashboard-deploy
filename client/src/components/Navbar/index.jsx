import React from 'react';

import { Menu } from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {setIsSidebarCollapsed} from "../../redux/reducers/globalSlice.js";
import {Link, useLocation} from "react-router-dom";
import {roles} from "../../constants/index.js";

const Navbar = ({children}) => {
    const dispatch = useDispatch();
    const isSidebarCollapsed = useSelector(
        (state) => state.global.isSidebarCollapsed
    );
    const currentUser = useSelector((state) => state.user.currentUser);
    const { pathname } = useLocation();

    const isHome = pathname === "/";

    const toggleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    };

    return (
        <div className="flex justify-between flex-wrap items-center w-full mb-7">
            {/* LEFT SIDE */}
            <div className="flex justify-between items-center gap-5">
                {
                    isSidebarCollapsed && <button
                        className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
                        onClick={toggleSidebar}
                    >
                        <Menu className="w-4 h-4" />
                    </button>
                }

                <div className="relative">
                    {/* BreadCrumbs */}
                    {children}
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex justify-between items-center gap-5 ml-auto">
                <div className="flex justify-between items-center gap-5">
                    {
                        isHome && currentUser.role !== roles.CUSTOMER ? (
                            <button className="primary-button">
                                <Link to={`/create/${currentUser.role}`}>Add { currentUser.role === roles.OWNER ? "Dealer" : "Customer" }</Link>
                            </button>
                        ) : ""
                    }

                    <div className="hidden md:flex items-center gap-3">
                        <span className="font-semibold">{currentUser?.username ? currentUser.username : "User"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;