import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { CreateOrder } from './orders/CreateOrder';
import { Dashboard } from './Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    Component: CreateOrder,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
