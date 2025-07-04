import { useEffect, useState } from "react";
import { getToken, myProfile } from "./api/GetAuthAPI";
import { useNavigate } from "react-router-dom";
import './css/form.css'
import { getAllTask } from "./api/TaskAuthAPI";

function Home(){

    const [profile, setProfile] = useState([]);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTask = async () => {
        try{

                const response = await getAllTask();
                console.log(response)
                setTasks(response)
                
            }catch(error) {
                console.error('Error adding :', error);
                setProfile("Please Login again!")
            }
        }
        fetchTask()
    }, [])

    const handleProfile = async (e) => {
        e.preventDefault();
        
        try {
                    const response = await myProfile();
                    console.log(response);
                     if(response.status === 200 || response.uid){
                        setProfile(response.data)
                        const data = response.data
                        // localStorage.setItem('token', response.data)
                        navigate(`/profile`, {state: {data}})
                    }else{
                        setProfile("Please Login again!")
                    }
        
                } catch (error) {
                    console.error('Error adding :', error);
                    setProfile("Please Login again!")
                }
                
    }

    return (
        <div>

        <h3>Home page</h3>

        <div>
            <button id="profile" onClick={handleProfile}>Me</button>
            <button id="add-btn" onClick={() => navigate(`/add/task`)} >Add Task</button>
        </div>

        <div>
            
            <ul className="task-list-ul">
                {Array.isArray(tasks) && tasks.map((task) => (
                    <li id="task-list" key={task.tid}> 
                    <p><b>Task Id:- </b> {task.tid} </p>
                    <p><b>Title :-</b> {task.title} </p>
                    <p><b>Description :-</b> {task.description} </p>
                    <p><b>Status :-</b> {task.status} </p>
                    <p><b>Due Date :- </b> {task.due_date} </p>
                    <p><b>Created Date :- </b> {task.created_at} </p>
                    <p><b>Modified Date :- </b> {task.updated_at} </p>
                     </li>
                ))}
            </ul>
        </div>

        </div>
        

    )
}

export default Home;