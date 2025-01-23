import Main from "../pages/main";
import MyPlaceList from "../pages/placelist";
import Setting from "../pages/setting";
import Login from "../pages/login/login";
import Mapview from "../pages/map/map";

const routes = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/myplacelist",
    element: <MyPlaceList />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/map",
    element: <Mapview />,
  },
];

export default routes;
