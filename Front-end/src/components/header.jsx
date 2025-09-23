import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import BookingCard from './mybooking';
import UserProfile from './profile'; // make sure this file exists and is correctly implemented

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openBookingDialog, setOpenBookingDialog] = React.useState(false);
  const [openProfileDialog, setOpenProfileDialog] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenBookingDialog = () => {
    setOpenBookingDialog(true);
  };

  const handleCloseBookingDialog = () => {
    setOpenBookingDialog(false);
  };

  const handleOpenProfileDialog = () => {
    setOpenProfileDialog(true);
    handleCloseMenu(); // close the menu when profile is clicked
  };

  const handleCloseProfileDialog = () => {
    setOpenProfileDialog(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PG BOOKING
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <Button onClick={handleOpenBookingDialog} variant="text" color="inherit">
              MY Booking
            </Button>

            <div>
              <IconButton
                size="large"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleOpenProfileDialog}>Profile</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
              </Menu>
            </div>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Dialog popup with BookingCard inside */}
      <Dialog open={openBookingDialog} onClose={handleCloseBookingDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          <BookingCard />
        </DialogContent>
      </Dialog>

      {/* Dialog popup with UserProfile inside */}
      <Dialog open={openProfileDialog} onClose={handleCloseProfileDialog} maxWidth="sm" fullWidth>
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          <UserProfile />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
