import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"

const BookmarksContext = createContext();

export const useBookmarks = () => useContext(BookmarksContext);

const ContextProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    axios
      .get("https://crudcrud.com/api/8177ea42129e483784808ff7424d0dfe/bookmarks")
      .then((response) => setBookmarks(response.data))
      .catch((error) => console.error("Error fetching bookmarks:", error));
  }, []);

  const addBookmark = async (newBookmark) => {
    try {
      const response = await axios.post(
        "https://crudcrud.com/api/8177ea42129e483784808ff7424d0dfe/bookmarks",
        newBookmark
      );
      setBookmarks([...bookmarks, response.data]);
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  const updateBookmark = async (id, updatedBookmark) => {
    try {
      await axios.put(
        `https://crudcrud.com/api/8177ea42129e483784808ff7424d0dfe/bookmarks/${id}`,
        updatedBookmark
      );
      const updatedBookmarks = bookmarks.map((bookmark) =>
        bookmark._id === id ? updatedBookmark : bookmark
      );
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  const deleteBookmark = async (id) => {
    try {
      await axios.delete(
        `https://crudcrud.com/api/8177ea42129e483784808ff7424d0dfe/bookmarks/${id}`
      );
      const updatedBookmarks = bookmarks.filter(
        (bookmark) => bookmark._id !== id
      );
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, addBookmark, updateBookmark, deleteBookmark }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export default ContextProvider;
