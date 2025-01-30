import Mapview from "../pages/main/map";
import Login from "../pages/login/login";
import AdminLogin from "../pages/login/admin-login";
import SignUp from "../pages/login/signup";
import MyPlaceList from "../pages/placelist";
import Setting from "../pages/setting";

const routes = [
  // 지도(메인)
  {
    path: "/",
    element: <Mapview />,
  },
  // 로그인
  {
    path: "/login",
    element: <Login />,
  },
  // 관리자 로그인
  {
    path: "/adminlogin",
    element: <AdminLogin />,
  },
  // 회원가입
  {
    path: "/signup",
    element: <SignUp />,
  },
  // 마이 플레이스
  {
    path: "/myplacelist",
    element: <MyPlaceList />,
  },
  // 설정
  {
    path: "/setting",
    element: <Setting />,
  },
];

export default routes;
