"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Box,
  Drawer,
  useMediaQuery,
  useTheme,
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import NextLink from "next/link";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

const sidebarWidth = 220;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLoginPage = pathname.startsWith("/login");

  if (isLoginPage) return <>{children}</>;

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F8F9FA" }}>
      <TopNav sidebarWidth={sidebarWidth} onMenuClick={handleDrawerToggle} />

      {/* Sidebar Responsive Implementation */}
      <Box
        component="nav"
        sx={{ width: { md: sidebarWidth }, flexShrink: { md: 0 } }}
      >
        {/* Temporary Drawer for Mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: sidebarWidth },
          }}
        >
          <Sidebar onItemClick={handleDrawerToggle} />
        </Drawer>

        {/* Permanent Drawer for Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { 
              boxSizing: "border-box", 
              width: sidebarWidth,
              borderRight: "1px solid rgba(0,0,0,0.06)",
              bgcolor: "#fff" 
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${sidebarWidth}px)` },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          pt: "64px",
        }}
      >
        {/* Breadcrumbs Section */}
        <Box sx={{ px: { xs: 2, md: 4 }, py: 0.75 }}>
          <Breadcrumbs separator={<NavigateNext fontSize="small" sx={{ color: "text.disabled" }} />}>
            <Link component={NextLink} href="/" underline="none" color="primary" sx={{ fontSize: "0.75rem", fontWeight: 700 }}>
              Portal
            </Link>
            {pathnames.map((value, index) => (
              <Typography key={index} color="text.secondary" sx={{ fontSize: "0.75rem", fontWeight: 500 }}>
                {value.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
              </Typography>
            ))}
          </Breadcrumbs>
        </Box>

        <Box sx={{ flex: 1, px: { xs: 2, md: 4 }, pb: 2 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
