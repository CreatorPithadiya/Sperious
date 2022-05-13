import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Register from '../User/Register';
import Dashboard from '../User/Dashboard';
import AddData from "../Project/Addproject";
import AllData from "../Project/AllProject";
import Chat from "../Chat/Chat";
import Product from "../Products/Product";
import Profile from "../User/Profile";
import RegisterUsers from "../User/RegisterUsers";
import Edit from '../Project/editproject';
import Navbar from './Navbar';
import Require from './Require';
import Unauthorized from './Unauthorized';

const ROLES = {
  'User': 2001,
  'Admin': 5150,
  'Editor': 1984
}

export default function Path() {
  return (
    <div>
      <Navbar />
      <Routes>

        {/* Public */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* General */}

        <Route element={<Require allowedRoles={[ROLES.Admin, ROLES.User,ROLES.Editor]} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/all" element={<AllData />} />
          <Route path="/add" element={<AddData />} />
          <Route path="/product" element={<Product />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>

        {/* Admin */}

        <Route element={<Require allowedRoles={[ROLES.Admin]} />}>
          <Route path="/user" element={<RegisterUsers />} />
        </Route>

      </Routes>
    </div>
  )
}
