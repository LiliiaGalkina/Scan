import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./reset.scss";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./components/fonts/ferry.otf";
import MainPage from "./components/Main/MainPage/MainPage";
import Autification from "./components/Main/Autification/Autification";
import Search from "./components/Main/Search/Search";
import Result from "./components/Main/Result/Result";
import { useAuth } from "./Context/AuthContext";
import { useEffect} from "react";


function App() {
	const { isAuth, checkAuth, userName, tarif } = useAuth();

	  useEffect(() => {
      checkAuth();
    }, [checkAuth]);

  return (
    <BrowserRouter>
      <div className="wrapper">
			  <Header isAuth={isAuth} userName={userName} />
        <Routes>
          <Route path="/Scan/"></Route>
				  <Route path="/" element={<MainPage isAuth={isAuth} tarif={tarif} />} />
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
