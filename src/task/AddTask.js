import { useState } from "react";

function AddTask(){

    const statusEnum = {
        TODO:'TODO',
        IN_PROGRESS: "IN_PROGRESS",
        DONE:'DONE'
    }

    const [status, setStatus] = useState(statusEnum.TODO);

    const handleSubmit = () => {

    }


    return (
        <div>
            <h5>Add Task</h5>

            <form onSubmit={handleSubmit} className="auth-form">
                <input type="text" placeholder="Enter title"></input>
                <input type="text" placeholder="Enter description"></input>
                 <select value={status} onChange={e => setStatus(e.target.value)} title="Status">
                    
                    <option value={statusEnum.TODO}>TODO</option>
                    <option value={statusEnum.IN_PROGRESS}>IN_PROGRESS</option>
                    <option value={statusEnum.DONE}>DONE</option>
                </select>
                <input type="date" placeholder="Enter Due date"></input>
                <button>Add Task</button>
            </form>
        </div>
    )
}

export default AddTask;