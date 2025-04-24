import React from "react";
import "./login.css";
import { Head, useForm } from "@inertiajs/react";

const Login = (props) => {
    const { post, data, setData, errors, processing } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        post("/login");
        // window.location.href = "/dashboard";
    };

    return (
        <div className="login">
            <Head title={`${props.appName} | Login`} />
            <div className="login-wrapper">
                <img
                    src="https://essa.in/cdn/shop/files/ESSA_LOGO_New_black-font_af80b8c9-e0de-4a0a-924c-dd0c9db3c862.png?v=1740131920&width=160"
                    alt="ESSA Logo"
                    className="logo"
                />

                <h4 className="login-heading">Welcome Back</h4>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className={`form-control ${
                                errors.email ? "is-invalid" : ""
                            } log-in`}
                            id="email"
                            placeholder="you@example.com"
                            required
                            value={data.email}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                        />
                        {errors.email && (
                            <div className="invalid-feedback">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className={`form-control ${
                                errors.password ? "is-invalid" : ""
                            } log-in`}
                            id="password"
                            required
                            value={data.password}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                }))
                            }
                        />
                        {errors.password && (
                            <div className="invalid-feedback">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={processing}
                        >
                            {processing ? (
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </div>
                </form>

                <div className="glass-tip mt-4 text-center px-3 py-2">
                    <small>
                        This portal is exclusively for
                        <strong> ESSA team members</strong>. Please use your
                        company credentials to sign in securely.
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Login;
