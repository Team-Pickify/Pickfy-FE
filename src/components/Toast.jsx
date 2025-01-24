import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0%{
    opacity: 0%;
  }
  50%{
    opacity: 100%;
  }
  100%{
    opacity: 0%;
  }
`;

const ToastWrapper = styled.div`
  width: 100vw;

  @media screen and (min-width: 600px) {
    width: 600px;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 2.5rem;

  animation: ${fadeIn} 3s forwards;
`;

const ToastContainer = styled.div`
  width: 88vw;

  @media screen and (min-width: 600px) {
    width: 550px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;

  font-size: 1rem;
  color: white;
  background-color: black;
  border-radius: 2rem;
`;

export default function Toast({ message, setToastVisible }) {
  let text = <div>{message}</div>;

  useEffect(() => {
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  }, []);

  return (
    <ToastWrapper>
      <ToastContainer>{text}</ToastContainer>
    </ToastWrapper>
  );
}
