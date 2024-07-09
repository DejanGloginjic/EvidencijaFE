import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RecordsPage from "./pages/RecordsPage";
import Layout from "./layout/Layout";
import Maintenance from "./pages/Maintenance";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <RecordsPage />,
        },
        {
          path: "odrzavanje",
          element: <Maintenance />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
