// export const getDataNow = 'getDataNow'
// export const choosePlace = 'choosePlace'

export const getDataNow = (type, dataNowObj) => ({
  type: type,
  payload: {
    dataNowObj,
  },
})
