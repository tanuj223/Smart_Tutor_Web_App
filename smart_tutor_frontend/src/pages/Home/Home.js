import React, { useEffect } from "react";
import notes from "../../assets/notes2.svg";
import recommendations from "../../assets/recommend2.svg";
import qna from "../../assets/qna2.svg";
import { Link } from "react-router-dom";
import titleImg from "../../assets/titleImage.svg";
import Navbar from "src/components/Navbar/Navbar";
import classes from "./Home.module.css";

const Home = (props) => {

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7 home-container mt-4">
              <div className="heading">
                {" "}
                {"SmartTutor is a powerful"}{" "}
                <span style={{ color: "#6a43a5" }}>
                  {"NLP Driven"}
                </span>{" "}
                {"Solution"}
              </div>
              <div className="sub-heading mt-3">
                Make self study sessions more productive than ever!
              </div>
              <div className="btn-container">
                <Link to="/login" target="_blank">
                  <div className="btn home-btn mt-4">
                    Get Started For{" "}
                    <span style={{ color: "#FFD601" }}>Free</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-5 mt-4">
              {/* <video className="home-vid" autoPlay loop muted playsinline>
                <source src="https://cdn.modcart.io/landing/home.webm" type="video/webm" />
              </video> */}
              <img
                src={titleImg}
                className="home-vid"
              />
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="container-fluid">
          <div
            className="row flex-column-reverse flex-md-row"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            <div className="col-md-6">
              {/* <img className="section-1-img" src="https://cdn.modcart.io/landing/section1.png" /> */}
              <img className="section-2-vid" src={recommendations} />

              {/* <img
                className="section-1-vid"
                src="https://cdn.modcart.io/landing/section-1.gif"
              /> */}
            </div>
            <div className="col-md-6">
              <div className="content">
                <div className="section-1-heading">
                  Recommendations
                </div>
                <div className="section-1-text mt-3">
                  Get Curated online sources related to the chapters uploaded by you. Consists of relevant links from wikipedia, youtube, etc.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-fluid">
          <div className="row " data-aos="fade-up" data-aos-duration="1500">
            <div className="col-md-6 ">
              <div className="content">
                <div className="section-2-heading">
                  {" "}
                  Organized Notes
                </div>
                <div className="section-2-text mt-3">
                  Extract relevant summary/points from the uploaded chapter. The summary can be customized.
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <img className="section-2-vid" src={notes} />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-fluid">
          <div
            className="row  flex-column-reverse flex-md-row"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            <div className="col-md-6">
              <img className="section-2-vid" src={qna} />
            </div>
            <div className="col-md-6 ">
              <div className="content">
                <div className="section-2-heading">
                  {" "}
                  Solved Questions For Practice
                </div>
                <div className="section-2-text mt-3">
                  Generate question answer pairs, to test your learning abilities.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="col-12 text-center mt-3 mb-5" style={{ color: 'white' }}>
        <h1>
          <b>Enhance your Self Studies from today</b>
        </h1>
        <a href="/">
          <div className={classes.button + " btn mt-4 mb-5"}>
            Register for Free
          </div>
        </a>
      </div>
    </>
  );
};

export default Home;
