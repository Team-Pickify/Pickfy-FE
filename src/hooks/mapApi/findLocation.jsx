

const findLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          console.log("Accuracy:", position.coords.accuracy, "meters");
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
          // 기본 좌표(제주시) 반환
          resolve({ latitude: 33.450701, longitude: 126.570667 });
        },
        { enableHighAccuracy: true }
      );
    });
  };
  
  export default findLocation;

