import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import TasksProgress from '../components/dashboard/ActiveUsers';
import TrafficByDevice from '../components/dashboard/TrafficByDevice';
import Totalusers from '../components/dashboard/Totalusers';
import TSales from '../components/dashboard/TSales';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard | MakeIt</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />
            <TrafficByDevice />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >            <TSales />

          </Grid>

        </Grid></Container>

      <Container>

        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >

        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
        </Grid></Container>


    </Box>
  </>
);

export default Dashboard;
