export function AddressSearch(callback) {
  new window.daum.Postcode({
    oncomplete: function (data) {
      let fullAddress = data.address;
      let extraAddress = "";

      if (data.addressType === "R") {
        if (data.bname !== "") extraAddress += data.bname;
        if (data.buildingName !== "")
          extraAddress +=
            extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
        fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      }
      callback(fullAddress);
    },
  }).open();
}

export function TransCoords(address) {
  return new Promise((resolve, reject) => {
    if (!window.kakao.maps) {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
      reject(new Error("Kakao Maps API가 로드되지 않았습니다."));
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    console.log("Trans-addr:", address);

    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const latitude = result[0].y;
        const longitude = result[0].x;
        console.log("Trans-coords", { latitude, longitude });

        resolve({ latitude, longitude });
      } else {
        console.error("주소 변환 실패:", status);
        reject(new Error("주소 변환 실패"));
      }
    });
  });
}

export function TransAddr(latitude, longitude) {
  return new Promise((resolve, reject) => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
      reject(new Error("Kakao Maps API가 로드되지 않았습니다."));
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(latitude, longitude);

    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const address = result[0].road_address
          ? result[0].road_address.address_name // 도로명 주소
          : result[0].address.address_name; // 지번 주소

        console.log("변환된 주소:", address);
        resolve(address);
      } else {
        console.error("좌표 변환 실패:", status);
        reject(new Error("좌표 변환 실패"));
      }
    });
  });
}
