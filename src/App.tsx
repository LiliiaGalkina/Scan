import "./reset.scss";
import "./App.scss";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

import "./components/fonts/ferry_black.otf";

function App() {


  return (
   <div className="wrapper">
    <Header/>
   <Main/>
   <Footer/>
   </div>
  )
}

export default App
