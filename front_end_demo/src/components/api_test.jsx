import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { List_operation } from "../libs/list_operation"
function DynamicInputBoxes() {
  const [inputs, setInputs] = useState([{ name: "input1", value: "" }]);

  const [return_list,setReturn_list] = useState([])

  const addInput = () => {
    const nextIndex = inputs.length + 1;
    setInputs([...inputs, { name: `input${nextIndex}`, value: "" }]);
  };

  const removeLastInput = () => {
    if (inputs.length > 1) {
      setInputs(inputs.slice(0, -1));
    }
  };

  const handleChange = (value, index) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    setInputs(newInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clicked_Button = e.nativeEvent.submitter;
    const formData = {};
    inputs.forEach((input) => {
      formData[input.name] = input.value;
    });
    console.log("Submitted Data:", formData);
    const get_all_values = Object.values(formData);
    console.log(get_all_values);

    if (clicked_Button && clicked_Button.id === "list_reverse"){
        const new_instance = new List_operation(get_all_values).List_reverse()
        console.log("reversed list===>",new_instance)
        setReturn_list(new_instance)

    }
    else if (clicked_Button && clicked_Button.id === "bubble_sort"){
      console.log("array before sorted",get_all_values);
      const new_instance = new List_operation(get_all_values).Bubble_sort()
      console.log("sorted list===>",new_instance)
      setReturn_list(new_instance)
    }


    
    
    

    //alert("Submitted!\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <div>
    <Form className="p-3" onSubmit={handleSubmit}>
      <h4>Dynamic Input Boxes</h4>

      <div className="d-flex flex-wrap gap-2 mb-3">
        {inputs.map((input, index) => (
          <Form.Control
            key={input.name}
            name={input.name}
            type="text"
            value={input.value}
            placeholder={`Input ${index + 1}`}
            style={{ width: "100px" }}  // short width for each input
            onChange={(e) => handleChange(e.target.value, index)}
          />
        ))}
      </div>

      <div className="d-flex gap-2 mb-3">
        <Button variant="primary" type="button" onClick={addInput}>
          ➕ Add Input
        </Button>
        <Button variant="danger" type="button" onClick={removeLastInput}>
          ❌ Remove Last
        </Button>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-3"><Button variant="success" type="submit" id="list_reverse"> ✅ List Reverse</Button></div>
      <div className="d-flex flex-wrap gap-2 mb-3"><Button variant="success" type="submit" id="bubble_sort"> ✅ Bubble Sort</Button></div>
      
    </Form>
      <div className="d-flex flex-wrap gap-2 mb-3">
      {return_list && return_list.map((key) =>
         <Form.Control type="text" placeholder={key}  style={{ width: "100px" }} />)}
      </div>
    </div>
    );
}

export default DynamicInputBoxes;
