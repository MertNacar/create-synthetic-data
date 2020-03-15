import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Jumbotron, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux'
import { addExcel } from './store/excel/actionCreator'
function App(props) {
  const [dataLength, setDataLength] = useState(null)
  const [featureNumber, setFeatureNumber] = useState(null)
  const [featureArray, setFeatureArray] = useState([])
  const [normalValue, setNormalValue] = useState(null)
  const [correlation, setCorrelation] = useState(null)
  const [fileName, setFileName] = useState("")

  useEffect(() => {
    if (featureNumber > 0) {
      changeArray()
    } else setFeatureArray([])
  }, [featureNumber])

  function onChange(e, type) {
    if (type === "feature") setFeatureNumber(e.target.value)
    else if (type === "data") setDataLength(e.target.value)
    else if (type === "korelasyon") setCorrelation(e.target.value)
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
    let fieldFeature = { "index": "index" }
    let concat = Array.from({ length: featureNumber }, () => "")
    let temp = JSON.parse(JSON.stringify(featureArray));
    for (let i = 0; i < dataLength; i++) {
      let row = temp.map(item => {
        let rand = item.from + (correlation * Math.random() * 0.25) * (item.to - item.from)
        concat[item.key] += rand.toFixed(3) + ","
        item.from = rand
        return { value: rand.toFixed(3) }
      })
      arr.push({ row })
    }
    if (normalValue === "min-max") {
      concat.forEach((item, i) => {
        let a = item.split(",")
        a.pop()

        let max = Math.max(...a)
        let min = Math.min(...a)
        arr.forEach(row => {
          row.row[i].value = (row.row[i].value - parseFloat(min)) / (parseFloat(max) - parseFloat(min))
        })
      })
    } else {
      concat.forEach((item, i) => {
        let a = item.split(",")
        a.pop()
        let total = 0
        a.forEach(value => {
          total += parseFloat(value)
        })
        let mean = total / a.length
        let varience = 0
        a.forEach(dev => {
          return varience += Math.pow((parseFloat(dev) - mean), 2)
        })
        let varianceTotal = varience / a.length
        let deviation = Math.sqrt(varianceTotal)
        arr.forEach((row, ite) => {
          row.row[i].value = ((parseFloat(row.row[i].value) - mean) / deviation)
        })
      })
    }
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
  }

  let features = featureArray.map((item, key) => {
    return (
      <div key={key} className="row">
        <span className="col-3" />
        <p className="col-2 text-center">Öznitelik {key} :</p>
        <input className="col-2 from" type="number" placeholder="from" onChange={(e) => changeFromTo(e, key, "from")} />
        <input className="col-2" type="number" placeholder="to" onChange={(e) => changeFromTo(e, key, "to")} />
        <span className="col-3" />
      </div>
    )
  })

  return (
    <div className="App">
      <Form>
        <Jumbotron>

          <div className="row">
            <span className="col-5" />
            <input className="col-2" type="input" placeholder="Dosya İsmi" onChange={(e) => onChange(e, "name")} />
            <span className="col-5" />
          </div>

          <br />
          <br />

          <div className="row">
            <span className="col-5" />
            <input className="col-2" type="number" placeholder="Veri Sayısı" onChange={(e) => onChange(e, "data")} />
            <span className="col-5" />
          </div>

          <br />
          <br />

          <div className="row">
            <span className="col-5" />
            <input className="col-2" type="number" placeholder="Öznitelik Sayısı" onChange={(e) => onChange(e, "feature")} />
            <span className="col-5" />
          </div>

          <br />


          {features}

          <br />

          <div className="row">
            <span className="col-5" />
            <Dropdown>
              <Dropdown.Toggle variant="primary">
                normalizasyon
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
            <input className="col-2" type="number" step="0.1" placeholder="Korelasyon Katsayısı" onChange={(e) => onChange(e, "korelasyon")} />
            <span className="col-5" />
          </div>

          <br />
          <br />

          <div className="row">
            <span className="col-5" />
            <Button className="col-2" onClick={() => generateData()}>Oluştur</Button>
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
