function Loader() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white">
            <h1 className="mb-4 text-3xl font-bold">
                Sahayak
            </h1>

            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>

            <p className="mt-4 text-sm text-gray-500">
                Preparing your workspace...
            </p>
        </div>
    );
}

export default Loader;