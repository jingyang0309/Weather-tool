import * as action from '../pages/Main'

const initState = {
  dataNow: {
    temperature: '0',
    weather: '1',
    wet: '2',
    cloudy: '3',
    dataTime: '4',
  },
}

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
// const payload = 'CWB-E35F3BF1-1E69-42DE-A4B0-2F7F8DCF98D3'

const dataNowReducer = (state = initState, action) => {
  switch (action.type) {
    case 'getDataNow':
      const dataNow = { dataNow: action.payload.dataNowObj }
      return dataNow
    default:
      return state
  }
}

export default dataNowReducer
