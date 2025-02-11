import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PiCompassRoseDuotone } from "react-icons/pi";
import mapPermission from '../../hooks/mapApi/mapPermission';
import { theme } from "../../styles/themes";
import axios from 'axios';
import Info from '../../components/Info';
import createMap from '../../hooks/mapApi/createMap';
import findLocation from '../../hooks/mapApi/findLocation';
import getMagazinelist from '../../hooks/mapApi/getMagazinelist';
import getCategorylist from '../../hooks/mapApi/getCategorylist';
import getPlaceData from '../../hooks/mapApi/getPlaceData';
import Marking from '../../hooks/mapApi/Marking';

function Mapview() {

  const num1 = 37.54240802
  const num2 = 127.07130716

  const [curlatitude,setcurlatitude] = useState(33.450701)
  const [curlongitude,setcurlongitude] = useState(126.570667)

  const [placearray,setplacearray] = useState([]);

  const [magazinearray,setmagazinearray] = useState([])
  const [magazinebtn, setmagazinebtn] = useState([]);
  const [categoryarray,setcategoryarray] = useState([])
  const [categorybtn, setcategorybtn] = useState([]);
  

  const [isloading ,setloading] = useState(false);

  const [curmap,setcurmap] = useState([]);

  const mapRef = useRef(null);

  const bottomSheetRef = useRef(null);

  const [infoData,setinfoData] = useState(
    {
      name:"",
      categoryName:"",
      shortDescription : "",
      instagramLink:"",
      naverPlaceLink:""
    }
  )

  const [imagearray,setimagearray] = useState([])

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
  

  const handleClick = async(id) => {
    let newarr = []
    let newarr2 = []
    if(id === 0){
      if(categorybtn[0] === 1){
        newarr = categorybtn
      }
      else{
        newarr = [1]
        for(let i=1;i<categorybtn.length;i++){
          newarr = [...newarr,0]
        }
        newarr2 = magazinebtn.map((v)=>{return 0})
        console.log(newarr2)
        setmagazinebtn(newarr2)
      }
    }
    else{
      newarr = categorybtn.map((v,i)=>{
        if(i == id){
          return (v ? 0 : 1)
        }
        else{
          return v
        }
       })
       if(newarr[0] === 1){
        newarr[0] = 0;
       }
    }
     const container = mapRef.current;
     setcategorybtn(newarr)
     console.log(newarr)
     console.log(magazinebtn)
     const datas = await getPlaceData(newarr,(!id && !categorybtn[0] ?newarr2:magazinebtn),setplacearray,categoryarray,magazinearray,curlatitude,curlongitude)
     console.log(datas)
     const mapp = await createMap(num1 /*latitude */,num2 /*longitude */,container,setcurmap);
     Marking(datas,setinfoData,mapp,handleOpenBottomSheet,setimagearray)
  };


  const handleClick2= async (id) => {
    const newarr = magazinebtn.map((v,i)=>{
      if(i == id){
        return (v ? 0 : 1)
      }
      else{
        return v
      }
     })
     const container = mapRef.current;
     setmagazinebtn(newarr)
     console.log(categorybtn)
     console.log(newarr)
     const datas = await getPlaceData(categorybtn,newarr,setplacearray,categoryarray,magazinearray,curlatitude,curlongitude)
     console.log(datas)
     const mapp = await createMap(num1 /*latitude */,num2 /*longitude */,container,setcurmap);
     Marking(datas,setinfoData,mapp,handleOpenBottomSheet,setimagearray)
  };

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API is not loaded!");
      return;
    }
    
    const container = mapRef.current;
    // Kakao Maps API 로드 후 실행
    window.kakao.maps.load(async () => {
      mapPermission();
      await getMagazinelist(setmagazinebtn,setmagazinearray);
      await getCategorylist(setcategorybtn,setcategoryarray);
      const {latitude,longitude} = await findLocation();
      setcurlatitude(num1 /*latitude */)
      setcurlongitude(num2/*longitude */)
      const mapp = await createMap(num1 /*latitude */,num2 /*longitude */,container,setcurmap);
      const datas = await getPlaceData([1],magazinebtn,setplacearray,[{id:52}],magazinearray,num1 /*latitude */,num2 /*longitude */)
      console.log(datas)
      Marking(datas , setinfoData , mapp,handleOpenBottomSheet,setimagearray)
    });
  }, []);

  const switchTocur = ()=>{
    const container = mapRef.current;
    curmap.setCenter(new kakao.maps.LatLng(curlatitude, curlongitude));
  }


  return (
    <>
     <Mapbox ref = {mapRef}>
     <Wrapper>
      {categoryarray.map((item,i) => (
        <Items
          key={item.id}
          onClick={()=>{handleClick(i)
            setTranslateY(100);
            setBottomSheetState("hidden");
          }}
          isActive={categorybtn[i] === 1}
        >
          {item.name}
        </Items>
      ))}
    </Wrapper>
      <Likebutton></Likebutton>
      
      <Curdesbutton onClick={switchTocur}>
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
           <Listcontainer>
            <div style={{width:"90%",marginLeft:"5%"}}>
              {placearray?.map((place) => (
                <div key={place.placeId}>
                  <Info
                    name={place.name}
                    categoryName={place.categoryName}
                    shortDescription={place.shortDescription}
                    instagramLink={place.instagramLink}
                    naverLink={place.naverLink}
                  />
              <Imgcontainer2>
              {place.placeImageUrl?.map((image, index) => (
                <Img key={index} src={image} alt={`${place.name} 이미지`} />
              ))}
            </Imgcontainer2>
          </div>
        ))}
            </div>
            
           </Listcontainer>
        ) : <div style={{ width: "100%", height: "95%"}}>
        
         <div style={{ width: "90%", height: "15%",marginLeft:"5%"}} >
         <Info 
          name={infoData.name} categoryName={infoData.categoryName} shortDescription={infoData.shortDescription} instagramLink={infoData.instagramLink} naverLink={infoData.naverLink}
         >
         </Info>
         </div>
         <Imgcontainer>
            {imagearray.map((v,i)=>{
              return(<img src={v} key ={i} style={{height : "90%" , width:"40%",marginLeft:"5%",borderRadius :"5%"}}></img>)
            })}
         </Imgcontainer>
        
     </div>}
        </BottomSheet>

    </Mapbox>
    
    </>
      
  );
}
export default Mapview;

const kk = [
  {
    id : 1,
    name:"컴투레스트",
    category:"카페/베이커리",
    short_description:"에스프레소 어쩌고",
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

const Imgcontainer = styled.div`
display: flex;
  flex-direction: row;
  align-items: center;
  width:100%;
  height:34%;
  overflow:hidden
`


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

const Likebutton = styled.button`
  background-color: white;
  border: none;
  border-radius: 100%;
  height: 6vh;
  width: 3vw;
  position: absolute;
  top: 65%;
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

const Listcontainer = styled.div`
width:100%;
height:100%;
overflow:auto;
`

const Imgcontainer2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.1875rem;
  margin: 0 0 1.5rem 0;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Img = styled.img`
  width: 6.75rem;
  height: 6.75rem;
  border-radius: 0.25rem;
`;

// &.visible {
//   transform: translateY(0); /* 보이게 하기 */
// }

