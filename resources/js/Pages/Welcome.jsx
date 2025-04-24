import React, { useEffect } from "react";
import "./welcome.css";
import { Head, router } from "@inertiajs/react";

const Welcome = (props) => {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // window.location.href = "login";
            router.get("/login");
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="welcome">
            <Head title={`${props.appName} | Welcome`} />
            <img
                src="https://essa.in/cdn/shop/files/ESSA_LOGO_New_black-font_af80b8c9-e0de-4a0a-924c-dd0c9db3c862.png?v=1740131920&width=160"
                alt="ESSA Logo"
                className="splash-logo"
            />
            <figure className="text-center">
                <blockquote className="blockquote">
                    <p>Vistox</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                    Sales Manager Companion
                </figcaption>
            </figure>
            <div className="loading-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    );
};

export default Welcome;
