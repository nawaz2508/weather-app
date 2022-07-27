import logo from './logo.svg';
import './App.css';
import { Chakra } from './Components/Chakra';
import {GeoLocation} from "./Components/Location"


function App() {
  const location=GeoLocation();
  // console.log(location)

  return (
    <div className="App">
     <Chakra coords={location}/>
    </div>
  );
}

export default App;
