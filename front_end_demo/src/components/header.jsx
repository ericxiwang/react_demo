import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function HEADER() {

  if (sessionStorage.getItem('token')){
    console.log("User is logged in");
    return (
    <>
 
      <Navbar bg="info" data-bs-theme="dark">
        <Container>

          <Nav className="me-auto">
            <Nav.Link href="/a_dashboard">Agile Dashboard</Nav.Link>
            <Nav.Link href="/a_stat">Agile Task Statistic</Nav.Link>
            <Nav.Link href="/b_dashboard">Bug Dashboard</Nav.Link>
            <Nav.Link href="/b_stat">Bug Statistic</Nav.Link>
            <Nav.Link href="/u_management">User Management</Nav.Link>
            <Nav.Link href="/LoginPage">Login</Nav.Link>
            <Nav.Link href="/logout">logout</Nav.Link>
            <Nav.Link href="/js_demo">JS demo</Nav.Link>
            <Nav.Link href="/sse">sse</Nav.Link>
            <Nav.Link href="/test">test</Nav.Link>
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
   
          <Nav className="me-auto">
            <Nav.Link href="/a_dashboard">Agile Dashboard</Nav.Link>
            <Nav.Link href="/a_stat">Agile Task Statistic</Nav.Link>
            <Nav.Link href="/b_dashboard">Bug Dashboard</Nav.Link>
            <Nav.Link href="/b_stat">Bug Statistic</Nav.Link>
            <Nav.Link href="/u_management">User Management</Nav.Link>
            <Nav.Link href="/LoginPage">Login</Nav.Link>
            <Nav.Link href="/logout">logout</Nav.Link>
            <Nav.Link href="/js_demo">JS demo</Nav.Link>
            <Nav.Link href="/sse">sse</Nav.Link>
            <Nav.Link href="/test">test</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      
    </>
  );
  } 
  
}

export default HEADER;