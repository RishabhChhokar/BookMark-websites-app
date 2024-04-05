import { useBookmarks } from "./ContextProvider";
import { useState } from "react";

const Modal = () => {
  const { addBookmark } = useBookmarks();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBookmark = () => {
    if (!name.trim() || !url.trim()) return;
    addBookmark({ name, url });
    setName("");
    setUrl("");
    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Add New</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add New Bookmark</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={handleAddBookmark}>Add</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
