import { Route, Routes } from 'react-router-dom'
import Map from "./pages/Map.tsx";


function App() {

    return (
        <Routes>
            <Route path="/" element={<Map />} />
        </Routes>
    )
}

export default App
