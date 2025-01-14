import styled from "styled-components";

const Header = styled.div`
  display: flex;
  height: 6.5rem;
  padding: 3.5rem 1.25rem 1.5rem 1.25rem;
  flex-shrink: 0;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
`;

export default function Navbar() {
  return (
    <>
      <Header>헤더바</Header>
    </>
  );
}
