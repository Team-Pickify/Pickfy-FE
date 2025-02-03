import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PiCompassRoseDuotone } from "react-icons/pi";
import mapPermission from '../../hooks/mapPermission';
import redMarker from "../../assets/redmarker.svg"
import blackMarker from "../../assets/black_marker.svg"
import { theme } from "../../styles/themes";
import axios from 'axios';


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


const magazine = [
  { id: 1, name: "전체" },
  { id: 2, name: "데이트립코리아" },
  { id: 3, name: "뉴뉴" },
  { id: 4, name: "책플" },
  { id: 5, name: "빵모아" },
];


function Mapview() {

  const [{curlatitude,curlongitude},setcurlocation] = useState({curlatitude:33.450701,curlongitude:126.570667})

  const [placearray,setplacearray] = useState([]);

  const [magazinearray,setmagazinearray] = useState([])

  const [categorybtn, setcategorybtn] = useState([0,1,0,0,0,0]);
  const [magazinebtn, setmagazinebtn] = useState([0,1,0,0,0,0]);

  const [isloading ,setloading] = useState(false);

  const [curmap,setcurmap] = useState([]);

  const mapRef = useRef(null);

  const scrollRef = useRef(null);

  const bottomSheetRef = useRef(null);


  const handleWheel = (e) => {
    scrollRef.current.scrollLeft += (e.deltaY*0.3); // 수직 스크롤(deltaY)을 가로 스크롤로 변환
  };
  const scrollRef2 = useRef(null);

  const handleWheel2 = (e) => {
    scrollRef2.current.scrollLeft += (e.deltaY*0.3); // 수직 스크롤(deltaY)을 가로 스크롤로 변환
  };

  
  
  const getData = async()=>{
    const datas = await axios.get('http://localhost:8000/')
    .then((res)=>{
      return res.data
    })
    .catch((error)=>{
      console.error(error)
    })
    Marking(datas)
  }

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
     getData();
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
     getData();
  };

  const getmaga = async()=>{

    const tokenn = import.meta.env.VITE_TOKKEN
    const magazinesurl = import.meta.env.VITE_MAGAZINES_URL

    await axios.get(magazinesurl,
  {
    headers :{
      'Authorization' : `Bearer ${tokenn}`,
      'Accept': '*/*',
      'Content-Type': 'application/json'
    }
  })
  .then((res)=>{
    console.log(res)
  })
  .catch((err)=>{console.error(err)})

  }



  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API is not loaded!");
      return;
    }

    getmaga();



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
          handleBottomSheet();
        });
        })

  }

  const handleBottomSheet = () => {
    const sheet = bottomSheetRef.current
    if (sheet.classList.contains("visible")) {
      sheet.classList.remove("visible");
    } else {
      sheet.classList.add("visible");
    }
  };


  return (
    <>
     <Mapbox ref = {mapRef}>
     <Wrapper>
      {category.map((item) => (
        <Items
          key={item.id}
          onClick={()=>{handleClick(item.id)}}
          isActive={categorybtn[item.id] === 1}
        >
          {item.name}
        </Items>
      ))}
    </Wrapper>
      
      <Curdesbutton onClick={handlebutton}>
        <PiCompassRoseDuotone style={{width:"80%",height:"80%"}}/>
      </Curdesbutton>
      <Wrapper2>
      {magazine.map((item) => (
        <Items
          key={item.id}
          onClick={()=>{handleClick2(item.id)}}
          isActive={magazinebtn[item.id] === 1}
        >
          {item.name}
        </Items>
      ))}
    </Wrapper2>
       <BottomSheet ref={bottomSheetRef}>
        <div style={{width:"100%",height:"90%",backgroundColor:"white"}}>

        </div>
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
  background-color: white;
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
  background-color: grey;
  border-radius:7% 7% 0 0;
  display:flex;
  align-items: flex-end;
  height: 50%;
  width: 100%;
  z-index: 100;
  bottom: 0;
  transform: translateY(100%); /* 기본값: 숨김 */
  transition: transform 0.3s ease;

  &.visible {
    transform: translateY(0); /* 보이게 하기 */
  }
`;



// const imageSize = new kakao.maps.Size(50, 55); 
//           const imageSrc = redMarker;
//           var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
//           const newMarkers = result.map((v) => {
//           var iwContent = `<div style="padding:5px;">${v.place_url}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
//           iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
  
//           // 인포윈도우를 생성합니다
//           var infowindow = new kakao.maps.InfoWindow({
//           content : iwContent,
//           removable : iwRemoveable
//             });
//             const markerPosition = new kakao.maps.LatLng(v.y, v.x); // 마커 위치
//             const marker = new kakao.maps.Marker({
//               map: map, // 마커를 표시할 지도
//               position: markerPosition, // 마커 위치
//               title: v.place_name, // 마커 제목
//               image: markerImage, // 마커 이미지
//             });
//             kakao.maps.event.addListener(marker, 'click',async function() {
//               // 마커 위에 인포윈도우를 표시합니다
              
//               // infowindow.open(map, marker);  
              
//               if (sheet.classList.contains("visible")) {
//                 sheet.classList.remove("visible");
//               } 
//               else {
//                 sheet.classList.add("visible");
//               }
  
              
//             });
    
//             return marker; // 생성된 마커 반환
//           });
//           var curmarkerimage = new kakao.maps.MarkerImage(blackMarker, new kakao.maps.Size(30, 35)); 
//           const curmarker = new window.kakao.maps.LatLng(latitude,longitude);
//           const marking = new window.kakao.maps.Marker({
//               map: map, // 마커를 표시할 지도
//               position: curmarker, // 마커 위치
//               title: "내 위치", // 마커 제목
//               image: curmarkerimage
//           });
//           console.log(result);
