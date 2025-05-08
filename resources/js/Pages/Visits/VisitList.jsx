import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import "./VisitList.css";
import { v6 as uuid } from "uuid";
import { format } from "date-fns";
import VisitFilter from "./VisitFilter";

const VisitList = (props) => {
    const [visits, setVisits] = useState([]);
    const [filteredVisits, setFilteredVisits] = useState([]);
    const [showDurationFilter, setShowDurationFilter] = useState(false);
    const [duration, setDuration] = useState(() => {
        //const startOfMonth = new Date(); //Get current date
        //startOfMonth.setDate(1); //set Day 1 of the month
        //startOfMonth.setHours(0, 0, 0, 0); //set start of the day, this is not required in this case
        return {
            from_date: format(new Date(), "yyyy-MM-dd"),
            to_date: format(new Date(), "yyyy-MM-dd"),
        };
    });
    const [filterText, setFilterText] = useState("");

    const fetchVisits = () => {
        router.get(
            "/visits",
            {
                ...duration,
            },
            {
                preserveScroll: true,
                preserveState: true,
                only: ["visits"],
            }
        );
        setShowDurationFilter(false);
    };

    const getReason = (reason) => {
        if (/Show/i.test(reason)) {
            return "Product Showcased";
        } else if (/Payment/i.test(reason)) {
            return "Payment Inquired";
        } else if (/Order/i.test(reason)) {
            return "Order Taken";
        } else if (/Feedback/i.test(reason)) {
            return "Feedback Collected";
        } else {
            return "Other";
        }
    };

    const getColor = (reason) => {
        if (/Show/i.test(reason)) {
            return "info";
        } else if (/Payment/i.test(reason)) {
            return "secondary";
        } else if (/Order/i.test(reason)) {
            return "success";
        } else if (/Feedback/i.test(reason)) {
            return "primary";
        } else {
            return "warning";
        }
    };

    const searchVisits = () => {
        if (filterText) {
            const lowerCasedFilterText = filterText.toLowerCase();
            const filteredVisits = visits.filter(
                (visit) =>
                    visit.contact_person
                        .toLowerCase()
                        .includes(lowerCasedFilterText) ||
                    visit.district
                        ?.toLowerCase()
                        .includes(lowerCasedFilterText) ||
                    visit.remarks?.toLowerCase().includes(lowerCasedFilterText)
            );
            setFilteredVisits(filteredVisits);
        }
    };

    useEffect(() => {
        if (props.visits) {
            setVisits(props.visits);
            setFilteredVisits(props.visits);
        }
    }, [props]);

    useEffect(() => {
        if (!filterText && visits.length > 0) {
            setFilteredVisits(visits);
        }
    }, [filterText]);

    return (
        <div className="visit-list">
            <Head title={`${props.appName} | Visit List`} />
            {/* <!-- Navbar --> */}
            <nav className="navbar sticky-top px-3 py-2">
                <div className="d-flex align-items-center w-100 position-relative">
                    <Link
                        href="/dashboard"
                        className="btn btn-link text-primary p-0 me-auto"
                    >
                        <i className="bi bi-chevron-left fs-5"></i>
                    </Link>
                    <span className="mx-auto fw-semibold">My Visits</span>
                    <button
                        className="btn btn-link text-dark p-0 ms-auto"
                        title="Filter"
                        onClick={() => setShowDurationFilter(true)}
                    >
                        <i className="bi bi-funnel fs-5"></i>
                    </button>
                </div>
            </nav>

            {/* <!-- Search Bar --> */}
            <div
                className="container-fluid px-3 pt-2 sticky-top bg-light"
                style={{
                    zIndex: "100",
                }}
            >
                <div className="input-group shadow-sm rounded mb-2 border border-light-subtle">
                    <input
                        type="search"
                        className="form-control form-control-sm border-0"
                        placeholder="Search by name, remark or location..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        type="button"
                        onClick={searchVisits}
                    >
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>

            {/* <!-- Content --> */}
            <div className="container py-2">
                {filteredVisits.length > 0 &&
                    filteredVisits.map((visit) => (
                        <div key={uuid()} className="visit-card">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <div className="fw-semibold text-dark">
                                        {visit.contact_person}
                                    </div>
                                    {visit.district && visit.zipcode && (
                                        <div className="small-text">
                                            <>
                                                {visit.district +
                                                    " - " +
                                                    visit.zipcode}
                                            </>
                                        </div>
                                    )}
                                </div>
                                <div className="text-end small-text">
                                    {new Date(
                                        visit.created_at
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                    })}
                                    <br />
                                    <span
                                        className={`badge text-dark  bg-${getColor(
                                            visit.reason
                                        )}`}
                                    >
                                        {getReason(visit.reason)}
                                    </span>
                                </div>
                            </div>
                            {visit.remarks && (
                                <div className="mt-2 small-text">
                                    <i className="bi bi-chat-left-text me-1"></i>{" "}
                                    "{visit.remarks}"
                                </div>
                            )}
                            {visit.photos && (
                                <div className="mt-2 small-text">
                                    <i className="bi bi-camera me-1"></i>{" "}
                                    {visit.photos} Photos Attached
                                </div>
                            )}
                        </div>
                    ))}

                {/* <!-- Visit Entry --> */}
                {/* <div className="visit-card">
                    <div className="d-flex justify-content-between">
                        <div>
                            <div className="fw-semibold text-dark">
                                Ms. Priya Sharma
                            </div>
                            <div className="small-text">Chennai - 600001</div>
                        </div>
                        <div className="text-end small-text">
                            Apr 11, 2025
                            <br />
                            <span className="badge bg-info text-dark">
                                Order Taken
                            </span>
                        </div>
                    </div>
                    <div className="mt-2 small-text">
                        <i className="bi bi-chat-left-text me-1"></i> "Asked
                        about payment, showed new product range."
                    </div>
                </div> */}

                {/* <!-- Another Visit Entry --> */}
                {/* <div className="visit-card">
                    <div className="d-flex justify-content-between">
                        <div>
                            <div className="fw-semibold text-dark">
                                Mr. Rajesh Kumar
                            </div>
                            <div className="small-text">Bangalore - 560034</div>
                        </div>
                        <div className="text-end small-text">
                            Apr 10, 2025
                            <br />
                            <span className="badge bg-warning text-dark">
                                Product Showcased
                            </span>
                        </div>
                    </div>
                    <div className="mt-2 small-text">
                        <i className="bi bi-camera me-1"></i> 2 Photos Attached
                    </div>
                </div> */}
            </div>
            <VisitFilter
                duration={duration}
                setDuration={setDuration}
                show={showDurationFilter}
                handleClose={() => setShowDurationFilter(false)}
                fetchVisits={fetchVisits}
            />
        </div>
    );
};

export default VisitList;
