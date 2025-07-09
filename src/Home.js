import { useEffect, useState } from "react";
import { getToken, myProfile } from "./api/GetAuthAPI";
import { useNavigate } from "react-router-dom";
import './css/form.css'
import { deleteTaskApi, getAllTask, updateTaskStatusApi } from "./api/TaskAuthAPI";
import { statusList } from "./task/AddTask";
import StatusDropdown from "./middelwares/StatusDropdown";

function Home(){

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

     const fetchTask = async () => {
        try{

                const response = await getAllTask();
                console.log(response)
                setTasks(response)
                
            }catch(error) {
                console.error('Error adding :', error);
            }
        }
    useEffect(() => {
       
        fetchTask()
    }, [])

    const handleTask = (task) => {
        navigate(`/task/info/${task.tid}`, {state: task})
    }

      const handleEdit = (task) => {
            console.log("ediiiiiiitttttt go to adddddddddd")
            navigate("/add/task", { state: task })
        }
    
        const handleDelete = async(taskId) => {
           if( window.confirm("Are you sure you want to delete this task? ")){
            await deleteTaskApi(taskId)
            fetchTask()
           }
        }


    return (
        <div>

        <h3>Home page</h3>

        <div>
            {/* <button id="profile" onClick={handleProfile}>Me</button> */}
            <button id="add-btn" onClick={() => navigate(`/add/task`)} >Add Task</button>
        </div>

        <div>
            
            <ul className="task-list-ul">
                {Array.isArray(tasks) && tasks.map((task) => (
                    <li id="task-list" key={task.tid} onClick={() => handleTask(task)}> 
                    <p><b>Title :-</b> {task.title} </p>
                    <p><b>Status :-</b> {task.status} </p>
                  
                    <p style={{textAlign: "right", color: "#888"}}><b>  {task.due_date}</b> </p>
                     <button style={{ margin: "2px" }} onClick={(e) => { e.stopPropagation();  handleEdit(task)}}>Edit</button>
                <button style={{ margin: "2px" }} onClick={(e) =>{ e.stopPropagation(); handleDelete(task.tid)}}>Delete</button>
                     </li>
                ))}
            </ul>
        </div>

        </div>
        

    )
}

export default Home;