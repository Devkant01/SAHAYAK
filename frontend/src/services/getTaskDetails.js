import axios from "axios";
import { RefreshToken } from "../utils/RefreshToken";


export async function getTaskDetails(taskId, AccessToken, retried = false) {
    try {
        console.log("getTaskDetails request:", taskId, AccessToken);
        const { data } = await axios.get(
            `client/my-task/${taskId}`,
            {
                withCredentials: true,
                headers: {
                    Authorization:
                        `Bearer ${AccessToken}`
                }
            }
        );
        console.log("getTaskDetails response:", data);
        return data;
    } catch (err) {
        if (err.response?.status === 401 && !Retried) {
            const newAccessToken = await RefreshToken(err);
            return getTaskDetails(taskId, newAccessToken, true);
        } else
            throw err;
    }
}

// export async function getTaskDetails(taskId, AccessToken, retried = false) {
//     const pending = {
//         "message": "Task fetched successfully",
//         "data": {
//             "task": {
//                 "_id": "task123",
//                 "title": "Repair Kitchen Sink",
//                 "description": "Kitchen sink is leaking from the bottom pipe.",
//                 "category": "Plumber",
//                 "status": "pending",
//                 "budget": 1500,

//                 "location": {
//                     "address": "Boring Road",
//                     "city": "Patna",
//                     "state": "Bihar"
//                 },

//                 "createdAt": "2026-07-18 09:00 AM",
//                 "expectedStart": "",
//                 "hiredAt": "",
//                 "completedAt": "",

//                 "progress": 0,
//                 "currentPhase": "",
//                 "expectedCompletion": "",
//                 "duration": "",
//                 "paymentStatus": "Pending"
//             },

//             "worker": {},

//             "recommendedWorkers": [
//                 {
//                     "_id": "worker101",
//                     "name": "Rahul Kumar",
//                     "image": "https://picsum.photos/300?1",
//                     "phone": "9876543210",
//                     "specialization": "Plumber",
//                     "bio": "8+ years of experience in plumbing services.",

//                     "rating": 4.9,
//                     "experience": 8,
//                     "completedJobs": 243,
//                     "distance": 2.1,

//                     "skills": [
//                         "Leak Repair",
//                         "Pipe Fitting",
//                         "Bathroom",
//                         "Kitchen"
//                     ]
//                 },
//                 {
//                     "_id": "worker102",
//                     "name": "Amit Singh",
//                     "image": "https://picsum.photos/300?2",
//                     "phone": "9876500000",
//                     "specialization": "Plumber",
//                     "bio": "Professional residential and commercial plumber.",

//                     "rating": 4.7,
//                     "experience": 6,
//                     "completedJobs": 182,
//                     "distance": 3.8,

//                     "skills": [
//                         "Water Pipeline",
//                         "Tap Installation",
//                         "Drain Cleaning"
//                     ]
//                 },
//                 {
//                     "_id": "worker103",
//                     "name": "Sanjay Yadav",
//                     "image": "https://picsum.photos/300?3",
//                     "phone": "9876511111",
//                     "specialization": "Plumber",
//                     "bio": "Reliable plumbing technician with quick response.",

//                     "rating": 4.8,
//                     "experience": 7,
//                     "completedJobs": 210,
//                     "distance": 1.9,

//                     "skills": [
//                         "Leak Repair",
//                         "Bathroom",
//                         "Kitchen",
//                         "Pipeline"
//                     ]
//                 }
//             ],

//             "timeline": [],

//             "updates": [],

//             "review": {}
//         }
//     }
//     const progress = {
//         "message": "Task fetched successfully",
//         "data": {
//             "task": {
//                 "_id": "task123",
//                 "title": "Repair Kitchen Sink",
//                 "description": "Kitchen sink is leaking from the bottom pipe.",
//                 "category": "Plumber",
//                 "status": "in-progress",
//                 "budget": 1500,

//                 "location": {
//                     "address": "Boring Road",
//                     "city": "Patna",
//                     "state": "Bihar"
//                 },

//                 "createdAt": "2026-07-18 09:00 AM",
//                 "expectedStart": "2026-07-18 10:00 AM",
//                 "hiredAt": "2026-07-18 09:45 AM",
//                 "completedAt": "",

//                 "progress": 65,
//                 "currentPhase": "Replacing damaged pipe",
//                 "expectedCompletion": "2026-07-18 04:30 PM",
//                 "duration": "",
//                 "paymentStatus": "Pending"
//             },

