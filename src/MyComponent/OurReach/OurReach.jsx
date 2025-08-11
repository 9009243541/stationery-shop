import React from "react";
import { FaCity, FaUsers, FaRegSmile, FaCalendarAlt } from "react-icons/fa";

const OurReach = () => {
  const stats = [
    {
      icon: <FaCity size={40} className="text-primary" />,
      title: "Cities Covered",
      value: "25+",
    },
    {
      icon: <FaUsers size={40} className="text-success" />,
      title: "Happy Clients",
      value: "5,000+",
    },
    {
      icon: <FaRegSmile size={40} className="text-warning" />,
      title: "Projects Completed",
      value: "1,200+",
    },
    {
      icon: <FaCalendarAlt size={40} className="text-danger" />,
      title: "Years of Experience",
      value: "10+",
    },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">Our Reach</h2>
      <div className="row g-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-6 col-md-3">
            <div className="card text-center shadow border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <div
                  className="mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  {stat.icon}
                </div>
                <h5 className="card-title fw-bold">{stat.value}</h5>
                <p className="card-text text-muted">{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurReach;
