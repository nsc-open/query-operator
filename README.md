##

avoid '%' in url

support two formats: json and pipe

## operators

eq (equal), ne (not equal), gt (great than), gte (great than equal), lt (less than), lte (less than equal), ct (contains), stw (startsWith), edw (endsWith), in, nin (not in), bt (between)

```js
import queryOperator from 'query-operator'

// /api/resources?f1=xxx&f2=contains|substring&f3=ne|xxx&f4=gt
const queries = queryOperator.parse('f1=xxx&f2=contains|substring&f3=ne|xxx&f4=gt')

const queries = {
  f1: {
    operator: 'eq',
    operants: ['xxx']
  },
  f2: {
    operator: 'contains',
    operants: ['substring']
  },
  f3: {
    operator: 'ne',
    operants: ['xxx']
  },
  f4: {
    operator: 'gt',
  }

}
```

### handles null


### extend by yourself

```js
queryOperator.defineOperator('bt', operantsString => {
  return operantsString.split(queryOperator.OPERANTS_SPLITTER).filter(value => value !== 'null')
})
```


### run it
```js
import { sqlRunner, sequelizeRunner, mongoRunner, jsRunner } from 'query-operator'
sqlRunner.run(queries) // where clause
jsRunner.run(data, queries) // return true or false
```

### define your runner

```js
const myRunner = queryOperator.defineRunner({
  eq: (field, ...operants) => `${field} = ${operants[0]}`,
  ne: (field, ...operants) => `${field} != ${operants[0]}`,
  in: (field, ...operants) => `${field} in (${operants.join(',')})`
  //...
})
```

### stringify

```js
const queries = {
  f1: {
    operator: 'eq',
    operants: ['xxx']
  },
  f2: {
    operator: 'contains',
    operants: ['substring']
  },
  f3: {
    operator: 'ne',
    operants: ['xxx']
  },
  f4: {
    operator: 'gt',
  }

}
queryOperator.stringify(queries) // f1=xxx&f2=contains|substring&f3=ne|xxx&f4=gt|
```