import React, { useState, useEffect } from "react";
import "./PatientData.css";

const PatientData = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    height: "",
    weight: "",
    treatmentPlan: "",
    history: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [patientList, setPatientList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch patient data on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setPatientList([]); // Clear out the current list
    try {
      const response = await fetch("http://localhost/get_patient.php");
      const data = await response.json();
      if (response.ok) {
        setPatientList(data);
      } else {
        console.error("Error fetching patient data:", data.error);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/save_patient.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message || "Saved successfully");

        // Re-fetch the patient data after saving a new record
        fetchPatients();

        setFormData({
          id: "",
          name: "",
          height: "",
          weight: "",
          treatmentPlan: "",
          history: "",
        });
        setShowForm(false);
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleEdit = (index) => {
    setFormData(patientList[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleCreateClick = () => {
    setShowForm(true);
    setEditingIndex(null);
    setFormData({
      id: "",
      name: "",
      height: "",
      weight: "",
      treatmentPlan: "",
      history: "",
    });
  };

  return (
    <div className="patient-data-section">
      {!showForm && (
        <button className="create-button" onClick={handleCreateClick}>
          + Create Patient Record
        </button>
      )}

      {showForm && (
        <>
          <h2>{editingIndex !== null ? "Edit Patient Data" : "New Patient Data"}</h2>
          <form onSubmit={handleSubmit} className="patient-form">
            <input
              type="text"
              name="id"
              placeholder="Patient ID"
              value={formData.id}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Patient Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              required
            />
            <textarea
              name="treatmentPlan"
              placeholder="Treatment Plan"
              value={formData.treatmentPlan}
              onChange={handleChange}
              required
            />
            <textarea
              name="history"
              placeholder="Any Medical History"
              value={formData.history}
              onChange={handleChange}
            />
            <button type="submit">{editingIndex !== null ? "Update" : "Submit"}</button>
          </form>
        </>
      )}

      {!showForm && patientList.length > 0 && (
        <div className="all-patient-records">
          <h3 className="all-patient">All Patient Records</h3>
          <div className="patient-records-grid">
            {patientList.map((patient, index) => (
              <div
                key={index}
                className="submitted-data-container"
                onClick={() => handleEdit(index)}
                title="Click to Edit"
              >
                <div className="overlay-patient">
                  <button className="edit-button">Click to Edit</button>
                </div>
                <div className="patient-info">
                  <h3>{patient.name}</h3>
                  <p>ID: {patient.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientData;
