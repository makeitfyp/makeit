import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Feedbacktoolbar from '../components/Feedback/Feedbacktoolbar';
import FeedbackUserlist from '../components/Feedback/Feedbackuserlist';
import customers from '../__mocks__/customers';

const Feedback = () => (
  <>
    <Helmet>
      <title>Feedback | MakeIt</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Feedbacktoolbar />
        <Box sx={{ pt: 3 }}>
          <FeedbackUserlist customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default Feedback;
