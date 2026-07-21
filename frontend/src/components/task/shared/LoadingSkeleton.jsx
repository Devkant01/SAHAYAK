export default function LoadingSkeleton() {

    return (

        <div className="space-y-8 animate-pulse">

            <div className="h-72 rounded-3xl bg-slate-200" />

            <div className="h-32 rounded-3xl bg-slate-200" />

            <div className="grid gap-6 lg:grid-cols-3">

                <div className="h-72 rounded-3xl bg-slate-200" />

                <div className="h-72 rounded-3xl bg-slate-200" />

                <div className="h-72 rounded-3xl bg-slate-200" />

            </div>

        </div>

    );

}