import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import RecipeDetails from "../pages/RecipeDetails";
import PrivateRoute from "./PrivateRoute";
import AddRecipe from "../pages/AddRecipe";
import MyRecipes from "../pages/MyRecipes";
import PublicRoute from "./PublicRoute";
import AllRecipes from "../pages/AllRecipes";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <MainLayout />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/recipes/:id",

        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-recipes",
        Component: AllRecipes,
      },

      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-recipes",
        element: (
          <PrivateRoute>
            <MyRecipes />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
