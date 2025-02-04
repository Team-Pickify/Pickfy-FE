import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PiCompassRoseDuotone } from "react-icons/pi";
import mapPermission from '../../hooks/mapPermission';
import CategoryBtn from '../../components/categoryBtn'
import redMarker from "../../assets/redmarker.svg"
import blackMarker from "../../assets/black_marker.svg"
<<<<<<< Updated upstream:src/pages/map/map.jsx
=======
import { theme } from "../../styles/themes";
import axios from 'axios';
import { TokenReq as getApi } from '../../apis/axiosInstance';
import Info from '../../components/Info';
import InfoSmall from '../../components/InfoSmall';
>>>>>>> Stashed changes:src/pages/main/map.jsx

const kk = [
  {
    id : 1,
    name:"컴투레스트",
    category:"카페/베이커리",
    shortDescription:"에스프레소 어쩌고",
    images:["w","w"]
           
  }
]

const category = ["","전체","음식점","카페","베이커리","바","펍","도서","문구"
];

<<<<<<< Updated upstream:src/pages/map/map.jsx
=======

>>>>>>> Stashed changes:src/pages/main/map.jsx
function Mapview() {

  const [placearray,setplacearray] = useState([]);

<<<<<<< Updated upstream:src/pages/map/map.jsx
  const [btnClick, setBtnClick] = useState([0,0,0,0,0,0]);
=======
  const [magazinearray,setmagazinearray] = useState([])

  const [categorybtn, setcategorybtn] = useState([1,0,0,0,0]);
  const [magazinebtn, setmagazinebtn] = useState([]);
>>>>>>> Stashed changes:src/pages/main/map.jsx

  const [isloading ,setloading] = useState(false);

  const [curmap,setcurmap] = useState([]);

  const mapRef = useRef(null);

  const scrollRef = useRef(null);

  const bottomSheetRef = useRef(null);

  /////////////////////////////////

  const [startY, setStartY] = useState(0);
  const [translateY, setTranslateY] = useState(100); // 기본적으로 숨김
  const [bottomSheetState, setBottomSheetState] = useState("hidden"); // "hidden" | "half" | "full"
  const [isDragging, setIsDragging] = useState(false);

  // 📌 터치 & 마우스 이벤트 통합 함수
  const getClientY = (e) => (e.touches ? e.touches[0].clientY : e.clientY);

  // 📌 터치 & 마우스 드래그 시작
  const handleStart = (e) => {
    setStartY(getClientY(e));
    setIsDragging(true);
  };

  // 📌 터치 & 마우스 드래그 종료 (위/아래 스와이프 감지)
  const handleEnd = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    const endY = getClientY(e);
    const deltaY = endY - startY;

    // 📌 **위로 스와이프하면 100%로 이동**
    if (deltaY < -50) {
      setTranslateY(0);
      setBottomSheetState("full");
    }
    // 📌 **아래로 스와이프하면 50% 또는 숨김**
    else if (deltaY > 50) {
      if (bottomSheetState === "full") {
        setTranslateY(50); // 100% → 50%로 내려감
        setBottomSheetState("half");
      } else {
        setTranslateY(100); // 50% → 숨김
        setBottomSheetState("hidden");
      }
    }
  };

  // 📌 버튼 클릭하면 바텀시트 50%까지 올림
  const handleOpenBottomSheet = () => {
    setTranslateY(50);
    setBottomSheetState("half");
  };
  ////////////////////////////


  const handleWheel = (e) => {
    scrollRef.current.scrollLeft += (e.deltaY*0.3); // 수직 스크롤(deltaY)을 가로 스크롤로 변환
  };
  const scrollRef2 = useRef(null);

  const handleWheel2 = (e) => {
    scrollRef2.current.scrollLeft += (e.deltaY*0.3); // 수직 스크롤(deltaY)을 가로 스크롤로 변환
  };

<<<<<<< Updated upstream:src/pages/map/map.jsx
=======
  

  const handleClick = (id) => {
    const newarr = categorybtn.map((v,i)=>{
      if(i == id){
        return (v ? 0 : 1)
      }
      else{
        return v
      }
     })
     setcategorybtn(newarr)
     console.log(newarr)
     console.log(magazinebtn)
     getPlaceData(newarr,magazinebtn)
  };

  const handleClick2= (id) => {
    const newarr = magazinebtn.map((v,i)=>{
      if(i == id){
        return (v ? 0 : 1)
      }
      else{
        return v
      }
     })
     setmagazinebtn(newarr)
     console.log(categorybtn)
     console.log(newarr)
     getPlaceData(categorybtn,newarr)
  };

  const getmagazinelist = async()=>{
    await getApi.get("/magazines")
    .then((res)=>{
      console.log(res.data.result)
      const newarr = res.data.result.map(()=>{return 0})
      console.log(newarr)
      setmagazinebtn(newarr)
      setmagazinearray(res.data.result)
    })
    .catch((error)=>{console.error(error)})
    

  }

  const getPlaceData = async(cate,maga)=>{
    
  }

