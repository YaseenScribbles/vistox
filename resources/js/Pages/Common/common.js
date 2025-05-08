export const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
];

export const getUserRole = (role) => {
    if (role === "admin") {
        return "Administrator";
    } else if (role === "manager") {
        return "Sales Manager";
    } else {
        return "Sales Representative";
    }
};

export const generatePassword = () => {
    const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
    let password = "";
    for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const hour = date.getHours() % 12 || 12;
    const minute = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${day} ${month} ${year} at ${hour}:${minute} ${ampm}`;
};

export function groupItems(array = []) {
    return Object.values(
        array.reduce((acc, item) => {
            const key = `${item.name} - ${item.style}`;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {})
    );
}

export function compressImage(file, quality = 0.7, maxWidth = 0, maxHeight = 0) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const img = new Image();

            img.onload = () => {
                let width = img.width;
                let height = img.height;

                // Maintain aspect ratio
                if (maxWidth > 0 && width > maxWidth) {
                    height = (maxWidth / width) * height;
                    width = maxWidth;
                }

                if (maxHeight > 0 && height > maxHeight) {
                    width = (maxHeight / height) * width;
                    height = maxHeight;
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error("Compression failed: blob is null."));
                        }
                    },
                    "image/jpeg",
                    quality
                );
            };

            img.onerror = (err) => reject(new Error("Image load error: " + err));
            img.src = reader.result;
        };

        reader.onerror = () => reject(new Error("File read error."));
        reader.readAsDataURL(file);
    });
}

