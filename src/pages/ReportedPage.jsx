import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

export function ReportedPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reportedUsers, setReportedUsers] = useState([]);

  useEffect(() => {
    if (user && !user.isAdmin) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (user?.isAdmin) {
      axios
        .get(`${API_URL}/reports`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          setReportedUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching reported users:", error);
        });
    }
  }, [user]);

  if (!user || !user.isAdmin) return null;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Reported Users</h1>
      {reportedUsers.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul className="space-y-2">
          {reportedUsers.map((report) => (
            <li key={report._id} className="border p-2 rounded">
              <p>
                <strong>Reported User:</strong> {report.reportedUser?.username}
              </p>
              <p>
                <strong>Reason:</strong> {report.reason}
              </p>
              <p>
                <strong>Reported By:</strong> {report.reporter?.username}
              </p>
              {report.message && (
                <p>
                  <strong>Message:</strong> {report.message}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
