import CategoryAddNew from "module/category/CategoryAddNew";
import CategoryManage from "module/category/CategoryManage";
import CategoryUpdate from "module/category/CategoryUpdate";
import DashboardLayout from "module/dashboard/DashboardLayout";
import PostAddNew from "module/post/PostAddNew";
import PostUpdate from "module/post/PostUpdate";
import UserAddNew from "module/user/UserAddNew";
import UserManage from "module/user/UserManage";
import UserProfile from "module/user/UserProfile";
import UserUpdate from "module/user/UserUpdate";
import DashBoardPage from "pages/DashBoardPage";
import HomePage from "pages/HomePage";
import NotFoundPage from "pages/NotFoundPage";
import PostDetailsPage from "pages/PostDetailsPage";
import PostManage from "pages/PostManage";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        <Route
          path="/:slug"
          element={<PostDetailsPage></PostDetailsPage>}
        ></Route>
        <Route element={<DashboardLayout></DashboardLayout>}>
          <Route
            path="/dashboard"
            element={<DashBoardPage></DashBoardPage>}
          ></Route>
          <Route
            path="/manage/posts"
            element={<PostManage></PostManage>}
          ></Route>
          <Route
            element={<PostAddNew></PostAddNew>}
            path="/manage/add-post"
          ></Route>
          <Route
            element={<PostUpdate></PostUpdate>}
            path="/manage/update-post"
          ></Route>
          <Route
            element={<CategoryAddNew></CategoryAddNew>}
            path="/manage/add-category"
          ></Route>
          <Route element={<UserProfile></UserProfile>} path="/profile"></Route>
          <Route
            path="/manage/category"
            element={<CategoryManage></CategoryManage>}
          ></Route>
          <Route
            path="/manage/update-category"
            element={<CategoryUpdate></CategoryUpdate>}
          ></Route>
          <Route
            path="/manage/user"
            element={<UserManage></UserManage>}
          ></Route>
          <Route
            path="/manage/add-user"
            element={<UserAddNew></UserAddNew>}
          ></Route>
          <Route
            path="/manage/update-user"
            element={<UserUpdate></UserUpdate>}
          ></Route>
        </Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
