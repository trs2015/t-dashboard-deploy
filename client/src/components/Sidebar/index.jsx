import React from 'react';

import {
    LogOut,
    Menu,
    SlidersHorizontal,
    User,
    Users,
    Notebook
} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {
    signInFailure,
    signOutFailure,
    signOutStart, signOutSuccess
} from "../../redux/reducers/userSlice.js";
import {useSignOutMutation} from "../../redux/services/authApi.js";
import {rolesMatchToLabel} from "../../constants/index.js";
import {setIsSidebarCollapsed} from "../../redux/reducers/globalSlice.js";

const SidebarLink = ({
 href,
 icon: Icon,
 label,
 isCollapsed,
 isActive = false
}) => {
    return (
        <Link to={href}>
            <div
                className={`${isCollapsed ? "justify-center py-4 " : "justify-start px-8 py-4 "}${isActive ? "bg-blue-200 text-white " : ""}cursor-pointer flex items-center hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors`}
            >
                <Icon className="w-6 h-6 !text-gray-700"/>
                <span
                    className={`${
                        isCollapsed ? "hidden" : "block"
                    } font-medium text-gray-700`}
                >
                  {label}
                </span>
            </div>
        </Link>
    );
};

const Sidebar = () => {
    const dispatch = useDispatch();
    const isSidebarCollapsed = useSelector(
        (state) => state.global.isSidebarCollapsed
    );
    const {role} = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    };

    const [signOut] = useSignOutMutation();

    const handleSignOut = async () => {
        const shouldSignOut = confirm('Are you sure?');
        if (!shouldSignOut) return;
        try {
            dispatch(signOutStart);
            const data = await signOut();
            if (data.error || data.success === false) {
                dispatch(signOutFailure(data?.message ?? "Failed to fetch"))
                return;
            }
            dispatch(signOutSuccess());
            navigate('/sign-in');
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    }

    const sidebarClassNames = `fixed flex flex-col ${
        isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
    } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

    return (
        <div className={sidebarClassNames}>
            {/* TOP LOGO */}
            <div
                className={`flex gap-3 justify-between items-center pt-8 ${
                    isSidebarCollapsed ? "px-5" : "px-8"
                }`}
            >
                <h1
                    className={`${
                        isSidebarCollapsed ? "hidden" : "block"
                    } font-extrabold text-md`}
                >
                    T-DASHBOARD
                </h1>
                <button
                    className={`${
                        isSidebarCollapsed ? "hidden " : "block "
                    }px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100`}
                    onClick={toggleSidebar}
                >
                    <Menu className="w-4 h-4"/>
                </button>
            </div>

            {/* LINKS */}
            <div className="flex flex-col flex-grow">
                <div className="flex-grow mt-8">
                    <SidebarLink
                        href="/"
                        icon={User}
                        label={rolesMatchToLabel[role]}
                        isCollapsed={isSidebarCollapsed}
                        isActive={true}
                    />
                    <SidebarLink
                        href="/"
                        icon={SlidersHorizontal}
                        label="Settings"
                        isCollapsed={isSidebarCollapsed}
                    />
                    <SidebarLink
                        href="/"
                        icon={Users}
                        label="Users"
                        isCollapsed={isSidebarCollapsed}
                    />
                    <SidebarLink
                        href="/"
                        icon={Notebook}
                        label="Plans"
                        isCollapsed={isSidebarCollapsed}
                    />
                </div>
                <div className="mt-auto" onClick={handleSignOut}>
                    <SidebarLink
                        href="/"
                        icon={LogOut}
                        label="Sign Out"
                        isCollapsed={isSidebarCollapsed}
                    />
                </div>

                {/* FOOTER */}
                <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10 py-4 px-8`}>
                    <p className="text-xs text-gray-500">&copy; 2024 T-dashboard</p>
                </div>
            </div>

        </div>
    );
};

export default Sidebar;