import {roles} from "../../client/src/constants/index.js";

// Admin can access dealers, Dealers can access customers
export const getAccessRole = (role = roles.CUSTOMER) => {
    switch (role) {
        case roles.OWNER:
            return roles.DEALER;

        case roles.DEALER:
            return roles.CUSTOMER;

        case roles.CUSTOMER:
            return null;

        default:
            return null;
    }
}