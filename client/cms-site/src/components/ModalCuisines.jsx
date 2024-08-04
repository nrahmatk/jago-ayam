import { useState, useEffect } from "react";

export default function ModalCuisine({
  show,
  onClose,
  onSave,
  onUpload,
  onDelete,
  action,
  cuisine,
  categories,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [addCuisine, setAddCuisine] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "null",
    categoryId: "",
  });

  useEffect(() => {
    if (cuisine) {
      setAddCuisine({
        name: cuisine.name,
        description: cuisine.description,
        price: cuisine.price,
        imgUrl: cuisine.imgUrl ? cuisine.imgUrl : "null",
        categoryId: cuisine.categoryId,
      });
    } else {
      setAddCuisine({
        name: "",
        description: "",
        price: "",
        imgUrl: "null",
        categoryId: "",
      });
    }
  }, [cuisine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddCuisine({
      ...addCuisine,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault(); 
    const newCuisine = {
      id: cuisine ? cuisine.id : undefined,
      ...addCuisine,
    };
    onSave(newCuisine);
  };

  const handleImageUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("imageUrl", selectedFile); 
      onUpload(formData);
    } else {
      alert("Please select a file to upload.");
    }
  };

  const renderContent = () => {
    if (action === "delete") {
      return (
        <>
          <div className="modal-title">
            <h2>Confirm Delete</h2>
          </div>
          <div className="modal-content">
            <p>Are you sure you want to delete this cuisine?</p>
          </div>
          <div className="modal-buttons">
            <button onClick={onClose}>Cancel</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        </>
      );
    }

    if (action === "upload") {
      return (
        <>
          <div className="modal-title">
            <h2>Upload Image</h2>
          </div>
          <div className="modal-content">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          <div className="modal-buttons">
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleUploadClick}>Upload</button>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="modal-title">
          <h2>{cuisine ? "Edit Cuisine" : "Add Cuisine"}</h2>
        </div>
        <form className="form" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              value={addCuisine.name}
              onChange={handleChange}
              placeholder="name cuisine"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              name="description"
              type="text"
              value={addCuisine.description}
              onChange={handleChange}
              placeholder="cuisine description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              name="price"
              type="number"
              value={addCuisine.price}
              onChange={handleChange}
              placeholder="minimum amount is 1000"
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <select
              name="categoryId"
              value={addCuisine.categoryId}
              onChange={handleChange}
            >
              <option value="" disabled>
                Choose one
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </>
    );
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {renderContent()}
      </div>
    </div>
  );
}
