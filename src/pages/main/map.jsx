import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PiCompassRoseDuotone } from "react-icons/pi";
import mapPermission from '../../hooks/mapPermission';
import CategoryBtn from '../../components/categoryBtn'
import redMarker from "../../assets/redmarker.svg"
import blackMarker from "../../assets/black_marker.svg"


const category = ["","전체","음식점","카페","베이커리","바","펍","도서","문구"
];

function Mapview() {

  const [placearray,setplacearray] = useState([]);

  const [btnClick, setBtnClick] = useState([0,0,0,0,0,0]);

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



  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API is not loaded!");
      return;
    }
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
          handleBottomSheet();
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
        <CategoryBtn btnClick={btnClick} setBtnClick= {setBtnClick} mapCurLocation_toMark = {mapCurLocation_toMark} container = {mapRef.current}></CategoryBtn>
      
      <Curdesbutton onClick={handlebutton}>
        <PiCompassRoseDuotone style={{width:"80%",height:"80%"}}/>
      </Curdesbutton>
      {/* <CCC onClick={()=>{handleBottomSheet()}}>눌러</CCC> */}
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
