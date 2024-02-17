import { Layout, Select } from "antd";
import React from "react";
import { Text } from "../../common/locale/script";
import MiracleLogo from "../../assets/Miracle-Logo-White.png"
import { useDispatch, useSelector } from "react-redux";
import { switchLocale } from "../../features/locale/localeSlice";
const { Header } = Layout;

function AppHeader() {
  const locale = useSelector((state) => state.locale.value)
  const dispatch = useDispatch()
  return (
    <Header className="flex items-center justify-between bg-miracle-dark-blue">
      <div className=" rounded-[6px] mr-5">
        <img className="aspect-auto w-[120px]" src={MiracleLogo}/>
      </div>
      <div className="flex flex-row gap-5">
        <Select
          value={locale}
          style={{ width: 120 }}
          onChange={(value) => {
            dispatch(switchLocale(value))
          }}
          options={[
            { value: "En", label: "English" },
            { value: "Jp", label: "日本語" },
          ]}
        />
        <div className="w-auto h-[32px] flex items-center justify-center text-miracle-white">
          {Text[locale].withLove}
        </div>
      </div>
    </Header>
  );
}

export default AppHeader;
