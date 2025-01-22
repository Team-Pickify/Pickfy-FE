import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./layouts/navbar";
import routes from "./navigator/routes";

const NavPage = ["/main", "/myplacelist", "/setting","/map"];

function App() {
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
