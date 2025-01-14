import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./layouts/navbar";
import routes from "./navigator/routes";

function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
