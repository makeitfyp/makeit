import React from "react";
import Header from "./Header";
import "./Home.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import TodayIcon from '@material-ui/icons/Today';
import ForumIcon from '@material-ui/icons/Forum';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { useNavigate } from "react-router-dom";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import {
  useParams
} from "react-router-dom";
import firebase from 'firebase/compat/app';

function Home() {
  const navigate = useNavigate();
  let {userID} = useParams();

  return (
    JSON.parse(localStorage.getItem('user'))?
    <div>
      <Header id={userID} />
      <div className="hero">
      </div>
      <h2 className="heading2"> FEATURES</h2>

      <div className="home_card">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component={RestaurantIcon}
            style={{ fontSize: 120, marginLeft: 100 }}
          />
          <CardContent style={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              Recipes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Find Recipes Using Available Ingredients, Recipe Names or Using Different Filtering Methods
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="large" onClick={() => navigate("/MainRecipe/"+userID)}>Try It</Button>

          </CardActions>
        </Card><Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component={ViewInArIcon}
            style={{ fontSize: 120, marginLeft: 100 }}
          />
          <CardContent style={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              Augmented Reality
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View Different Foods In Augmented Reality Before Cooking
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate("/AR/"+userID)} size="large">Try It</Button>

          </CardActions>
        </Card><Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component={ImageSearchIcon}
            style={{ fontSize: 120, marginLeft: 100 }}
          />
          <CardContent style={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              Recipe Detection
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A Machine Learning Powered Application TO Enhance User Experince
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate("/RecipeDetection/"+userID)} size="large">Try It</Button>

          </CardActions>
        </Card>
      </div>
      <div className="home_card">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component={SupervisorAccountIcon}
            style={{ fontSize: 120, marginLeft: 100 }}
          />
          <CardContent style={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              News Feed
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Post About The Recipes And Tell The World About It Using The News Feed
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate("/Feed/"+userID)} size="large">Try It</Button>

          </CardActions>
        </Card> <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component={TodayIcon}
            style={{ fontSize: 120, marginLeft: 100 }}
          />
          <CardContent style={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              Diet Plans
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create Diet Plans Depending on Your Dietary  Requirements Or Just
              Choose from Existing Plans
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate("/DietPlan/"+userID)} size="large">Try It</Button>

          </CardActions>
        </Card> <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component={ViewInArIcon}
            style={{ fontSize: 120, marginLeft: 100 }}
          />
          <CardContent style={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              Feedback
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Want to Express your love with the Application Just Rate and Give Us A Feedback
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate("/UserFeedback/"+userID)} size="large">Try It</Button>

          </CardActions>
        </Card>
      </div>
    </div>:<div className="notFound">
      <p>Oppss!!! No Webpage</p>
      <p>ERROR 404</p>
    </div>
  );
}

export default Home;
