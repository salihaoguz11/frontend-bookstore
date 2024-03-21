import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import EditBookForm from "./components/EditBookForm";

function App() {
  return (
    <div className="App" style={{ padding: "20px" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/edit/:id" element={<EditBookForm />} />
          <Route path="/new" element={<BookForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
