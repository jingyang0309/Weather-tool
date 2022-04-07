import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
// import { Provider, useSelector, useDispatch } from 'react-redux';
function Aside(props) {
  // const navigate = useNavigate()
  // const useDispatch = useDispatch()
  const { myfavorite, setSelectArea } = props
  const placeUl = myfavorite.map((v, i) => {
    return (
      <Link key={v} to="/" style={{ textDecoration: 'none' }}>
        <li
          className="placeLi"
          onClick={() => {
            changPlace(v.toString())
          }}
        >
          {v}
        </li>
      </Link>
    )
  })
  function changPlace(area) {
    setSelectArea(area)
    // navigate('/')
  }
  return (
    <>
      <aside>
        <Link to="/addArea" className="addfvrButton">
          <i className="fa-solid fa-gear" style={{ marginRight: '8px' }}></i>{' '}
          新增地點
        </Link>
        <div className="my-underline">我的地點</div>
        <ul>{placeUl.length > 0 ? placeUl : <li>尚未添加最愛地址</li>}</ul>
      </aside>
    </>
  )
}
export default Aside
