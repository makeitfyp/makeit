import {
    Box,
    Card,
    CardContent,
    TextField,
    InputAdornment
  } from '@material-ui/core';
  import { Search as SearchIcon } from 'react-feather';

  const Feedbacktoolbar = (props) => (
    <Box {...props}>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                placeholder="Search Feedback"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
);
export default Feedbacktoolbar;
