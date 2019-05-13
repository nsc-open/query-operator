const PIPE_DELIMITER = '|'
const PARAM_DELIMITER = ','
const DEFAULT_OPERATOR = 'eq'

const hasPipe = value => (value || '').includes(PIPE_DELIMITER)

/**
 * 'bt|1,2' => { operator: 'bt', operands: ['1','2'] }
 * '1,2' => { operator: 'eq', operands: ['1', '2'] }
 * @param {String} value 
 * @return {Object} { operator, operands[] }
 */
const parseValue = (value = '') => {
  const [operator, operandsStr] = hasPipe(value) ? value.split(PIPE_DELIMITER) : [DEFAULT_OPERATOR, value]
  const operands = operandsStr.split(PARAM_DELIMITER)
  return { operator, operands }
}

/**
 * 
 * @param {String} queryString
 * @return {Object} { [field]: { operator, operands[] } }
 */
export const parse = (queryString = '') => {
  if (queryString.startsWith('?')) {
    queryString = queryString.substr(1)
  }
  const mapping = {}
  queryString.split('&').forEach(str => {
    const [field, value] = str.split('=')
    mapping[field] = parseValue(value)
  })
  return mapping
}

export const fromJson = () => {
  // parse pipe style query string from json style
}