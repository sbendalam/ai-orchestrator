import React from 'react'
import { Text } from '../../common/locale/script'
import { useSelector } from 'react-redux'

function Reports() {
  const locale = useSelector((state) => state.locale.value)
  return (
    <div>{Text[locale].reportsText}</div>
  )
}

export default Reports