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
          className=" hidden md:flex bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 hover:from-blue-500 hover:to-blue-400 p-3 rounded-full fixed bottom-8 right-8 shadow-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out z-10"
        >
          <span className="text-3xl text-white">+</span>
        </button>

        {isFormVisible && (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 mb-6 bg-zinc-950 p-4 rounded-md fixed  bottom-16 left-8 md:left-20 lg:left-35 xl:left-65  w-4/5  transition-all duration-300 ease-in-out mx-auto"
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
      <div className="md:hidden fixed bottom-0 left-0 w-full h-2/20  bg-zinc-900 flex justify-around items-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32x"
            viewBox="0 -960 960 960"
            width="32px"
            fill="#e3e3e3"
          >
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
          </svg>
        </div>
        <div>
          <button
            onClick={toggleFormVisibility}
            className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 hover:from-blue-500 hover:to-blue-400 p-1 px-3 rounded-xl shadow-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out text-3xl"
          >
            +
          </button>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="#e3e3e3"
          >
            <path d="M591.21-226.67q-41.21 0-69.54-28.45-28.34-28.46-28.34-69.67t28.46-69.54q28.45-28.34 69.67-28.34 41.21 0 69.54 28.46 28.33 28.45 28.33 69.67 0 41.21-28.45 69.54-28.46 28.33-69.67 28.33ZM186.67-80q-27 0-46.84-19.83Q120-119.67 120-146.67v-600q0-27 19.83-46.83 19.84-19.83 46.84-19.83h56.66V-880h70v66.67h333.34V-880h70v66.67h56.66q27 0 46.84 19.83Q840-773.67 840-746.67v600q0 27-19.83 46.84Q800.33-80 773.33-80H186.67Zm0-66.67h586.66v-420H186.67v420Zm0-486.66h586.66v-113.34H186.67v113.34Zm0 0v-113.34 113.34Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
