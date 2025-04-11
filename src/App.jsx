import React, { useState, useEffect } from "react";

const App = () => {
  const [form, setForm] = useState({ company: "", date: "", position: "" });
  const [application, setApplication] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const savedApplications = localStorage.getItem("applications");
    if (savedApplications) {
      setApplication(JSON.parse(savedApplications));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.company || !form.date || !form.position) return;

    const newApplications = [...application, form];
    setApplication(newApplications);

    localStorage.setItem("applications", JSON.stringify(newApplications));

    setForm({ company: "", position: "", date: "" });
  };

  const handleDelete = (index) => {
    const updatedApplications = application.filter((_, i) => i !== index);
    setApplication(updatedApplications);

    localStorage.setItem("applications", JSON.stringify(updatedApplications));
  };

  const toggleSort = () => {
    const sortedApplications = [...application].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });
    setSortAsc(!sortAsc);
    setApplication(sortedApplications);

    localStorage.setItem("applications", JSON.stringify(sortedApplications));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Job Application Tracker</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          className="w-full p-2 border rounded"
          value={form.company}
          onChange={handleChange}
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          className="w-full p-2 border rounded"
          value={form.position}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          className="w-full p-2 border rounded"
          value={form.date}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add Application
        </button>
      </form>
      <button
        onClick={toggleSort}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Sort by Date {sortAsc ? "(Ascending)" : "(Descending)"}
      </button>

      <div>
        {application.map((app, index) => (
          <div key={index}>
            <p>Company: {app.company}</p>
            <p>Position: {app.position}</p>
            <p>Date: {app.date}</p>
            <button
              onClick={() => handleDelete(index)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
