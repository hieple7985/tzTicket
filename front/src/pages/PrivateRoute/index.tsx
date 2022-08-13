import React from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ element }: Props): React.ReactElement => {
  const auth = localStorage.getItem('private_route')
  return (
    auth
      ? element
      : <Navigate to="/private_route" />
  )
}

export default PrivateRoute