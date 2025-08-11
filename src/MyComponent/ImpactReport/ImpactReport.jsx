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
      <div className="flex justify-center items-center min-h-screen text-lg font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Impact Reports</h1>

      <div className="w-full max-w-3xl grid gap-6">
        {reports.map((report) => (
          <div
            key={report._id}
            className="border border-gray-300 p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{report.title}</h2>
            <p className="text-gray-600">{report.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactReports;
