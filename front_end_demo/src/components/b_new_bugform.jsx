import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";
//import UserSelect from './widget_user_list';
import User_list from './user_list';
import Project_list from './project_list';

const New_bug_form = ({NewBug}) => {
  console.log("New Bug Form Props:",NewBug);
  
  const [bug_formData, setBug_formData] = useState({
    id: "",
    bug_title: "",
    bug_desc: "",
    bug_status: "new",
    bug_level: "low",
    bug_assignee: "admin",
    bug_category: "General",
    bug_project: "General",
    bug_datetime: (new Date()).toDateString()
  });
  const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [user_list, setUser_list] = useState([]);
  const [project_list, setProject_list] = useState([]);
  const [selected_user, setSelected_user] = useState("");
  const [selected_project, setSelected_project] = useState("");
  const [inputed_title, setInputed_title] = useState("");
  const [inputed_desc, setInputed_desc] = useState("");
  const [inputed_level, setInputed_level] = useState("low");
  const [inputed_status, setInputed_status] = useState("new");
  const [inputed_category, setInputed_category] = useState("General");

  const [isNewBug, setIsNewBug] = useState(NewBug);

  
////////////////////////////////////////////////////

const getUser_list = async () => {
     try {
         const users = await User_list();
         const all_users = users;
         setUser_list(all_users);
         console.log("user_list==================",all_users);
     } catch (error) {
         console.error("Error fetching projects in B_dashboard_page:", error);
     }
 };

const getProject_list = async () => {
     try {
         const projects = await Project_list();
         const all_projects = projects;
         setProject_list(projects);
         console.log("project_list==================",all_projects);
     } catch (error) {
         console.error("Error fetching projects in B_dashboard_page:", error);
     }
 };

useEffect(() => {
    getUser_list(); 
    getProject_list();
}, []);

/////////////////////////////////////////////////////

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handleChange = (e) => {
    

    console.log("E TARGET NAME:",e.target.name);
    console.log("E TARGET VALUE:",e.target.value);

    if(e.target.name === "bug_assignee")
      {setSelected_user(e.target.value);}
    else if(e.target.name === "bug_project")
      {setSelected_project(e.target.value);}
    else if(e.target.name === "bug_title")
      {setInputed_title(e.target.value);}
    else if(e.target.name === "bug_desc")
      {setInputed_desc(e.target.value);}
    else if(e.target.name === "bug_level")
      {setInputed_level(e.target.value);}
    else if(e.target.name === "bug_status")
      {setInputed_status(e.target.value);}
    else if(e.target.name === "bug_category")
      {setInputed_category(e.target.value);}
    const { name, value } = e.target;
    console.log("Name:------------------",name);
    console.log("Value:------------------",value);
    bug_formData[name] = value;
    setBug_formData(bug_formData);
    console.log("Bug Form Data:===>",bug_formData);

  }


const handleSubmit = (e) => {
    //if (!selectedTicket) return;


    if (isNewBug) {
      // Add new ticket

  
 
      console.log("!!!!!!!!!!!!add new bug ticket",bug_formData);
      
      fetch('https://localhost:8080/api/v1/b_dashboard_ops/new',
      {
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bug_formData),
      })
      .then(response =>{

        handleClose();

      })
     .catch(error => {
       setError(error);
       setLoading(false);
     });

    }

    else 
    {

    
     fetch('https://localhost:8080/api/v1/b_dashboard_ops/edit',
      {
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bug_formData),
      })
      .then(response =>{

        handleClose();

      })
     .catch(error => {
       setError(error);
       setLoading(false);
     });

    }

  };








  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Create New Bug Ticket
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bug Ticket Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bug_formData && (
            <Form >
              <div >
                <input type='hidden' defaultValue={bug_formData.id}></input>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Bug Title</Form.Label>
                <Form.Control type="text" name="bug_title" value={bug_formData.bug_title || ""}  onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                Please input a title.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bug Description</Form.Label>
                <Form.Control as="textarea" name="bug_desc" value={bug_formData.bug_desc || ""} onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                Please input a title.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bug Level</Form.Label>
                <Form.Select name="bug_level" value={bug_formData.bug_level || ""} onChange={handleChange}>
                 <option value="low">low</option>
                 <option value="minor">minor</option>  
                 <option value="major">minor</option>
                 <option value="critical">critical</option>
                 <option value="blocker">blocker</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bug Status</Form.Label>
                <Form.Select name="bug_status" value={bug_formData.bug_status || ""} onChange={handleChange}>
                 <option value="new">new</option>
                 <option value="assigned">assigned</option>  
                 <option value="inprogress">inprogress</option>
                 <option value="review">review</option>
                 <option value="fixed">fixed</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bug Category</Form.Label>
                <Form.Select name="bug_category" value={bug_formData.bug_category || ""} onChange={handleChange}>
                 <option value="frontend">frontend</option>
                 <option value="backend">backend</option>  
                 <option value="image">image</option>
                </Form.Select>
              </Form.Group> 







              <Form.Group className="mb-3">
                <Form.Label>Bug Assignee</Form.Label>
                {user_list && (
                <Form.Select name="bug_assignee" value={selected_user || ""} onChange={handleChange}>
                 {user_list.map((u) => (
                   <option key={u.id} value={u.email}> {u.user_name}</option>
                 ))}
                </Form.Select>
                )}  
         
              </Form.Group>



              <Form.Group className="mb-3">
                <Form.Label>Project Name</Form.Label>
                {project_list && (
                <Form.Select name="bug_project" value={selected_project || ""} onChange={handleChange}>
                 {project_list.map((u) => (
                   <option key={u.project_id} value={u.project_name}> {u.project_name}</option>
                 ))}
                </Form.Select>
                )}  
         
              </Form.Group>

             
              
              

              
            </Form>
          )}
        </Modal.Body>


        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          {}
          <Button variant="primary" onClick={handleSubmit}>
            {NewBug ? "Add New Bug" : "Save Changes"}
          </Button>

      



        </Modal.Footer>
      </Modal>
    </>
  );
};

export default New_bug_form;