import redMarker from "../assets/redmarker.svg"

const Marking = (datas,setinfoData,curmap,handleOpenBottomSheet,setimagearray)=>{

    const places = new kakao.maps.services.Places();


    const imageSize = new kakao.maps.Size(50, 55); 
    const imageSrc = redMarker;
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

    const markers = datas.map((v,i)=>{
      const marker = new kakao.maps.Marker({
          map: curmap,
          position: new kakao.maps.LatLng(v.latitude,v.longitude),
          image: markerImage
      });
      kakao.maps.event.addListener(marker, "click", () => {
        setimagearray(v.imageUrls)
        setinfoData({
          name:v.name,
          categoryName:v.categories[0],
          shortDescription : v.shortDescription,
          instagramLink:v.instagramLink,
          naverLink:v.naverLink
        })
        handleOpenBottomSheet();
      });
      marker.setMap(curmap)
      })
    
  }
  export default Marking