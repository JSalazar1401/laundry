import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { CreateOrder } from './orders/CreateOrder';
import { Dashboard } from './Dashboard';
import { List } from './garments/List';
import { Create } from './garments/Create';
import { ListService } from './services/ListService';
import { CreateService } from './services/CreateService';

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
  {
    path: "/services",
    Component: ListService,
  },
  {
    path: "/service/create",
    Component: CreateService,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