>>>>>>> Stashed changes:src/pages/main/map.jsx


  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API is not loaded!");
      return;
    }
<<<<<<< Updated upstream:src/pages/map/map.jsx
=======

    getmagazinelist();



>>>>>>> Stashed changes:src/pages/main/map.jsx
    const container = mapRef.current;
    // Kakao Maps API 로드 후 실행
    window.kakao.maps.load(() => {
      mapPermission();
      mapCurLocation_toInit(container);
    });

  }, []);

  const handlebutton = ()=>{
    const container = mapRef.current;
    mapCurLocation_toInit(container);
  }


  
const mapCurLocation_toInit = (container)=>{

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords; // 사용자의 현재 위치 좌표
      console.log(latitude,longitude)

      console.log("Accuracy:", position.coords.accuracy, "meters");
      InitializeMap(latitude, longitude , container);
    },
    (error) => {
      console.error("Error getting user location:", error);
      // 위치를 가져오지 못하면 기본 좌표(제주시)로 설정
      InitializeMap(33.450701, 126.570667, container);
    },
    {enableHighAccuracy: true}
  );

}

const InitializeMap =(latitude,longitude , container)=>{ 
  // 지도를 표시할 DOM 요소
  const options = {
    center: new window.kakao.maps.LatLng(latitude, longitude),
    level: 4,
  };
  const newmap = new window.kakao.maps.Map(container, options); // 지도 생성
  setcurmap(newmap)
  const imageSize = new kakao.maps.Size(40, 45); 
  var curmarkerimage = new kakao.maps.MarkerImage(blackMarker, imageSize); 
        const curmarker = new window.kakao.maps.LatLng(latitude,longitude);
        const marking = new window.kakao.maps.Marker({
            map: newmap, // 마커를 표시할 지도
            position: curmarker, // 마커 위치
            title: "내 위치", // 마커 제목
            image: curmarkerimage
        });
  setBtnClick([0,0,0,0,0,0])
}



const mapCurLocation_toMark = (newarr)=>{

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords; // 사용자의 현재 위치 좌표
      console.log(latitude,longitude)

      console.log("Accuracy:", position.coords.accuracy, "meters");
      Marking(latitude, longitude,newarr);
    },
    (error) => {
      console.error("Error getting user location:", error);
      // 위치를 가져오지 못하면 기본 좌표(제주시)로 설정
      Marking(33.450701, 126.570667,newarr);
    },
    {enableHighAccuracy: true}
  );

}


const Marking = (latitude,longitude,newarr)=>{

    const places = new kakao.maps.services.Places();
    console.log(newarr)
    setBtnClick(newarr)
    let arrdetail = [0,0,0,0,0,0,0,0,0]
    for(var i = 1;i<=5;i++){
      if(newarr[i] === 1){
        if(i<=2){
          arrdetail[i] = 1;
        }
        else if(i === 3){
          arrdetail[3] = 1;
          arrdetail[4] = 1;
        }
        else if(i === 4){
          arrdetail[5] = 1;
          arrdetail[6] = 1;
        }
        else{
          arrdetail[7] = 1;
          arrdetail[8] = 1;
        }
      }
    }

    let arr = [];
    const curlocation = new kakao.maps.LatLng(latitude, longitude)

    const promises = arrdetail.map((v, i) => {
      if (v === 1) {
        return new Promise((resolve, reject) => {
          places.keywordSearch(`${category[i]}`, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              resolve(result);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
              console.log("검색 결과가 없습니다.");
              resolve([]);
            } else {
              console.log("검색 중 오류가 발생했습니다.");
              reject(new Error("검색 오류 발생"));
            }
          },
          {
            location: curlocation, // 중심 좌표 설정
            radius: 2000, // 검색 반경 (단위: 미터)
          }
        );
        });
      }
      return Promise.resolve([]); // `v !== 1`일 경우 빈 배열 반환
    });
  
    Promise.all(promises)
      .then((results) => {
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 4,
        };
        const newmap = new window.kakao.maps.Map(mapRef.current, options);
        const imageSize = new kakao.maps.Size(50, 55); 
        const imageSize2 = new kakao.maps.Size(40, 45); 
       const imageSrc = redMarker;
       const imageSrc2 = blackMarker;
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        var markerImage2 = new kakao.maps.MarkerImage(imageSrc2, imageSize2); 
        arr = results.flat(); // 결과 평탄화
        console.log(arr);
        for(var i = 0;i<arr.length;i++){
          const marker = new kakao.maps.Marker({
            map: newmap,
            position: new kakao.maps.LatLng(arr[i].y, arr[i].x),
            image: markerImage
        });
        kakao.maps.event.addListener(marker, "click", () => {
          handleOpenBottomSheet();
        });
        }
        const curmarker = new kakao.maps.Marker({
          map: newmap,
          position: new kakao.maps.LatLng(latitude, longitude),
          image: markerImage2
      });
        setplacearray(arr)
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });

  }

