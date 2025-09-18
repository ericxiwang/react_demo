import { Nav } from 'react-bootstrap';

function MySidebar() {
  return (
    <div className="bg-primary text-white p-3" style={{ width: '200px', height: '90vh' }}>
      <Nav className="flex-column">
        <Nav.Link href="/home" className="text-white">Home</Nav.Link>
        <Nav.Link href="/about" className="text-white">About</Nav.Link>
        <Nav.Link href="/list_reverse" className="text-white">list_reverse</Nav.Link>
        <Nav.Link href="/logout" className="text-white">logout</Nav.Link>
      </Nav>
    </div>
  );
}

export default MySidebar;