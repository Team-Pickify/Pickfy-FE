import Mapview from "../pages/main/map";
import Login from "../pages/login/login";
import MyPlaceList from "../pages/placelist";
import Setting from "../pages/setting";

const routes = [
  {
    path: "/",
    element: <Mapview />,
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
];

export default routes;
