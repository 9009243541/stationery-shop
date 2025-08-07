import React from "react";
import image01 from "../../public/images/ngo.jpg";

const AboutSection = () => {
  return (
    <section
      className="py-5 text-dark"
      style={{
        background: "linear-gradient(to bottom, #fefefe, #f3f4f6)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center text-center">
          {/* Image */}
          <div className="col-lg-6 mb-4 ml-25">
            <img
              src={image01}
              alt="About NGO"
              className="img-fluid rounded-4 shadow-lg"
              style={{ maxHeight: "500px", objectFit: "cover", width: "100%" }}
            />
          </div>

          {/* Text content */}
          <div className="col-lg-10">
            {/* <h2 className="display-5 fw-bold mb-3 text-primary  d-inline-block pb-2">
              Who We Are
            </h2> */}
            <p className="lead text-muted mb-3">
              We are a <span className="fw-semibold text-dark">passionate non-profit</span> organization
              committed to making lasting social impact.
            </p>
            <p className="text-secondary mb-3">
              Our mission focuses on <strong className="text-dark">uplifting underprivileged communities</strong> by ensuring access to <strong>education, nutrition,</strong> and <strong>healthcare</strong>.
            </p>
            <p className="text-secondary mb-4">
              Every step we take is toward a <span className="fw-semibold text-dark">sustainable and empowered future</span>.
              <br />
              <strong>Join us in transforming lives, one child at a time.</strong>
            </p>
            <a
              href="/donate"
              className="btn btn-primary rounded-pill px-5 py-3 shadow"
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
