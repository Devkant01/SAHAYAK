import React, { useRef, useState, useEffect } from "react";
import {
    Mail,
    Phone,
    Calendar,
    User
} from "lucide-react";
import InfoRow from "./InfoRow";
import { HasValue } from "../../utils/hasValue";
import ProfileSection from "./ProfileSection";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { RefreshToken } from "../../utils/refreshToken";

function PersonalInfoCard({ user, isEditing }) {
    const Fields = [
        {
            label: "Email",
            value: user.mail?.id,
            icon: Mail,
            badge: user.mail?.isVerified
                ? "Verified"
                : "",
            badgeColor: user.mail?.isVerified
                ? "green"
                : "red"
        },
        {
            label: "Mobile",
            value: user.mobile?.number,
            icon: Phone,
            badge: user.mobile?.isVerified
                ? "Verified"
                : "",
            badgeColor: user.mobile?.isVerified
                ? "green"
                : "red"
        },
        {
            label: "Date Of Birth",
            value: user.dateOfBirth
                ? new Date(
                    user.dateOfBirth
                ).toLocaleDateString()
                : null,
            icon: Calendar
        },
        {
            label: "Gender",
            value: user.gender,
            icon: User
        }
    ];

    const VisibleFields = Fields.filter(
        item => HasValue(item.value)
    );

    if (VisibleFields.length === 0)
        return null;

    return (

        <ProfileSection title="Personal Information">
            {isEditing ? (
                <UpdateProfile user={user} />
            ) : (
                VisibleFields.map(field => (
                    <InfoRow
                        key={field.label}
                        {...field}
                    />
                ))
            )}
        </ProfileSection>
    );
}

