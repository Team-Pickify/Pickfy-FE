

const mapPermission = ()=>{
  navigator.permissions.query({ name: 'geolocation' }).then((result) => {
    if (result.state === 'granted') {
      console.log('위치 권한이 이미 허용되었습니다.');
    } else if (result.state === 'prompt') {
      console.log('위치 권한을 요청할 수 있습니다.');
    } else if (result.state === 'denied') {
      console.log('위치 권한이 거부되었습니다. 브라우저 설정에서 권한을 허용해주세요.');
    }
  });
}

export default mapPermission