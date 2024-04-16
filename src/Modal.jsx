/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useBookmarks } from "./ContextProvider";
import classes from "./Modal.module.css";


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
    props.changeEdit();
  };

  const closeModal = () => {
    setIsOpen(false);
    setName("");
    setUrl("");
    if (props.isEditButton) {
      props.changeEdit();
    }
  };

  React.useEffect(() => {
    if (props.isEditButton) {
      setIsOpen(true);
      setName(props.name);
      setUrl(props.url);
    }
  }, [props.isEditButton, props.name, props.url]);

  return (
    <div className={classes.modal}>
      <button onClick={() => setIsOpen(true)}>
        {props.isEditButton ? "Edit Bookmark" : "Add New Bookmark"}
      </button>
      {isOpen && (
        <div>
          <h2>{props.isEditButton ? "Edit Bookmark" : "Add New Bookmark"}</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={classes.input}
          />
          <input
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className={classes.actions}>
            <button
              onClick={
                props.isEditButton ? handleEditBookmark : handleAddBookmark
              }
            >
              {props.isEditButton ? "Update" : "Add"}
            </button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
