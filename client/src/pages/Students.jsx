import React, { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContent";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import AddStudentModal from "../components/AddStudentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Students = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      fetchStudents();
    }
  }, [user, navigate]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      setStudents(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, "students", id));
        fetchStudents(); // Refresh the table after deletion
      } catch (error) {
        console.error("Error deleting student:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    try {
      setLoading(true);
      await updateDoc(doc(db, "students", selectedStudent.id), selectedStudent);
      fetchStudents();
      setSelectedStudent(null); // Clear selected student after edit
    } catch (error) {
      console.error("Error updating student:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="relative">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 inline-block">Manage Students</h2>
          <button
            className="absolute top-0 right-0 bg-black text-white py-1 px-4 rounded-md shadow-md hover:bg-gray-800 text-sm"
            onClick={toggleModal}
          >
            Add Student
          </button>
        </div>

        {/* Show loading spinner if loading */}
        {loading && <p className="mt-4 text-blue-500 font-semibold">Loading...</p>}

        {/* Student Table */}
        {!loading && students.length > 0 && (
          <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md mt-6">
            <table className="w-full text-sm text-gray-800"> {/* Changed text color to gray-800 */}
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left font-semibold">ID</th>
                  <th className="p-3 text-left font-semibold">Name</th>
                  <th className="p-3 text-left font-semibold">Class</th>
                  <th className="p-3 text-left font-semibold">Section</th>
                  <th className="p-3 text-left font-semibold">Roll No</th>
                  <th className="p-3 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 text-gray-800">{index + 1}</td>
                    <td className="p-3 text-gray-800">{student.name}</td>
                    <td className="p-3 text-gray-800">{student.class}</td>
                    <td className="p-3 text-gray-800">{student.section || "N/A"}</td>
                    <td className="p-3 text-gray-800">{student.rollNo}</td>
                    <td className="p-3 flex space-x-4">
                      <button className="text-gray-500 hover:text-gray-700" onClick={() => openViewModal(student)}>
                        <FontAwesomeIcon icon={faEye} size="small" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700" onClick={() => openEditModal(student)}>
                        <FontAwesomeIcon icon={faEdit} size="small" />
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => deleteStudent(student.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} size="small" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Student Modal */}
        {isModalOpen && <AddStudentModal toggleModal={toggleModal} fetchStudents={fetchStudents} />}

        {/* View Student Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
              <h3 className="text-2xl font-semibold mb-4 text-center">Student Details</h3>
              <ul>
                {Object.entries(selectedStudent).map(([key, value]) => (
                  <li key={key} className="mb-2 text-gray-800">
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
              <button className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md" onClick={() => setSelectedStudent(null)}>Close</button>
            </div>
          </div>
        )}

        {/* Edit Student Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
              <h3 className="text-2xl font-semibold mb-4 text-center">Edit Student</h3>
              <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-4">
                {Object.entries(selectedStudent).map(([key, value]) =>
                  key !== "id" ? (
                    <div key={key}>
                      <label className="block text-gray-800">{key}</label>
                      <input
                        type="text"
                        name={key}
                        value={value}
                        onChange={(e) => setSelectedStudent({ ...selectedStudent, [key]: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                  ) : null
                )}
                <div className="col-span-2 flex justify-end space-x-4">
                  <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-md" onClick={() => setSelectedStudent(null)}>Cancel</button>
                  <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;