export const BASE_URL = import.meta?.env?.MODE === "production" ? "/api" : "http://localhost:3000/api/";
export const roles = {
    OWNER: 'owner',
    DEALER: 'dealer',
    CUSTOMER: 'customer'
};

export const rolesMatchToLabel = {
    owner: "Dealers",
    dealer: "Customers",
    customer: "Dashboard"
}