//             "worker": {
//                 "_id": "worker123",
//                 "name": "Rahul Kumar",
//                 "image": "https://picsum.photos/300",
//                 "phone": "9876543210",
//                 "specialization": "Plumber",
//                 "bio": "Experienced plumbing professional with 8+ years of experience.",

//                 "rating": 4.8,
//                 "experience": 8,
//                 "completedJobs": 243,
//                 "distance": 2.4,

//                 "skills": [
//                     "Leak Repair",
//                     "Pipe Fitting",
//                     "Bathroom",
//                     "Kitchen"
//                 ]
//             },

//             "recommendedWorkers": [],

//             "timeline": [
//                 {
//                     "type": "created",
//                     "title": "Task Published",
//                     "description": "Task published successfully.",
//                     "time": "18 Jul • 09:00 AM",
//                     "completed": true
//                 },
//                 {
//                     "type": "assigned",
//                     "title": "Worker Assigned",
//                     "description": "Rahul Kumar accepted the task.",
//                     "time": "18 Jul • 09:45 AM",
//                     "completed": true
//                 },
//                 {
//                     "type": "working",
//                     "title": "Work Started",
//                     "description": "Repair work has started.",
//                     "time": "18 Jul • 10:15 AM",
//                     "completed": true
//                 },
//                 {
//                     "type": "completed",
//                     "title": "Task Completed",
//                     "description": "Waiting for completion.",
//                     "time": "",
//                     "completed": false
//                 }
//             ],

//             "updates": [
//                 {
//                     "type": "arrival",
//                     "title": "Worker Arrived",
//                     "message": "Reached your location.",
//                     "time": "10:10 AM",
//                     "image": ""
//                 },
//                 {
//                     "type": "progress",
//                     "title": "Inspection Completed",
//                     "message": "Leak identified. Replacing damaged pipe.",
//                     "time": "11:20 AM",
//                     "image": ""
//                 },
//                 {
//                     "type": "photo",
//                     "title": "Progress Photo",
//                     "message": "New pipe installed.",
//                     "time": "12:35 PM",
//                     "image": "https://picsum.photos/500/300"
//                 }
//             ],

//             "review": {}
//         }
//     }
//     const awaiting = {
//         "message": "Task fetched successfully",
//         "data": {
//             "task": {
//                 "_id": "task123",
//                 "title": "Repair Kitchen Sink",
//                 "description": "Kitchen sink is leaking from the bottom pipe.",
//                 "category": "Plumber",
//                 "status": "awaiting-review",
//                 "budget": 1500,

//                 "location": {
//                     "address": "Boring Road",
//                     "city": "Patna",
//                     "state": "Bihar"
//                 },

//                 "createdAt": "2026-07-18 09:00 AM",
//                 "expectedStart": "2026-07-18 10:00 AM",
//                 "hiredAt": "2026-07-18 09:45 AM",
//                 "completedAt": "2026-07-18 03:45 PM",

//                 "progress": 100,
//                 "currentPhase": "Completed",
//                 "expectedCompletion": "2026-07-18 03:45 PM",
//                 "duration": "5 Hours",
//                 "paymentStatus": "Paid"
//             },

//             "worker": {
//                 "_id": "worker123",
//                 "name": "Rahul Kumar",
//                 "image": "https://picsum.photos/300",
//                 "phone": "9876543210",
//                 "specialization": "Plumber",
//                 "bio": "Experienced plumbing professional with 8+ years of experience.",

//                 "rating": 4.8,
//                 "experience": 8,
//                 "completedJobs": 243,
//                 "distance": 2.4,

//                 "skills": [
//                     "Leak Repair",
//                     "Pipe Fitting",
//                     "Bathroom",
//                     "Kitchen"
//                 ]
//             },

//             "recommendedWorkers": [],

//             "timeline": [
//                 {
//                     "type": "created",
//                     "title": "Task Published",
//                     "description": "Task published successfully.",
//                     "time": "18 Jul • 09:00 AM",
//                     "completed": true
//                 },
//                 {
//                     "type": "assigned",
//                     "title": "Worker Assigned",
//                     "description": "Rahul Kumar accepted the task.",
//                     "time": "18 Jul • 09:45 AM",
//                     "completed": true
//                 },
//                 {
//                     "type": "working",
//                     "title": "Work Started",
//                     "description": "Repair work started.",
//                     "time": "18 Jul • 10:15 AM",
//                     "completed": true
//                 },
//                 {
//                     "type": "completed",
//                     "title": "Task Completed",
//                     "description": "Waiting for your review.",
//                     "time": "18 Jul • 03:45 PM",
//                     "completed": true
//                 }
//             ],

