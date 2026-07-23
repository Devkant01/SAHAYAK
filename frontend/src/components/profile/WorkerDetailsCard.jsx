import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RefreshToken } from "../../utils/RefreshToken";
import {
    Briefcase,
    Phone,
    Shield,
    Star, Edit, BadgeCheck, BriefcaseBusiness
} from "lucide-react";
import InfoRow from "./InfoRow";
import { HasValue } from "../../utils/hasValue";
import ProfileSection from "./ProfileSection";


function WorkerDetailsCard({ user }) {
    const [UpdateProfession, setUpdateProfession] =
        useState(false);

    if (UpdateProfession) {

        return (
            <ProfileSection title="Professional Information">
                <div className="w-full min-h-fit p-5">
                    <ProfessionForm
                        user={user}
                        onCancel={() => setUpdateProfession(false)}
                    />
                </div>
            </ProfileSection>


        );

    }

    return (

        <ProfessionDetail
            user={user}
            onEdit={() => setUpdateProfession(true)}
        />

    );

}


function ProfessionDetail({
    user,
    onEdit,
}) {

    return (

        <ProfileSection
            title="Professional Information"
            Icon={
                <Edit
                    size={18}
                    onClick={onEdit}
                    className="cursor-pointer hover:scale-110"
                />
            }
        >

            <div className="space-y-6 p-5">

                <div className="grid gap-5 md:grid-cols-2">

                    <InfoCard
                        label="Category"
                        value={user.category}
                    />

                    <InfoCard
                        label="Experience"
                        value={`${user.experience} Years`}
                    />

                    <InfoCard
                        label="Alternate Mobile"
                        value={
                            user.alternateMobile?.number ||
                            "Not Added"
                        }
                    />

                    <div>
                        <p className="mb-2 text-sm font-medium text-slate-500">
                            Skills
                        </p>

                        <div className="flex flex-wrap gap-2">

                            {
                                user.skills?.length > 0
                                    ? user.skills.map((Skill) => (

                                        <span
                                            key={Skill}
                                            className="rounded bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700 text-center"
                                        >
                                            {Skill}
                                        </span>

                                    ))
                                    : (
                                        <span className="text-sm text-slate-400">
                                            No Skills Added
                                        </span>
                                    )
                            }

                        </div>

                    </div>

                </div>

                <div>

                    <p className="mb-2 text-sm font-medium text-slate-500">
                        Professional Bio
                    </p>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">

                        {
                            user.bio
                                ? user.bio
                                : "No professional bio added."
                        }

                    </div>

                </div>

                <div className="grid gap-5 grid-cols-3">

                    <StatCard
                        Icon={BadgeCheck}
                        title="Status"
                        value={
                            user.status === "active"
                                ? "Active"
                                : "Inactive"
                        }
                        color={
                            user.status === "active"
                                ? "text-emerald-600"
                                : "text-red-500"
                        }
                    />

                    <StatCard
                        Icon={Star}
                        title="Rating"
                        value={`${user.rating?.average || 0} (${user.rating?.count || 0} Reviews)`}
                        color="text-yellow-500"
                    />

                    <StatCard
                        Icon={BriefcaseBusiness}
                        title="Completed Jobs"
                        value={user.completedJobs || 0}
                        color="text-teal-600"
                    />

                </div>

            </div>

        </ProfileSection>

    );

}

function InfoCard({
    label,
    value,
}) {

    return (

        <div>

            <p className="mb-2 text-sm font-medium text-slate-500">
                {label}
            </p>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">

                {value || "--"}

            </div>

        </div>

    );

}

function StatCard({
    Icon,
    title,
    value,
    color,
}) {

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

                <div className={`rounded-xl bg-slate-100 p-3 ${color}`}>

                    <Icon size={20} />

                </div>

                <div>

                    <p className="text-sm text-slate-500">

                        {title}

                    </p>

                    <h3 className={`mt-1 text-sm font-semibold ${color}`}>

                        {value}

                    </h3>

                </div>

            </div>

        </div>

    );

}



const Categories = [
    "Plumber",
    "Electrician",
    "Carpenter",
    "Painter",
    "Cleaner",
    "Gardener",
    "Other"
];

