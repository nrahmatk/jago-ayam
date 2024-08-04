import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import About from "./pages/About";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/cuisine/:cuisineId',
        element: <Details/>
    },
    {
        path: '/about',
        element: <About/>
    }
]);

export default router