//             "updates": [
//                 {
//                     "type": "arrival",
//                     "title": "Worker Arrived",
//                     "message": "Reached your location.",
//                     "time": "10:10 AM",
//                     "image": ""
//                 },
//                 {
//                     "type": "progress",
//                     "title": "Repair Started",
//                     "message": "Started replacing damaged pipe.",
//                     "time": "11:00 AM",
//                     "image": ""
//                 },
//                 {
//                     "type": "photo",
//                     "title": "Final Work Photo",
//                     "message": "Repair completed successfully.",
//                     "time": "03:30 PM",
//                     "image": "https://picsum.photos/500/300"
//                 },
//                 {
//                     "type": "completed",
//                     "title": "Task Completed",
//                     "message": "Worker marked this task as completed.",
//                     "time": "03:45 PM",
//                     "image": ""
//                 }
//             ],

//             "review": {}
//         }
//     }
//     const completed = {
//         "message": "Task fetched successfully",
//         "data": {
//             "task": {
//                 "_id": "task123",
//                 "title": "Repair Kitchen Sink",
//                 "description": "Kitchen sink is leaking from the bottom pipe.",
//                 "category": "Plumber",
//                 "status": "completed",
//                 "budget": 1500,

//                 "location": {
//                     "address": "Boring Road",
//                     "city": "Patna",
//                     "state": "Bihar"
//                 },

//                 "createdAt": "2026-07-18 09:00 AM",
//                 "expectedStart": "2026-07-18 10:00 AM",
//                 "hiredAt": "2026-07-18 09:45 AM",
//                 "completedAt": "2026-07-18 03:45 PM",

//                 "progress": 100,
//                 "currentPhase": "Completed",
//                 "expectedCompletion": "2026-07-18 03:45 PM",
//                 "duration": "5 Hours",
//                 "paymentStatus": "Paid"
//             },

//             "worker": {
//                 "_id": "worker123",
//                 "name": "Rahul Kumar",
//                 "image": "https://picsum.photos/300",
//                 "phone": "9876543210",
//                 "specialization": "Plumber",
//                 "bio": "Experienced plumbing professional with 8+ years of experience.",

//                 "rating": 4.8,
//                 "experience": 8,
//                 "completedJobs": 243,
//                 "distance": 2.4,

//                 "skills": [
//                     "Leak Repair",
//                     "Pipe Fitting",
//                     "Bathroom",
//                     "Kitchen"
//                 ]
//             },

//             "recommendedWorkers": [],

//             "timeline": [
//                 {
//                     "type": "created",
//                     "title": "Task Published",
//                     "description": "Task published successfully.",
//                     "time": "18 Jul • 09:00 AM",
//                     "completed": true
//                 },
//                 {
//                     "type": "assigned",
//                     "title": "Worker Assigned",
//                     "description": "Rahul Kumar accepted the task.",
//                     "time": "18 Jul • 09:45 AM",
//                     "completed": true
//                 },
//                 {
//                     "type": "working",
//                     "title": "Work Started",
//                     "description": "Repair work started.",
//                     "time": "18 Jul • 10:15 AM",
//                     "completed": true
//                 },
//                 {
//                     "type": "completed",
//                     "title": "Task Completed",
//                     "description": "Task completed successfully.",
//                     "time": "18 Jul • 03:45 PM",
//                     "completed": true
//                 }
//             ],

//             "updates": [
//                 {
//                     "type": "arrival",
//                     "title": "Worker Arrived",
//                     "message": "Reached your location.",
//                     "time": "10:10 AM",
//                     "image": ""
//                 },
//                 {
//                     "type": "progress",
//                     "title": "Repair Started",
//                     "message": "Started replacing damaged pipe.",
//                     "time": "11:00 AM",
//                     "image": ""
//                 },
//                 {
//                     "type": "photo",
//                     "title": "Final Work Photo",
//                     "message": "Repair completed successfully.",
//                     "time": "03:30 PM",
//                     "image": "https://picsum.photos/500/300"
//                 },
//                 {
//                     "type": "completed",
//                     "title": "Task Completed",
//                     "message": "Worker marked this task as completed.",
//                     "time": "03:45 PM",
//                     "image": ""
//                 }
//             ],

//             "review": {
//                 "rating": 5,
//                 "comment": "Excellent work. Very professional and completed the repair on time.",
//                 "createdAt": "2026-07-18 04:10 PM"
//             }
//         }
//     }
//     return pending || progress || awaiting || completed;
// }