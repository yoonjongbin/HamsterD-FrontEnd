import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import MyPage from "./pages/member/MyPage";
import StudyGroup from "./pages/studygroup/StudyGroup";
import GroupPage from "./pages/studygroup/GroupPage";
import CreateGroup from "./pages/studygroup/CreateGroup";
import GroupReview from "./pages/studygroup/GroupReview";
import Social from "./pages/social/Social";
import Schedule from "./pages/studygroup/Schedule";
import ScheduleMain from "./pages/studygroup/ScheduleMain";
import BoardList from "./pages/board/BoardList";
import Board from "./pages/board/Board";
import SignUp from "./pages/member/SignUp";
import BoardDetail from "./pages/board/BoardDetail";
import Update from "./pages/member/Update";
import BoardComment from "./pages/board/BoardComment";
import BoardInComment from "./pages/board/BoardInComment";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/update",
        element: <Update />,
      },
      {
        path: "/studygroup",
        element: <StudyGroup />,
      },
      {
        path: "/grouppage",
        element: <GroupPage />,
      },
      {
        path: "/creategroup",
        element: <CreateGroup />,
      },
      {
        path: "/groupreview",
        element: <GroupReview />,
      },
      {
        path: "/social",
        element: <Social />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/scheduleMain",
        element: <ScheduleMain />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/boardList",
        element: <BoardList />,
      },
      {
        path: "/board",
        element: <Board />,
      },
      {
        path: "/post/:postNo",
        element: <BoardDetail />,
        children: [
          {
            path: "/post/:postNo/pcomment",
            element: <BoardComment />,
            children: [
              {
                path: "/post/:postNo/pcomment/:commentNo/incomment",
                element: <BoardInComment />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
