import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ProductAdd from "./components/ProductAdd";
import ProductEdit from "./components/ProductEdit";
import CategoryList from "./components/CategoryList";
import BrandList from "./components/BrandList"; 
import UserList from "./components/UserList"; // Thêm import


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductList />,
    },
    {
      path: "/products",
      element: <ProductList />,
    },
    {
      path: "/product/add",
      element: <ProductAdd />,
    },
    {
      path: "/product/edit/:id",
      element: <ProductEdit />,
    },
    {
      path: "/product/detail/:productId",
      element: <ProductDetail />,
    },
    {
      path: "/categories",
      element: <CategoryList />,
    },
    {
      path: "/orders",
      element: <CategoryList />,
    },
    {
      path: "/users",
      element: <UserList  />,
    },
    {
      path: "/brands",
      element: <BrandList  />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
