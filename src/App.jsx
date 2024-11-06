
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://vite.dev" target="_blank">
          <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrSfexEKeba_nvSQ52-lGp-tcIvIblUNOhqA&s"} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>proveStock </h1>
      <div className="card">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2XamSKBQ-FFoFUpOk9S9NXX4HdaIa-Qi26Q&s" alt="" />
        
      </div>
      <p className="read-the-docs">
        pagina principal
      </p>
    </>
  )
}

export default App