<<<<<<< Updated upstream:src/pages/map/map.jsx


  const handleBottomSheet = () => {
    const sheet = bottomSheetRef.current
    if (sheet.classList.contains("visible")) {
      sheet.classList.remove("visible");
    } else {
      sheet.classList.add("visible");
    }
  };
=======
  
>>>>>>> Stashed changes:src/pages/main/map.jsx


  return (
    <>
     <Mapbox ref = {mapRef}>
<<<<<<< Updated upstream:src/pages/map/map.jsx
        <CategoryBtn btnClick={btnClick} setBtnClick= {setBtnClick} mapCurLocation_toMark = {mapCurLocation_toMark} container = {mapRef.current}></CategoryBtn>
=======
     <Wrapper>
      {category.map((item,i) => (
        <Items
          key={item.id}
          onClick={()=>{handleClick(i)}}
          isActive={categorybtn[i] === 1}
        >
          {item.name}
        </Items>
      ))}
    </Wrapper>
>>>>>>> Stashed changes:src/pages/main/map.jsx
      
      <Curdesbutton onClick={handlebutton}>
        <PiCompassRoseDuotone style={{width:"80%",height:"80%"}}/>
      </Curdesbutton>
<<<<<<< Updated upstream:src/pages/map/map.jsx
      {/* <CCC onClick={()=>{handleBottomSheet()}}>눌러</CCC> */}
       <BottomSheet ref={bottomSheetRef}>
        <div style={{width:"100%",height:"90%",backgroundColor:"white"}}>

=======
      <Wrapper2>
      {magazinearray.map((item,i) => (
        <Items
          key={item.id}
          onClick={()=>{handleClick2(i)}}
          isActive={magazinebtn[i] === 1}
        >
          {item.title}
        </Items>
      ))}
    </Wrapper2>
    <CCC onClick={handleOpenBottomSheet}></CCC>
       <BottomSheet ref={bottomSheetRef}
      
       style={{ transform: `translateY(${translateY}%)` }}
       onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
       > 
        <BottomSheettop>
          <div style={{ width: "8%", height: "7%" ,backgroundColor:theme.Sub3,marginTop:"2%" , borderRadius:"5% 5% 5% 5%"}}></div>
        </BottomSheettop>
        {bottomSheetState === "full" ? (
           <div style={{ width: "100%", height: "95%" ,backgroundColor:"black"}}>
            
         </div>
        ) : <div style={{ width: "100%", height: "95%"}}>
        <div style={{ width: "100%", height: "100%" , marginLeft:"5%"}}>
         <InfoSmall places={kk}>
         </InfoSmall>
>>>>>>> Stashed changes:src/pages/main/map.jsx
        </div>
     </div>}
       
       
        </BottomSheet>
       
       
    </Mapbox>
    
    </>
      
  );
}
export default Mapview;


const Mapbox = styled.div`
  position: relative;
  width: 100%;
  height: 85%;
  z-index: 1;
  overflow:hidden;
`;

const Curdesbutton = styled.button`
  background-color: white;
  border: none;
  border-radius: 100%;
  height: 6vh;
  width: 3vw;
  position: absolute;
  top: 75%;
  left: 80%;
  z-index: 10;
  &:hover {
    background-color: grey;
    transition: 0.7s;
  }
`;

const CategorieBar = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  z-index: 10;
  position: absolute;
  top: 10%;
  width: 100%;
  height: 5vh;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MagazineBar = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  z-index: 10;
  position: absolute;
  top: 86%;
  width: 100%;
  height: 5vh;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategorieBox = styled.button`
  border: none;
  border-radius: 42%;
  flex: 0 0 auto;
  height: 100%;
  width: 8vw;
  background-color: white;
  margin-left: 0.3vw;
  &:hover {
    color: white;
    background-color: black;
    transition: 0;
  }
`;

const CCC = styled.button`
  background-color: red;
  border: none;
  border-radius: 100%;
  height: 6vh;
  width: 3vw;
  position: absolute;
  top: 40%;
  left: 20%;
  z-index: 10;
  &:hover {
    background-color: grey;
    transition: 0.7s;
  }
`;

const BottomSheet = styled.div`
  position: absolute;
  background-color: white;
  border-radius:7% 7% 0 0;
  display:flex;
  flex-direction:column;
  height: 100%;
  width: 100%;
  z-index: 100;
  bottom: 0;
  transform: translateY(100%); /* 기본값: 숨김 */
  transition: transform 0.3s ease;

  
`;

const BottomSheettop = styled.div`
width:100%;
height:5%;
display:flex;
justify-content : center;
`

// &.visible {
//   transform: translateY(0); /* 보이게 하기 */
// }

