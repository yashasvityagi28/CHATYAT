/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../apicalls/users";
import {ShowLoader , HideLoader } from "../redux/loaderSlice";

function ProtectedRoute({ children }) {
    const [user, setUser] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getCurrentUser = async () => {
        try {
            dispatch(ShowLoader());
            const response = await GetCurrentUser();
            dispatch(HideLoader());
            if (response.success) {
                setUser(response.data);
            } else {
                toast.error(response.message);
                navigate("/");
            }
        } catch (error) {
            dispatch(HideLoader());
            toast.error(error.message);
            navigate("/");
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getCurrentUser();
        }else{
            navigate("/");
        }
    },[getCurrentUser, navigate] );

    return (
        <div>
            <h1>{user?.name}</h1>
            <h1>{user?.email}</h1>
            {children}
        </div>
    );
}

export default ProtectedRoute;