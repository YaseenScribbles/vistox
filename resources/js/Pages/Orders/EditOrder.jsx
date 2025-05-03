import { Link, useForm, router, Head } from "@inertiajs/react";
import React, { useEffect, useReducer, useState } from "react";
import "./AddOrder.css";
import ItemSelectionModal from "../Components/ItemSelectionModal";
import ContactSelectionModal from "../Components/ContactSelectionModal";
import { v6 as uuid } from "uuid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { groupItems } from "../Common/common";

const EditOrder = (props) => {
    const [showItems, setShowItems] = useState(false);
    const [showContacts, setShowContacts] = useState(false);
    const [contacts] = useState(props.contacts);
    const { data, setData, processing, put } = useForm({
        contact_id: "",
        remarks: props.order.remarks,
        total_qty: 0,
        user_id: props.auth.user.id,
        order_items: [],
    });
    const [contact, setContact] = useState(props.contact);
    const [editIndex, setEditIndex] = useState(-1);
    const initialState = groupItems(
        props.order.order_items.map((i) => ({
            name: i.brand,
            style: i.style,
            size_id: i.size_id,
            size: i.size,
            qty: i.qty,
        }))
    );
    const mySwal = withReactContent(Swal);

    const reducer = (state, action) => {
        switch (action.type) {
            case "add":
                return [...state, action.payload];
            case "update":
                const newState = [...state]; // copy the old state
                newState[action.payload.index] = action.payload.data; // update the right entry
                return newState; // return new state
            case "clear":
                return [];
            default:
                return state;
        }
    };
    const [order_items, dispatch] = useReducer(reducer, initialState);

    const onAdd = (data) => {
        let index =
            editIndex != -1
                ? editIndex
                : order_items.findIndex((arr) =>
                      arr.some(
                          (i) =>
                              i.name == data[0].name && i.style == data[0].style
                      )
                  );

        if (index !== -1) {
            dispatch({
                type: "update",
                payload: {
                    index: index,
                    data: data,
                },
            });
        } else {
            dispatch({
                type: "add",
                payload: data,
            });
        }

        setShowItems(false);
    };

    const handleSubmit = () => {
        put("/orders/" + props.order.id, {
            onSuccess: (page) => {
                mySwal
                    .fire({
                        icon: "success",
                        title: (
                            <span style={{ fontSize: "1.25rem" }}>
                                Order Updated Successfully
                            </span>
                        ),
                        html: (
                            <div style={{ fontSize: "1rem" }}>
                                Your order{" "}
                                <strong style={{ color: "#0d6efd" }}>
                                    #
                                    {page.props.message
                                        .toString()
                                        .padStart(4, 0)}
                                </strong>{" "}
                                has been saved.
                                <br />
                                <br />
                                What would you like to do next?
                            </div>
                        ),
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: "New Order",
                        cancelButtonText: "View Order",
                        confirmButtonColor: "#0d6efd",
                        cancelButtonColor: "#28a745",
                        reverseButtons: true,
                        background: "#ffffff",
                        padding: "2rem",
                        customClass: {
                            popup: "rounded-4 shadow-sm",
                            title: "fw-bold",
                            htmlContainer: "text-muted",
                        },
                        backdrop: "rgba(0,0,0,0.2)",
                    })
                    .then((result) => {
                        setData({
                            contact_id: "",
                            remarks: "",
                            total_qty: 0,
                            user_id: props.auth.user.id,
                            order_items: [],
                        });
                        dispatch({
                            type: "clear",
                        });
                        if (result.isConfirmed) {
                            router.visit("/orders/create");
                        } else {
                            router.visit(`/orders/${page.props.message}`);
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
                    html: (
                        <ul style={{ textAlign: "left", fontSize: "1rem" }}>
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
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

        if (order_items.length > 0) {
            let total_qty = order_items
                .flatMap((i) =>
                    Array.isArray(i)
                        ? i.map((q) => (q?.qty ? Number(q.qty) : 0))
                        : []
                )
                .reduce((acc, curr) => acc + curr, 0);

            let items = order_items
                .flat()
                .filter((e) => !isNaN(e.qty) && e.qty)
                .map((e) => ({
                    size_id: e.size_id,
                    qty: e.qty,
                    brand: e.name,
                    style: e.style,
                    size: e.size,
                }));

            setData((prev) => ({
                ...prev,
                total_qty,
                order_items: items,
            }));
        }
    }, [contact, order_items]);

    return (
        <div className="edit-order">
            <Head title={`${props.appName} | Edit Order`} />
            <nav className="navbar navbar-light sticky-top px-3 py-2">
                <div className="d-flex align-items-center w-100 position-relative">
                    <Link
                        href="/dashboard"
                        className="btn btn-link text-primary p-0 me-auto"
                    >
                        <i className="bi bi-chevron-left fs-5"></i>
                    </Link>
                    <span className="navbar-title add-order">
                        Edit Order
                    </span>
                    <button
                        className="btn btn-link text-primary p-0 ms-auto"
                        onClick={() => setShowContacts(true)}
                    >
                        <i className="bi bi-person-lines-fill fs-5"></i>
                    </button>
                </div>
            </nav>

            {/* <!-- Main Content --> */}
            <main className="container py-3">
                {/* <!-- Contact Info --> */}
                <section className="contact-box p-3 mb-3">
                    <div className="d-flex justify-content-between">
                        <div>
                            <div className="fw-semibold text-dark">
                                {contact
                                    ? contact.contact_person
                                    : "Select Contact"}
                            </div>
                            <div className="text-muted small">
                                {contact ? (
                                    <>
                                        {contact.shop_name},{" "}
                                        {contact.address &&
                                            `${contact.address}, `}
                                        {contact.district && contact.zipcode
                                            ? ` ${contact.district} - ${contact.zipcode}, `
                                            : ""}
                                        {contact.state}.
                                    </>
                                ) : (
                                    "Tap the button in the top right to select a contact."
                                )}
                            </div>
                        </div>
                        <div className="text-end">
                            <div className="fw-bold text-primary small">
                                #ORD{props.order.id.toString().padStart(4, 0)}
                            </div>
                            <div className="text-muted small">
                                {new Date().toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- Order Table --> */}
                <section className="table-responsive mb-3">
                    <table className="table table-bordered align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Item</th>
                                <th>Total</th>
                                <th className="text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {order_items.length > 0 &&
                                order_items.map((item, index) => (
                                    <tr key={uuid()}>
                                        <td>
                                            <div className="fw-semibold">
                                                {item[0].name}-{item[0].style}
                                            </div>
                                            <div className="text-muted small">
                                                {item.map((i) => {
                                                    if (+i.qty <= 0)
                                                        return null;

                                                    return (
                                                        <span
                                                            key={uuid()}
                                                            className="me-2"
                                                        >
                                                            {i.size}: {i.qty}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </td>
                                        <td className="fw-semibold text-success text-end">
                                            {item.reduce(
                                                (acc, curr) => +curr.qty + acc,
                                                0
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                title="Edit"
                                                onClick={() => {
                                                    setEditIndex(index);
                                                    setShowItems(true);
                                                }}
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                        <tfoot className="table-light">
                            <tr className="table-primary fw-semibold">
                                <td className="text-start">Grand Total</td>
                                <td className="text-end">
                                    {order_items.length > 0 &&
                                        data.total_qty.toString()}
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </section>

                {/* <!-- Remarks --> */}
                <div className="mb-3">
                    <label htmlFor="remarks" className="form-label fw-semibold">
                        Remarks
                    </label>
                    <textarea
                        className="form-control"
                        id="remarks"
                        rows="2"
                        placeholder="Any special instructions..."
                        value={data.remarks ?? ""}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                remarks: e.target.value,
                            }))
                        }
                    ></textarea>
                </div>

                {/* <!-- Submit --> */}
                <div className="d-grid mb-5">
                    <button
                        className="btn btn-success fw-semibold"
                        id="submitOrderBtn"
                        onClick={handleSubmit}
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
                                Submit Order
                            </>
                        )}
                    </button>
                </div>
            </main>

            {/* <!-- Floating Button --> */}
            <a
                href="#"
                className="btn btn-primary btn-floating"
                title="Add Item"
                onClick={() => setShowItems(true)}
            >
                <i className="bi bi-plus"></i>
            </a>

            <ItemSelectionModal
                show={showItems}
                onClose={() => setShowItems(false)}
                onAdd={onAdd}
                ParentSizeDetail={order_items}
                editIndex={editIndex}
                setEditIndex={setEditIndex}
            />
            <ContactSelectionModal
                show={showContacts}
                onClose={() => setShowContacts(false)}
                contacts={contacts}
                setContact={setContact}
            />
        </div>
    );
};

export default EditOrder;
