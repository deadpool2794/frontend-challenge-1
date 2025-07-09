import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import NotFoundPage from "./pages/error/NotFound";
import MainPage from "./pages/MainPage";
import Login from "./components/Login";
import FilePreviewPage from "./pages/FilePreviewPage";
import MyFilesPage from "./pages/MyFilesPage";

const router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path:"/file_preview",
        element: <FilePreviewPage />
      },
      {
        path:"/my_files",
        element:<MyFilesPage />
      }
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
