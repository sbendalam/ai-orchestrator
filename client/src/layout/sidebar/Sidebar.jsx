import React from "react";
import { Layout, Menu, theme } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Text } from "../../common/locale/script";
import { useSelector } from "react-redux";
const { Sider } = Layout;
function AppSidebar() {
  const navigate = useNavigate();
  const locale = useSelector((state) => state.locale.value)
  const items = [
    {
      key: `Home`,
      icon: React.createElement(UserOutlined),
      label: Text[locale].homeMenu.main,
      children: [
        {
          key: `childrenExample`,
          icon: React.createElement(LaptopOutlined),
          label: Text[locale].homeMenu.subOne,
          children: null,
          onClick: () => {
            navigate("/home");
          },
        },
      ],
    },
    {
      key: `Reports`,
      icon: React.createElement(LaptopOutlined),
      label: Text[locale].reportsMenu.main,
      children: null,
      onClick: () => {
        navigate("/reports");
      },
    },
  ];
  return (
    <Sider width={200} className="h-full overflow-y-auto !bg-white">
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
