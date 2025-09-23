import React, { useState } from "react";
import FogBackground from "../components/FogBackground";
import ResponsiveNavBar from "../components/Navbar";
import WelcomePage from "../components/welcome";
import AboutSection from "../components/About";
import ServiceSection from "../components/service";
import ContactSection from "../components/contact";
import Footer from "../components/footer";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import RegistrationForm from "../components/register";

function Launcher() {
  const [open, setOpen] = useState(false); // <-- state for dialog

  const handleOpen = () => setOpen(true); // open dialog
  const handleClose = () => setOpen(false); // close dialog

  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <FogBackground />
      </div>

      {/* Foreground content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <ResponsiveNavBar />

        {/* Pass handleOpen to WelcomePage button */}
        <WelcomePage onGetStarted={handleOpen} />

        <AboutSection />
        <ServiceSection />
        <ContactSection />
        <Footer />

        {/* Registration Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogContent>
            {open && <RegistrationForm onClose={handleClose} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Launcher;
