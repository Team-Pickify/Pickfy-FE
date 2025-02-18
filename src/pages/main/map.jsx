import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PiCompassRoseDuotone } from "react-icons/pi";
import mapPermission from '../../hooks/mapApi/mapPermission';
import { theme } from "../../styles/themes";
import Info from '../../components/Info';
import createMap from '../../hooks/mapApi/createMap';
import findLocation from '../../hooks/mapApi/findLocation';
import getMagazinelist from '../../hooks/mapApi/getMagazinelist';
import getCategorylist from '../../hooks/mapApi/getCategorylist';
import getPlaceData from '../../hooks/mapApi/getPlaceData';
import Marking from '../../hooks/mapApi/Marking';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import getMyplaceData from '../../hooks/mapApi/getMyPlcaeData';
import selectarray from '../../hooks/mapApi/selectarray';
import InfoSmall from '../../components/InfoSmall';
import redMarker from '../../assets/redmarker.svg'
import blackMarker from "../../assets/black_marker.svg";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Dropdown_Order from '../../components/Dropdown_Order';
import { TokenReq } from '../../apis/axiosInstance';


function Mapview() {
  // 로그인 상태 체크
  const navigate = useNavigate();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await TokenReq.post("/auth/me");
        if (!response.data.result) {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };

    checkLoginStatus();
  }, [navigate]);


  const[isClicked,setIsClicked] = useState(0)
  const [isDropdown,setisDropdown] = useState(0)
  const [order,setorder] = useState("거리순")

  const [curlatitude,setcurlatitude] = useState(33.450701)
  const [curlongitude,setcurlongitude] = useState(126.570667)

  const [placearray,setplacearray] = useState([])
  const [Myplacearray,setMyplacearray] = useState([])

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
     const mapp = await createMap(curlatitude,curlongitude,container,setcurmap);
     if(isClicked){
        const newdata = selectarray(Myplacearray,categoryarray,magazinearray,newarr,(!id && newarr[0] ?newarr2:magazinebtn)) //
        setplacearray(newdata)
        Marking(newdata,setinfoData,mapp,handleOpenBottomSheet,setimagearray)
     }
     else{
      const datas = await getPlaceData(newarr,(!id && newarr[0] ?newarr2:magazinebtn),setplacearray,categoryarray,magazinearray,curlatitude,curlongitude)
      console.log(datas)
      Marking(datas,setinfoData,mapp,handleOpenBottomSheet,setimagearray)
     }
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
     const newarr2 = categorybtn.map((v,i)=>{
      if(i === 0)return 0
      return v
     })
     const container = mapRef.current;
     setcategorybtn(newarr2)
     setmagazinebtn(newarr)
     console.log(newarr2)
     console.log(newarr)
     const mapp = await createMap(curlatitude ,curlongitude ,container,setcurmap);
     if(isClicked){
      const newdata = selectarray(Myplacearray,categoryarray,magazinearray,newarr2,newarr)
      setplacearray(newdata)
      Marking(newdata,setinfoData,mapp,handleOpenBottomSheet,setimagearray)
     }
     else{
      const datas = await getPlaceData(newarr2,newarr,setplacearray,categoryarray,magazinearray,curlatitude,curlongitude)
      console.log(datas)
      Marking(datas,setinfoData,mapp,handleOpenBottomSheet,setimagearray)
     }
     
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
      setcurlatitude(latitude )
      setcurlongitude(longitude)
      const mapp = await createMap(latitude,longitude,container,setcurmap);
      const datas = await getPlaceData([1],magazinebtn,setplacearray,[{id:52}],magazinearray,latitude,longitude)
      console.log(datas)
      Marking(datas , setinfoData , mapp,handleOpenBottomSheet,setimagearray)
    });
  }, []);

  const switchTocur = ()=>{
    const container = mapRef.current;
    curmap.setCenter(new kakao.maps.LatLng(curlatitude, curlongitude));
  }

  const getMyplace = async ()=>{
    const mapp = await createMap(curlatitude,curlongitude,mapRef.current,setcurmap);
    if(!isClicked){
      const datas = await getMyplaceData();
      console.log(datas)
      if(datas[0] != null){
        const newarr = datas.map((v)=>{
          const x = [v.categoryName]
          return {...v,imageUrls:v.placeImageUrl,categories:x}
        })
        console.log(newarr)
        setMyplacearray(newarr)
        const newdata = selectarray(newarr,categoryarray,magazinearray,categorybtn,magazinebtn);
        console.log(newdata)
        setplacearray(newdata)
        Marking(newdata , setinfoData , mapp,handleOpenBottomSheet,setimagearray)
      }
      else setMyplacearray([])
    }
    else{
      const datas  = await getPlaceData(categorybtn,magazinebtn,setplacearray,categoryarray,magazinearray,curlatitude,curlongitude)
      console.log(datas)
      Marking(datas , setinfoData , mapp,handleOpenBottomSheet,setimagearray)
    }
    setIsClicked(isClicked ? 0:1 )
    
  }


  return (
    <>
     <Mapbox ref = {mapRef} >
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
      <Likebutton onClick={getMyplace}>
        {isClicked ? (
            <FaHeart color="FF4B4B" size={25}/>
            ) : (
            <FaRegHeart size={25} color={theme.Sub1}/>
                )}
      </Likebutton>
      
      <Curdesbutton onClick={switchTocur}>
        <MdMyLocation size={25} color="black" />
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
            <Dropdown>
              <div onClick={()=>{setisDropdown(isDropdown?0:1)}}>
                {`${order} `}
                {isDropdown?(<IoIosArrowUp />):<IoIosArrowDown />}
          
                </div>
                {isDropdown ? <Dropdown_Order 
                arr={placearray} 
                setplacearray={setplacearray} 
                setisDropdown={setisDropdown} 
                setorder={setorder} 
                lat={curlatitude}
                long = {curlongitude}
                />:<></>}
            </Dropdown>
          {placearray.map((place)=>{return(
            <div style={{width:"100%",height:"35%",flexShrink:"0"}}>
                <div style={{ width: "90%", height: "40%",marginLeft:"5%"}} >
                  <Info 
                    name={place.name} 
                    categoryName={place.categoryName} 
                    shortDescription={place.shortDescription} 
                    instagramLink={place.instagramLink} 
                    naverLink={place.naverLink}
                  >
                  </Info>
                </div>
                <Imgcontainer2>
                  {place.imageUrls.map((v,i)=>{
                    return (<Img2 src={v} key={i}></Img2>)
                  })}
                </Imgcontainer2>
            </div>
          )})}
            
        </Listcontainer>
        ) : <div style={{ width: "100%", height: "95%"}}>
        
         <div style={{ width: "90%", height: "13%",marginLeft:"5%"}} >
         <Info 
          name={infoData.name} categoryName={infoData.categoryName} shortDescription={infoData.shortDescription} instagramLink={infoData.instagramLink} naverLink={infoData.naverLink}
         >
         </Info>
         </div>
         <Imgcontainer>
            {imagearray.map((v,i)=>{
              return (<Img src={v} key={i}></Img>)
            })}
         </Imgcontainer>
        
     </div>}
        </BottomSheet>

    </Mapbox>
    
    </>
      
  );
}
export default Mapview;


const Imgcontainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  width: 100%;
  height: 34%;
  overflow-x: scroll; 
  scroll-snap-type: x mandatory;
`;
const Imgcontainer2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  width:100%;
  height:50%;
`;
const Img = styled.img`
  width: 45%;
  height: 90%;
  border-radius: 0.25rem;
  flex-shrink : 0;
  margin-left:0.5rem;
`;

const Listcontainer = styled.div`
width:100%;
height:95%;
display:flex;
flex-direction : column;
overflow: auto;
scroll-snap-type: x mandatory;
scrollbar-width: none;
&::-webkit-scrollbar {
  display: none;
}
`;

const Img2 = styled.img`
  width: 6.75rem;
  height: 6.75rem;
  margin-left:0.1875rem;
  border-radius: 0.25rem;
  flex-shrink : 0;
`;

const Dropdown = styled.div`
width:100%;
height:5%;
background-color:none;
flex-shrink:0;
margin-left:85%;
`


const Wrapper = styled.div`
  z-index:100;
  position:absolute;
  display: flex;
  flex-direction: row;
  margin-left:5%;
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
  margin-left:5%;
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



const Mapbox = styled.div`
  position: relative; 
  width: 100%;
  height: calc(100vh-104px);
  z-index: 1;
  oveflow:hidden;
`;

const Curdesbutton = styled.button`
  background-color: white;
  border: none;
  border-radius: 100%;
  padding : 1rem;
  position: absolute;
  top: 75%;
  left: 80%;
  z-index: 10;
  &:hover {
    background-color: ${theme.Sub2};
    transition: 0s;
  }
`;

const Likebutton = styled.button`
  background-color: white;
  border: none;
  border-radius: 100%;
  padding : 1rem;
  position: absolute;
  top: 65%;
  left: 80%;
  z-index: 10;
  &:hover {
    background-color: ${theme.Sub2};
    transition: 0s;
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

// scrollbar-width: none;  나중에 imgcontainer에 스크롤바 없앨때 추가하기
//   &::-webkit-scrollbar {
//     display: none;
//   }