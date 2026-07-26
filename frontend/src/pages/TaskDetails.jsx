import React from 'react'
import { useSelector } from 'react-redux'
import ClientTaskDetails from "../components/task/ClientTaskDetails";
import WorkerTaskDetails from "../components/task/worker/WorkerTaskDetails";

function TaskDetails() {
  const role = useSelector((state) => state.user.userRole);
  console.log('role', role)
  return (
    <>
      {
        role === 'client'
          ? <ClientTaskDetails />
          : <WorkerTaskDetails />
      }
    </>
  )
}

export default TaskDetails