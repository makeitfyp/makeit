import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
// import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';
import DotButton from '../dotbutton';

const RecipeList = ({ recipe, ...rest }) => {
//  const [selectedrecipeIds, setSelectedrecipeIds] = useState([]);
//  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
//  const history = useNavigate();

//   const handleSelectAll = (event) => {
//     let newSelectedrecipeIds;

//     if (event.target.checked) {
//       newSelectedrecipeIds = recipe.map((recipes) => recipes.id);
//     } else {
//       newSelectedrecipeIds = [];
//     }

//     setSelectedrecipeIds(newSelectedrecipeIds);
//   };

//   const handleSelectOne = (event, id) => {
//     const selectedIndex = selectedrecipeIds.indexOf(id);
//     let newSelectedrecipeIds = [];

//     if (selectedIndex === -1) {
//       newSelectedrecipeIds = newSelectedrecipeIds.concat(selectedrecipeIds, id);
//     } else if (selectedIndex === 0) {
//       newSelectedrecipeIds = newSelectedrecipeIds.concat(selectedrecipeIds.slice(1));
//     } else if (selectedIndex === selectedrecipeIds.length - 1) {
//       newSelectedrecipeIds = newSelectedrecipeIds.concat(selectedrecipeIds.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelectedrecipeIds = newSelectedrecipeIds.concat(
//         selectedrecipeIds.slice(0, selectedIndex),
//         selectedrecipeIds.slice(selectedIndex + 1)
//       );
//     }

//     setSelectedrecipeIds(newSelectedrecipeIds);
//   };

  const handleLimitChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

//  const routeChange = () => {
//    const path = '/app/addrecipe';
//    history(path);
//  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead style={{ backgroundColor: 'orange', color: 'white' }}>
              <TableRow selectable={false}>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedrecipeIds.length === recipe.length}
                    color="primary"
                    indeterminate={
                      selectedrecipeIds.length > 0
                      && selectedrecipeIds.length < recipe.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>
                  Image
                </TableCell>
                <TableCell>
                  Ingredients
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {recipe.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((recipes) => (
                <TableRow
                  hover
                  key={recipes.id}
                  selected={false}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedrecipeIds.indexOf(recipes.id) !== -1}
                      onChange={(event) => handleSelectOne(event, recipes.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={recipes.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(recipes.title)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {recipes.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {recipes.ingredients}
                  </TableCell>
                  <TableCell>
                    <DotButton />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={recipe.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
      />
    </Card>
  );
};

RecipeList.propTypes = {
  recipe: PropTypes.array.isRequired
};

export default RecipeList;
