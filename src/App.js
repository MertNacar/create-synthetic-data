import React, { useState, useEffect } from 'react';

import { Button, Form, Jumbotron, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { addExcel } from './store/excel/actionCreator'
import { pageReady } from './store/ready/actionCreator'
function App(props) {
  const [dataLength, setDataLength] = useState(null)
  const [featureNumber, setFeatureNumber] = useState(null)
  const [featureArray, setFeatureArray] = useState([])
  const [normalValue, setNormalValue] = useState("Normalizasyon")
  const [correlation, setCorrelation] = useState(null)
  const [regression, setRegression] = useState("y = mx(0) + ... + mx(n-1) + b, (n = bağımsız öznitelik sayısı)")
  const [fileName, setFileName] = useState("")

  useEffect(() => {
    if (featureNumber > 0) {
      props.pageReady(false)
      changeArray()
    } else setFeatureArray([])
  }, [featureNumber])

  function onChangeTxt(e, type) {
    if (type === "data") setDataLength(e.target.value)
    else if (type === "korelasyon") {
      if (e.target.value > 0 && e.target.value <= 1) setCorrelation(e.target.value)
    }

    else if (type === "regrasyon") setRegression(e.target.value)
    else if (type === "name") setFileName(e.target.value)
  }

  function onChangeFeature(e) {
    if (e.target.value >= 2) setFeatureNumber(e.target.value)
    else setFeatureNumber(0)
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
    let rand;
    let random;
    for (let i = 0; i < dataLength; i++) {
      let row = temp.map((itemTemp, index, array) => {
        let item = array[array.length - 1 - index]
        let diffItem = item.to - parseFloat(item.from)
        let diffLen = diffItem / dataLength
        if (i === 0 || (item.key) === (featureNumber - 1)) {
          random = 1
        } else {
          random = correlation * (array[array.length - 1].from / arr[i - 1].row[array.length - 1 - index].value)
          random = parseFloat(random.toFixed(2))
        }
        rand = parseFloat(item.from) + (Math.random() * diffLen) * diffItem * random
        item.from = rand.toFixed(2)
        concat[item.key] += item.from + ","

        return { index: item.key, value: item.from }
      })
      arr.push({ row })

    }

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
      mean = parseFloat(mean.toFixed(2))
      let varience = 0
      a.forEach(dev => {
        return varience += Math.pow((parseFloat(dev) - mean), 2)
      })
      let varianceTotal = varience / a.length
      let deviation = Math.sqrt(varianceTotal)
      deviation = parseFloat(deviation.toFixed(2))
      results.unshift({ index: i, total, totalPow, totalDiff, mean, deviation })
      if (normalValue === "min-max") {
        let max = Math.max(...a)
        let min = Math.min(...a)
        for (let j = arr.length - 1; j >= 0; j--) {
          arr[j].row[i].value = parseFloat((parseFloat(arr[j].row[i].value) - min) / (max - min).toFixed(3))
        }
      } else {
        for (let j = arr.length - 1; j >= 0; j--) {
          arr[j].row[i].value = parseFloat(((parseFloat(arr[j].row[i].value) - mean) / deviation).toFixed(3))
        }
      }
    }

    let regEquation = `${results[results.length - 1].mean} =`
    let slopes = []
    results.map((item, indx, array) => {
      let last = array[results.length - 1]
      let correPay = (dataLength * item.totalDiff) - (last.total * item.total)
      let correPayda1 = Math.sqrt((dataLength * last.totalPow) - Math.pow(last.total, 2))
      let correPayda2 = Math.sqrt((dataLength * item.totalPow) - Math.pow(item.total, 2))
      item.corre = correPay / (correPayda1 * correPayda2)
      item.mx = parseFloat((last.deviation / item.deviation).toFixed(2))
      let mx = (last.deviation / item.deviation).toFixed(2) + "x" + indx
      slopes.push(mx)
    })

    slopes.pop()
    let b;
    let sum = 0
    for (let i = 0; i < results.length - 1; i++) {
      sum += results[i].mx * results[i].mean
    }
    b = results[results.length - 1].mean - parseFloat(sum.toFixed(2))
    regEquation += ` ${slopes.join(" + ")} + b, b = ${b.toFixed(2)}`
    setRegression(regEquation)

    delete results[results.length - 1].totalDiff
    delete results[results.length - 1].corre
    featureArray.forEach(item => {
      fieldFeature[`Oznitelik${item.key}`] = `Oznitelik ${item.key}`;
    })

    let finalArr = []
    arr.forEach((item, i) => {
      let object = { "index": i }
      item.row.forEach((values, ite) => {
        object[`Oznitelik${values.index}`] = values.value
      })
      finalArr.push(object)
    })
    props.addExcel({ fileName, field: fieldFeature, final: finalArr })
    props.pageReady(true)

  }

  function goExcelScreen() {
    props.history.push("/excel");
  }

  let features = featureArray.map((item, key) => {
    return (
      <div key={key}>
        <div className="row">
          <span className="col-3" />
          <p className="col-2 text-right">Öznitelik {key} :</p>
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
            <span className="col-3" />
            <p className="col-2 text-right">Dosya İsmi :</p>
            <input className="col-2" type="input" placeholder="Dosya İsmi" onChange={(e) => onChangeTxt(e, "name")} />
            <span className="col-5" />
          </div>

          <br />
          <br />

          <div className="row">
            <span className="col-3" />
            <p className="col-2 text-right">Veri Sayısı :</p>
            <input className="col-2" type="number" step="500" placeholder="500 ve daha fazla" onChange={(e) => onChangeTxt(e, "data")} />
            <span className="col-5" />
          </div>

          <br />
          <br />

          <div className="row">
            <span className="col-3" />
            <p className="col-2 text-right">Öznitelik Sayısı :</p>
            <input className="col-2" type="number" step="0.1" placeholder="En az 2 - dinamik" onChange={(e) => onChangeFeature(e)} />
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
            <span className="col-3" />
            <p className="col-2 text-right">Korelasyon Katsayısı :</p>
            <input className="col-2" type="number" step="0.1" placeholder="0 - 1 arası" onChange={(e) => onChangeTxt(e, "korelasyon")} />
            <span className="col-4" />
          </div>

          <br />
          <br />


          <div className="row">
            <span className="col-3" />
            <p className="col-2 text-right">Regrasyon :</p>
            <p className="col-5 font-weight-bold" >{regression}</p>
            <span className="col-2" />
          </div>


          <br />
          <br />

          <div className="row">
            <span className="col-5" />
            <Button disabled={!displayButton} className="col-2" onClick={() => generateData()}>Tamam</Button>
            <span className="col-5" />
          </div>

          <br />
          <br />

          <div className="row">
            <span className="col-5" />
            <Button disabled={!props.page} className="col-2" onClick={() => goExcelScreen()}>Excel sayfasına git</Button>
            <span className="col-5" />
          </div>
        </Jumbotron>
      </Form>
    </div>
  );
}



const mapStateToProps = state => {
  return {
    page: state.page
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addExcel: object => {
      dispatch(addExcel(object))
    },
    pageReady: ready => {
      dispatch(pageReady(ready))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
