import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
  Link,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password.");
      toast.error("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      setError("");
      setLoading(true);
      await signInWithPopup(auth, provider);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setError("Authentication failed. Please try again.");
      toast.error("Social login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 350,
          padding: 3,
          borderRadius: 5,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Sign in
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Don’t have an account?
            <Link
              variant="subtitle2"
              sx={{
                ml: 0.5,
                fontWeight: 550,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
              href="/register"
            >
              Get started
            </Link>
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <TextField
            fullWidth
            name="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
          />

          <Link
            variant="body2"
            color="inherit"
            sx={{ mb: 1.5, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            href="/forgot-password"
          >
            Forgot password?
          </Link>

          <TextField
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ alignSelf: "start", mb: 2 }}>
              {error}
            </Typography>
          )}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleLogin}
            loading={loading}
            sx={{
              textTransform: "none",
              backgroundColor: "#1C252E",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#162025",
              },
            }}
          >
            Sign in
          </LoadingButton>
        </Box>

        <Divider sx={{ my: 3, "&::before, &::after": { borderTopStyle: "dashed" } }}>
          <Typography
            variant="overline"
            sx={{ color: "text.secondary", fontWeight: "fontWeightMedium" }}
          >
            OR
          </Typography>
        </Divider>

        <Box gap={1} display="flex" justifyContent="center">
          <IconButton color="inherit" onClick={() => handleSocialLogin(new GoogleAuthProvider())}>
            <GoogleIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => handleSocialLogin(new GithubAuthProvider())}>
            <GitHubIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => handleSocialLogin(new TwitterAuthProvider())}>
            <TwitterIcon />
          </IconButton>
        </Box>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default LoginPage;
