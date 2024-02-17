import React from 'react'
import { Text } from '../../common/locale/script'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function Home() {
  const params = useParams();
  return (
    <div>{params.projectId}</div>
  )
}

export default Home