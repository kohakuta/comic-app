import React from 'react'
import { useParams } from 'react-router-dom'

const Detail = () => {
    const { slug } = useParams();
  return (
    <div>{slug}</div>
  )
}

export default Detail