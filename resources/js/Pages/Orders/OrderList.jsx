import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import "./OrderList.css";
import { v6 as uuid } from "uuid";
import { formatDate } from "../Common/common";
import OrderFilter from "./OrderFilter";
import { format } from "date-fns";

const OrderList = (props) => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [duration, setDuration] = useState({
        fromDate: format(new Date(), "yyyy-MM-dd"),
        toDate: format(new Date(), "yyyy-MM-dd"),
    });

    const searchOrders = () => {
        const search = filterText.trim().toLowerCase(); // Clean up spaces and make lowercase
        if (search) {
            const filteredOrders = orders.filter(
                (order) =>
                    order.id.toString().includes(search) ||
                    order.contact_person?.toLowerCase().includes(search)
            );
            setFilteredOrders(filteredOrders);
        }
    };

    const fetchOrdersForTheDuration = () => {
        router.get(
            "/orders",
            {
                from_date: duration.fromDate,
                to_date: duration.toDate,
            },
            {
                preserveScroll: true,
                preserveState: true,
                only: ["orders"],
            }
        );
        setShowFilter(false);
    };

    useEffect(() => {
        if (!filterText && orders.length > 0) {
            setFilteredOrders(orders);
        }
    }, [filterText]);

    useEffect(() => {
        if (props.orders) {
            setOrders(props.orders);
            setFilteredOrders(props.orders);
        }
    }, [props]);

    return (
        <div className="order-list">
            <Head title={`${props.appName} | Order List`} />
            {/* <!-- Navbar --> */}
            <nav className="navbar navbar-light px-3 py-2">
                <div className="d-flex align-items-center w-100 position-relative">
                    <Link
                        href="/dashboard"
                        className="btn btn-link text-primary p-0 me-auto"
                    >
                        <i className="bi bi-chevron-left fs-5"></i>
                    </Link>
                    <span className="navbar-title">My Orders</span>
                    <button
                        className="btn btn-link text-primary p-0 ms-auto"
                        onClick={() => setShowFilter(true)}
                    >
                        <i className="bi bi-funnel"></i>
                    </button>
                </div>
            </nav>

            {/* <!-- Search --> */}
            <div className="container pt-3">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search by Order # or Name"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={searchOrders}
                    >
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>

            {/* <!-- Order List --> */}
            <div className="container pb-3">
                {filteredOrders.map((order) => (
                    <div
                        key={uuid()}
                        className="order-card"
                        onClick={() => router.get(`/orders/${order.id}`)}
                    >
                        <div className="d-flex justify-content-between">
                            <div>
                                <div className="order-number">
                                    Order #ORD-
                                    {order.id.toString().padStart(5, 0)}
                                </div>
                                <div className="order-meta">
                                    Customer:{" "}
                                    <strong>{order.contact_person}</strong>
                                </div>
                                <div className="order-meta">
                                    City: {order.district}
                                </div>
                                <div className="order-meta">
                                    State: {order.state}
                                </div>
                                <div className="order-meta">
                                    Date: {formatDate(order.created_at)}
                                </div>
                                <div className="order-meta">
                                    Total Quantity:{" "}
                                    <strong>{order.total_qty}</strong>
                                </div>
                            </div>
                            <div>
                                <span className="item-badge">
                                    {order.count}{" "}
                                    {order.count > 1 ? "items" : "item"}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                <div
                    className={`list-container ${
                        filteredOrders.length > 0 ? "d-none" : "d-flex"
                    } justify-content-center align-items-center`}
                >
                    <p className="text-body-secondary">No results</p>
                </div>
            </div>

            {/* Duration filter modal */}
            <OrderFilter
                show={showFilter}
                handleClose={() => setShowFilter(false)}
                duration={duration}
                setDuration={setDuration}
                fetchOrders={fetchOrdersForTheDuration}
            />
        </div>
    );
};

export default OrderList;
