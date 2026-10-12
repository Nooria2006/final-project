import "./Members.css";

function Members() {
  const members = [
    {
      id: 1,
      name: "Ahmad Rahimi",
      email: "ahmad@example.com",
      borrowed: 3,
      status: "Active",
    },
    {
      id: 2,
      name: "Sara Ahmadi",
      email: "sara@example.com",
      borrowed: 2,
      status: "Active",
    },
    {
      id: 3,
      name: "Maryam Hassan",
      email: "maryam@example.com",
      borrowed: 1,
      status: "Active",
    },
    {
      id: 4,
      name: "Omid Karimi",
      email: "omid@example.com",
      borrowed: 0,
      status: "Inactive",
    },
  ];

  return (
    <div className="members-page">
      <h1>Members</h1>

      <p className="members-subtitle">
        View and manage library members.
      </p>

      <div className="members-table">
        <div className="members-header">
          <span>Name</span>
          <span>Email</span>
          <span>Borrowed Books</span>
          <span>Status</span>
        </div>

        {members.map((member) => (
          <div className="member-row" key={member.id}>
            <span>{member.name}</span>
            <span>{member.email}</span>
            <span>{member.borrowed}</span>

            <span
              className={
                member.status === "Active"
                  ? "member-active"
                  : "member-inactive"
              }
            >
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Members;