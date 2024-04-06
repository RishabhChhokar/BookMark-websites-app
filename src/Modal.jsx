/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useBookmarks } from "./ContextProvider";

const Modal = (props) => {
  const { addBookmark, updateBookmark } = useBookmarks();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBookmark = () => {
    if (!name.trim() || !url.trim()) return;
    addBookmark({ name, url });
    closeModal();
  };

  const handleEditBookmark = () => {
    if (!name.trim() || !url.trim()) return;
    updateBookmark(props.id, { name, url });
    closeModal();
    props.changeEdit()
  };

  const closeModal = () => {
    setIsOpen(false);
    setName("");
    setUrl("");
  };

  React.useEffect(() => {
    if (props.isEditButton) {
      setIsOpen(true);
      setName(props.name);
      setUrl(props.url);
    }
  }, [props.isEditButton, props.name, props.url]);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        {props.isEditButton ? "Edit Bookmark" : "Add New Bookmark"}
      </button>
      {isOpen && (
        <>
          <span onClick={closeModal} className="close-btn">
            &times;
          </span>
          <h2>{props.isEditButton ? "Edit Bookmark" : "Add New Bookmark"}</h2>
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
          <button
            onClick={
              props.isEditButton ? handleEditBookmark : handleAddBookmark
            }
          >
            {props.isEditButton ? "Update" : "Add"}
          </button>
        </>
      )}
    </>
  );
};

export default Modal;
