import { Canvas } from "@react-three/fiber";
import React, { Suspense, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { Model3 } from "../components/Scene3";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { ColorContext } from "../context/ColorContext";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;

  background-color: var(--white);
  overflow: hidden;
`;

const Section = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;

  background-color: "#9bb5ce";
`;

const Phone = styled.div`
  width: 100%;
  height: 70%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  cursor: grab;
`;

const Colors = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 35%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 64em) {
    left: 10%;
  }
`;

const Color = styled.li`
box-sizing: border-box;
  list-style: none;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0.5rem 0;
  opacity: ${(props) => (props.currentColor === props.color ? 1 : 0.6)};

  border: ${(props) =>
    props.currentColor === props.color ? "1px solid var(--dark)" : "none"};
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: var(--fontxl);
  padding: 0.3rem;
`;

const Subtitle = styled.h2`
  font-size: var(--fontmd);
  font-family: var(--fontL);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: 0.4rem 1rem;
  border-radius: 50px;

  border: none;
  outline: none;

  background-color: var(--blue);
  color: var(--white);
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const BtnLink = styled.a`
  color: var(--blue);
  text-decoration: none;
  margin-left: 1.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const IndicatorText = styled.div`
  font-size: var(--fontsm);
  position: absolute;
  top: 1rem;
`;

const PricingSection = () => {
  const { currentColor, changeColorContext } = useContext(ColorContext);
  const sectionRef = useRef(null);

  useEffect(() => {
    sectionRef.current.style.backgroundColor = `rgba(${currentColor.rgbColor},0.4)`;
  }, [currentColor]);

  let updateColor = (color, text, rgbColor) => {
    const colorObj = {
      color,
      text,
      rgbColor,
    };
    changeColorContext(colorObj);
  };

  return (
    <Container>
      <Section ref={sectionRef}>
        <Phone>
          <IndicatorText>360&deg; &#x27F2;</IndicatorText>
          <Canvas camera={{ fov: 14 }}>
            <ambientLight intensity={1} />
            <directionalLight intensity={0.4} />
            <Suspense fallback={null}>
              <Model3 />
            </Suspense>
            <Environment preset="sunset" />
            <OrbitControls enableZoom={false} />
          </Canvas>
          <Colors>
            <Color
              currentColor={currentColor.color}
              color="#9BB5CE"
              onClick={() =>
                updateColor("#9BB5CE", "Sierra Blue", "155, 181, 206")
              }
            />
            <Color
              currentColor={currentColor.color}
              color="#fad7bd"
              onClick={() => updateColor("#fad7bd", "Rose Gold", "250, 215, 189")}
            />
            <Color
              currentColor={currentColor.color}
              color="#F1F2ED"
              onClick={() =>
                updateColor("#F1F2ED", "Silver", "241, 242, 237")
              }
            />
            <Color
              currentColor={currentColor.color}
              color="#b8afe6"
              onClick={() =>
                updateColor("#b8afe6", "Purple", "184, 175, 230")
              }
            />
            <Color
              currentColor={currentColor.color}
              color="#aee1cd"
              onClick={() => updateColor("#aee1cd", "Light Green", "174, 225, 205")}
            />
            <Color
              currentColor={currentColor.color}
              color="#ffe681"
              onClick={() => updateColor("#ffe681", "Light Yellow", "255, 230, 129")}
            />
          </Colors>
        </Phone>
        <Details>
          <Subtitle>iPhone</Subtitle>
          <Title>16 Pro Max</Title>
          <Subtitle>From $1,999</Subtitle>
          <ButtonContainer>
            <Btn>Buy</Btn>
            <BtnLink href="#">Learn more &#x2192;</BtnLink>
          </ButtonContainer>
        </Details>
      </Section>
    </Container>
  );
};

export default PricingSection;
