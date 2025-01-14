import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Main from "./pages/main/index";
import Navbar from "./layouts/navbar";
import Signup from "./pages/signin/signup";
import MyPlaceList from "./pages/placelist/index";
import Setting from "./pages/setting/index";

function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/myplacelist" element={<MyPlaceList />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </>
  );
}

export default App;
