import Mapview from "../pages/main/map";
import Login from "../pages/login/login";
import AdminLogin from "../pages/login/admin-login";
import SignUp from "../pages/login/signup";
import MyPlaceList from "../pages/placelist";
import Setting from "../pages/setting";

import Admin from "../pages/admin/";

import MangeMagazine from "../pages/admin/magazine/MangeMagazine";
import AddMagazine from "../pages/admin/magazine/AddMagazine";
import FixMagazine from "../pages/admin/magazine/FixMagazine";

import ManagePlace from "../pages/admin/place/ManagePlace";
import AddPlace from "../pages/admin/place/AddPlace";
import FixPlace from "../pages/admin/place/FixPlace";

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
  // 관리자
  {
    path: "/admin",
    element: <Admin />,
  },
  // 관리자 - 매거진 관리
  {
    path: "/admin/magazine-management",
    element: <MangeMagazine />,
  },
  // 관리자 - 매거진 추가
  {
    path: "/admin/magazine-management/add",
    element: <AddMagazine />,
  },
  // 관리자 - 매거진 수정
  {
    path: "/admin/magazine-management/fix",
    element: <FixMagazine />,
  },
  // 관리자 - 플레이스 관리
  {
    path: "/admin/place-management",
    element: <ManagePlace />,
  },
  // 관리자 - 플레이스 추가
  {
    path: "/admin/magazine-management/add",
    element: <AddPlace />,
  },
  // 관리자 - 플레이스 수정
  {
    path: "/admin/magazine-management/fix",
    element: <FixPlace />,
  },
];

export default routes;
