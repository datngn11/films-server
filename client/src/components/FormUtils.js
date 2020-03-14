const setField = {
  text: v => v,
  textarea: v => v,
  email: v => v,
  password: v => v,
  number: v => Number(v),
  checkbox: v => v.checked,
}

const setDataObj = (data, fn) => ({target: {name, type, value}}) =>
  fn({...data, [name]: setField[type](value)})

export default setDataObj
