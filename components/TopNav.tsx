"use client";

import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Stack,
  Link,
  Box,
  Typography,
  Chip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Notifications, Menu as MenuIcon } from "@mui/icons-material";
import NextLink from "next/link";
import { MOCK_DEALER } from "@/lib/mockData";
import { useState } from "react";

interface TopNavProps {
  sidebarWidth: number;
  onMenuClick: () => void;
}

export function TopNav({ sidebarWidth, onMenuClick }: TopNavProps) {
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pathnames = pathname.split("/").filter((x) => x);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const pageTitle = pathnames.length > 0 
    ? pathnames[pathnames.length - 1].replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) 
    : "Dashboard";

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          bgcolor: "var(--safaricom-green)",
          height: 64,
          left: { md: sidebarWidth, xs: 0 },
          width: { md: `calc(100% - ${sidebarWidth}px)`, xs: "100%" },
          zIndex: (theme) => theme.zIndex.drawer + 2,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar sx={{ minHeight: 64, height: 64, px: { xs: 1, md: 4 } }}>
          <Stack direction="row" spacing={3} alignItems="center">
            <IconButton 
              color="inherit" 
              onClick={onMenuClick} 
              sx={{ display: { md: "none" }, p: 0, mr: 1 }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
            
            <Typography variant="h6" fontWeight={700} color="inherit" sx={{ mr: 4, display: { xs: "none", sm: "block" } }}>
              {pageTitle}
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={{ xs: 1, md: 3 }} alignItems="center">
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
              <Typography variant="caption" fontWeight={600} sx={{ color: "white" }}>
                {MOCK_DEALER.name}
              </Typography>
              <Chip label="D-T105" size="small" sx={{ height: 18, fontSize: "0.6rem", fontWeight: 700, bgcolor: "rgba(255,255,255,0.2)", color: "white" }} />
            </Box>
            <IconButton size="small" color="inherit"><Notifications sx={{ fontSize: 20 }} /></IconButton>
            <Avatar onClick={handleProfileClick} sx={{ width: 32, height: 32, bgcolor: "rgba(255,255,255,0.2)", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700 }}>JS</Avatar>
          </Stack>
        </Toolbar>
      </AppBar>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} sx={{ mt: 1 }}>
        <MenuItem component={NextLink} href="/" onClick={handleClose}>Home</MenuItem>
        <MenuItem component={NextLink} href="/settings" onClick={handleClose}>Settings</MenuItem>
        <MenuItem component={NextLink} href="/help" onClick={handleClose}>Help</MenuItem>
        <MenuItem component={NextLink} href="/contact-us" onClick={handleClose}>Contact Us</MenuItem>
        <MenuItem component={NextLink} href="/about-us" onClick={handleClose}>About Us</MenuItem>
        <MenuItem component={NextLink} href="/login" onClick={handleClose} sx={{ color: "error.main" }}>Logout</MenuItem>
      </Menu>
    </>
  );
}
