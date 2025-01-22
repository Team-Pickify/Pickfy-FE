import Main from "../pages/main";
import MyPlaceList from "../pages/placelist";
import Setting from "../pages/setting";
import Signup from "../pages/signin/signup";
import Mapview from "../pages/map/map";

const routes = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/signup",
    element: <Signup />,
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
    element:<Mapview/>
  }
];

export default routes;
