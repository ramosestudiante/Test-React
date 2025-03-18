import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Home from "../pages/Home";
import { Layout } from "../layouts/Layout";
import Detail from "../pages/Detail";
import Nav from "../components/Nav";
import { Favorites } from "../pages/Favorites";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Nav />
        <Routes>
          <Route path="/" element={<Home children={undefined} />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
