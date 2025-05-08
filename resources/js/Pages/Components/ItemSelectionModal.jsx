import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { data as dummyData } from "../Common/dummyData";
import { v6 as uuid } from "uuid";

const ItemSelectionModal = ({
    show,
    onClose,
    onAdd,
    ParentSizeDetail,
    editIndex,
    setEditIndex,
}) => {
    const data = dummyData;
    const [brands] = useState(() =>
        Array.from(new Set(data.map((e) => e.name)))
    );
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [styles, setStyles] = useState([]);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [sizeDetail, setSizeDetail] = useState([]);

    const getQty = (name, style, size) => {
        const sizeDetailIndex = ParentSizeDetail.findIndex((arr) =>
            arr.some((e) => e.name == name && e.style == style)
        );
        if (sizeDetailIndex != -1) {
            const arr = ParentSizeDetail[sizeDetailIndex].filter(
                (e) => e.size == size
            );
            if (arr.length > 0) {
                return arr[0].qty;
            } else {
                return "";
            }
        }
        return "";
    };

    const showSizes = () => {
        if (selectedBrand && selectedStyle) {
            const sizeDetail = data
                .filter(
                    (e) => e.name == selectedBrand && e.style == selectedStyle
                )
                .map((e) => ({
                    name: e.name,
                    style: e.style,
                    size_id: e.size_id,
                    size: e.size,
                    qty: getQty(selectedBrand, selectedStyle, e.size),
                }));
            setSizeDetail(sizeDetail);
        }
    };

    const reset = () => {
        setEditIndex(-1);
        setSelectedBrand(null);
        setSelectedStyle(null);
        setSizeDetail([]);
        setStyles([]);
    };

    useEffect(() => {
        if (selectedBrand) {
            const styles = Array.from(
                new Set(
                    data
                        .filter((e) => e.name == selectedBrand)
                        ?.map((e) => e.style)
                )
            );
            setStyles(styles);
            if (editIndex === -1) {
                setSelectedStyle("");
                setSizeDetail([]);
            } else {
                if (ParentSizeDetail[editIndex][0].name != selectedBrand) {
                    setSelectedStyle("");
                    setSizeDetail([]);
                } else {
                    const style = ParentSizeDetail[editIndex][0].style;
                    setSelectedStyle(style);
                }
            }
        }
    }, [selectedBrand]);

    useEffect(() => {
        if (selectedStyle) {
            if (editIndex === -1) {
                setSizeDetail([]);
            } else {
                if (ParentSizeDetail[editIndex][0].style != selectedStyle) {
                    setSizeDetail([]);
                }
            }
        }
    }, [selectedStyle]);

    useEffect(() => {
        if (editIndex !== -1) {
            const sizeDetail = ParentSizeDetail[editIndex];
            setSizeDetail(sizeDetail);
            const brand = sizeDetail[0].name;
            setSelectedBrand(brand);
        }
    }, [editIndex]);

    return (
        <Modal
            show={show}
            fullscreen
            onHide={() => {
                setEditIndex(-1);
                reset();
                onClose();
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Select Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <!-- Choose Item --> */}
                <div className="mb-3">
                    <label
                        htmlFor="itemSelect"
                        className="form-label fw-semibold"
                    >
                        Choose Item
                    </label>
                    <select
                        className="form-select"
                        id="itemSelect"
                        name="item"
                        value={selectedBrand ?? ""}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                        <option disabled value="">
                            Select an item
                        </option>
                        {brands.length > 0 &&
                            brands.map((brand) => (
                                <option key={uuid()} value={brand}>
                                    {brand}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label
                        htmlFor="styleSelect"
                        className="form-label fw-semibold"
                    >
                        Choose Style
                    </label>
                    <select
                        className="form-select"
                        id="styleSelect"
                        name="style"
                        value={selectedStyle ?? ""}
                        onChange={(e) => setSelectedStyle(e.target.value)}
                    >
                        <option disabled value="">
                            Select a style
                        </option>
                        {styles.length > 0 &&
                            styles.map((style) => (
                                <option key={uuid()} value={style}>
                                    {style}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="mb-4">
                    <button
                        className="btn btn-outline-primary w-100 fw-semibold"
                        onClick={showSizes}
                    >
                        <i className="bi bi-eye me-1"></i> Show Sizes
                    </button>
                </div>

                {/* <!-- Quantities --> */}
                {sizeDetail.length > 0 && (
                    <div className="mb-4">
                        <label className="form-label fw-semibold">
                            Enter Quantities
                        </label>
                        <div className="size-inputs">
                            {sizeDetail.map((e, index) => (
                                <span key={e.size_id}>
                                    {e.size}{" "}
                                    <input
                                        type="number"
                                        inputMode="numeric"
                                        className="form-control form-control-sm text-center"
                                        style={{ width: "60px" }}
                                        value={e.qty === 0 ? "" : e.qty}
                                        onChange={(event) => {
                                            let value = parseInt(
                                                event.target.value,
                                                10
                                            );

                                            if (isNaN(value)) value = "";

                                            if (value < 0) return;

                                            const updatedSizeDetail = [
                                                ...sizeDetail,
                                            ];
                                            updatedSizeDetail[index] = {
                                                ...updatedSizeDetail[index],
                                                qty: value,
                                            };
                                            setSizeDetail(updatedSizeDetail);
                                        }}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "-" ||
                                                e.key === "e"
                                            ) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="d-grid mb-5">
                    <button
                        className="btn btn-success fw-semibold"
                        id="addItemBtn"
                        disabled={
                            sizeDetail.reduce(
                                (acc, curr) => +curr.qty + acc,
                                0
                            ) <= 0
                        }
                        onClick={() => {
                            onAdd(sizeDetail);
                            reset();
                        }}
                    >
                        <i className="bi bi-plus-circle me-1"></i> Add Item to
                        Table
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ItemSelectionModal;
