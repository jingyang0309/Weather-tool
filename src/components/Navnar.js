import { Link } from 'react-router-dom'
function Navbar(props) {
  return (
    <header className="myNavbar">
      <Link to="/" className="navbar-link">
        <div className="my-logo">
          <img src="./img/weather.png" alt="logo" />
        </div>
        <h2>Weather tool</h2>
      </Link>
      <ul>
        {/* <li>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            首頁
          </Link>
        </li>
        <li>
          <Link
            to="/allState"
            style={{ textDecoration: 'none', color: '#fff' }}
          >
            全國天氣
          </Link>
        </li> */}
      </ul>
    </header>
  )
}
export default Navbar
