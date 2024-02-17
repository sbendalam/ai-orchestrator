import React from "react";
import { Layout, Menu, theme } from "antd";
import {
  LaptopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Sider } = Layout;
function AppSidebar() {
  const navigate = useNavigate();
  const locale = useSelector((state) => state.locale.value)
  //getListOfProjects
  const items = [
    {
      key: `Projects`,
      icon: React.createElement(UserOutlined),
      label: "Projects",
      children: [
        {
          key: `pid#1`,
          icon: React.createElement(LaptopOutlined),
          label: "Project 1",
          children: null,
          onClick: () => {
            navigate("/project/1");
          },
        },
        {
          key: `pid#2`,
          icon: React.createElement(LaptopOutlined),
          label: "Project 2",
          children: null,
          onClick: () => {
            navigate("/project/2");
          },
        },
        {
          key: `pid#3`,
          icon: React.createElement(LaptopOutlined),
          label: "Project 3",
          children: null,
          onClick: () => {
            navigate("/project/3");
          },
        },
        {
          key: `pid#4`,
          icon: React.createElement(LaptopOutlined),
          label: "Project 4",
          children: null,
          onClick: () => {
            navigate("/project/4");
          },
        },
      ],
    },

  ];
  return (
    <Sider width={200} className="h-full overflow-y-auto !bg-black">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={items}
      />
    </Sider>
  );
}

export default AppSidebar;
