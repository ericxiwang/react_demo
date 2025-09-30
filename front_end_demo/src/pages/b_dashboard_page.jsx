import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import HEADER from '../components/header'; 
import B_dashboard_main from '../components/b_dashboard_main'
import Project_list from '../components/project_list'
import New_bug_form from '../components/b_new_bugform';

function B_dashboard_page()
{
const  [project_list, setProject_list] = useState([]);
const [selected, setSelected] = useState([]); 
const getProject_list = async () => {
    try {
        const projects = await Project_list();
        const project_list = projects;
        setProject_list(project_list);
    } catch (error) {
        console.error("Error fetching projects in B_dashboard_page:", error);
    }
};

useEffect(() => {
    getProject_list();
    
}, []);

const handleChange = (project_name) => {
    setSelected((prev) =>
      prev.includes(project_name) ? prev.filter((p) => p !== project_name) : [...prev, project_name]
    );
  };

  const handleSelectAll = () => {
    setSelected(project_list.map((p) => p.project_name));
  };

  const handleClearAll = () => {
    setSelected([]);
  };
  console.log("Selected projects:", selected);

    return(
<Container fluid>
        <Row>
            <HEADER />
        </Row>
        <Row>
            <Col md={2}>
            
            <Card className="m-3 shadow-sm">
            
            <Card.Body>
              <Card.Title>Projects</Card.Title>
            

              <Form>
                {project_list && project_list.map((p) => (
                  <Form.Check
                    key={p.project_name}
                    type="checkbox"
                    id={`project-${p.project_name}`}
                    label={`${p.project_name} (id: ${p.project_id})`}
                    checked={selected.includes(p.project_name)}
                    onChange={() => handleChange(p.project_name)}
                    className="mb-2"
                  />
                ))}
              </Form>

              <div className="mt-3">
                <Button variant="primary" onClick={handleSelectAll} className="me-2">
                  Select All
                </Button>
                <Button variant="secondary" onClick={handleClearAll}>
                  Clear All
                </Button>
              </div>

              
              <div className="mt-3">
                <New_bug_form NewBug={true}/>
               
              
              </div>
                {console.log(JSON.stringify(
                      project_list.filter((p) => selected.includes(p.project_id)),
                      null,
                      2
                    ))}
            {/*} <Card className="mt-4 bg-light">
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    Selected Projects
                  </Card.Subtitle>
                  <pre className="mb-0">
                    {JSON.stringify(
                      project_list.filter((p) => selected.includes(p.project_id)),
                      null,
                      2
                    )}
                  </pre>
                </Card.Body>
              </Card>*/}
            </Card.Body>
          </Card>
          
            </Col>
            <Col md={9}>
            <B_dashboard_main project_list_select={selected}/>
            </Col>
        </Row>



    </Container>

    );

}

export default B_dashboard_page;