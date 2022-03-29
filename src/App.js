import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Navbar from './components/Navnar'
import AddArea from './pages/AddArea'
import './styles/index.scss'
import { createContext, useContext, useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import store from './store'
// import MyContext from './MyContext'
export const MyContext = createContext()

function App() {
  const [value] = useState({ v1: 111, v2: 222 })
  const [myfavorite, setMyfavorite] = useState([])
  // const [rendered, setRendered] = useState(false)
  let localS = localStorage.getItem('addList') ?? []
  useEffect(() => {
    if (typeof localS === 'string') {
      localS = localS.split(',')
    }
    setMyfavorite(localS)
  }, [])
  return (
    <BrowserRouter>
      <MyContext.Provider value={value}>
        <Provider store={store}>
          <Navbar />
          <Routes>
            <Route path={'*'} element={<div>404 Not found</div>} />
            <Route
              path="/addArea"
              element={
                <AddArea
                  myfavorite={myfavorite}
                  setMyfavorite={setMyfavorite}
                />
              }
            />
            <Route
              path="/"
              element={
                <Index myfavorite={myfavorite} setMyfavorite={setMyfavorite} />
              }
            />
          </Routes>
        </Provider>
      </MyContext.Provider>
    </BrowserRouter>
  )
}

export default App
