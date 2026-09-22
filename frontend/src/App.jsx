import {BrowserRouter,Routes,Route} from "react-router-dom";
import { lazy, Suspense } from 'react'
const Home = lazy(()=> import("./pages/Home.jsx"));
const Layout = lazy(()=>import("./layoutpages/Layout.jsx"));
const Profile = lazy(()=>import("./components/ProfileHeader.jsx"));
const ProfileLayout = lazy(()=>import("./layoutpages/ProfileLayout.jsx"));
const SearchPage = lazy(()=>import("./pages/SearchPage.jsx"));
import PostPage from "./pages/PostPage.jsx";
import ProfileSkill from "./pages/ProfileSkill.jsx"
import AddPost from "./pages/AddPost.jsx";
import Page404 from "./pages/Page404.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUp from "./pages/SignUp.jsx";
import Requests from "./pages/Requests.jsx";
import VerificationPage from "./pages/VerificationPage.jsx";
import FollowersPage from "./pages/FollowersPage.jsx";


export default function App(){
    return (
        <BrowserRouter>
          <Suspense fallback={<div>Loading....</div>}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/verify-email" element={<VerificationPage />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout/>}>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/profile" element={<ProfileLayout />} >
                    <Route index element={<ProfileSkill />}/>
                    <Route path="posts" element={<PostPage />} />
                  </Route>
                  <Route path="/profile/followers" element={<FollowersPage />} />
                  <Route path="/profile/following" element={<FollowersPage />} />
                  <Route path="/addPost" element={<AddPost />} />
                  <Route path="/requests" element={<Requests />} />
                  <Route path="/users/:id" element={<ProfileLayout />} >
                    <Route index element={<ProfileSkill />}/>
                    <Route path="posts" element={<PostPage />} />
                  </Route>
                </Route>
              </Route>
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
    );
}