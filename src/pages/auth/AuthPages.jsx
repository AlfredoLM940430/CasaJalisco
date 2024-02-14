import { Navigate, Outlet } from "react-router-dom"

export default function AuthPages({ isAllowed, redirectTo = "/", children }) {
	if (!isAllowed) {
		return <Navigate to={redirectTo} />
	}
	return children ? children : <Outlet />
}