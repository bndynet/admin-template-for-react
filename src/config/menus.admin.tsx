import * as React from "react";
import HomeIcon from "@material-ui/icons/Home";
import TimelineIcon from "@material-ui/icons/Timeline";
import BuildIcon from "@material-ui/icons/Build";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DnsIcon from "@material-ui/icons/Dns";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import InputIcon from "@material-ui/icons/Input";
import { MenuItem } from "app/types";

const menus: MenuItem[] = [
    {
        icon: "fas fa-home",
        text: "Home",
        description: "Go to public home",
        link: "/",
    },
    {
        icon: <DashboardIcon />,
        text: "Dashboard",
        description: "",
        link: "/admin/dashboard",
    },
    {
        icon: <InputIcon />,
        text: "Markdown Editor",
        description: "",
        link: "/admin/markdown",
    },
    {
        icon: <ScheduleIcon />,
        text: "Real-Time",
        description: "",
        link: "",
    },
    {
        icon: <TimelineIcon />,
        text: "Audience",
        description: "",
        link: "",
    },
    {
        icon: <DnsIcon />,
        text: "Behavior",
        description: "",
        link: "",
    },
    {
        icon: <BuildIcon />,
        text: "Conversions",
        description: "",
        link: "",
    },
    {
        icon: <DashboardIcon />,
        text: "Others",
        description: "",
        link: "",
        children: [
            {
                icon: <PeopleIcon />,
                text: "Customers",
                description: "",
                link: "",
            },
            {
                icon: <BarChartIcon />,
                text: "Reports",
                description: "",
                children: [
                    {
                        icon: <BarChartIcon />,
                        text: "Menu 3-1",
                    },
                    {
                        icon: <BarChartIcon />,
                        text: "Menu 3-2",
                    },
                    {
                        icon: <BarChartIcon />,
                        text: "Menu 3-3",
                    },
                ],
            },
            {
                icon: <LayersIcon />,
                text: "Integrations",
                description: "",
                link: "",
            },
        ],
    },
];

export default menus;
