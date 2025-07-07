import { useContext, useEffect, useState } from "react";
import { addTaskApi } from "../api/TaskAuthAPI";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { getAllUser } from "../api/GetAuthAPI";

function AddTask() {

    const statusEnum = {
        TODO: 'TODO',
        IN_PROGRESS: "IN_PROGRESS",
        DONE: 'DONE'
    }

    const [status, setStatus] = useState(statusEnum.TODO);

    const [errorMsg, setErrorMsg] = useState();
    const [form, setForm] = useState({
        title: "",
        description: "",
        due_date: "",
        status: status,
        userId: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)

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
            const response = await addTaskApi(form);
            console.log(response);
            if (response.status === 200 || response.uid) {
                setErrorMsg("")
                navigate(`/`)
            } else if (response.data) {

                const messages = Object.values(response.data);
                setErrorMsg(messages)
            } else {
                setErrorMsg("Add task failed!")
            }

        } catch (error) {
            console.error('Error adding :', error);
            setErrorMsg(error?.response?.data?.message || "Add task failed");
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

                    <select id="status" name="status" value={status} onChange={e => setStatus(e.target.value)}>

                        <option value={statusEnum.TODO}>TODO</option>
                        <option value={statusEnum.IN_PROGRESS}>IN_PROGRESS</option>
                        <option value={statusEnum.DONE}>DONE</option>
                    </select>
                </label>
                <input name="due_date" value={form.due_date} onChange={handleChange} type="date" placeholder="Enter Due date"></input>

                <label htmlFor="userId">Assign To User:</label>
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
                <button>Add Task</button>
            </form>
        </div>
    )
}

export default AddTask;