import React, { useEffect, useState } from "react";

const ImpactReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://tbtdj99v-3300.inc1.devtunnels.ms/impact-reports/get-all")
      .then((res) => res.json())
      .then((data) => {
        setReports(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom:"20px" }}><b>Impact Reports</b></h1>

      {reports.map((report) => (
        <div
          key={report._id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            margin: "10px",
            width: "100%",
            maxWidth: "500px",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2>{report.title}</h2>
          <p>{report.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ImpactReports;

