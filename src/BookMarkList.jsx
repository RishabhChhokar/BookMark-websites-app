import { useBookmarks } from "./ContextProvider";
import { useState } from "react";

const BookmarkList = () => {
  const { bookmarks, deleteBookmark, updateBookmark } = useBookmarks();
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedUrl, setEditedUrl] = useState("");

  const handleEdit = (bookmark) => {
    setEditingBookmark(bookmark);
    setEditedName(bookmark.name);
    setEditedUrl(bookmark.url);
  };

  const handleUpdate = () => {
    if (!editedName.trim() || !editedUrl.trim()) return;
    updateBookmark(editingBookmark._id, { name: editedName, url: editedUrl });
    setEditingBookmark(null);
    setEditedName("");
    setEditedUrl("");
  };

  return (
    <div>
      <h2>All Bookmarks</h2>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark._id}>
            <span>{bookmark.name}</span>
            <span> > </span>
            <span> </span>
            <span>
              (<a href={bookmark.url}>{bookmark.url}</a>)
            </span>
            <span> </span>
            <button onClick={() => deleteBookmark(bookmark._id)}>Delete</button>
            <span> </span>
            <button onClick={() => handleEdit(bookmark)}>Edit</button>
          </li>
        ))}
      </ul>

      {editingBookmark && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setEditingBookmark(null)}>
              &times;
            </span>
            <h2>Edit Bookmark</h2>
            <input
              type="text"
              placeholder="Name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <input
              type="text"
              placeholder="URL"
              value={editedUrl}
              onChange={(e) => setEditedUrl(e.target.value)}
            />
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkList;
