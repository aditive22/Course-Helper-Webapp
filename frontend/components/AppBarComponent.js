import React, {useState, useEffect} from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";

const AppBarComponent = () => {
  const router = useRouter();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        setIsLoggedIn(true);
        // Optional: Set username or any other user info if needed
      }
    };
  
    checkUserLoggedIn();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    alert("You have been logged out.");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>Course Helper</Typography>
        {isLoggedIn ? (
            <Avatar/> // Display avatar when logged in
          ) : (
            <Button color="inherit" onClick={() => router.push("/login")}>
              Log In
            </Button>
          )}
          {isLoggedIn && (
            <Button color="inherit" onClick={handleLogOut}>
              Log Out
            </Button>
          )}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
