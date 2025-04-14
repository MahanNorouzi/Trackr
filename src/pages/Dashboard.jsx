import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

const Dashboard = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company: "",
    date: "",
    position: "",
    salary: "",
    notes: "",
  });
  const [application, setApplication] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

    setForm({
      company: "",
      date: "",
      position: "",
      salary: "",
      notes: "",
    });
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

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredApplications = application.filter((app) =>
    app.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white font-sans">
      <aside className="w-64 bg-zinc-900 hidden md:flex flex-col justify-between p-5">
        <div>
          <h2 className="text-3xl text-center font-bold mb-6">Trackr</h2>
          <nav className="space-y-4">
            <div className="font-semibold text-white">
              Dashboard
              <span className="text-zinc-400">
                <hr />
              </span>
            </div>

            <div className="text-zinc-400 hover:underline focus:underline">
              Applied
            </div>
            <div className="text-zinc-400 hover:cursor-not-allowed">
              Interviewing
            </div>
            <div className="text-zinc-400 hover:cursor-not-allowed">
              Rejected
            </div>
            <div className="font-semibold text-zinc-400 hover:cursor-not-allowed">
              Wishlist{" "}
            </div>
          </nav>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleLogout}
            className="block w-full text-left text-xl text-zinc-400 hover:underline pb-5"
          >
            🚪 Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Job Applications Overview</h1>

        <div className="mb-6 flex items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search "
            className="bg-zinc-900 border border-zinc-700 rounded px-4 py-2 w-full hover:cursor-not-allowed
            "
            disabled
          />
          <button
            onClick={toggleSort}
            className="bg-gray-700 text-white text-sm px-4 py-2 rounded hover:bg-gray-600"
          >
            Sort by Date {sortAsc ? "(Ascending)" : "(Descending)"}
          </button>
        </div>

        <button
          onClick={toggleFormVisibility}
          className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 hover:from-blue-500 hover:to-blue-400 p-3 rounded-full fixed bottom-8 right-8 shadow-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out z-10"
        >
          <span className="text-3xl text-white">+</span>
        </button>

        {isFormVisible && (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 mb-6 bg-zinc-800 p-4 rounded-md fixed bottom-16 left-65 w-5/6 transition-all duration-300 ease-in-out mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-4 py-2"
                value={form.company}
                onChange={handleChange}
              />
              <input
                type="text"
                name="position"
                placeholder="Position"
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-4 py-2"
                value={form.position}
                onChange={handleChange}
              />
              <input
                type="date"
                name="date"
                className="bg-zinc-900 text-white border border-zinc-700 rounded px-4 py-2"
                value={form.date}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="salary"
                placeholder="Salary (Optional)"
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-4 py-2"
                value={form.salary}
                onChange={handleChange}
              />
              <input
                type="text"
                name="notes"
                placeholder="Notes (Optional)"
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-4 py-2"
                value={form.notes}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
            >
              Add Application
            </button>
          </form>
        )}

        <div className="space-y-4">
          {filteredApplications.map((app, index) => (
            <div
              key={index}
              className="bg-zinc-800 p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{app.company}</p>
                <p className="text-zinc-400 text-sm">
                  {app.position} — {app.date}
                </p>
                {app.salary && (
                  <p className="text-zinc-500 text-sm">Salary: {app.salary}</p>
                )}
                {app.notes && (
                  <p className="text-zinc-500 text-sm">Notes: {app.notes}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(index)}
                className=" border-2 border-red-500 px-2 p-1 rounded-xl hover:bg-red-500"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
