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
import { useAuth } from "./Context/AuthContext";
import { useEffect } from "react";


function App() {
	const { isAuth, checkAuth } = useAuth();

	useEffect(() => {
		if (!isAuth) {
			console.log("Пользователю необходимо залогиниться!")
		}
	}, [isAuth]);

	  useEffect(() => {
      checkAuth();
    }, [checkAuth]);

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header isAuth={isAuth} />
        <Routes>
          <Route path="/" element={<MainPage isAuth={isAuth} />} />
          <Route path="/auth" element={<Autification />} />
          <Route
            path="/search"
            element={
              isAuth ? <Search /> : <Autification redirectBack="/search" />
            }
          />
          <Route path="/result" element={<Result />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
