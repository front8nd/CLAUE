import React from "react";
import BlogImg1 from "/src/assets/blog-1.png";
import BlogImg2 from "/src/assets/blog-2.png";
import BlogImg3 from "/src/assets/blog-3.png";

import "./style.css";
export default function BlogContent() {
  return (
    <div className="latestfromblog">
      <div className="blog-heading">
        <div className="trending-text">
          <p className="trending">Latest From Blog</p>
          <p className="t-text">The freshest and most exciting news</p>
        </div>
        <div className="blog">
          <div className="blog-content">
            <div className="blog-thumb">
              <img src={BlogImg1} />
            </div>
            <div className="blog-content-body">
              <h3 className="blog-content-title">
                Blueberry Collection for Women
              </h3>
              <div className="blog-meta">
                By <span style={{ color: "#222" }}>claue2</span> on{" "}
                <span>JUL 30, 2021</span>
              </div>
              <span className="blog-content-short">
                In recent years, the fashion industry has shifted its focus
                towards sustainability. Designers are increasingly using eco...
              </span>
            </div>
          </div>
          <div className="blog-content">
            <div className="blog-thumb">
              <img src={BlogImg2} />
            </div>
            <div className="blog-content-body">
              <h3 className="blog-content-title">
                Paris Fashion Week For Women
              </h3>
              <div className="blog-meta">
                By <span style={{ color: "#222" }}>claue2</span> on{" "}
                <span>JUL 30, 2021</span>
              </div>
              <span className="blog-content-short">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, do
                eiusmod tempor incididunt ut labore et dolore magna aliqua....
              </span>
            </div>
          </div>
          <div className="blog-content">
            <div className="blog-thumb">
              <img src={BlogImg3} />
            </div>
            <div className="blog-content-body">
              <h3 className="blog-content-title">
                Fashion and Mental Health: Boosting Your Mood Through Dress
              </h3>
              <div className="blog-meta">
                By <span style={{ color: "#222" }}>claue2</span> on{" "}
                <span>JUL 30, 2021</span>
              </div>
              <span className="blog-content-short">
                The history of fashion is a fascinating journey through time.
                From the flapper dresses of the 1920s to the bell-bottoms ...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
