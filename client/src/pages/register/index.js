import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from "../../apicalls/users";
import { toast } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import {ShowLoader, HideLoader } from "../../redux/loaderSlice";
function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = React.useState({
        name: '',
        email: '',
        password: '',
    });
    const register = async () => {
        try {
            dispatch(ShowLoader());
            const response = await RegisterUser(user);
            dispatch(HideLoader());
            if (response.success) {
                toast.success(response.message);
            }
            else {
                toast.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoader());
            toast.error(error.message);
        }
    };



    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate("/home");
        }
    }, [navigate]);






    return (
        <div className="h-screen bg-scroll bg-my_bg_image flex items-center justify-center">
            <div className="bg-white shadow-md p-5 flex flex-col gap-5 w-96">
                <h1 className='text-2xl uppercase font-semibold text-primary'>CHATYAT Register</h1>
                <hr />
                <input type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder='Enter Your Name'
                />
                <input type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder='Enter Email Address'
                />
                <input type="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder='Set Password'
                />

                <button
                    className='contained-btn'
                    onClick={register}>
                    Register

                </button>
                <Link to="/" className='underline'>
                    Already have an account? Login
                </Link>
            </div>
        </div>
    )
}
export default Register