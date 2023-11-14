import "./App.css";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./components/Shared/Header";
import Category from "./Pages/Category";
import Favorite from "./Pages/Favorite";
import MyLibrary from "./Pages/MyLibrary";
import Profile from "./Pages/Profile";
import Help from "./Pages/Help";
import AuthModal from "./components/Shared/AuthModal";
import BookDetailsModal from "./components/Shared/BookDetailsModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/auth/authSlice";
function App() {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="max-w-[2000px] mx-auto min-h-screen p-10 flex flex-col lg:flex-row">
      <Header />
      <div className="mt-10 lg:mt-20 w-full">
        <AuthModal />
        <BookDetailsModal />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          {user && (
            <>
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/mylibrary" element={<MyLibrary />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/help" element={<Help />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
