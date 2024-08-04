import { useState, useEffect } from "react";

export default function ModalCategory({
  show,
  onClose,
  onSave,
  onDelete,
  action,
  category,
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
    } else {
      setName("");
    }
  }, [category]);

  const handleSave = (e) => {
    e.preventDefault(); 
    const newCategory = {
      id: category ? category.id : undefined,
      name,
    };
    onSave(newCategory);
  };

  const renderContent = () => {
    if (action === "delete") {
      return (
        <>
          <div className="modal-title">
            <h2>Confirm Delete</h2>
          </div>
          <div className="modal-content">
            <p>Are you sure you want to delete this category?</p>
          </div>
          <div className="modal-buttons">
            <button onClick={onClose}>Cancel</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="modal-title">
          <h2>{category ? "Edit Category" : "Add Category"}</h2>
        </div>
        <form className="form" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
