import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthProvider';
export const Navbar = () => {
  const auth = useAuth();
  return (
    <nav>
        <Link to="/pos">Pos</Link>
        <Link to="/product">Synchrone-DB</Link>
        <Link to="/lproducts">List Products</Link>
        <li><button onClick={() => auth.logOut()} className="btn-submit"> Deconnect</button></li>
    </nav>
  )
}
