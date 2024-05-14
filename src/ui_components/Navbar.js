import React from 'react'
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <nav>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/product">Synchrone-DB</Link>
        <Link to="/lproducts">List Products</Link>
    </nav>
  )
}
