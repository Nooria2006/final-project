import { useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  BookOpen,
  Mail,
} from "lucide-react";
import "./members.css";

function Members() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [members] = useState([
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
  ]);

  const activeMembers = members.filter(
    (member) => member.status === "Active"
  ).length;

  const inactiveMembers = members.filter(
    (member) => member.status === "Inactive"
  ).length;

  const totalBorrowed = members.reduce(
    (total, member) => total + member.borrowed,
    0
  );

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="members-page">
      <div className="members-heading">
        <div>
          <p className="members-eyebrow">LIBRARY MANAGEMENT</p>
          <h1>Library Members</h1>
          <p className="members-subtitle">
            Manage members and track their borrowing activity.
          </p>
        </div>

        <div className="members-heading-icon">
          <Users size={32} />
        </div>
      </div>

      <div className="members-stats">
        <div className="members-stat-card">
          <div className="members-stat-icon members-icon-purple">
            <Users size={23} />
          </div>
          <div>
            <p>Total Members</p>
            <h2>{members.length}</h2>
          </div>
        </div>

        <div className="members-stat-card">
          <div className="members-stat-icon members-icon-green">
            <UserCheck size={23} />
          </div>
          <div>
            <p>Active Members</p>
            <h2>{activeMembers}</h2>
          </div>
        </div>

        <div className="members-stat-card">
          <div className="members-stat-icon members-icon-orange">
            <UserX size={23} />
          </div>
          <div>
            <p>Inactive Members</p>
            <h2>{inactiveMembers}</h2>
          </div>
        </div>

        <div className="members-stat-card">
          <div className="members-stat-icon members-icon-blue">
            <BookOpen size={23} />
          </div>
          <div>
            <p>Books Borrowed</p>
            <h2>{totalBorrowed}</h2>
          </div>
        </div>
      </div>

      <div className="members-content">
        <div className="members-toolbar">
          <div>
            <h2>All Members</h2>
            <p>Search and filter your member list.</p>
          </div>

          <span className="members-count">
            {filteredMembers.length} members
          </span>
        </div>

        <div className="members-filters">
          <div className="members-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter members by status"
          >
            <option value="All">All Members</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="members-table-wrapper">
          <div className="members-table">
            <div className="members-header">
              <span>Member</span>
              <span>Email Address</span>
              <span>Borrowed Books</span>
              <span>Status</span>
            </div>

            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div className="member-row" key={member.id}>
                  <div className="member-name-cell">
                    <div className="member-avatar">
                      {member.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <span>{member.name}</span>
                  </div>

                  <span className="member-email">
                    <Mail size={15} />
                    {member.email}
                  </span>

                  <span className="member-borrowed">
                    {member.borrowed} books
                  </span>

                  <span
                    className={
                      member.status === "Active"
                        ? "member-status member-active"
                        : "member-status member-inactive"
                    }
                  >
                    <span className="member-status-dot"></span>
                    {member.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="members-empty">
                <Users size={35} />
                <h3>No members found</h3>
                <p>Try another name, email, or status filter.</p>
              </div>
            )}
          </div>
        </div>

        <p className="members-note">
          These are sample member records. Connect a database to manage
          real library members.
        </p>
      </div>
    </div>
  );
}

export default Members;