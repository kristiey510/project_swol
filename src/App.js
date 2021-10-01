import logo from "./logo.svg";
import "./App.css";
import { db } from "./firebase";

function App() {
  const handleClick = async () => {
    const ref = db.collection("test").doc("fTsqmwDUuL3RpEGyyxdO");
    const doc = await ref.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      console.log("Document data:", doc.data());
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button type="button" onClick={handleClick}>
          test query
        </button>
      </header>
    </div>
  );
}

export default App;
