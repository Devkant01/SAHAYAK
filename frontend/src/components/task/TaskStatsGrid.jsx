// import PendingSection from "./pending/PendingSection";
// import InProgressSection from "./inprogress/InProgressSection";
// import AwaitingReviewSection from "./review/AwaitingReviewSection";
// import CompletedSection from "./completed/CompletedSection";

// export default function TaskStatusContent({
//     task,
//     refetch,
// }) {

//     switch (task.task.status) {

//         case "pending":
//             return (
//                 <PendingSection
//                     task={task}
//                     refetch={refetch}
//                 />
//             );

//         case "in-progress":
//             return (
//                 <InProgressSection
//                     task={task}
//                     refetch={refetch}
//                 />
//             );

//         case "awaiting-review":
//             return (
//                 <AwaitingReviewSection
//                     task={task}
//                     refetch={refetch}
//                 />
//             );

//         case "completed":
//             return (
//                 <CompletedSection
//                     task={task}
//                 />
//             );

//         default:
//             return null;

//     }

// }