import Charts from "../components/Charts.tsx";
import ChargeWindow from "../components/ChargeWindow.tsx";
import '../styles/styles.css';


function App() {

  return (
      <div className="app-container">
          <h1>GB Energy Mix Information DashBoard</h1>
        <Charts/>
          <ChargeWindow/>
      </div>
  )
}

export default App
