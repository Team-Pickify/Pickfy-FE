
import blackMarker from "../../assets/black_marker.svg"
const createMap = (latitude,longitude,container,setcurmap) =>{
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
    return newmap

}

export default createMap