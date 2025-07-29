import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { CreateOrder } from './orders/CreateOrder';
import { Dashboard } from './Dashboard';
import { List } from './garments/List';
import { Create } from './garments/Create';

const router = createBrowserRouter([
  {
    path: "/",
    Component: CreateOrder,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/garments",
    Component: List,
  },
  {
    path: "/garment/create",
    Component: Create,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
