import * as action from './../pages/Index'

const initState = {
  temperature: '',
  weather: '',
  wet: '',
  cloudy: '',
  dataTime: '',
}

const choosePlace = (state = initState, action) => {
  switch (action.type) {
    case 'write':
      return ''
    case 'choose':
      return ''
    default:
      return state
  }
}

export default choosePlace
