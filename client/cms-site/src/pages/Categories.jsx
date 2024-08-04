import React, { useState, useEffect } from "react";
import axiosInstance from "../components/axiosInstance";
import ModalCategory from "../components/ModalCategory";
import MessageModal from "../components/MessageModal";
import { CiEdit, CiCircleRemove } from "react-icons/ci";
import ReuseAddButton from "../components/ReuseAddButton";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [message, setMessage] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/categories");
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddClick = () => {
    setCurrentCategory(null);
    setAction("add");
    setShowModal(true);
    setError(null);
  };

  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setAction("edit");
    setShowModal(true);
    setError(null);
  };

  const handleDeleteClick = (category) => {
    setCurrentCategory(category);
    setAction("delete");
    setShowModal(true);
    setError(null);
  };

  const handleSave = async (category) => {
    try {
      if (category.id) {
        await axiosInstance.put(`/categories/${category.id}`, category, {
          headers: {
            'Authorization': `Bearer ${localStorage.access_token}`
          }
        });
        setCategories(categories.map((cat) => (cat.id === category.id ? category : cat)));
        setModalTitle("Success")
        setMessage("Success edit category")
        setShowMessageModal(true)
      } else {
        const response = await axiosInstance.post("/categories", category, {
          headers: {
            'Authorization': `Bearer ${localStorage.access_token}`
          }
        });
        setCategories([...categories, response.data]);
        setModalTitle("Success")
        setMessage("Success add category")
        setShowMessageModal(true)
      }
      setShowModal(false);
    } catch (error) {
      setShowModal(false); 
      setModalTitle("Error")
      setMessage(error.response.data.message)
      setShowMessageModal(true)
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axiosInstance.delete(`/categories/${currentCategory.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.access_token}`
        }
      });
      setCategories(categories.filter((category) => category.id !== currentCategory.id));
      setShowModal(false);
      setModalTitle("Success")
      setMessage(response.data.message)
      setShowMessageModal(true)
    } catch (error) {
      setShowModal(false); 
      setModalTitle("Error")
      setMessage(error.response.data.message)
      setShowMessageModal(true)
    }
  };

  if (loading) return <div>Loading ...</div>;
  if (error && !showModal) return <div>Error: {error}</div>;

  return (
    <>
      <div className="content-head">
        <div>
          <div className="content-title">
            <h2>Categories</h2>
          </div>
          <div className="content-description">List of category</div>
        </div>
        <div>
          <ReuseAddButton onClick={handleAddClick} label="Add Category"/>
        </div>
      </div>
      <div className="content-body">
        <div className="table-container">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Category Id</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <button className="table-edit" onClick={() => handleEditClick(category)}>
                      <CiEdit /> Edit
                    </button>
                    <button className="table-delete" onClick={() => handleDeleteClick(category)}>
                      <CiCircleRemove /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalCategory 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onSave={handleSave} 
        onDelete={handleDeleteConfirm} 
        action={action} 
        category={currentCategory} 
      />
    <MessageModal
        show={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        title={modalTitle}
        message={message}
      />
    </>
  );
}
