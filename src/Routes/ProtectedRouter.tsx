import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import { selectAuthAuthenticated } from '../slice/auth/authSelectors'
import { JSX } from 'react'

interface Props {
  children: JSX.Element
}

const ProtectedRoute = ({ children }: Props) => {
	const isAuthenticated = useAppSelector(selectAuthAuthenticated)
  	return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
