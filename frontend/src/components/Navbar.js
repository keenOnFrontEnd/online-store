import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
  let token = localStorage.getItem('token');

  return (
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Online Shop Example</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/">Store</Nav.Link>
            {token ?
             <><Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/basket">Basket</Nav.Link></> :

            <Nav.Link href='/login'>Login</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Navigation;