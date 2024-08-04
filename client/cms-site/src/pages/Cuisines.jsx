import { useState, useEffect } from "react";
import axiosInstance from "../components/axiosInstance";
import { CiEdit, CiCircleRemove } from "react-icons/ci";
import ModalCuisine from "../components/ModalCuisines";
import MessageModal from "../components/MessageModal";
import ReuseAddButton from "../components/ReuseAddButton";

export default function Cuisines() {
  const [cuisines, setCuisines] = useState([]);
  const [currentCuisine, setCurrentCuisine] = useState(null);
  const [categories, setCategories] = useState([]);
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
        const dataCuisines = await axiosInstance.get("/cuisines", {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        const dataCategories = await axiosInstance.get("/categories");

        setCuisines(dataCuisines.data);
        setCategories(dataCategories.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddClick = () => {
    setCurrentCuisine(null);
    setAction("add");
    setShowModal(true);
    setError(null);
  };

  const handleEditClick = (cuisine) => {
    setCurrentCuisine(cuisine);
    setAction("edit");
    setShowModal(true);
    setError(null);
  };

  const handleUploadClick = (cuisine) => {
    setCurrentCuisine(cuisine);
    setAction("upload");
    setShowModal(true);
    setError(null);
  };

  const handleDeleteClick = (cuisine) => {
    setCurrentCuisine(cuisine);
    setAction("delete");
    setShowModal(true);
    setError(null);
  };

  const handleSave = async (cuisine) => {
    try {
      if (cuisine.id) {
        await axiosInstance.put(`/cuisines/${cuisine.id}`, cuisine, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        setCuisines(
          cuisines.map((cat) => (cat.id === cuisine.id ? cuisine : cat))
        );
        setShowModal(false);
        setModalTitle("Success");
        setMessage("Success edit cuisine");
        setShowMessageModal(true);
      } else {
        const response = await axiosInstance.post(
          "/cuisines",
          {
            name: cuisine.name,
            description: cuisine.description,
            price: cuisine.price,
            imgUrl: "null",
            categoryId: cuisine.categoryId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          }
        );
        setCuisines([response.data, ...cuisines]);
        setShowModal(false);
        setModalTitle("Success");
        setMessage("Success add cuisine");
        setShowMessageModal(true);
      }
    } catch (error) {
      setShowModal(false);
      setModalTitle("Error");
      setMessage(error.response.data.message);
      setShowMessageModal(true);
    }
  };

  const handleUpload = async (formData) => {
    try {
      const response = await axiosInstance.patch(
        `/cuisines/upload/${currentCuisine.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedCuisine = await axiosInstance.get(
        `/cuisines/${currentCuisine.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      setCuisines(
        cuisines.map((cuisine) =>
          cuisine.id === currentCuisine.id ? updatedCuisine.data : cuisine
        )
      );

      setShowModal(false);
      setModalTitle("Success");
      setMessage(response.data.message);
      setShowMessageModal(true);
    } catch (error) {
      setShowModal(false);
      setModalTitle("Error");
      setMessage(error.response.data.message);
      setShowMessageModal(true);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axiosInstance.delete(
        `/cuisines/${currentCuisine.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      setCuisines(
        cuisines.filter((cuisine) => cuisine.id !== currentCuisine.id)
      );
      setShowModal(false);
      setModalTitle("Success");
      setMessage(response.data.message);
      setShowMessageModal(true);
    } catch (error) {
      setShowModal(false);
      setModalTitle("Error");
      setMessage(error.response.data.message);
      setShowMessageModal(true);
    }
  };

  if (loading) return <div>Loading ...</div>;
  if (error && !showModal) return <div>Error: {error}</div>;

  return (
    <>
      <div className="content-head">
        <div>
          <div className="content-title">
            <h2>Cuisines</h2>
          </div>
          <div className="content-description">List of cuisine</div>
        </div>
        <div>
          <ReuseAddButton onClick={handleAddClick} label="Add Cuisine" />
        </div>
      </div>
      <div className="content-body">
        <div className="table-container">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cuisines.map((cuisine) => (
                <tr key={cuisine.id}>
                  <td>{cuisine.id}</td>
                  <td>{cuisine.name}</td>
                  <td>{cuisine.description}</td>
                  <td>{cuisine.price}</td>
                  <td className="wrap-url">{cuisine.imgUrl}</td>
                  <td>{cuisine.categoryId}</td>
                  <td className="table-button">
                    <button
                      className="table-edit"
                      onClick={() => handleEditClick(cuisine)}
                    >
                      <CiEdit /> Edit
                    </button>
                    <button
                      className="table-upload"
                      onClick={() => handleUploadClick(cuisine)}
                    >
                      <CiCircleRemove /> Upload
                    </button>
                    <button
                      className="table-delete"
                      onClick={() => handleDeleteClick(cuisine)}
                    >
                      <CiCircleRemove /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalCuisine
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        onUpload={handleUpload}
        onDelete={handleDeleteConfirm}
        action={action}
        cuisine={currentCuisine}
        categories={categories}
        // handleImageUpload={handleImageUpload}
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
