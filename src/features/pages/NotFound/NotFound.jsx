import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="mt-[100px] text-center">
            <h1 className="text-[2em] font-bold">404</h1>

            <h2 className="text-[1.5em] font-bold">Page Not Found</h2>

            <p className="text-[1.0em]">
                The page you are looking for does not exist.
            </p>

            <button
                onClick={() => navigate("/")}
                className="cursor-pointer border-none bg-[#1F4D3A] p-2.5 text-white outline-none rounded-md mt-5"
            >
                Go to Home
            </button>
        </div>
    );
}

export default NotFound;