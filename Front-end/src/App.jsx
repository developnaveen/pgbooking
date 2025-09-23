import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Launcher from "./pages/Launcher";
import Bookingpage from "./pages/Bookingpage";
import Rooms from "./pages/Rooms";
import { UserProvider } from "./context/UserContext.jsx"; // ✅ Context provider

const theme = createTheme({
  palette: {
    primary: { main: "#CD5C5C" },
    secondary: { main: "#F08080" },
  },
});

function App() {
  return (
    <UserProvider> {/* ✅ Wrap everything in UserProvider */}
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Launcher />} />
            <Route path="/booking" element={<Bookingpage />} />
            <Route path="/rooms/:id" element={<Rooms />} /> 
          </Routes>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
