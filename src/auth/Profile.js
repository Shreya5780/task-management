import { useState } from "react";
import { useLocation } from "react-router-dom"
import { updateMyProfile } from "../api/GetAuthAPI";

function Profile() {

    const location = useLocation();
    const profile = location.state?.data || {};
    console.log(profile)

    const [editMode, setEditMode] = useState(false);
    const [profileData, setProfileData] = useState({
        username: profile.username || "",
        email: profile.email || "",
        password: ""
    })

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

    const [errorMsg, setErrorMsg] = useState("");

    const updateProfile = async (e) => {
        try {
            const response = await updateMyProfile(profileData);
            console.log(response);
            if (response.status === 200 || response.uid) {
                setErrorMsg("")
                setProfileData({
                    email: response.data.email,
                    username: response.data.username,
                    password: ""
                })
                setEditMode(false)
                //for immidiate change
                profile.email = response.data.email
                profile.username = response.data.username
                // navigate(`/login`)
            } else if (response.data) {
                const messages = Object.values(response.data);
                setErrorMsg(messages)
            } else {
                setErrorMsg("Update profile failed!")
            }



        } catch (error) {
            setErrorMsg(error?.response?.data?.message || "Update profile failed");
        }
       
    }

    return (


        <div className="profile-container">
            <h3 className="profile-title">Profile</h3>
            <div className="profile-card">
                <div className="profile-field">
                    <label>User ID:</label>
                    <span>{profile.uid}</span>
                </div>
                <div className="profile-field">
                    <label>Username:</label>
                    <span>{profile.username}</span>

                </div>
                <div className="profile-field">
                    <label>Email:</label>
                    {editMode ? (
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{profile.email}</span>
                    )}
                </div>

                {editMode && <div className="profile-field">
                    <label>Password:</label>
                    <input
                        type="text"
                        name="password"
                        value={profileData.password}
                        onChange={handleChange}
                    />

                </div>
                }

                <div className="profile-field">
                    <label>Created At:</label>
                    <span>{profile.created_at}</span>
                </div>

                {!editMode && <button onClick={() => setEditMode(true)}>Update Profile</button>}
                {editMode && <button onClick={updateProfile}>Submit Profile</button>}
            </div>
        </div>

    )
}

export default Profile