import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Jumbotron, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { addExcel } from './store/excel/actionCreator'
function App(props) {
  const [dataLength, setDataLength] = useState(null)
  const [featureNumber, setFeatureNumber] = useState(null)
  const [featureArray, setFeatureArray] = useState([])
  const [normalValue, setNormalValue] = useState("Normalizasyon")
  const [correlation, setCorrelation] = useState(null)
  const [regression, setRegression] = useState(null)
  const [fileName, setFileName] = useState("")

  useEffect(() => {
    if (featureNumber > 0) {
      changeArray()
    } else setFeatureArray([])
  }, [featureNumber])

  function onChangeTxt(e, type) {
    if (type === "feature" && e.target.value >= 2) setFeatureNumber(e.target.value)
    else if (type === "data") setDataLength(e.target.value)
    else if (type === "korelasyon") setCorrelation(e.target.value)
    else if (type === "regrasyon") setRegression(e.target.value)
    else setFileName(e.target.value)
  }

  function normalizationDropdown(e) {
    setNormalValue(e.target.text)
  }

  function changeArray() {
    let arr = []
    setFeatureArray([])
    for (let i = 0; i < featureNumber; i++) {
      arr.push({ key: i, from: null, to: null })
    }
    setFeatureArray(arr)
  }

  function changeFromTo(e, key, type) {
    let newArr = featureArray
    newArr.forEach(item => {
      if (item.key === key) item[type] = parseFloat(e.target.value)
    })
    setFeatureArray(newArr)
  }

  function generateData() {
    let arr = []
    let results = []
    let fieldFeature = { "index": "index" }
    let concat = Array.from({ length: featureNumber }, () => "")
    let temp = JSON.parse(JSON.stringify(featureArray));
    console.log('featureArray', featureArray)

    for (let i = 0; i < dataLength; i++) {
      let row = temp.map((itemTemp, index, array) => {
        let item = array[array.length - 1 - index]
        let diffItem = item.to - parseFloat(item.from)
        diffItem = parseFloat(diffItem.toFixed(2))
        let random;
        console.log('for i', i)
        console.log('row index', index)
        if (i === 0 || (array.length - 1 - index) === (featureNumber - 1)) {
          random = 1
        } else {
          random = correlation * arr[i - 1].row[index].value * (array[array.length - 1].from / arr[i - 1].row[array.length - 1 - index].value)
          random = parseFloat(random.toFixed(2))
        }
        let rand = parseFloat(item.from) + (Math.random() * (diffItem / dataLength)) * diffItem * random

        console.log('random', random)
        concat[item.key] += rand.toFixed(2) + ","

        item.from = rand.toFixed(2)
        console.log('item.from Yeni', item.from)
        return { value: rand.toFixed(2) }
      })
      arr.push({ row })

    }

    if (normalValue === "min-max") {
      for (let i = concat.length - 1; i >= 0; i--) {
        let last = concat[concat.length - 1].split(",")
        let a = concat[i].split(",")
        a.pop()
        let max = Math.max(...a)
        let min = Math.min(...a)
        let total = 0
        let totalPow = 0
        let totalDiff = 0
        for (let k = 0; k < a.length; k++) {
          total += parseFloat(a[k])
          totalPow += Math.pow(parseFloat(a[k]), 2)
          totalDiff += (parseFloat(a[k]) * parseFloat(last[k]))
          total = parseFloat(total.toFixed(1))
          totalPow = parseFloat(totalPow.toFixed(1))
          totalDiff = parseFloat(totalDiff.toFixed(1))
        }
        results.unshift({ index: i, total, totalPow, totalDiff })
        for (let j = arr.length - 1; j >= 0; j--) {
          arr[j].row[i].value = (parseFloat(arr[j].row[i].value) - min) / (max - min)
        }
      }

    } else {
      for (let i = concat.length - 1; i >= 0; i--) {
        let last = concat[concat.length - 1].split(",")
        let a = concat[i].split(",")
        a.pop()
        let total = 0
        let totalPow = 0
        let totalDiff = 0
        for (let k = 0; k < a.length; k++) {
          total += parseFloat(a[k])
          totalPow += Math.pow(parseFloat(a[k]), 2)
          totalDiff += (parseFloat(a[k]) * parseFloat(last[k]))
          total = parseFloat(total.toFixed(1))
          totalPow = parseFloat(totalPow.toFixed(1))
          totalDiff = parseFloat(totalDiff.toFixed(1))
        }
        let mean = total / a.length
        let varience = 0
        a.forEach(dev => {
          return varience += Math.pow((parseFloat(dev) - mean), 2)
        })
        let varianceTotal = varience / a.length
        let deviation = Math.sqrt(varianceTotal)
        results.unshift({ index: i, total, totalPow, totalDiff })
        for (let j = arr.length - 1; j >= 0; j--) {
          arr[j].row[i].value = ((parseFloat(arr[j].row[i].value) - mean) / deviation)
        }
      }
    }

    results.map((item, indx, array) => {
      let last = array[results.length - 1]
      let correPay = (dataLength * item.totalDiff) - (last.total * item.total)
      let correPayda1 = Math.sqrt((dataLength * last.totalPow) - Math.pow(last.total, 2))
      let correPayda2 = Math.sqrt((dataLength * item.totalPow) - Math.pow(item.total, 2))
      item.corre = correPay / (correPayda1 * correPayda2)
    })

    delete results[results.length - 1].totalDiff
    delete results[results.length - 1].corre
    console.log('results', results)
    console.log('arr', arr)
    console.log('typeof Infinity', typeof Infinity)
    featureArray.forEach(item => {
      fieldFeature[`Oznitelik${item.key}`] = `Oznitelik ${item.key}`;
    })

    let finalArr = []
    arr.forEach((item, i) => {
      let object = { "index": i }
      item.row.forEach((values, ite) => {
        object[`Oznitelik${ite}`] = values.value
      })
      finalArr.push(object)
    })

    props.addExcel({ fileName, field: fieldFeature, final: finalArr })
    return <Redirect to='/excel' />
  }

  let features = featureArray.map((item, key) => {
    return (
      <div key={key}>
        <div className="row">
          <span className="col-3" />
          <p className="col-2 text-center">Öznitelik {key} :</p>
          <input className="col-2 from" type="number" placeholder="from" onChange={(e) => changeFromTo(e, key, "from")} />
          <input className="col-2" type="number" placeholder="to" onChange={(e) => changeFromTo(e, key, "to")} />
          <span className="col-3" />
        </div>
        <br />
      </div>
    )
  })

  let displayButton = normalValue !== "Normalizasyon" && dataLength && featureNumber && fileName && correlation && featureArray.length > 0
  return (
    <div className="App">
      <Form>
        <Jumbotron>

          <div className="row">
            <span className="col-5" />
            <input className="col-2" type="input" placeholder="Dosya İsmi" onChange={(e) => onChangeTxt(e, "name")} />
            <span className="col-5" />
          </div>

          <br />
          <br />

          <div className="row">
            <span className="col-5" />
            <input className="col-2" type="number" step="100" placeholder="Veri Sayısı" onChange={(e) => onChangeTxt(e, "data")} />
            <span className="col-5" />
          </div>

          <br />
          <br />

          <div className="row">
            <span className="col-5" />
            <input className="col-2" type="number" step="0.1" placeholder="Öznitelik Sayısı (En az 2 - dinamik)" onChange={(e) => onChangeTxt(e, "feature")} />
            <span className="col-5" />
          </div>

          <br />


          {features}

          <br />

          <div className="row">
            <span className="col-5" />
            <Dropdown>
              <Dropdown.Toggle variant="primary">
                {normalValue}
              </Dropdown.Toggle>

              <Dropdown.Menu onClick={(e) => normalizationDropdown(e)}>
                <Dropdown.Item>z-score</Dropdown.Item>
                <Dropdown.Item>min-max</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <span className="col-5" />
          </div>

          <br />
          <br />

          <div className="row">
            <span className="col-5" />
            <input className="col-2" type="number" step="0.1" placeholder="Korelasyon Katsayısı" onChange={(e) => onChangeTxt(e, "korelasyon")} />
            <span className="col-5" />
          </div>

          <br />
          <br />


          <div className="row">
            <span className="col-3" />
            <p className="col-2 text-right">Regrasyon İşlevi:</p>
            <input className="col-2" type="number" placeholder="Regrasyon" onChange={(e) => onChangeTxt(e, "regrasyon")} />
            <span className="col-3" />
          </div>

          <br />
          <br />

          <div className="row">
            <span className="col-5" />
            <Button disabled={!displayButton} className="col-2" onClick={() => generateData()}>Tamam</Button>
            <span className="col-5" />
          </div>
        </Jumbotron>
      </Form>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    addExcel: object => {
      dispatch(addExcel(object))
    }
  }
}

export default connect(null, mapDispatchToProps)(App)
