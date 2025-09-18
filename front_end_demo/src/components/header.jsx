import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Top_banner() {

  if (sessionStorage.getItem('token')){
    console.log("User is logged in");
    return (
    <>
 
      <Navbar bg="info" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/product_edit">Product Edit</Nav.Link>
            <Nav.Link href="/LoginPage">LoginPage</Nav.Link>
            <Nav.Link href="/list_reverse">list_reverse</Nav.Link>
            <Nav.Link href="/logout">logout</Nav.Link>
            <Nav.Link href="/api_test">api_test</Nav.Link>
            <Nav.Link href="/sse">sse</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      
    </>
  );

  }
  else {
    console.log("User is not logged in");
    return (
    <>
 
      <Navbar bg="info" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/LoginPage">LoginPage</Nav.Link>

            <Nav.Link href="/logout">logout</Nav.Link>


          </Nav>
        </Container>
      </Navbar>

      
    </>
  );
  } 
  
}

export default Top_banner;