// import CategoryAddNew from "module/category/CategoryAddNew";
// import CategoryManage from "module/category/CategoryManage";
// import CategoryUpdate from "module/category/CategoryUpdate";
// import DashboardLayout from "module/dashboard/DashboardLayout";
// import PostAddNew from "module/post/PostAddNew";
// import PostUpdate from "module/post/PostUpdate";
// import UserAddNew from "module/user/UserAddNew";
// import UserManage from "module/user/UserManage";
// import UserProfile from "module/user/UserProfile";
// import UserUpdate from "module/user/UserUpdate";
// import DashBoardPage from "pages/DashBoardPage";
// import HomePage from "pages/HomePage";
// import NotFoundPage from "pages/NotFoundPage";
// import PostDetailsPage from "pages/PostDetailsPage";
// import PostManage from "pages/PostManage";
// import SignInPage from "pages/SignInPage";
// import SignUpPage from "pages/SignUpPage";
import BlogPage from "pages/BlogPage";
import CategoryPage from "pages/CategoryPage";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = React.lazy(() => import("pages/HomePage"));
// const CategoryPage = React.lazy(() => import("pages/CategoryPage"));
const DashBoardPage = React.lazy(() => import("pages/DashBoardPage"));
const SignInPage = React.lazy(() => import("pages/SignInPage"));
const PostDetailsPage = React.lazy(() => import("pages/PostDetailsPage"));
const NotFoundPage = React.lazy(() => import("pages/NotFoundPage"));
const UserUpdate = React.lazy(() => import("module/user/UserUpdate"));
const UserAddNew = React.lazy(() => import("module/user/UserAddNew"));
const UserManage = React.lazy(() => import("module/user/UserManage"));
const UserProfile = React.lazy(() => import("module/user/UserProfile"));
const PostAddNew = React.lazy(() => import("module/post/PostAddNew"));
const PostManage = React.lazy(() => import("pages/PostManage"));
const PostUpdate = React.lazy(() => import("module/post/PostUpdate"));
const CategoryAddNew = React.lazy(() =>
  import("module/category/CategoryAddNew")
);
const CategoryManage = React.lazy(() =>
  import("module/category/CategoryManage")
);
const CategoryUpdate = React.lazy(() =>
  import("module/category/CategoryUpdate")
);
const DashboardLayout = React.lazy(() =>
  import("module/dashboard/DashboardLayout")
);
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));

function App() {
  return (
    <div>
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          <Route
            path=":slug"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>
          <Route
            path="/category/:slug"
            element={<CategoryPage></CategoryPage>}
          ></Route>
          <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
          <Route
            path="/category"
            element={<CategoryPage></CategoryPage>}
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
            <Route
              element={<UserProfile></UserProfile>}
              path="/profile"
            ></Route>
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
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
