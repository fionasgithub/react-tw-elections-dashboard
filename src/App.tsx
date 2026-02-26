import ElectionsDashboard from './components/ElectionsDashboard'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <ElectionsDashboard />
    </ThemeProvider>
  )
}

export default App
