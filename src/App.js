import './App.css';
import {GeoLocation} from "./Components/Location"
import {CurrentLocation} from "./Components/Landingpage"

function App() {
  const location=GeoLocation();
  // console.log(location)

  return (
    <div className="App">
     <CurrentLocation/>
    </div>
  );
}

export default App;
