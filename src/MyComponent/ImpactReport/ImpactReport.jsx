import React, { useEffect, useState } from "react";
import { FileText, Image as ImageIcon, Download } from "lucide-react";
import AtmSkeleton from "../../component/atom/AtmSkeleton";

const ImpactReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://stationery-shop-backend-y2lb.onrender.com/impact-reports/get-all")
      .then((res) => res.json())
      .then((data) => {
        setReports(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">
          📊 Case Study
        </h1>

        <div className="w-full max-w-5xl grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 p-5 rounded-2xl shadow flex flex-col justify-between"
            >
              {/* Title Skeleton */}
              <AtmSkeleton width="70%" height="20px" className="mb-3" />

              {/* Description Skeleton */}
              <AtmSkeleton width="100%" height="14px" className="mb-2" />
              <AtmSkeleton width="90%" height="14px" className="mb-2" />
              <AtmSkeleton width="80%" height="14px" className="mb-4" />

              {/* Document Preview Skeleton */}
              <div className="mb-4 flex justify-center items-center h-40 border rounded-lg bg-gray-50 overflow-hidden">
                <AtmSkeleton variant="rect" width="100%" height="100%" />
              </div>

              {/* Footer Skeleton */}
              <div className="flex justify-between items-center mt-auto">
                <AtmSkeleton width="30%" height="12px" />
                <AtmSkeleton width="60px" height="28px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">
        📊 Case Study
      </h1>

      <div className="w-full max-w-5xl grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const isPDF = report.document?.toLowerCase().endsWith(".pdf");
          const fileUrl = `https://stationery-shop-backend-y2lb.onrender.com/uploads/${report.document}`;

          return (
            <div
              key={report._id}
              className="bg-white border border-gray-200 p-5 rounded-2xl shadow hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                {report.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {report.description}
              </p>

              {/* Document Preview */}
              <div className="mb-4 flex justify-center items-center h-40 border rounded-lg bg-gray-50 overflow-hidden">
                {report.document ? (
                  isPDF ? (
                    <div className="flex flex-col items-center text-blue-600">
                      <FileText size={48} />
                      <span className="text-sm mt-2">PDF Report</span>
                    </div>
                  ) : (
                    <img
                      src={fileUrl}
                      alt={report.title}
                      className="h-full w-full object-cover"
                    />
                  )
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <ImageIcon size={48} />
                    <span className="text-sm mt-2">No Document</span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xs text-gray-500">
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
                {report.document && (
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-white bg-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
                  >
                    <Download size={16} /> View
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImpactReports;
