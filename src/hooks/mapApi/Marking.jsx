import redMarker from "../../assets/redmarker.svg"
import blackMarker from "../../assets/black_marker.svg"

const Marking = (datas,setinfoData,curmap,handleOpenBottomSheet,setimagearray)=>{

    const places = new kakao.maps.services.Places();


    const imageSize = new kakao.maps.Size(50, 55); 
    const imageSrc = redMarker;
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

    const markers = datas.map((v,i)=>{
      const iconImg = v.iconUrl
      const marker = new kakao.maps.Marker({
          map: curmap,
          position: new kakao.maps.LatLng(v.latitude,v.longitude),
          image: markerImage
      });
      kakao.maps.event.addListener(marker, "click", () => {
        setimagearray(v.imageUrls)
        setinfoData({
          name:v.name,
          categoryName:v.categoryName,
          shortDescription : v.shortDescription,
          instagramLink:v.instagramLink,
          naverLink:v.naverLink
        })
        handleOpenBottomSheet();
      });
      marker.setMap(curmap)
      const overlayDiv = document.createElement("div");
      overlayDiv.style.position = "absolute";
      overlayDiv.style.bottom = "0.3rem"; // 마커 빈 부분에 맞추기
      overlayDiv.style.left = "50%";
      overlayDiv.style.transform = "translateX(-48%)";
      overlayDiv.style.width = "3.1rem";  // 고정 크기 유지
      overlayDiv.style.height = "3.1rem";
      overlayDiv.style.borderRadius = "50%"; 
      overlayDiv.style.overflow = "hidden";

    // 🔥 이미지 크기를 부모 크기에 맞게 % 적용
    overlayDiv.innerHTML = `<img src="${iconImg}" style="width: 100%; height: 100%; border-radius: 50%;" />`;

    overlayDiv.addEventListener("click", () => {
      setimagearray(v.imageUrls)
        setinfoData({
          name:v.name,
          categoryName:v.categoryName,
          shortDescription : v.shortDescription,
          instagramLink:v.instagramLink,
          naverLink:v.naverLink
        })
        handleOpenBottomSheet();
    });

    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(v.latitude,v.longitude),
      content: overlayDiv,
      map : curmap,
    });
    customOverlay.setMap(curmap);
    })
    
  }
  export default Marking