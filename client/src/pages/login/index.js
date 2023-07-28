import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';
import { toast } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { ShowLoader, HideLoader } from "../../redux/loaderSlice";
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const login = async () => {
        try {
            dispatch(ShowLoader());
            const response = await LoginUser(user);
            dispatch(HideLoader());
            if (response.success) {
                toast.success(response.message);
                localStorage.setItem("token", response.data);
                window.location.href = "/home";
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoader());
            toast.error(error.message);
        }
    };



    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/home");
        }
    }, [navigate]);




    return (
        <div className="h-screen bg-scroll bg-my_bg_image flex items-center justify-center">
            <div className="bg-white shadow-md p-5 flex flex-col gap-5 w-96">
                <h1 className='text-2xl uppercase font-semibold text-primary'>
                    CHATYAT Login{""}
                    </h1>
                <hr />
                <input type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder='Enter Registered Email Address'
                />
                <input type="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder='Enter Password'
                />

                <button
                    className='contained-btn'
                    onClick={login}>
                    Login

                </button>
                <Link to="/register" className='underline'>
                    Don't have an account? Register.
                </Link>
            </div>
        </div>
    )
}
export default Login