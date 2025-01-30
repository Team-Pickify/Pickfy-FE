import { Route, Routes, useLocation } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./layouts/navbar";
import routes from "./navigator/routes";

const NavPage = ["/", "/myplacelist", "/setting"];

function App() {
  const location = useLocation();

  return (
    <>
      <GlobalStyles />
      {NavPage.includes(location.pathname) && <Navbar />}
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
