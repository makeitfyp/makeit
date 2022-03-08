import 'react-perfect-scrollbar/dist/css/styles.css';
import { StyledEngineProvider } from '@material-ui/core';
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
import CustomRecipe from "./Makeit/CustomRecipe";
import Feed from "./Makeit/Feed";
import RecipeDetection from "./Makeit/RecipeDetection";
import DietPlan from "./Makeit/DietPlan";
import UserFeedback from "./Makeit/UserFeedback";
import Survey from "./Makeit/Survey";
import ForgetPass from "./Makeit/ForgetPass"
import AR from "./Makeit/AR";
import DietPlanCustom from "./Makeit/DietPlanCustom";
import Home from "./Makeit/Home";
import UserRegister from "./Makeit/UserRegister.js";
import UserLogin from "./Makeit/UserLogin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {

  return (
    <div>
       <Router>
        <Routes>
          <Route exact path="/" element={<UserLogin />} />
          <Route exact path="/Register" element={<UserRegister />} />
          <Route exact path="/ForgetPass" element={<ForgetPass />} />
          <Route exact path="/MainRecipe/:userID" element={<MainRecipe />} />
          <Route exact path="/CustomRecipe/:userID" element={<CustomRecipe />} />
          <Route exact path="/Feed/:userID" element={<Feed />} />
          <Route exact path="/RecipeDetection/:userID" element={<RecipeDetection />} />
          <Route exact path="/DietPlan/:userID" element={<DietPlan />} />
          <Route exact path="/UserFeedback/:userID" element={<UserFeedback />} />
          <Route exact path="/DietPlanCustom/:userID" element={<DietPlanCustom />} />
          <Route exact path="/Home/:userID" element={<Home />} />
          <Route exact path="/Survey/:userID" element={<Survey />} />

        </Routes>
      </Router>

    </div>
  );
};

export default App;
