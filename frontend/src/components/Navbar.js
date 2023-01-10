import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { Logout } from '../store/features/auth/authSlice';

const Navigation = () => {
  let token = localStorage.getItem('token');

  let dispatch = useDispatch()

  let role = useSelector((state) => state.auth.role)

  let navigate = useNavigate();

  let LogoutHandler = () => {
    dispatch(Logout())
    navigate('/login')
  }

  return (
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Online Shop Example</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/">Store</Nav.Link>
            {token ?
             <>
             {role === 'ADMIN' ? <span>{role}</span> : ""}
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/basket">Basket</Nav.Link>
            <Button className='ml-1' variant="outline-primary" onClick={() => LogoutHandler()}>Logout</Button>
            </>:
            <><Nav.Link href='/register'>Register</Nav.Link>
            <Nav.Link href='/login'>Login</Nav.Link></>}
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Navigation;