import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;// replace with your backend base URL

const ImpactReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/impact-reports/get-all`);
      setReports(res.data.data || []);
    } catch (err) {
      console.error("Error fetching impact reports", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Impact Reports</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : reports.length === 0 ? (
        <p className="text-center">No impact reports available.</p>
      ) : (
        <div className="row">
          {reports.map((report) => (
            <div className="col-md-4 mb-4" key={report._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{report.title || "Untitled Report"}</h5>
                  <p className="card-text">
                    {report.description || "No description available."}
                  </p>
                </div>
                <div className="card-footer">
                  <a
                    href={`${BASE_URL}/uploads/impact-reports/${report.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-100"
                  >
                    View / Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImpactReport;
