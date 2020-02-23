import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Jumbotron, Dropdown } from 'react-bootstrap';

function App() {
  const [dataNumber, setDataNumber] = useState(null)
  const [featureNumber, setFeatureNumber] = useState(null)
  const [featureArray, setFeatureArray] = useState([])
  const [linearValue, setLinearValue] = useState(null)
  const [normalValue, setNormalValue] = useState(null)

  useEffect(() => {
    changeArray()
  }, [featureNumber])

  function onChangeNumber(e, type) {
    if (type === "feature") setFeatureNumber(e.target.value)
    else setDataNumber(e.target.value)
  }

  function linearDropdown(e) {
    setLinearValue(e.target.text)
  }
  function normalizationDropdown(e) {
    setNormalValue(e.target.text)
  }

  function changeArray() {
    if (featureNumber > 0) {
      let arr = []
      setFeatureArray([])
      for (let i = 0; i < featureNumber; i++) {
        arr.push({ key: i, from: null, to: null })
      }
      setFeatureArray(arr)
    } else setFeatureArray([])

  }

  function changeFromTo(e, key, type) {
    let newArr = featureArray
    newArr.forEach(item => {
      if (item.key === key) item[type] = e.target.value
    })
    setFeatureArray(newArr)
  }

  function getData() {
    console.log('featureArray', featureArray)
    console.log('linearValue', linearValue)
    console.log('dataNumber', dataNumber)
    console.log('normalValue', normalValue)
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
