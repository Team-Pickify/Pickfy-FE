import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./layouts/navbar";
import routes from "./navigator/routes";
import SplashScreen from "./pages/splash/splashScreen";

const NavPage = ["/", "/myplacelist", "/setting"];

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  return (
    <>
      <GlobalStyles />
      {showSplash ? (
        <SplashScreen duration={1000} onFinish={() => setShowSplash(false)} />
      ) : (
        <>
          {NavPage.includes(location.pathname) && <Navbar />}
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
