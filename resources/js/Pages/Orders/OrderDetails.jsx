import React, { useState } from "react";
import "./OrderDetails.css";
import { Head, Link, router } from "@inertiajs/react";
import { groupItems } from "../Common/common";

const OrderDetails = (props) => {
    const [order] = useState({
        id: props.order.id,
        remarks: props.order.remarks,
        total_qty: props.order.total_qty,
        created_at: props.order.created_at,
    });
    const [order_items] = useState(
        groupItems(
            props.order.order_items.map((i) => ({
                name: i.brand,
                style: i.style,
                size_id: i.size_id,
                size: i.size,
                qty: i.qty,
            }))
        )
    );
    const [contact] = useState(props.contact);

    return (
        <div className="order-details">
            <Head title={`${props.appName} | Order Details`} />
            {/* <!-- Navbar --> */}
            <nav className="navbar navbar-light sticky-top px-3 py-2">
                <div className="d-flex align-items-center w-100 position-relative">
                    <Link
                        href="/orders"
                        className="btn btn-link text-primary p-0 me-auto"
                    >
                        <i className="bi bi-chevron-left fs-5"></i>
                    </Link>
                    <span className="navbar-title mx-auto">
                        #ORD-{order.id.toString().padStart(4, 0)}
                    </span>
                    <div className="dropdown">
                        <button
                            className="btn btn-link text-primary p-0 ms-auto dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="bi bi-three-dots fs-5"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <Link
                                    className="dropdown-item"
                                    href={`/orders/${order.id}/edit`}
                                >
                                    Edit Order
                                </Link>
                            </li>
                            <li>
                                <a
                                    className="dropdown-item text-danger"
                                    href="#"
                                    onClick={() =>
                                        router.delete(`/orders/${order.id}`)
                                    }
                                >
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* <!-- Content --> */}
            <div className="container py-3">
                {/* <!-- Contact Info --> */}
                <div className="contact-box p-3 mb-3">
                    <div className="d-flex justify-content-between">
                        <div>
                            <div className="fw-semibold text-dark">
                                {contact.contact_person}
                            </div>
                            <div className="text-muted small">
                                {contact.shop_name},{" "}
                                {contact.address && `${contact.address}, `}
                                {contact.district && contact.zipcode
                                    ? `${contact.district} - ${contact.zipcode}, `
                                    : ""}
                                {contact.state}.
                            </div>
                        </div>
                        <div className="text-end">
                            <div className="fw-bold text-primary small">
                                #ORD{order.id.toString().padStart(4, 0)}
                            </div>
                            <div className="text-muted small">
                                {new Date(order.created_at).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Order Items Table --> */}
                <div className="table-responsive mb-3">
                    <table className="table table-bordered align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Item</th>
                                <th>Total</th>
                                <th className="text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {order_items.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="fw-semibold">
                                            {item[0].name}-{item[0].style}
                                        </div>
                                        <div className="text-muted small">
                                            {item.map(
                                                (innerItem, innerIndex) => (
                                                    <span
                                                        key={innerIndex}
                                                        className="me-2"
                                                    >
                                                        {innerItem.size}:{" "}
                                                        {innerItem.qty}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </td>
                                    <td className="fw-semibold text-success text-end">
                                        {item.reduce(
                                            (acc, curr) => acc + +curr.qty,
                                            0
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            title="View Details"
                                        >
                                            <i className="bi bi-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="table-light">
                            <tr className="table-primary fw-semibold">
                                <td className="text-start">Grand Total</td>
                                <td className="text-end">{order.total_qty}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

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
                        disabled
                        defaultValue={order.remarks}
                    ></textarea>
                </div>
            </div>

            {/* <!-- Floating Button --> */}
            <a href="#" className="btn btn-primary btn-floating">
                <i className="bi bi-plus"></i>
            </a>

        </div>
    );
};

export default OrderDetails;
