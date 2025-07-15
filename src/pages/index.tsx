import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./home/Home"));
const Movies = lazy(() => import("./movies/Movies"));
const MovieDetail = lazy(() => import("./movies/MovieDetail"));
const ActorView = lazy(() => import("./actor-view/ActorView"));
const Saved = lazy(() => import("./saved/Saved"));
const Search = lazy(() => import("./search/Search"));
const NotFound = lazy(() => import("./not-found/NotFound"));
const SignIn = lazy(() => import("./sign-in/SignIn"));

const MainRouter = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/movie/:id",
          element: <MovieDetail />,
        },
        {
          path: "/person/:id",
          element: <ActorView />,
        },
        {
          path: "/saved",
          element: <Saved />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
      ],
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};

export default MainRouter;
