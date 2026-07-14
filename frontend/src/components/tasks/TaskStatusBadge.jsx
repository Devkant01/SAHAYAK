export default function TaskStatusBadge({
    Status
}) {

    const Styles = {
        pending:
            "bg-yellow-100 text-yellow-700",

        in_progress:
            "bg-blue-100 text-blue-700",

        awaiting_review:
            "bg-purple-100 text-purple-700",

        completed:
            "bg-green-100 text-green-700"
    };

    const Labels = {
        pending: "Pending",
        in_progress: "In Progress",
        awaiting_review:
            "Awaiting Review",
        completed: "Completed"
    };

    return (
        <span
            className={`ml-2 px-2 rounded text-xs font-semibold uppercase transition-all ${Styles[Status]}`}
        >
            {Labels[Status]}
        </span>
    );
}