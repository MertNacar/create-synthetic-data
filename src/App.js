import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Jumbotron, Dropdown } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Excel from './Excel'

function App() {
  const [dataLength, setDataLength] = useState(null)
  const [featureNumber, setFeatureNumber] = useState(null)
  const [field, setField] = useState({})
  const [featureArray, setFeatureArray] = useState([])
  const [linearValue, setLinearValue] = useState(null)
  const [normalValue, setNormalValue] = useState(null)
  const [final, setFinal] = useState([])
  const [fileName, setFileName] = useState("")

  useEffect(() => {
    if (featureNumber > 0) {
      changeArray()
    } else setFeatureArray([])
  }, [featureNumber])

  function onChange(e, type) {
    if (type === "feature") setFeatureNumber(e.target.value)
    else if (type === "data") setDataLength(e.target.value)
    else setFileName(e.target.value)
  }

  function linearDropdown(e) {
    setLinearValue(e.target.text)
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
    let concat = Array.from({ length: featureNumber }, () => "")
    let linear = linearValue === "Doğrusal" ? 0.25 : 1
    let temp = JSON.parse(JSON.stringify(featureArray));
    for (let i = 0; i < dataLength; i++) {
      let row = temp.map(item => {
        let rand = item.from + (linear * Math.random()) * (item.to - item.from)
        concat[item.key] += rand.toFixed(3) + ","
        item.from = linearValue === "Doğrusal" ? rand : item.from
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
    let fieldFeature = { "index": "index" }
    featureArray.forEach(item => {
      fieldFeature[`Oznitelik${item.key}`] = `Oznitelik ${item.key}`;
    })

    setField(fieldFeature)
    let finalArr = []
    arr.forEach((item, i) => {
      let object = { "index": i }
      item.row.forEach((values, ite) => {
        object[`Oznitelik${ite}`] = values.value
      })
      finalArr.push(object)
    })
    setFinal(finalArr)
  }

  let features = featureArray.map((item, key) => {
    return (
      <div key={key} className="row">
        <span className="col-3" />
        <p className="col-2 text">Öznitelik {key} :</p>
        <input className="col-2 from" type="number" placeholder="from" onChange={(e) => changeFromTo(e, key, "from")} />
        <input className="col-2" type="number" placeholder="to" onChange={(e) => changeFromTo(e, key, "to")} />
        <span className="col-3" />
      </div>
    )
  })

  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to="/excel">
              Excel
            </Link>
          </li>
        </ul>
        <Switch>
          <Route path='/' component={App} >
            <Route path='/excel'>
              <Excel field={field} final={final} fileName={fileName} />
            </Route>
          </Route>
        </Switch>
      </Router>
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
                doğrusallık
              </Dropdown.Toggle>

              <Dropdown.Menu onClick={(e) => linearDropdown(e)}>
                <Dropdown.Item>Doğrusal</Dropdown.Item>
                <Dropdown.Item>Doğrusal Olmayan</Dropdown.Item>
              </Dropdown.Menu>

            </Dropdown>


            <span className="col-5" />
          </div>

          <br />
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
            <Button className="col-2" onClick={() => generateData()}>Oluştur</Button>
            <span className="col-5" />
          </div>
        </Jumbotron>
      </Form>
    </div>
  );
}

export default App;
