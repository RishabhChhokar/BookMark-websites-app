import ContextProvider from "./ContextProvider";
import Modal from "./Modal";
import BookmarkList from "./BookMarkList";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <div style={{ textAlign: "center" }}>
          <h1>Bookmark Website</h1>
          <Modal />
        </div>
        <BookmarkList />
      </div>
    </ContextProvider>
  );
}

export default App;
