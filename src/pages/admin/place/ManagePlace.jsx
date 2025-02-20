import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { GoArrowLeft } from "react-icons/go";
import { GoPlus } from "react-icons/go";
import { theme } from "../../../styles/themes";

import AddPlace from "./AddPlace";
import FixPlace from "./FixPlace";
import PlaceBox from "../../../components/admin/PlaceBox";
import { TokenReq } from "../../../apis/axiosInstance";

const Wrapper = styled.div`
  background-color: white;
  padding-bottom: 1rem;
`;

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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${theme.Sub1};
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default function ManagePlace() {
  const [place, setPlace] = useState([]);
  const [page, setPage] = useState("main");
  const [pageNum, setPageNum] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 10; // 한 페이지에 보여줄 개수
  const [selectedPlace, setSelectedPlace] = useState();
  const navigate = useNavigate();
  const handleNav = (address) => navigate(address);

  useEffect(() => {
    TokenReq.get("/admin/places")
      .then((res) => res.data.result)
      .then((data) => {
        setPlace(data);
      });
  }, [page, setPage]);

  const totalPages = Math.ceil(place.length / itemsPerPage); // 전체 페이지 수
  const currentPageData = place.slice(
    (pageNum - 1) * itemsPerPage,
    pageNum * itemsPerPage
  ); // 현재 페이지 데이터

  const HandlePlace = (placeId) => {
    setSelectedPlace(placeId);
    setPage("fix");
  };

  return (
    <Wrapper>
      {page === "main" ? (
        <div>
          <Header>
            <Btn onClick={() => handleNav(-1)}>
              <GoArrowLeft size={28} color={theme.Sub1} />
            </Btn>
            <Title>플레이스 관리</Title>
            <Btn onClick={() => setPage("add")}>
              <GoPlus size={28} color={theme.Sub1} />
            </Btn>
          </Header>

          {currentPageData.map((v) => {
            return (
              <div key={v.placeId} onClick={() => HandlePlace(v.placeId)}>
                <PlaceBox name={v.name} addr={v.shortDescription} />
              </div>
            );
          })}

          {/* 페이지네이션 */}
          <Pagination>
            <PageButton
              onClick={() => setPageNum(pageNum - 1)}
              disabled={pageNum === 1}
            >
              이전
            </PageButton>
            <span>
              {pageNum} / {totalPages}
            </span>
            <PageButton
              onClick={() => setPageNum(pageNum + 1)}
              disabled={pageNum === totalPages}
            >
              다음
            </PageButton>
          </Pagination>
        </div>
      ) : page === "add" ? (
        <AddPlace setPage={setPage} />
      ) : (
        <FixPlace
          selectedPlace={place.find((v) => v.placeId === selectedPlace)}
          setPage={setPage}
        />
      )}
    </Wrapper>
  );
}
