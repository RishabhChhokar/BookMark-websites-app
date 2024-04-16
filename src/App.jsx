import ContextProvider from "./ContextProvider";
import Modal from "./Modal";
import BookmarkList from "./BookMarkList";
import { useState } from "react";
function App() {
  const [isEdit, setIsEdit] = useState(false);
  const [bookmarkUrl, setBookmarkUrl] = useState("");
  const [bookmarkName, setBookmarkName] = useState("");
  const [bookmarkId, setBookmarkId] = useState("");
  const handleEdit = (bookmark) => {
    setIsEdit(true);
    setBookmarkUrl(bookmark.url);
    setBookmarkName(bookmark.name);
    setBookmarkId(bookmark._id);
  };
  const changeEdit = () => {
    setIsEdit(false);
  };
  return (
    <ContextProvider>
      <>
        <h1 style={{ textAlign : "center"}}>Bookmark Website</h1>
        <Modal
          changeEdit={changeEdit}
          isEditButton={isEdit}
          name={bookmarkName}
          url={bookmarkUrl}
          id={bookmarkId}
        />
      </>
      <BookmarkList onEdit={handleEdit} />
    </ContextProvider>
  );
}

export default App;
