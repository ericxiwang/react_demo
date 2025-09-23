import React, { useEffect, useState } from "react";

export default function TestPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", city: "" });

  // Fetch data from API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        setData(json.slice(0, 5)); // show first 5 users
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle add new item (POST API)
  const handleAdd = () => {
    if (!form.name || !form.email || !form.city) {
      alert("Please fill all fields");
      return;
    }

    const newItem = {
      id: data.length + 1, // local ID for UI
      name: form.name,
      email: form.email,
      address: { city: form.city },
    };

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((created) => {
        // Add new item to UI
        setData([...data, created]);
        setForm({ name: "", email: "", city: "" }); // reset form
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>API Data Grid with Add Form</h2>

      {/* Form */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{ marginRight: "10px", padding: "6px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ marginRight: "10px", padding: "6px" }}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          style={{ marginRight: "10px", padding: "6px" }}
        />
        <button onClick={handleAdd} style={{ padding: "6px 12px" }}>
          Add
        </button>
      </div>

      {/* Data Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.email}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.address?.city}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


