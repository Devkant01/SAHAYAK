function ProfileHeader({ user }) {
    const Avatar =
        user.image ||
        `https://api.dicebear.com/9.x/personas/svg?seed=${user.name}`;

    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col items-center">

                <img
                    src={Avatar}
                    alt={user.name}
                    className="h-32 w-32 rounded-full border-4 border-teal-100 object-cover"
                />

                <h1 className="mt-4 text-3xl font-bold">
                    {user.name}
                </h1>

                <p className="mt-2 text-slate-500 capitalize">
                    {user.role === "client"
                        ? "Service Seeker"
                        : "Service Provider"}
                </p>
            </div>
        </div>
    );
}

export default ProfileHeader;