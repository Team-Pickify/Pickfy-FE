import styled from "styled-components";
import { GoArrowLeft } from "react-icons/go";
import { CiShare2 } from "react-icons/ci";
import { LuUserRound } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { theme } from "../../styles/themes";
import { useNavigate } from "react-router-dom";
import ShareModal from "../modal/shareUrl";
import CheckMsg from "../toast/CheckMsg";
import { useState } from "react";
import Toast from "../toast/Toast";

const Btn = styled.div`
  cursor: pointer;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ToastContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  pointer-events: none;
  z-index: 1000;
`;

const icons = {
  back: { ic: <GoArrowLeft size={28} color={theme.Sub1} />, addr: -1 },
  share: { ic: <CiShare2 size={28} color={theme.Sub1} />, addr: "share" },
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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const ModalOpen = () => {
    setIsShareModalOpen(true);
  };
  const ModalClose = () => {
    setIsShareModalOpen(false);
  };

  const handleNav = (address) => {
    if (address === "share") {
      setIsShareModalOpen(true); // 모달 열기
    } else {
      navigate(address);
    }
  };
  const [toastVisible, setToastVisible] = useState(false);
  const [message, setMessage] = useState("");
  const handleToast = (msg) => {
    setMessage(<CheckMsg msg={msg} />);
    setToastVisible(true);
  };
  let icon;
  if (pageLoc === "") {
    icon = pos === "left" ? icons.setting : icons.myplacelist;
  } else if (pageLoc === "myplacelist") {
    icon = pos === "left" ? icons.back : icons.share;
  } else if (pageLoc === "setting") {
    icon = pos === "left" ? icons.back : "none";
  }

  return (
    <>
      {toastVisible && (
        <ToastContainer>
          <Toast message={message} setToastVisible={setToastVisible} />
        </ToastContainer>
      )}
      <Btn onClick={() => handleNav(icon.addr)}>{icon.ic}</Btn>
      {isShareModalOpen && (
        <ShareModal
          isOpen={ModalOpen}
          onClose={ModalClose}
          onToast={handleToast}
        />
      )}
    </>
  );
}
