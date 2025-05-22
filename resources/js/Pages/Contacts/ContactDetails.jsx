import React, { useEffect, useState } from "react";
import "./ContactDetails.css";
import { Head, Link } from "@inertiajs/react";
import SuccessModal from "../Components/SuccessModal";

const ContactDetails = (props) => {
    const [contact, setContact] = useState({
        id: "",
        shop_name: "",
        contact_person: "",
        state: "",
        phone: "",
    });
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (props.message) {
            if (props.message.includes("success")) {
                setShowSuccess(true);
            }
        }
        if (props.contact) {
            setContact(props.contact);
        }
    }, [props]);

    return (
        <div className="contact-details">
            <Head title={`${props.appName} | Contact Details`} />
            {/* <!-- iOS-style Navbar (Contact Details Page) --> */}
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
                    <span className="navbar-title">Contact Details</span>

                    <Link
                        href={`/contacts/${contact.id}/edit?from=contacts`}
                        className="btn btn-link text-decoration-none p-0"
                    >
                        <i className="bi bi-pencil-square fs-5"></i>
                    </Link>
                </div>
            </nav>

            {/* <!-- Content --> */}
            <div className="container py-3">
                <div className="list-group rounded shadow-sm">
                    <div className="list-group-item">
                        <span className="list-label">Shop Name</span>
                        <span className="list-value">{contact.shop_name}</span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">Contact Person</span>
                        <span className="list-value">
                            {contact.contact_person}
                        </span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">Address</span>
                        <span className="list-value">{contact.address}</span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">City</span>
                        <span className="list-value">{contact.city}</span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">District</span>
                        <span className="list-value">{contact.district}</span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">Zipcode</span>
                        <span className="list-value">{contact.zipcode}</span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">State</span>
                        <span className="list-value">{contact.state}</span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">Phone</span>
                        <span className="list-value">+91 {contact.phone}</span>
                    </div>

                    <div className="list-group-item">
                        <span className="list-label">Email</span>
                        <span className="list-value">{contact.email}</span>
                    </div>
                </div>
            </div>
            <SuccessModal
                show={showSuccess}
                onClose={() => setShowSuccess(false)}
                message={props.message}
            />
        </div>
    );
};

export default ContactDetails;
