import { useEffect, useState } from "react";
import "./AddVisit.css";
import ContactSelectionModal from "./ContactSelectionModal";
import { Head, Link, router, useForm } from "@inertiajs/react";
import {  compressImage2 } from "../Common/common";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AddVisit = (props) => {
    const [showContactModal, setShowContactModal] = useState(false);
    const [contact, setContact] = useState(null);
    const [contacts] = useState(props.contacts);
    const { data, setData, processing, post } = useForm({
        contact_id: "",
        reason: "",
        user_id: props.auth.user.id,
        remarks: "",
        visit_images: [],
    });
    const [images, setImages] = useState([]);
    const mySwal = withReactContent(Swal);

    const handleFileChange = async (e) => {
        const uploadedImages = Array.from(e.target.files);

        const compressed = await Promise.all(
            uploadedImages.map(async (img) => {
                const blob = await compressImage2(img);
                return {
                    blob,
                    previewUrl: URL.createObjectURL(blob),
                };
            })
        );

        setImages((prev) => [...prev, ...compressed]);
    };

    const handleRemove = (index) => {
        setImages((prev) => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[index].previewUrl); // Clean up memory
            updated.splice(index, 1);
            return updated;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/visits", {
            onSuccess: () => {
                mySwal
                    .fire({
                        icon: "success",
                        title: "Visit Logged Successfully",
                        text: "Your visit has been recorded.",
                        confirmButtonColor: "#198754",
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            router.get("/dashboard");
                        }
                    });
            },
            onError: (errors) => {
                mySwal.fire({
                    icon: "error",
                    title: (
                        <span style={{ color: "#dc3545" }}>
                            Validation Error
                        </span>
                    ),
                    html: errors ? (
                        <ul style={{ textAlign: "left", fontSize: "1rem" }}>
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>An unexpected error occurred.</p>
                    ),
                    confirmButtonColor: "#dc3545",
                    background: "#ffffff",
                    padding: "2rem",
                    customClass: {
                        popup: "rounded-4 shadow-sm",
                        title: "fw-bold",
                        htmlContainer: "text-muted",
                    },
                });
            },
        });
    };

    useEffect(() => {
        if (contact) {
            setData((prev) => ({
                ...prev,
                contact_id: contact.id,
            }));
        }

        setData((prev) => ({
            ...prev,
            visit_images: images.map((img) => img.blob),
        }));
    }, [contact, images]);

    return (
        <div className="add-visit">
            <Head title={`${props.appName} | Add Visit`} />
            {/* <!-- Navbar --> */}
            <nav className="navbar bg-white shadow-sm sticky-top px-3 py-2">
                <div className="d-flex align-items-center w-100 position-relative">
                    <Link
                        href="/dashboard"
                        className="btn btn-link text-primary p-0 me-auto"
                    >
                        <i className="bi bi-chevron-left fs-5"></i>
                    </Link>
                    <span className="navbar-title">New Visit</span>
                    <button
                        className="btn btn-link text-primary p-0 ms-auto"
                        title="Select Contact"
                        onClick={() => setShowContactModal(true)}
                    >
                        <i className="bi bi-person-lines-fill fs-5"></i>
                    </button>
                </div>
            </nav>

            {/* <!-- Page Content --> */}
            <div className="container py-3">
                <div className="card p-3 mb-3">
                    <form id="visitForm" noValidate onSubmit={handleSubmit}>
                        {/* <!-- Select Contact --> */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                Contact
                            </label>
                            <div
                                id="selectedContact"
                                className={`${contact ? "" : "text-muted"}`}
                            >
                                {contact
                                    ? contact.contact_person
                                    : "No contact selected"}
                            </div>
                        </div>

                        {/* <!-- Reason for Visit --> */}
                        <div className="mb-3">
                            <label
                                htmlFor="visitReason"
                                className="form-label fw-semibold"
                            >
                                Reason for Visit
                            </label>
                            <select
                                className="form-select"
                                id="visitReason"
                                required
                                value={data.reason}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        reason: e.target.value,
                                    }))
                                }
                            >
                                <option value="" disabled>
                                    Select reason
                                </option>
                                <option value="Product Showcasing">
                                    Product Showcasing
                                </option>
                                <option value="Payment Inquiry">
                                    Payment Inquiry
                                </option>
                                <option value="Order Taking">
                                    Order Taking
                                </option>
                                <option value="Feedback Collection">
                                    Feedback Collection
                                </option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="invalid-feedback">
                                Please select a reason.
                            </div>
                        </div>

                        {/* <!-- Take Photo --> */}
                        <div className="mb-3">
                            <label
                                htmlFor="photoInput"
                                className="form-label fw-semibold"
                            >
                                Take Photos of Shop
                            </label>
                            <input
                                className="form-control"
                                type="file"
                                id="photoInput"
                                accept="image/*"
                                capture="environment"
                                multiple
                                onChange={handleFileChange}
                            />
                            <div
                                id="previewContainer"
                                className="d-flex flex-wrap gap-2 mt-2"
                            >
                                {images.length > 0 &&
                                    images.map((img, index) => (
                                        <div
                                            key={index}
                                            className="position-relative d-flex flex-column align-items-center"
                                            style={{ width: "120px" }}
                                        >
                                            <img
                                                src={img.previewUrl}
                                                alt={`preview-${index}`}
                                                style={{
                                                    width: "100%",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                    border: "1px solid #dee2e6",
                                                    marginBottom: "4px",
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger"
                                                style={{ fontSize: "0.75rem" }}
                                                onClick={() =>
                                                    handleRemove(index)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* <!-- Remarks --> */}
                        <div className="mb-3">
                            <label
                                htmlFor="visitRemarks"
                                className="form-label fw-semibold"
                            >
                                Remarks
                            </label>
                            <textarea
                                className="form-control"
                                id="visitRemarks"
                                rows="3"
                                placeholder="Add any relevant notes..."
                                value={data.remarks}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        remarks: e.target.value,
                                    }))
                                }
                            ></textarea>
                        </div>

                        {/* <!-- Submit Button --> */}
                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-success fw-semibold"
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
                                        <i className="bi bi-check-circle me-1"></i>{" "}
                                        Submit Visit
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <ContactSelectionModal
                    show={showContactModal}
                    onClose={() => setShowContactModal(false)}
                    contacts={contacts}
                    setContact={setContact}
                />
            </div>
        </div>
    );
};

export default AddVisit;
