import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import RecipeList from '../components/recipes/RecipeList';
import RecipeListToolbar from '../components/recipes/RecipeToolbar';
import recipe from '../__mocks__/recipe';

const Recipe = () => (
  <>
    <Helmet>
      <title>Recipe | MakeIt</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <RecipeListToolbar />
        <Box sx={{ pt: 3 }}>
          <RecipeList recipe={recipe} />
        </Box>
      </Container>
    </Box>
  </>
);

export default Recipe;
