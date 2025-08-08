import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./reset.scss";
import "./App.scss";
import Header from "./components/Header/Header";

import Footer from "./components/Footer/Footer";

import "./components/fonts/ferry.otf";
import MainPage from "./components/Main/MainPage/MainPage";
import Autification from "./components/Main/Autification/Autification";
import Search from "./components/Main/Search";
import Result from "./components/Main/Result";

function App() {
  return (
    <BrowserRouter>
    <div className="wrapper">
      <Header />
       <Routes>
                  <Route path="/" element={<MainPage/>}/>
                  <Route path="/auth" element={<Autification/>}/>
                  <Route path="/searh" element={<Search/>}/>
                  <Route path="/result" element={<Result/>}/>
              </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
