import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Profile';
import UserList from './pages/UserList';
import NotFound from './pages/NotFound';
import Recipe from './pages/Recipe';
import Settings from './pages/Settings';
import DashBoard from './pages/Dashboard';
import AddRecipe from './components/recipes/AddRecipe';
import AddUser from './components/users/Adduser';
import Register from './pages/Register';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Header from './Makeit/Header';
import MainRecipe from "./Makeit/MainRecipe";
import Feed from "./Makeit/Feed";
import RecipeDetection from "./Makeit/RecipeDetection";
import DietPlan from "./Makeit/DietPlan";
import UserFeedback from "./Makeit/UserFeedback";
import Survey from "./Makeit/Survey";
import ForgetPass from "./Makeit/ForgetPass"
import AR from "./Makeit/AR";
import DietPlanCustom from "./Makeit/DietPlanCustom";
import Home from "./Makeit/Home";
import UserRegister from "./Makeit/UserRegister";
import UserLogin from "./Makeit/UserLogin";

const routes = [
  {
    path: '/adminpanel',
    element: <DashboardLayout />,

    children: [
      { path: 'profile', element: <Account /> },
      { path: 'users', element: <UserList /> },
      { path: 'recipes', element: <Recipe /> },
      { path: 'settings', element: <Settings /> },
      { path: 'dashboard', element: <DashBoard /> },
      { path: 'addrecipe', element: <AddRecipe /> },
      { path: 'adduser', element: <AddUser /> },
      { path: 'feedback', element: <Feedback /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/admin',
    element: <><MainLayout /></>,
    children: [
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {

    path: '/',
    children: [
      { path: '/', element: <UserLogin /> },
      { path: 'UserRegister', element: <UserRegister /> },
      { path: 'ForgetPass', element: <ForgetPass /> },
      { path: 'Home', element: <Home /> },
      { path: 'Feed', element: <><Header /><Feed /> </> },
      { path: 'MainRecipe', element: <MainRecipe /> },
      { path: 'RecipeDetection', element: <RecipeDetection /> },
      { path: 'AR', element: <AR /> },
      { path: 'DietPlan', element: <DietPlan /> },
      { path: 'Survey', element: <Survey /> },
      { path: 'DietPlanCustom', element: <DietPlanCustom /> },
      { path: 'UserFeedback', element: <UserFeedback /> },
      { path: '*', element: <Navigate to="/404" /> }


    ]
  }
];

export default routes;
