import { Layout } from "antd";
import React from "react";
import { Text } from "../../common/locale/script";
import { useSelector } from "react-redux";
const { Footer } = Layout;
function AppFooter() {
  const locale = useSelector((state) => state.locale.value);
  return (
    <Footer className="text-center">
      Assemble with the CodeVengers, we tackle challenges with the precision of
      Iron Man's armor and the resilience of Captain America's shield
    </Footer>
  );
}

export default AppFooter;
