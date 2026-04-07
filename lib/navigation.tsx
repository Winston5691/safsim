import {
  DashboardOutlined,
  BarChartOutlined,
  NotificationsNoneOutlined,
  StoreOutlined,
  GavelOutlined,
  SimCardOutlined,
  SwapCallsOutlined,
  BuildOutlined,
  SupportAgentOutlined,
  HomeOutlined,
  AddchartOutlined,
  EventBusyOutlined,
} from "@mui/icons-material";
import React from "react";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: { label: string; href: string; icon?: React.ReactNode }[];
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: <HomeOutlined /> },
  { label: "Sim serials", href: "/sim-serials", icon: <SimCardOutlined /> },
  { label: "Resellers", href: "/resellers", icon: <StoreOutlined /> },
  { label: "Sim returns", href: "/returns", icon: <SwapCallsOutlined /> },
  { label: "Notifications", href: "/notifications", icon: <NotificationsNoneOutlined /> },
  {
    label: "Reports",
    href: "/reports",
    icon: <BarChartOutlined />,
    children: [
      { label: "Monthly Reports", href: "/reports/monthly", icon: <AddchartOutlined sx={{ fontSize: 18 }} /> },
      { label: "Late Submissions", href: "/reports/late-submissions", icon: <EventBusyOutlined sx={{ fontSize: 18 }} /> },
    ]
  },
  { label: "Audit", href: "/audit", icon: <GavelOutlined /> },
  { label: "Seller Analytics", href: "/sales", icon: <BarChartOutlined /> },
  { label: "Support Systems", href: "/support", icon: <SupportAgentOutlined /> },
];
