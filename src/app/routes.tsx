import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { DiaryPage } from "./components/DiaryPage";
import { NotesPage } from "./components/NotesPage";
import { AnniversariesPage } from "./components/AnniversariesPage";
import { PhotosPage } from "./components/PhotosPage";
import { TodoPage } from "./components/TodoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "diary", Component: DiaryPage },
      { path: "notes", Component: NotesPage },
      { path: "todos", Component: TodoPage },
      { path: "anniversaries", Component: AnniversariesPage },
      { path: "photos", Component: PhotosPage },
    ],
  },
]);
