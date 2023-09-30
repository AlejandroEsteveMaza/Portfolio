import "./About.css";
import React from 'react';
function About() {
  return (
    <div id="about" className="About-container">
      <div className="About-title">
        <h2>About Me</h2>
      </div>
      <div className="About-container-2">
        <div className="About-text">
          <div className="About-image"></div>
          <h3>An enthusiast Developer &#128187;</h3>
          <p>
          I am a <span>Full Stack Developer</span> with experience programming everything from 
          <span> Web API's</span> to <span>Embedded systems</span>. I turn ideas into code and 
          am capable of handling any obstacles, challenges, or problems. My diverse background 
          across a wide range of problem domains allows me to approach issues in a <span>pragmatic</span> and all-encompassing way.
          <br />In my free time, I love reading, going to the gym, and trekking in the woods. 
          I think being in peace with myself is a very important aspect when it comes to working in an efficient and tidy way.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
