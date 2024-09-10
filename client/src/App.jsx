import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthorizedRoute from "./components/AuthorizedRoute.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import {roles} from "./constants/index.js";
import SignInPage from "./pages/auth/SignIn.jsx";
import SignUpPage from "./pages/auth/SignUp.jsx";
import UpdateDealerPage from "./pages/owner/UpdateDealerPage.jsx";
import {Toaster} from "react-hot-toast";
import CreateDealerPage from "./pages/owner/CreateDealerPage.jsx";
import CreateCustomerPage from "./pages/dealer/CreateCustomerPage.jsx";
import UpdateCustomerPage from "./pages/dealer/UpdateCustomerPage.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/sign-in" element={<SignInPage/>}/>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="/" element={<AuthorizedRoute/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route path={`/create/${roles.OWNER}`} element={<CreateDealerPage/>}/>
                    </Route>
                    <Route element={<PrivateRoute/>}>
                        <Route path={`/update/${roles.OWNER}/:id`} element={<UpdateDealerPage/>}/>
                    </Route>
                    <Route element={<PrivateRoute/>}>
                        <Route path={`/create/${roles.DEALER}`} element={<CreateCustomerPage/>}/>
                    </Route>
                    <Route element={<PrivateRoute/>}>
                        <Route path={`/update/${roles.DEALER}/:id`} element={<UpdateCustomerPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster />
        </>
    )
}

export default App
