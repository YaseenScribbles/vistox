import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
import "./AddContact.css";
import { states } from "../Common/common";
import { v6 as uuid } from "uuid";

const EditContact = (props) => {
    const { data, setData, processing, put, errors } = useForm({
        id: props.contact.id,
        contact_person: props.contact.contact_person,
        shop_name: props.contact.shop_name,
        address: props.contact.address,
        city: props.contact.city,
        zipcode: props.contact.zipcode,
        district: props.contact.district,
        state: props.contact.state,
        phone: props.contact.phone,
        email: props.contact.email,
        user_id: props.auth.user.id,
    });

    const handleChange = (key, value) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/contacts/${data.id}`, {
            onSuccess: () => {
                setData({
                    id: "",
                    contact_person: "",
                    shop_name: "",
                    address: "",
                    city: "",
                    zipcode: "",
                    district: "",
                    state: "",
                    phone: "",
                    email: "",
                    user_id: "",
                });
            },
        });
    };

    // useEffect(() => {
    //     if (props.contact) {
    //         setData({
    //             id: props.contact.id,
    //             contact_person: props.contact.contact_person,
    //             shop_name: props.contact.shop_name,
    //             address: props.contact.address,
    //             city: props.contact.city,
    //             zipcode: props.contact.zipcode,
    //             district: props.contact.district,
    //             state: props.contact.state,
    //             phone: props.contact.phone,
    //             email: props.contact.email,
    //         });
    //     }
    // }, [props]);

    return (
        <div className="edit-contact">
            <Head title={`${props.appName} | Edit Contact`} />
            {/* <!-- iOS-style Navbar (Add User Page) --> */}
            <nav className="navbar navbar-light navbar-ios sticky-top px-2">
                <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
                    {/* <!-- Left Back Button --> */}
                    <Link
                        href="/contacts"
                        className="btn btn-link text-decoration-none p-0"
                    >
                        <i className="bi bi-chevron-left fs-5 text-primary"></i>
                    </Link>

                    {/* <!-- Center Title --> */}
                    <span className="navbar-title">Edit Contact</span>

                    {/* <!-- Right Save Button --> */}
                    {/* <button
                        className="btn btn-link text-decoration-none p-0"
                        type="submit"
                        form="addContactForm"
                    >
                        <i className="bi bi-check2 text-primary fs-5"></i>
                    </button> */}
                </div>
            </nav>

            {/* <!-- Form Section --> */}
            <div className="container py-2">
                <div className="form-section">
                    <form id="addContactForm" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label
                                htmlFor="contactPerson"
                                className="form-label"
                            >
                                Contact Person
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    errors.contact_person ? "is-invalid" : ""
                                }`}
                                id="contactPerson"
                                placeholder="Enter contact person name"
                                value={data.contact_person}
                                onChange={(e) =>
                                    handleChange(
                                        "contact_person",
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />
                            <div className="invalid-feedback">
                                {errors.contact_person && errors.contact_person}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="shopName" className="form-label">
                                Shop Name
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    errors.shop_name ? "is-invalid" : ""
                                }`}
                                id="shopName"
                                placeholder="Enter shop name"
                                value={data.shop_name}
                                onChange={(e) =>
                                    handleChange(
                                        "shop_name",
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />
                            <div className="invalid-feedback">
                                {errors.shop_name && errors.shop_name}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                Address
                            </label>
                            <textarea
                                className={`form-control ${
                                    errors.address ? "is-invalid" : ""
                                }`}
                                id="address"
                                rows="2"
                                placeholder="Enter address"
                                value={data.address ?? ""}
                                onChange={(e) =>
                                    handleChange(
                                        "address",
                                        e.target.value.toUpperCase()
                                    )
                                }
                            ></textarea>
                            <div className="invalid-feedback">
                                {errors.address && errors.address}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">
                                City
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    errors.city ? "is-invalid" : ""
                                }`}
                                id="city"
                                placeholder="Enter city"
                                value={data.city ?? ""}
                                onChange={(e) =>
                                    handleChange(
                                        "city",
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />
                            <div className="invalid-feedback">
                                {errors.city && errors.city}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="zipcode" className="form-label">
                                Zipcode
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    errors.zipcode ? "is-invalid" : ""
                                }`}
                                id="zipcode"
                                placeholder="Enter zipcode"
                                value={data.zipcode ?? ""}
                                onChange={(e) =>
                                    handleChange("zipcode", e.target.value)
                                }
                            />
                            <div className="invalid-feedback">
                                {errors.zipcode && errors.zipcode}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="district" className="form-label">
                                District
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    errors.district ? "is-invalid" : ""
                                }`}
                                id="district"
                                placeholder="Enter district"
                                value={data.district ?? ""}
                                onChange={(e) =>
                                    handleChange(
                                        "district",
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />
                            <div className="invalid-feedback">
                                {errors.district && errors.district}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">State</label>
                            <select
                                className={`form-select ${
                                    errors.state ? "is-invalid" : ""
                                }`}
                                value={data.state}
                                onChange={(e) =>
                                    handleChange("state", e.target.value)
                                }
                                disabled={props.auth.user.role === "representative"}
                            >
                                <option value="" disabled>
                                    Select state
                                </option>
                                {states.map((state) => (
                                    <option key={uuid()} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                            {errors.state && (
                                <div className="invalid-feedback">
                                    {errors.state}
                                </div>
                            )}
                        </div>

                        {/* <div className="mb-3">
                            <label htmlFor="state" className="form-label">
                                State
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    errors.state ? "is-invalid" : ""
                                }`}
                                id="state"
                                placeholder="Enter state"
                                value={data.state ?? ""}
                                onChange={(e) =>
                                    handleChange(
                                        "state",
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />
                            <div className="invalid-feedback">
                                {errors.state && errors.state}
                            </div>
                        </div> */}

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                                Phone
                            </label>
                            <input
                                type="text"
                                className={`form-control ${
                                    errors.phone ? "is-invalid" : ""
                                }`}
                                id="phone"
                                placeholder="Enter phone number"
                                value={data.phone ?? ""}
                                onChange={(e) =>
                                    handleChange("phone", e.target.value)
                                }
                            />
                            <div className="invalid-feedback">
                                {errors.phone && errors.phone}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className={`form-control ${
                                    errors.email ? "is-invalid" : ""
                                }`}
                                id="email"
                                placeholder="Enter email"
                                value={data.email ?? ""}
                                onChange={(e) =>
                                    handleChange(
                                        "email",
                                        e.target.value.toLowerCase()
                                    )
                                }
                            />
                            <div className="invalid-feedback">
                                {errors.email && errors.email}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={processing}
                        >
                            {processing ? (
                                <div
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            ) : (
                                <>
                                    <i className="bi bi-save me-1"></i> Update
                                    Contact
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditContact;
