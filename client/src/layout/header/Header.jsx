import { Layout, Select } from "antd";
import React from "react";
import { Text } from "../../common/locale/script";
import MiracleLogo from "../../assets/Miracle-Logo-White.png";
import { useDispatch, useSelector } from "react-redux";
import { switchLocale } from "../../features/locale/localeSlice";
const { Header } = Layout;

function AppHeader() {
  const locale = useSelector((state) => state.locale.value);
  const dispatch = useDispatch();
  return (
    <Header className="flex items-center justify-between bg-black">
      <div className=" rounded-[6px] mr-5 text-white text-2xl">
        AI Task Orchestrator
      </div>
      <div className="flex flex-row gap-5">
        <div className="w-auto h-[32px] flex items-center justify-center text-white">
          {Text[locale].withLove}
        </div>
      </div>
    </Header>
  );
}

export default AppHeader;
