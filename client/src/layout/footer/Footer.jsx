import { Layout } from 'antd';
import React from 'react'
import { Text } from '../../common/locale/script';
import { useSelector } from 'react-redux';
const { Footer } = Layout;
function AppFooter() {
  const locale = useSelector((state) => state.locale.value)
  return (
    <Footer className="text-center">{Text[locale].footerText}</Footer>
  )
}

export default AppFooter