import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./components/Shared/Header";
import Category from "./Pages/Category";
import Favorite from "./Pages/Favorite";
import MyLibrary from "./Pages/MyLibrary";
import Settings from "./Pages/Settings";
import Help from "./Pages/Help";
function App() {
  return (
    <div className="w-screen min-h-screen p-10 flex flex-col lg:flex-row">
      <Header />
      <div className="mt-10 lg:mt-20 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/mylibrary" element={<MyLibrary />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
