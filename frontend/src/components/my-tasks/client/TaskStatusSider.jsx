export default function TaskStatusSider({
    Status
}) {

    const [res, setRes] = React.useState();
    

    return (
        <span
            className={`ml-2 px-2 rounded text-xs font-semibold uppercase transition-all ${Styles[Status]}`}
        >
            {Labels[Status]}
        </span>
    );
}