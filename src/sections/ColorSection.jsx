/* eslint-disable react-hooks/exhaustive-deps */
import gsap from "gsap";
import React from "react";
import { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Model2 from "../components/Scene2";
import { useContext } from "react";
import { ColorContext } from "../context/ColorContext";
import { useEffect } from "react";
import { Environment } from "@react-three/drei";

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  background-color: rgba(155, 181, 206, 0.8);
  position: relative;

  @media screen and (max-width: 48em) {
    width: 100%;
  }
`;
const Right = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  background-color: rgba(155, 181, 206, 0.4);
  position: relative;

  @media screen and (max-width: 48em) {
    display: none;
  }
`;

const Center = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  font-size: var(--fontxxl);
  text-transform: uppercase;
  filter: brightness(0.85);

  @media screen and (max-width: 48em) {
    top: 2rem;
    transform: translate(-50%, 0%) rotate(0deg);
  }
`;

const ColorSection = () => {
  const { currentColor, changeColorContext } = useContext(ColorContext);

  const sectionRef = useRef(null);
  const rightRef = useRef(null);
  const leftRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let rightElem = rightRef.current;
    let leftElem = leftRef.current;
    let textElem = textRef.current;

    textElem.innerText = currentColor.text;
    textElem.style.color = currentColor.color;
    rightElem.style.backgroundColor = `rgba(${currentColor.rgbColor}, 0.4)`;
    leftElem.style.backgroundColor = `rgba(${currentColor.rgbColor}, 0.8)`;
  }, [currentColor]);

  useLayoutEffect(() => {
    let Elem = sectionRef.current;

    let updateColor = (color, text, rgbColor) => {
      const colorObj = {
        color,
        text,
        rgbColor,
      };
      changeColorContext(colorObj);
    };

    // pin the section
    gsap.to(Elem, {
      scrollTrigger: {
        trigger: Elem,
        pinnedContainer: Elem,
        start: "top top",
        end: `+=${Elem.offsetWidth + 1000}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    let t2 = gsap
      .timeline({
        scrollTrigger: {
          trigger: Elem,
          start: "top top",
          // start: self => self.previous().end,
          end: `+=${Elem.offsetWidth + 1000}`,
          scrub: 1,
        },
      })
      .to(Elem, {
        onStart: updateColor,
        onStartParams: ["#9BB5CE", "Sierra Blue", "155, 181, 206"],
        onReverseComplete: updateColor,
        onReverseCompleteParams: ["#9BB5CE", "Sierra Blue", "155, 181, 206"],
      })
      .to(Elem, {
        onStart: updateColor,
        onStartParams: ["#fad7bd", "Rose Gold", "250, 215, 189"],
        onReverseComplete: updateColor,
        onReverseCompleteParams: ["#fad7bd", "Rose Gold", "250, 215, 189"],
      })
      .to(Elem, {
        onStart: updateColor,
        onStartParams: ["#F1F2ED", "Silver", "241, 242, 237"],
        onReverseComplete: updateColor,
        onReverseCompleteParams: ["#F1F2ED", "Silver", "241, 242, 237"],
      })
      .to(Elem, {
        onStart: updateColor,
        onStartParams: ["#b8afe6", "Purple", "184, 175, 230"],
        onReverseComplete: updateColor,
        onReverseCompleteParams: ["#b8afe6", "Purple", "184, 175, 230"],
      })
      .to(Elem, {
        onStart: updateColor,
        onStartParams: ["#aee1cd", "Light Green", "174, 225, 205"],
        onReverseComplete: updateColor,
        onReverseCompleteParams: ["#aee1cd", "Light Green", "174, 225, 205"],
      })
      .to(Elem, {
        onStart: updateColor,
        onStartParams: ["#ffe681", "Light Yellow", "255, 230, 129"],
        onReverseComplete: updateColor,
        onReverseCompleteParams: ["#ffe681", "Light Yellow", "255, 230, 129"],
      });

    return () => {
      if (t2) t2.kill();
    };
  }, []);

  return (
    <Section ref={sectionRef}>
      <Left ref={leftRef} />
      <Center ref={textRef} />
      <Right ref={rightRef}>
        <Canvas camera={{ fov: 6.5 }}>
          <ambientLight intensity={1.25} />
          <directionalLight intensity={0.4} />
          <Suspense fallback={null}>
            <Model2 />
          </Suspense>
          <Environment preset="sunset" />
          {/* <OrbitControls /> */}
        </Canvas>
      </Right>
    </Section>
  );
};

export default ColorSection;
