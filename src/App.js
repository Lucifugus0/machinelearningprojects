import WebcamCapture from './components/organisms/WebcamCapture/WebcamCapture';
import NavbarComponent from './components/organisms/Navbar/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <NavbarComponent/>
      <WebcamCapture />
    </div>
  );
}

export default App;
