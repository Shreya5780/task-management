import { useState } from "react";

function StatusDropdown({ statusList, currentStatus, onChange }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleStatusClick = () => setShowDropdown((prev) => !prev);

  const handleStatusChange = (newStatus) => {
    setShowDropdown(false);
    if (newStatus !== currentStatus) onChange(newStatus);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <p
        style={{ color: "deepskyblue", cursor: "pointer" }}
        onClick={handleStatusClick}
      >
        {currentStatus}
      </p>
      {showDropdown && (
        <ul style={{
          position: "absolute",
          background: "#fff",
          border: "1px solid #ddd",
          padding: 0,
          margin: 0,
          zIndex: 10,
          minWidth: "100px"
        }}>
          {statusList.filter(s => s !== currentStatus).map((s) => (
            <li
              key={s}
              style={{
                listStyle: "none",
                padding: "4px 8px",
                cursor: "pointer",
              }}
              onClick={() => handleStatusChange(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StatusDropdown;
