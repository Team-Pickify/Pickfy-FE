import styled from "styled-components";
import { useState } from "react";

import { GoArrowLeft } from "react-icons/go";
import { GoPlus } from "react-icons/go";
import { theme } from "../../../styles/themes";
import Linkbox from "../../../components/Linkbox";
import AddMagazine from "./AddMagazine";
import FixMagazine from "./FixMagazine";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TokenReq } from "../../../apis/axiosInstance";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.5rem 0.2rem 1.5rem;
  height: 6.5rem;
  background-color: white;
  border-bottom: 1px solid #e6e6e6;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;

const Btn = styled.div`
  cursor: pointer;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function MangeMagazine() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState("main");
  const [selectedBrand, setSelectedBrand] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    TokenReq.get("/magazines")
      .then((res) => res.data.result)
      .then((data) => {
        const getData = data.map((v) => {
          return {
            id: v.id,
            title: v.title,
            iconUrl: v.iconUrl,
          };
        });
        setList(getData);
      });
  }, [page, setPage]);

  const HandleLeftBtn = () => {
    navigate(-1);
  };
  const HandleRightBtn = () => {
    setPage("add");
  };
  const HandleBrandName = (idx) => {
    setSelectedBrand(idx);
    setPage("fix");
  };

  return (
    <div>
      {page === "main" ? (
        <div>
          <Header>
            <Btn onClick={HandleLeftBtn}>
              <GoArrowLeft size={28} color={theme.Sub1} />
            </Btn>
            <Title>매거진 관리</Title>
            <Btn onClick={HandleRightBtn}>
              <GoPlus size={28} color={theme.Sub1} />
            </Btn>
          </Header>
          {list.map((v) => (
            <div key={v.id} onClick={() => HandleBrandName(v.id)}>
              <Linkbox name={v.title} addr="#" />
            </div>
          ))}
        </div>
      ) : page === "add" ? (
        <AddMagazine setPage={setPage} />
      ) : (
        <FixMagazine
          mag={list.filter((v) => v.id === selectedBrand)[0]}
          setPage={setPage}
        />
      )}
    </div>
  );
}
