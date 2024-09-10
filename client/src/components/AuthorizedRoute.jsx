import React from 'react';
import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";
import OwnerPage from "../pages/owner/OwnerPage.jsx";
import {roles} from "../constants";
import DealerPage from "../pages/dealer/DealerPage.jsx";
import DashboardPage from "../pages/dashboard/DashboardPage.jsx";

const AuthorizedRoute = () => {
    const { currentUser } = useSelector((state) => state.user);

    switch (currentUser?.role) {
        case roles.OWNER:
            return currentUser ? <OwnerPage/> : <Navigate to="/sign-in" />;

        case roles.DEALER:
            return currentUser ? <DealerPage/> : <Navigate to="/sign-in" />;

        case roles.CUSTOMER:
            return currentUser ? <DashboardPage /> : <Navigate to="/sign-in" />;

        default:
            return <Navigate to="/sign-in" />;
    }
};

export default AuthorizedRoute;