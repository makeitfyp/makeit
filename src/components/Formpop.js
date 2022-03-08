import * as React from 'react';
// import { Icon } from '@iconify/react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TextField from '@mui/material/TextField';
// import editFill from '@iconify/icons-eva/edit-fill';
import { ListItemIcon } from '@mui/material';
import {
    Button,
    CardActions,
    Paper
  } from '@material-ui/core';
import { useRef, useState } from 'react';

export default function Formpopup() {
  const [setImageURL] = useState(null);
  const fileInputRef = useRef();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const triggerUpload = () => {
    fileInputRef.current.click();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
        const url = URL.createObjectURL(files[0]);
        setImageURL(url);
    } else {
        setImageURL(null);
    }
  };

  return (
    <div>
      <ListItemIcon onClick={handleClickOpen}>
        <EditOutlinedIcon width={24} height={24} />
      </ListItemIcon>
      <Paper
        elevation={0}
        style={{ backgroundColor: 'RED' }}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ backgroundColor: '#f4f6f8' }}>
            FORM
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="name"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              multiline
              margin="dense"
              id="name"
              label="Ingredients"
              type="name"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              multiline
              margin="dense"
              id="name"
              label="Steps"
              type="name"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <CardActions>
            <input
              type="file"
              accept="image/*"
              className="uploadInput"
              onChange={uploadImage}
              ref={fileInputRef}
            />
            <Button
              color="primary"
              onClick={triggerUpload}
            >
              Upload Image
            </Button>
          </CardActions>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="warning"
            >
              No
            </Button>
            <Button
              onClick={handleClose}
              color="success"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
}
