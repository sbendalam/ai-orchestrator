import { Fragment, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import AppLayout from "./layout";
import Home from "./components/home/Home";
import Reports from "./components/reports/Reports";

function App() {
  const [count, setCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <Fragment>
      {!isAuthenticated ? (
        <Fragment>
          <div>Login / Register logic goes here</div>
        </Fragment>
      ) : (
        <Fragment>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Outlet />}>
                <Route path="/home" element={<Home/>} />
                <Route path="/home/profile" element={<Home/>} />
              </Route>
              <Route path="/reports" element={<Outlet />}>
                <Route path="" element={<Reports/>} />
              </Route>
            </Routes>
          </AppLayout>
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;
