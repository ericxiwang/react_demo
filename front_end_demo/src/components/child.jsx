import { useState } from "react";

function Child({ sendDataToParent }) {
  const [data, setData] = useState("");


  const [selectedValue, setSelectedValue] = useState('');



  function handleChange(event) {
    sendDataToParent(event.target.value);
  }

  return (
    <div>
    <div>
      <input type="text" value={data} onChange={(e) => setData(e.target.value)} />
      <button onClick={handleClick}>Send Data to Parent</button>
    </div>


<div> <select value={selectedValue} onChange={handleChange}>
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select></div>
  </div>     
  );
}

export default Child;