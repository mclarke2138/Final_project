import "./App.css";
import CreateUser from "./pages/CreateUser";
import GroceriesApp from "./pages/GroceriesApp";
import LoginUser from "./pages/LoginUser";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import PrivateRoute from "./pages/PrivateRoute";
import NotAuthorized from "./pages/NotAuthorized";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route element={<PrivateRoute/>}>
              <Route path="/main" element={<GroceriesApp />} />
            </Route>
          <Route path="/" element={<LoginUser />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="not-authorized" element={<NotAuthorized/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>   
    </>
  );
}

export default App;
