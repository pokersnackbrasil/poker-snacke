import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import { selectUserRole } from '../slice/user/userSelectors'
import { JSX } from 'react'

interface Props {
  children: JSX.Element
  allowedRoles: ('0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10')[]
}

const RoleRoute = ({ children, allowedRoles }: Props) => {
  const role = useAppSelector(selectUserRole)
  if (!role || !allowedRoles.some(item => role.includes(item))) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default RoleRoute
