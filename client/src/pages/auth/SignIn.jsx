import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSignInMutation} from "../../redux/services/authApi.js";
import {resetError, signInFailure, signInStart, signInSuccess} from "../../redux/reducers/userSlice.js";

const SignInPage = () => {
    const [formData, setFormData] = useState({});
    const { loading , error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signIn, { isLoading }] = useSignInMutation();

    useEffect(() => {
        dispatch(resetError());
    }, []);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart);
            const data = await signIn(formData);
            if (data.error || data?.error?.data?.success === false) {
                dispatch(signInFailure(data?.error?.data?.message ?? "Failed to fetch"))
                return;
            }
            setFormData({});
            dispatch(signInSuccess(data.data));
            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    }
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder="username"
                    className="border p-3 rounded-lg"
                    id="username"
                />
                <input
                    onChange={handleChange}
                    type="password"
                    placeholder="password"
                    className="border p-3 rounded-lg"
                    id="password"
                />
                <button
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "Loading..." : "Sign in"}
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Dont have an account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-700">Sign up</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
    );
};

export default SignInPage;