import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddStudentModal = ({ toggleModal, fetchStudents }) => {
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    section: "",
    rollNo: "",
    age: "",
    gender: "",
    guardianName: "",
    address: "",
    phoneNumber: "",
    email: "",
    admissionDate: "",
    bloodGroup: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    for (const key in newStudent) {
      if (!newStudent[key].trim()) {
        alert(`Please fill out the ${key} field.`);
        return;
      }
    }

    try {
      await addDoc(collection(db, "students"), newStudent);
      fetchStudents(); // Refresh student list
      toggleModal(); // Close modal
    } catch (error) {
      console.error("Error adding student: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
        <h3 className="text-2xl font-semibold mb-4 text-center">Add New Student</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block">Name</label>
            <input type="text" name="name" value={newStudent.name} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label className="block">Class</label>
            <input type="text" name="class" value={newStudent.class} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label className="block">Section</label>
            <input type="text" name="section" value={newStudent.section} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label className="block">Roll No</label>
            <input type="text" name="rollNo" value={newStudent.rollNo} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label className="block">Age</label>
            <input type="number" name="age" value={newStudent.age} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label className="block">Gender</label>
            <select name="gender" value={newStudent.gender} onChange={handleChange} className="w-full p-2 border rounded-md" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block">Guardian's Name</label>
            <input type="text" name="guardianName" value={newStudent.guardianName} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label className="block">Address</label>
            <input type="text" name="address" value={newStudent.address} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label className="block">Phone Number</label>
            <input type="text" name="phoneNumber" value={newStudent.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label className="block">Email</label>
            <input type="email" name="email" value={newStudent.email} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label className="block">Admission Date</label>
            <input type="date" name="admissionDate" value={newStudent.admissionDate} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label className="block">Blood Group</label>
            <input type="text" name="bloodGroup" value={newStudent.bloodGroup} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>

          <div className="col-span-2 flex justify-end space-x-4">
            <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-md" onClick={toggleModal}>Cancel</button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
