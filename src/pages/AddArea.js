import './../App.css'
import Aside from '../components/Aside'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddArea(props) {
  let navigate = useNavigate()
  const { myfavorite, setMyfavorite } = props
  const [addList, setAddlist] = useState([])

  const lcoationNameArr = [
    // eslint-disable-next-line prettier/prettier
    '基隆市','臺北市','新北市','桃園市','新竹市','苗栗縣','台中縣','彰化縣','雲林縣','嘉義市','臺南市','高雄市','屏東縣','宜蘭縣','花蓮縣',
  ]
  const lcoationOption = lcoationNameArr.map((v, i) => (
    <li key={i}>
      <input
        type="checkbox"
        value={v}
        onChange={(e) => {
          const value = e.target.value
          if (!addList.includes(value)) {
            return setAddlist([...addList, value])
          } else {
            const newList = addList.filter((v) => v !== value)
            setAddlist(newList)
          }
        }}
        id={v}
      />
      <label htmlFor={v}>{v}</label>
    </li>
  ))
  function handleAddSumit() {
    if (addList.length > 0) {
      localStorage.setItem('addList', addList)
    } else {
      localStorage.clear()
    }
    setMyfavorite(addList)
    navigate('/')
  }
  return (
    <div className="body">
      {/* aside 之後做成元件 */}
      <Aside myfavorite={myfavorite} setMyfavorite={setMyfavorite} />
      <div
        className="add-body"
        style={{
          backgroundImage: "url('img/starry.jpeg')",
        }}
      >
        <h2>設置想加入的區域</h2>
        <ul className="add-ul">{lcoationOption}</ul>
        <button
          className="btn2"
          onClick={() => {
            handleAddSumit()
          }}
        >
          儲存
        </button>
      </div>
    </div>
  )
}
