import styled from "styled-components";
import { GoArrowLeft } from "react-icons/go";
import { CiShare2 } from "react-icons/ci";
import { LuUserRound } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { theme } from "../../styles/themes";
import { useNavigate } from "react-router-dom";

const Btn = styled.div`
  cursor: pointer;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const icons = {
  back: { ic: <GoArrowLeft size={28} color={theme.Sub1} />, addr: -1 },
  share: { ic: <CiShare2 size={28} color={theme.Sub1} />, addr: "/" },
  setting: {
    ic: <LuUserRound size={28} color={theme.Sub1} />,
    addr: "/setting",
  },
  myplacelist: {
    ic: <CiHeart size={28} color={theme.Sub1} />,
    addr: "/myplacelist",
  },
};

export default function HeaderBtn({ pageLoc, pos }) {
  const navigate = useNavigate();
  const handleNav = (address) => navigate(address);

  let icon;
  if (pageLoc === "") {
    icon = pos === "left" ? icons.setting : icons.myplacelist;
  } else if (pageLoc === "myplacelist") {
    icon = pos === "left" ? icons.back : icons.share;
  } else if (pageLoc === "setting") {
    icon = pos === "left" ? icons.back : "none";
  }

  return <Btn onClick={() => handleNav(icon.addr)}>{icon.ic}</Btn>;
}
