import React, { useState, useEffect } from "react";
import "../style.css";
import { TimelineMax, Power1, TweenMax } from "gsap/all";
import { ReactComponent as Logo } from "../svgFiles/logo.svg";
import { ReactComponent as TopOfThePot } from "../svgFiles/topOfThePot.svg";
import { isMobile } from "react-device-detect";
import Recipe from "./Recipe";

function LogoButton() {
  const [mouseHoverClickTimeline] = useState(new TimelineMax({ paused: true }));
  const [mouseClickTimeline] = useState(new TimelineMax({ paused: true }));
  const [wasClicked, setWasClicked] = useState(false);
  const [timeline] = useState(new TimelineMax());
  let tweenTarget = null;
  const [vh, setVh] = useState(window.innerHeight);
  window.addEventListener("resize", () => {
    setVh(window.innerHeight);
  });
  const [once, setOnce] = useState(true);

  useEffect(() => {
    // Deploy fade into screen animation once
    once &&
      TweenMax.from(tweenTarget, 1, {
        opacity: 0,
        ease: Power1.easeInOut,
      });
    setOnce(false);

    // Yoyo pot animation - only if pot wasn't clicked (the recipe isn't vissible)
    timeline.fromTo(
      tweenTarget,
      1,
      { y: `-5vh`, ease: Power1.easeInOut },
      {
        y: 0,
        repeat: -1,
        yoyo: true,
        ease: Power1.easeInOut,
      },
      "=-1"
    );
    wasClicked && timeline.pause();
    // Open pot on hover animation
    mouseHoverClickTimeline
      .to(".logo-button__top-of-the-pot", 0.3, {
        y: -15,
        x: 20,
        rotation: 30,
        transformOrigin: "100% 0%",
      })
      .to(
        "#foodInsideOfPot",
        0.6,
        { scale: 1.2, y: -70, transformOrigin: "50% 0%" },
        "=-0.3"
      );

    mouseClickTimeline
      .to(
        [".logo-button__top-of-the-pot", ".logo-button__bottom-of-the-pot"],
        0.5,
        {
          scale: 0.4,
        }
      )
      .to("#foodInsideOfPot", 0.2, { y: -60 }, "-=0.5");
  }, [
    once,
    tweenTarget,
    wasClicked,
    mouseHoverClickTimeline,
    mouseClickTimeline,
    vh,
    timeline,
  ]);

  let handleEnter = () => {
    mouseHoverClickTimeline.play();
    timeline.pause();
  };

  let handleLeave = () => {
    timeline.play();
    mouseHoverClickTimeline.reverse();
  };

  let handleClick = () => {
    mouseHoverClickTimeline.pause(0);
    setWasClicked(true);
    mouseClickTimeline.play();
  };

  return (
    <div className="logo">
      <div
        className={`logo-button ${wasClicked && "no-hover"}`}
        ref={(div) => (tweenTarget = div)}
        onMouseEnter={!wasClicked && !isMobile ? handleEnter : () => {}}
        onMouseLeave={!wasClicked && !isMobile ? handleLeave : () => {}}
        onClick={!wasClicked ? handleClick : () => {}}
      >
        <div className="logo-button__top-of-the-pot">
          <TopOfThePot />
        </div>

        {wasClicked && <Recipe />}

        <div className="logo-button__bottom-of-the-pot">
          <Logo />
        </div>
      </div>
    </div>
  );
}
/**/
export default LogoButton;