function UpdateProfile({ user }) {
    const [form, setForm] = useState({
        name: user.name || "",
        mail: user.mail?.id || "",
        mobile: user.mobile?.number || "",
        dateOfBirth: user.dateOfBirth
            ? new Date(user.dateOfBirth).toISOString().split("T")[0]
            : "",
        gender: user.gender || "",
        image: null
    });

    const [imagePreview, setImagePreview] = useState(
        user.image || null
    );

    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);

    const Navigate = useNavigate();

    const AccessToken = useSelector(
        (state) => state.user.accessToken
    );

    useEffect(() => {
        return () => {
            if (
                imagePreview &&
                imagePreview.startsWith("blob:")
            ) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            files
        } = e.target;

        if (type === "file") {

            const SelectedFile =
                files?.[0] || null;

            setForm((prev) => ({
                ...prev,
                image: SelectedFile
            }));

            if (
                imagePreview &&
                imagePreview.startsWith("blob:")
            ) {
                URL.revokeObjectURL(
                    imagePreview
                );
            }

            setImagePreview(
                SelectedFile
                    ? URL.createObjectURL(
                        SelectedFile
                    )
                    : null
            );

        } else {

            setForm((prev) => ({
                ...prev,
                [name]: value
            }));

        }
    };

    const handleRemoveImage = () => {

        setForm((prev) => ({
            ...prev,
            image: null
        }));

        if (
            imagePreview &&
            imagePreview.startsWith("blob:")
        ) {
            URL.revokeObjectURL(
                imagePreview
            );
        }

        setImagePreview(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (
        e,
        retried = false
    ) => {

        e.preventDefault();

        setLoading(true);

        try {

            const data = new FormData();

            data.append(
                "name",
                form.name
            );

            if (form.dateOfBirth) {
                data.append(
                    "dateOfBirth",
                    form.dateOfBirth
                );
            }

            if (form.gender) {
                data.append(
                    "gender",
                    form.gender
                );
            }

            if (
                !user.mail?.id &&
                form.mail
            ) {
                data.append(
                    "mail",
                    form.mail
                );
            }

            if (
                !user.mobile?.number &&
                form.mobile
            ) {
                data.append(
                    "mobile",
                    form.mobile
                );
            }

            if (
                form.image &&
                form.image instanceof File
            ) {
                data.append(
                    "image",
                    form.image
                );
            }

            await axios.put(
                "/user/update-profile",
                data,
                {
                    withCredentials: true,
                    headers: {
                        authorization:
                            `Bearer ${AccessToken} `
                    }
                }
            );

            alert(
                "Profile updated successfully!"
            );

            Navigate(0);

        } catch (err) {

            if (
                err.response?.status === 401 &&
                !retried
            ) {

                await RefreshToken(err);

                return handleSubmit(
                    e,
                    true
                );
            }

            console.log(
                err.response?.data || err
            );

            alert(
                err.response?.data
                    ?.message ||
                "Failed to update profile."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full h-full min-h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">
                        Update profile
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Update your personal
                        information.
                    </p>
                </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

                <label className="flex flex-col justify-between">
                    <span className="text-sm font-medium text-slate-700">
                        Email
                    </span>

                    <span
                        className={`${Boolean(
                            user.mail?.id
                        )
                                ? "inline"
                                : "hidden"
                            } text - xs text - slate - 500`}
                    >
                        Email is unique and
                        cannot be changed here.
                    </span>

                    <input
                        name="mail"
                        value={form.mail}
                        onChange={
                            handleChange
                        }
                        placeholder="email@example.com"
                        readOnly={Boolean(
                            user.mail?.id
                        )}
                        disabled={Boolean(
                            user.mail?.id
                        )}
                        className={`${Boolean(
                            user.mail?.id
                        )
                                ? "cursor-not-allowed"
                                : "cursor-text"
                            } focus:border-teal-300 h-12 rounded-xl border-2 outline-none border-slate-300 bg-slate-100 px-4 text-sm text-slate-500`}
                    />
                </label>

                <label className="flex flex-col justify-between">
                    <span className="text-sm font-medium text-slate-700">
                        Mobile
                    </span>

                    <input
                        name="mobile"
                        value={form.mobile}
                        onChange={
                            handleChange
                        }
                        placeholder="+91 90000 00000"
                        readOnly={Boolean(
                            user.mobile
                                ?.number
                        )}
                        disabled={Boolean(
                            user.mobile
                                ?.number
                        )}
                        className={`${Boolean(
                            user.mobile
                                ?.number
                        )
                                ? "cursor-not-allowed"
                                : "cursor-text"
                            } focus:border-teal-300 h-12 rounded-xl border-2 outline-none border-slate-300 bg-slate-100 px-4 text-sm text-slate-500`}
                    />

                    <span
                        className={`${Boolean(
                            user.mobile
                                ?.number
                        )
                                ? "inline"
                                : "hidden"
                            } text - xs text - slate - 500`}
                    >
                        Mobile number is
                        unique and cannot be
                        changed here.
                    </span>
                </label>

                <label className="flex flex-col justify-between">
                    <span className="text-sm font-medium text-slate-700">
                        Full name
                    </span>

                    <input
                        name="name"
                        value={form.name}
                        onChange={
                            handleChange
                        }
                        placeholder="Your name"
                        className="outline-none focus:border-teal-300 h-12 rounded-xl border-2 border-slate-300 bg-slate-50 px-4 text-sm"
                    />
                </label>

                <label className="flex flex-col justify-between">
                    <span className="text-sm font-medium text-slate-700">
                        Date of birth
                    </span>

                    <input
                        type="date"
                        name="dateOfBirth"
                        value={
                            form.dateOfBirth
                        }
                        onChange={
                            handleChange
                        }
                        className="h-12 rounded-xl border-2 focus:border-teal-300 outline-none border-slate-300 bg-slate-50 px-4 text-sm"
                    />
                </label>

                <label className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">
                        Gender
                    </span>

                    <select
                        name="gender"
                        value={form.gender}
                        onChange={
                            handleChange
                        }
                        className="h-12 rounded-xl border-2 focus:border-teal-300 outline-none border-slate-300 bg-slate-50 px-4 text-sm"
                    >
                        <option value="">
                            Select
                        </option>
                        <option value="Male">
                            Male
                        </option>
                        <option value="Female">
                            Female
                        </option>
                        <option value="Other">
                            Other
                        </option>
                    </select>
                </label>

                <label className="flex flex-col justify-between border border-slate-300 bg-slate-50 px-4 py-3 rounded-xl gap-2">
                    <span className="text-sm font-medium text-slate-700">
                        Profile image
                    </span>

                    <input
                        ref={
                            fileInputRef
                        }
                        type="file"
                        name="image"
                        onChange={
                            handleChange
                        }
                        accept="image/*"
                    />

                    {imagePreview && (
                        <div className="space-y-2">
                            <img
                                src={
                                    imagePreview
                                }
                                alt="Profile Preview"
                                className="h-24 w-24 rounded-lg object-cover border border-slate-200"
                            />

                            <button
                                type="button"
                                onClick={
                                    handleRemoveImage
                                }
                                className="rounded-md px-2 py-1 text-red-600 hover:bg-red-50"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </label>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl cursor-pointer bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:opacity-60"
                >
                    {loading
                        ? "Updating..."
                        : "Update Profile"}
                </button>
            </div>
        </form>
    );
}


export default PersonalInfoCard;