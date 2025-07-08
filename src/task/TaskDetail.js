import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { deleteTaskApi, updateTaskStatusApi } from "../api/TaskAuthAPI";
import { statusEnum, statusList } from "./AddTask";
import StatusDropdown from "../StatusDropdown";


function TaskDetail() {
    const location = useLocation();
    const task = location.state;

    const [status, setStatus] = useState(task.status);
    const handleStatusChange = async (newStatus) => {
        setStatus(newStatus);
        await updateTaskStatusApi(task.tid, newStatus);
    };

    const navigate = useNavigate()

    const handleEdit = () => {
        console.log("ediiiiiiitttttt")
        navigate("/add/task", { state: task })
    }

    const handleDelete = (taskId) => {
        if (window.confirm("Are you sure you want to delete this task? ")) {
            deleteTaskApi(taskId)
            navigate("/home")
        }
    }

    return (
        <div className="task-list-ul">

            <h4>Task Info</h4>
            <div id="task-list">
                <StatusDropdown statusList={statusList} currentStatus={status} onChange={handleStatusChange} />
                <p> {task.title} </p>
                <p style={{ textAlign: "right", color: "#888" }}> {new Date(task.due_date).toUTCString().slice(0, 16)} </p>
                <hr />
                <p> {task.description} </p>
                <p>{new Date(task.created_at).toUTCString().slice(0, 25)}</p>
                <p>{new Date(task.updated_at).toUTCString().split('G')[0]}</p>

                <button style={{ margin: "2px" }} onClick={() => handleEdit()}>Edit</button>
                <button style={{ margin: "2px" }} onClick={() => handleDelete(task.tid)}>Delete</button>
            </div>


        </div>
    )
}

export default TaskDetail