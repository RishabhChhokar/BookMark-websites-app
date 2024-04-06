/* eslint-disable react/prop-types */
import { useBookmarks } from "./ContextProvider";
const BookmarkList = (props) => {
  const { bookmarks, deleteBookmark } = useBookmarks();
  return (
    <div>
      <h2>All Bookmarks</h2>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark._id}>
            <span>{bookmark.name}</span>
            <span> {">"} </span>
            <span> </span>
            <span>
              <a
                href={`http://${bookmark.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {bookmark.url}
              </a>
            </span>
            <span> </span>
            <button onClick={() => deleteBookmark(bookmark._id)}>Delete</button>
            <span> </span>
            <button onClick={() => props.onEdit(bookmark)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarkList;
