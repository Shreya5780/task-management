import { useContext, useEffect, useState } from "react";
import { addTaskApi, updateTaskApi } from "../api/TaskAuthAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../middelwares/AuthContext";
import { getAllUser } from "../api/GetAuthAPI";


const statusEnum = {
        TODO: 'TODO',
        IN_PROGRESS: "IN_PROGRESS",
        DONE: 'DONE'
    }

export const statusList = Object.values(statusEnum);

function AddTask() {

    const [status, setStatus] = useState(statusEnum.TODO);

    const [errorMsg, setErrorMsg] = useState();

    const location = useLocation();
    const task = location.state || {};
   const isEditMode = !!location.state;

    const [form, setForm] = useState({
        tid: task.tid,
        title: task.title || "",
        description: task.description || "",
        due_date: task.due_date || "",
        status: task.status || status,
        userId: task.userId || ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    // Fetch users when component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await getAllUser();
            setUsers(usersData);
            console.log(usersData)
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // form.userId = user;

        console.log(form);
        try {
            const response = isEditMode ? await updateTaskApi(form)  : await addTaskApi(form);
            console.log(response);
            if (response.status === 200 || response.uid) {
                setErrorMsg("")
                navigate(`/`)
            } else if (response.data) {

                const messages = Object.values(response.data);
                setErrorMsg(messages)
            } else {
                setErrorMsg("Add/update task failed!")
            }

        } catch (error) {
            console.error('Error adding :', error);
            setErrorMsg(error?.response?.data?.message || "Add/update task failed");
        }
        finally {
            setForm({
                title: "",
                description: "",
                due_date: "",
                status: status,
                userId: ""
            })
        }
    };



    return (
        <div>
            <h5>Add Task</h5>

            <form onSubmit={handleSubmit} className="auth-form">
                <input name="title" value={form.title} onChange={handleChange} type="text" placeholder="Enter title" ></input>
                <input name="description" value={form.description} onChange={handleChange} type="text" placeholder="Enter description"></input>
                <label style={{ textAlign: "left", margin: "20px 0" }} htmlFor="status">Select Status of the task:

                    <select id="status" name="status" value={status} onChange={e => {setForm({ ...form, status: e.target.value }); setStatus(e.target.value) }}>

                        <option value={statusEnum.TODO}>TODO</option>
                        <option value={statusEnum.IN_PROGRESS}>IN_PROGRESS</option>
                        <option value={statusEnum.DONE}>DONE</option>
                    </select>
                </label>
                <input name="due_date" value={form.due_date} onChange={handleChange} type="date" placeholder="Enter Due date"></input>

                <label htmlFor="userId">Assign To User  -  

                    <select
                        id="userId"
                        name="userId"
                        value={form.userId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select User</option>
                        {users && users.map((u) => (
                            <option key={u.uid} value={u.uid}>
                                {u.username} ({u.email})
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">{isEditMode ? 'Edit task' : 'Add Task'}</button>
            </form>
             {errorMsg && <h4 style={{color: "red"}}> {errorMsg} </h4> }
        </div>
    )
}

export default AddTask;