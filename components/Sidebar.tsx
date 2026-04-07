"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { navItems } from "@/lib/navigation";

interface SidebarProps {
  onItemClick?: () => void;
}

export function Sidebar({ onItemClick }: SidebarProps) {
  const pathname = usePathname();
  const [orderingOpen, setOrderingOpen] = useState(false);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "#fff" }}>
      {/* Top Left Logo Area */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #f0f0f0", height: 64, overflow: "hidden", p: 1 }}>
        <Box component={NextLink} href="/" onClick={onItemClick} sx={{ display: "flex", alignItems: "center", width: "100%", height: "100%" }}>
          <img 
             src="https://www.safaricom.co.ke/images/safaricom-25.gif" 
             alt="Safaricom 25 Logo" 
             style={{ width: "100%", height: "100%", objectFit: "contain" }} 
          />
        </Box>
      </Box>

      <Box sx={{ p: 0, flex: 1, overflowY: "auto" }}>
        <List disablePadding>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const hasChildren = item.children && item.children.length > 0;
            
            return (
              <Box key={item.label}>
                <ListItemButton
                  component={item.href === "/reports" ? "div" : NextLink}
                  href={item.href === "/reports" ? undefined : item.href}
                  onClick={() => {
                    if (hasChildren) {
                      setOrderingOpen(!orderingOpen);
                    } else if (onItemClick) {
                      onItemClick();
                    }
                  }}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 0,
                    mb: 0,
                    color: isActive ? "var(--safaricom-green)" : "rgba(0,0,0,0.6)",
                    bgcolor: isActive ? "rgba(27, 147, 48, 0.04)" : "transparent",
                    "&:hover": { bgcolor: "rgba(27, 147, 48, 0.02)" },
                    "& .MuiListItemIcon-root": {
                      color: isActive ? "var(--safaricom-green)" : "rgba(0,0,0,0.5)",
                      minWidth: 44
                    },
                    borderLeft: isActive ? "4px solid var(--safaricom-green)" : "4px solid transparent",
                    transition: "all 0.2s ease"
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 44 }}>{item.icon}</ListItemIcon>
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{ 
                      fontSize: "0.95rem", 
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: "0.01em"
                    }} 
                  />
                  {hasChildren && (orderingOpen ? <ExpandLess sx={{ fontSize: 20 }} /> : <ExpandMore sx={{ fontSize: 20 }} />)}
                </ListItemButton>
                
                {hasChildren && (
                  <Collapse in={orderingOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children?.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <ListItemButton
                            key={child.label}
                            component={NextLink}
                            href={child.href}
                            onClick={onItemClick}
                            sx={{
                              pl: 8.5,
                              py: 0.75,
                              color: isChildActive ? "var(--safaricom-green)" : "rgba(0,0,0,0.6)",
                              "&:hover": { color: "var(--safaricom-green)", bgcolor: "transparent" }
                            }}
                          >
                            {child.icon && (
                              <ListItemIcon sx={{ minWidth: 28, color: "inherit" }}>
                                {child.icon}
                              </ListItemIcon>
                            )}
                            <ListItemText 
                              primary={child.label} 
                              primaryTypographyProps={{ fontSize: "0.85rem", fontWeight: isChildActive ? 600 : 400 }} 
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
