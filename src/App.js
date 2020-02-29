import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Jumbotron, Dropdown } from 'react-bootstrap';

function App() {
  const [dataLength, setDataLength] = useState(null)
  const [featureNumber, setFeatureNumber] = useState(null)
  const [featureArray, setFeatureArray] = useState([])
  const [linearValue, setLinearValue] = useState(null)
  const [normalValue, setNormalValue] = useState(null)

  useEffect(() => {
    if (featureNumber > 0) {
      changeArray()
    } else setFeatureArray([])
  }, [featureNumber])

  function onChangeNumber(e, type) {
    if (type === "feature") setFeatureNumber(e.target.value)
    else setDataLength(e.target.value)
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

  function getData() {
    let arr = []
    let concat = Array.from({ length: featureNumber }, () => "")
    let linear = linearValue === "Doğrusal" ? 0.25 : 1
    let temp = JSON.parse(JSON.stringify(featureArray));
    for (let i = 0; i < dataLength; i++) {
      let row = temp.map(item => {
        let rand = item.from + (linear * Math.random()) * (item.to - item.from)
        concat[item.key] += rand.toFixed(3) + ","
        item.from = linearValue === "Doğrusal" ? rand : item.from
        return { column: item.key, value: rand.toFixed(3) }
      })
      arr.push({ index: i, row })
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
        console.log('mean', mean)
        let varience = 0
        a.forEach(dev => {
          return varience += Math.pow((parseFloat(dev) - mean), 2)
        })
        console.log('varience', varience)
        let varianceTotal = varience / a.length
        console.log('varianceTotal', varianceTotal)
        let deviation = Math.sqrt(varianceTotal)
        console.log('deviation', deviation)
        console.log('arr1', arr)
        arr.forEach(row => {
          row.row[i].value = ((row.row[i].value - mean) / deviation)
        })
      })
    }
    console.log('arr2', arr)
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
      <Form>
        <Jumbotron>

          <div className="row">
            <span className="col-5" />
            <input className="col-2" type="number" placeholder="Veri Sayısı" onChange={(e) => onChangeNumber(e, "data")} />
            <span className="col-5" />
          </div>

          <br />
          <br />

          <div className="row">
            <span className="col-5" />
            <input className="col-2" type="number" placeholder="Öznitelik Sayısı" onChange={(e) => onChangeNumber(e, "feature")} />
            <span className="col-5" />
          </div>

          <br />
          <br />

          {features}

          <br />
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

            <Button className="row col-3" onClick={() => getData()}>Gönder</Button>

            <span className="col-5" />
          </div>
        </Jumbotron>
      </Form>
    </div>
  );
}

export default App;