function ProfessionForm({
    user,
    onCancel,
}) {

    const Navigate = useNavigate();

    const AccessToken = useSelector(
        state => state.user.accessToken
    );

    const [Loading, setLoading] = useState(false);

    const [Profession, setProfession] = useState({

        category: user.category || "",

        experience: user.experience || 0,

        alternateMobile:
            user.alternateMobile?.number || "",

        bio: user.bio || "",

        skills:
            user.skills?.join(", ") || ""

    });

    function HandleChange(e) {

        const {
            name,
            value
        } = e.target;

        setProfession(prev => ({
            ...prev,
            [name]: value
        }));

    }

    async function HandleSubmit(
        e,
        retried = false
    ) {

        e.preventDefault();

        setLoading(true);

        try {

            const Payload = {

                category:
                    Profession.category,

                experience:
                    Number(
                        Profession.experience
                    ),

                alternateMobile:
                    Profession.alternateMobile,

                bio:
                    Profession.bio,

                skills:
                    Profession.skills
                        .split(",")
                        .map(skill => skill.trim())
                        .filter(Boolean)

            };
            const res = await axios.put(

                "/user/update-profile",

                Payload,

                {

                    withCredentials: true,

                    headers: {

                        authorization:
                            `Bearer ${AccessToken}`

                    }

                }

            );

            console.log(res.data);

            alert(
                "Professional information updated successfully."
            );

            if (onCancel)
                onCancel();

            Navigate(0);

        }

        catch (err) {

            if (
                err.response?.status === 401 &&
                !retried
            ) {

                await RefreshToken(err);

                return HandleSubmit(
                    e,
                    true
                );

            }

            console.log(err);

            alert(
                "Failed to update professional information."
            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <form
            onSubmit={HandleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >

            <div className="flex items-center justify-between border-b border-slate-200 pb-5">

                <div>

                    <h2 className="text-2xl font-semibold text-slate-900">
                        Edit Professional Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Update your professional profile.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                    Cancel
                </button>

            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

                <label className="grid gap-2">

                    <span className="text-sm font-medium text-slate-700">
                        Category
                    </span>

                    <select
                        name="category"
                        value={Profession.category}
                        onChange={HandleChange}
                        className="h-12 rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none focus:border-teal-500"
                    >

                        {
                            Categories.map(Category => (

                                <option
                                    key={Category}
                                    value={Category}
                                >
                                    {Category}
                                </option>

                            ))
                        }

                    </select>

                </label>

                <label className="grid gap-2">

                    <span className="text-sm font-medium text-slate-700">
                        Experience (Years)
                    </span>

                    <input
                        type="number"
                        name="experience"
                        min="0"
                        value={Profession.experience}
                        onChange={HandleChange}
                        className="h-12 rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none focus:border-teal-500"
                    />

                </label>

                <label className="grid gap-2">

                    <span className="text-sm font-medium text-slate-700">
                        Alternate Mobile
                    </span>

                    <input
                        type="tel"
                        name="alternateMobile"
                        value={Profession.alternateMobile}
                        onChange={HandleChange}
                        placeholder="9876543210"
                        className="h-12 rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none focus:border-teal-500"
                    />

                </label>
                <label className="grid gap-2 md:col-span-2">

                    <span className="text-sm font-medium text-slate-700">
                        Professional Bio
                    </span>

                    <textarea
                        name="bio"
                        rows={5}
                        value={Profession.bio}
                        onChange={HandleChange}
                        placeholder="Write a short introduction about yourself..."
                        className="rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
                    />

                </label>

                <label className="grid gap-2 md:col-span-2">

                    <span className="text-sm font-medium text-slate-700">
                        Skills
                    </span>

                    <input
                        name="skills"
                        value={Profession.skills}
                        onChange={HandleChange}
                        placeholder="Leak Repair, Pipe Fitting, Bathroom Installation"
                        className="h-12 rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
                    />

                    <p className="text-xs text-slate-500">
                        Separate multiple skills with commas.
                    </p>

                </label>

            </div>

            <div className="mt-8 flex items-center justify-end gap-3">

                <button
                    type="button"
                    onClick={onCancel}
                    className="cursor-pointer rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    Back
                </button>

                <button
                    type="submit"
                    disabled={Loading}
                    className="cursor-pointer rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {
                        Loading
                            ? "Saving..."
                            : "Save Changes"
                    }
                </button>

            </div>

        </form>

    );

}

export default WorkerDetailsCard;