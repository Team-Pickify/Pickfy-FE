import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PiCompassRoseDuotone } from "react-icons/pi";
import mapPermission from '../../hooks/mapPermission';
import redMarker from "../../assets/redmarker.svg"
import blackMarker from "../../assets/black_marker.svg"
import { theme } from "../../styles/themes";
import axios from 'axios';
import { TokenReq as getApi } from '../../apis/axiosInstance';
import Info from '../../components/Info';
import InfoSmall from '../../components/InfoSmall';

const kk = [
  {
    id : 1,
    name:"컴투레스트",
    category:"카페/베이커리",
    shortDescription:"에스프레소 어쩌고",
    images:["w","w"]
           
  }
]

const Wrapper = styled.div`
  z-index:100;
  position:absolute;
  display: flex;
  flex-direction: row;
  top: 1.19rem;
  gap: 0.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Wrapper2 = styled.div`
  z-index:100;
  position:absolute;
  display: flex;
  flex-direction: row;
  top: 90%;
  gap: 0.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Items = styled.button`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 600;
  height: 2.13rem;
  padding: 0.625rem 1.25rem;
  border-radius: 6.25rem;
  border: ${(props) => (props.isActive ? "none" : " 1px solid #e6e6e6")};
  background-color: ${(props) => (props.isActive ? theme.Text : "#ffffff")};
  color: ${(props) => (props.isActive ? "#ffffff" : "#000000")};
`;

const category = [
  { id: 1, name: "전체" },
  { id: 2, name: "음식점" },
  { id: 3, name: "카페/베이커리" },
  { id: 4, name: "바/펍" },
  { id: 5, name: "도서/문구" },
];


function Mapview() {

  const [{curlatitude,curlongitude},setcurlocation] = useState({curlatitude:33.450701,curlongitude:126.570667})

  const [placearray,setplacearray] = useState([]);

  const [magazinearray,setmagazinearray] = useState([])

  const [categorybtn, setcategorybtn] = useState([1,0,0,0,0]);
  const [magazinebtn, setmagazinebtn] = useState([]);

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



  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API is not loaded!");
      return;
    }

    getmagazinelist();



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
  setcurlocation({latitude,longitude})
}


const Marking = (datas)=>{

    const places = new kakao.maps.services.Places();


    const imageSize = new kakao.maps.Size(50, 55); 
        const imageSize2 = new kakao.maps.Size(40, 45); 
       const imageSrc = redMarker;
       const imageSrc2 = blackMarker;
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        var markerImage2 = new kakao.maps.MarkerImage(imageSrc2, imageSize2); 

        const markers = datas.map((v)=>{
          const marker = new kakao.maps.Marker({
            map: curmap,
            position: new kakao.maps.LatLng(v.y,v.x),
            image: markerImage
        });
        kakao.maps.event.addListener(marker, "click", () => {
          handleOpenBottomSheet();
        });
        })

  }

  


  return (
    <>
     <Mapbox ref = {mapRef}>
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
      
      <Curdesbutton onClick={handlebutton}>
        <PiCompassRoseDuotone style={{width:"80%",height:"80%"}}/>
      </Curdesbutton>
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

