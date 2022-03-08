import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRef } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CardActions
} from '@material-ui/core';

const AddUser = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Helmet>
        <title>AddRecipe | MakeIt</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'grey',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              name: '',
              ingredients: '',
              phone: '',
              steps: ''
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required('Name is required'),
              ingredients: Yup.string().max(255).required('Ingredients are required'),
              steps: Yup.string().max(255).required('Steps are required')
            })}
            onSubmit={() => {
              navigate('/app/recipes', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 1 }}>
                  <Typography
                    color="textPrimary"
                    variant="h1"
                  >
                    New Recipe
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="name"
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.ingredients && errors.ingredients)}
                  fullWidth
                  multiline
                  helperText={touched.ingredients && errors.ingredients}
                  label="Ingredients"
                  margin="normal"
                  name="ingredients"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="ingredients"
                  value={values.ingredients}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.steps && errors.steps)}
                  fullWidth
                  multiline
                  helperText={touched.steps && errors.steps}
                  label="Steps"
                  margin="normal"
                  name="steps"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="steps"
                  value={values.steps}
                  variant="outlined"
                />
                <CardActions>
                  <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    ref={fileInputRef}                  >
                    Upload picture
                  </Button>
                </CardActions>
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    SUBMIT
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default AddUser;
