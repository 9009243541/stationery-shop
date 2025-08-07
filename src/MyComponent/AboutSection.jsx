import React from "react";
const AboutSection = () => {
  return (
    <section
      className="py-5 text-dark"
      style={{
        background: "linear-gradient(to bottom, #fefefe, #f3f4f6)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 mb-4">
            <center>
              <img
                src="/images/AV_about.jpeg"
                alt="About NGO"
                className="img-fluid rounded-4 shadow-lg"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </center>
          </div>
          <div className="col-lg-8">
            <h2 className="fw-bold mb-4 display-6 text-primary">Who We Are</h2>
            <p className="lead text-secondary mb-3">
              We are a passionate non-profit organization committed to creating
              meaningful change. Our focus is to uplift underprivileged
              communities by providing access to education, nutrition, and
              healthcare.
            </p>
            <p className="text-secondary">
              Every initiative we take aims at building a brighter and
              sustainable future.
              <br />
              Join us in making a real difference — one life at a time.
            </p>
            <a
              href="/donate"
              className="btn btn-primary px-4 py-2 mt-4 shadow-sm rounded-pill"
            >
              Support Our Mission
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
