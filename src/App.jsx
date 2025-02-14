import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./layouts/navbar";
import routes from "./navigator/routes";
import SplashScreen from "./pages/splash/splashScreen";
import { TokenReq } from "./apis/axiosInstance";

const NavPage = ["/", "/myplacelist", "/setting"];

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await TokenReq.post("/auth/me");
        if (!response.data.result) {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };

    checkLoginStatus();
  }, [navigate]);

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
