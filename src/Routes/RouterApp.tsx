import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../Components/Login';
import Navbar from '../Components/Navbar';
import Add from '../Components/Add';
import CrudApp from '../Components/CrudApp';
import Edit from '../Components/Edit';

const RouterApp = () => {
  return <BrowserRouter>
            <Navbar />

            <Routes>
                    <Route path="add" element={<Add />} />
                    <Route path="login" element={<Login />} />
                    <Route path="crud" element={<CrudApp />} />
                    <Route path="edit/:id" element={<Edit />} />

                    <Route path="/" element={<CrudApp />} />

                </Routes>
        </BrowserRouter>
};

export default RouterApp;
