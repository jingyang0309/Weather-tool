import { useEffect, useState } from 'react'
import './../App.css'
import Aside from '../components/Aside'
import Test from '../components/Test'
import Test2 from '../components/Test2'
import { useDispatch, useSelector } from 'react-redux'
// import * as action from './../action/action'
import { getDataNow } from './../action/action'

export default function Main(props) {
  const { myfavorite, setMyfavorite } = props
  const [weatherFuture, setWeatherFuture] = useState([])
  const [getData, setGetData] = useState(false)
  const [getNowData, setGetNowData] = useState(false)
  const [selectArea, setSelectArea] = useState('基隆市')
  const [weatherIcon1, setWeatherIcon1] = useState('')
  const [weatherIcon2, setWeatherIcon2] = useState('')
  const [weatherIcon3, setWeatherIcon3] = useState('')
  const [weatherBcg, setWeatherBcg] = useState('')
  // Redux
  const dataNow = useSelector((state) => state.dataNow)
  const dispatch = useDispatch()

  function setWtIcon(i, src) {
    switch (i) {
      case 0:
        setWeatherIcon1(src)
        break
      case 1:
        setWeatherIcon2(src)
        break
      case 2:
        setWeatherIcon3(src)
        break
      default:
        break
    }
  }
  useEffect(() => {
    setSelectArea(myfavorite[0])
    setGetNowData(true)
  }, [myfavorite])

  useEffect(() => {
    if (!getData) return
    weatherFuture.forEach((v, i) => {
      if (v.locationName === selectArea) {
        // console.log(v.weatherElement[0].time[0].parameter.parameterName)
        for (let i = 0; i < 3; i++) {
          if (
            v.weatherElement[0].time[i].parameter.parameterName.match('雨') !==
            null
          ) {
            // console.log('有雨', i)
            // setWeatherIcon1('./img/rain.png')
            setWtIcon(i, './img/rain.png')
          } else if (
            v.weatherElement[0].time[i].parameter.parameterName.match(
              '晴天'
            ) !== null
          ) {
            setWtIcon(i, './img/sun.png')
          } else {
            setWtIcon(i, './img/cloudy.png')
          }
        }
      }
    })
  }, [weatherFuture, selectArea, getData])
  useEffect(() => {
    if (!getData) return
    console.log('backgroud update')
    // chang background
    if (!!dataNow.weather) {
      if (dataNow.weather.match('晴天')) {
        setWeatherBcg('img/bcg-sub.png')
      } else if (dataNow.weather.match('雨')) {
        setWeatherBcg('img/bcg-rain.png')
      } else {
        setWeatherBcg('img/bcg-cloudy.png')
      }
    }
  }, [getData])

  useEffect(() => {
    // Get 未來天氣
    ;(async function () {
      // 寫入你的paylaod
      const payload = ''
      const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${payload}`
      const request = new Request(url, {
        method: 'GET',
      })
      const response = await fetch(request)
      const data = await response.json()
      if (data.success !== 'true') {
        console.log('Request data of future is error')
        return
      }
      setGetData(true)
      setWeatherFuture(data.records.location)
      // console.log('zzzz', data.records.location)
      // console.log('目前在:', selectArea)
    })()
    // Get 當前天氣報導
  }, [])

  useEffect(() => {
    if (!getNowData) return
    ;(async function () {
      const lcoationName = {
        基隆市: '%E5%9F%BA%E9%9A%86',
        臺北市: '%E8%87%BA%E5%8C%97',
        新北市: '%E4%B8%AD%E5%92%8C',
        桃園市: '%E6%A1%83%E5%9C%92',
        新竹市: '%E6%96%B0%E7%AB%B9%E5%B8%82%E6%9D%B1%E5%8D%80',
        苗栗縣: '%E8%8B%97%E6%A0%97',
        台中縣: '%E8%A5%BF%E5%B1%AF',
        彰化縣: '%E7%94%B0%E4%B8%AD',
        雲林縣: '%E9%9B%B2%E6%9E%97%E6%9D%B1%E5%8B%A2',
        嘉義市: '%E5%98%89%E7%BE%A9%E5%B8%82%E6%9D%B1%E5%8D%80',
        臺南市: '%E8%87%BA%E5%8D%97',
        高雄市: '%E9%AB%98%E9%9B%84',
        屏東縣: '%E5%B1%8F%E6%9D%B1',
        宜蘭縣: '%E5%AE%9C%E8%98%AD',
        花蓮縣: '%E8%A5%BF%E6%9E%97',
      }
      const payload = ''
      const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${payload}&format=JSON&locationName=${lcoationName[selectArea]}`
      const request = new Request(url, {
        method: 'GET',
      })
      const response = await fetch(request)
      const data = await response.json()
      if (data.success !== 'true') {
        console.log('Request data of now is error')
        return
      }
      // console.log('data at now :', data)
      let dataNowObj = {}
      if (data.records.location.length === 0) {
        return
      }
      dataNowObj.dataTime = data.records.location[0].time.obsTime
      data.records.location[0].weatherElement.forEach((v) => {
        if (v.elementName === 'TEMP') {
          dataNowObj.temperature = Math.round(+v.elementValue)
        }
        if (v.elementName === 'Weather') {
          dataNowObj.weather = v.elementValue
        }
        if (v.elementName === 'HUMD') {
          dataNowObj.wet = v.elementValue
        }
        if (v.elementName === 'WDSD') {
          dataNowObj.cloudy = v.elementValue
        }
      })
      dispatch(getDataNow('getDataNow', dataNowObj))
    })()
  }, [selectArea])
  const weatherFutureData = weatherFuture.map((v, i) => {
    if (v.locationName === selectArea) {
      // console.log(v)
      return (
        <div key={i} className="forecastBigBox">
          <div className="forecastBox">
            <div className="weatherIcon">
              <img src={weatherIcon1} alt="weather" />
            </div>
            <p>
              <span className="my-text-blue">天氣:</span>
              {v.weatherElement[0].time[0].parameter.parameterName}
            </p>
            <p>
              {v.weatherElement[2].time[0].parameter.parameterName}度 ~
              {v.weatherElement[4].time[0].parameter.parameterName}度
            </p>
            <p>{v.weatherElement[0].time[0].startTime} ~</p>
            <p>{v.weatherElement[0].time[0].endTime}</p>
          </div>
          <div className="forecastBox">
            <div className="weatherIcon">
              <img src={weatherIcon2} alt="weather" />
            </div>
            <p>
              <span className="my-text-blue">天氣:</span>
              {v.weatherElement[0].time[1].parameter.parameterName}
            </p>
            <p>
              {v.weatherElement[2].time[1].parameter.parameterName}度 ~
              {v.weatherElement[4].time[1].parameter.parameterName}度
            </p>
            <p>{v.weatherElement[0].time[1].startTime} ~</p>
            <p>{v.weatherElement[0].time[1].endTime}</p>
          </div>
          <div className="forecastBox">
            <div className="weatherIcon">
              <img src={weatherIcon3} alt="weather" />
            </div>
            <p>
              <span className="my-text-blue">天氣:</span>
              {v.weatherElement[0].time[2].parameter.parameterName}
            </p>
            <p>
              {v.weatherElement[2].time[2].parameter.parameterName}度 ~
              {v.weatherElement[4].time[2].parameter.parameterName}度
            </p>
            <p>{v.weatherElement[0].time[2].startTime} ~</p>
            <p>{v.weatherElement[0].time[2].endTime}</p>
          </div>
        </div>
      )
    }
  })

  return (
    <div className="body">
      {/* aside 之後做成元件 */}
      <Aside
        myfavorite={myfavorite}
        setMyfavorite={setMyfavorite}
        selectArea={selectArea}
        setSelectArea={setSelectArea}
      />
      <div
        className="favorite-body"
        style={{
          backgroundImage: `url(${weatherBcg})`,
        }}
      >
        {/* <Test initialCount={123} />
        <Test2 initText={'Reset'} /> */}
        <div className="favorite-content">
          <p>{selectArea}</p>
          <p className="favorite-content-temp">
            {dataNow.temperature}
            <span style={{ fontSize: '28px' }}>度</span>
          </p>
          <p>
            <span className="my-text-blue">天氣:</span> {dataNow.weather}{' '}
            <span className="my-text-blue" style={{ marginLeft: '24px' }}>
              濕度:
            </span>{' '}
            {Math.floor(+dataNow.wet * 100)}%
          </p>
          <p>
            <span className="my-text-blue">風速:</span>
            {dataNow.cloudy} 公尺/秒
          </p>
          <p>
            <span className="my-text-blue">資料時間:</span> {dataNow.dataTime}
          </p>
          <div className="favorite-table">
            <p style={{ fontSize: '22px' }}>天氣預測</p>
            {weatherFutureData}
          </div>
        </div>
      </div>
    </div>
  )
}
