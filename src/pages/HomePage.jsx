import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Box
      sx={{
        backgroundImage: "url(/background1.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 2,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={{ xs: 6, md: 10 }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: 700,
              mb: 2,
              color: "white",
            }}
          >
            Welcome to ReStudied
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
              fontWeight: 400,
              color: "#f0f0f0",
            }}
          >
            Your platform to swap and share student supplies.
          </Typography>
        </Box>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          justifyContent="center"
          alignItems="center"
        >
          {!isLoggedIn && (
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              alignItems="center"
            >
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 5, py: 2, fontSize: "1rem" }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: "1rem",
                  color: "white",
                  backgroundColor: "#52b202",
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}

          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              component={Link}
              to="/items"
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2.5,
                fontSize: "1.25rem",
                backgroundColor: "#ff9819",
                color: "white",
              }}
            >
              Browse Items
            </Button>

            {isLoggedIn && (
              <Button
                component={Link}
                to="/add-item"
                variant="contained"
                size="large"
                sx={{
                  px: 6,
                  py: 2.5,
                  fontSize: "1.25rem",
                  color: "white",
                  backgroundColor: "#e5e100",
                }}
              >
                Add Item
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
