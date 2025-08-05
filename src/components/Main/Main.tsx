import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import Autification from "./Autification";
import Search from "./Search";
import Result from "./Result";

export default function Main(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/auth" element={<Autification/>}/>
            <Route path="/searh" element={<Search/>}/>
            <Route path="/result" element={<Result/>}/>
        </Routes>
        </BrowserRouter>
    )
}