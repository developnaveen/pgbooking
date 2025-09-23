import * as React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import HotelIcon from '@mui/icons-material/Hotel';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import LoginPage from "./login";


const pages = ['About', 'Service', 'Contact'];

function ResponsiveNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [loginOpen, setLoginOpen] = useState(false);

  // Open Login dialog
  const handleLoginOpen = () => setLoginOpen(true);

  // Close Login dialog
  const handleLoginClose = () => setLoginOpen(false);

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: '#CD5C5C', color: 'white' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              ":hover": { color: 'white' },
            }}
          >
            PG BOOKING
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
             <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  backgroundColor: '#CD5C5C', // green background
                  color: 'white', // text color
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        <HotelIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              ":hover": { color: 'white' },
            }}
          >
            PG BOOKING
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
          <Button
            key={page}
            onClick={() => {
              handleCloseNavMenu(); // close menu if on mobile
              const element = document.getElementById(page.toLowerCase()); // match id
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
          }}
          sx={{ my: 2, color: 'white', display: 'block' }}
      >
        {page}
      </Button>
  ))}

          </Box>
          
          <Button
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'white',
              transition: 'transform 0.3s ease', // outline color
              '&:hover': {
                borderColor: '#F08080', // darker border on hover
                backgroundColor: 'white', // light green hover bg
                color: '#F08080',
                transform: 'scale(1.1)',
              },
            }}
            onClick={handleLoginOpen}
          >
            LOG IN
          </Button>
          <Button variant="contained" onClick={() => navigate("/booking")}>Go to Booking</Button>
        <Dialog open={loginOpen} onClose={handleLoginClose} maxWidth="sm" fullWidth>
          <DialogContent>
          <LoginPage />
          </DialogContent>
        </Dialog>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveNavBar;
