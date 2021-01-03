import React, { Component } from "react";
import { ToggleButtonGroup, ToggleButton, Button } from "react-bootstrap";
import "./App.css";
import "zingchart/es6";
import ZingChart from "zingchart-react";
import data from "./utils/data";
import fetchXData from "./utils/fetchXData";
import fetchYData from "./utils/fetchYData";
class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleTotal = this.handleTotal.bind(this);
    this.runscript = this.runscript.bind(this);

    this.state = {
      config: {
        type: "line",
        scaleX: {
          labels: [],
        },
        series: [],
      },
      value: [1],
    };
  }
  handleTotal(){
    this.setState({ value: [] });

  }
  runscript(data, arrOfWks) {
    const run_2 = async (data, arrOfWks) => {
      try {
        let dt_2 = await fetchYData(data, arrOfWks);
        setTimeout(() => {
          this.setState((prevState) => ({
            config: {
              ...prevState.config, // copy all other key-value pairs of config object
              series: dt_2,
            },
          }));
        }, 1000);
      } catch (error) {
        console.log("return a reject :", error);
      }
    };
    run_2(data, arrOfWks);
  }

  handleChange(val) {
    this.setState({ value: val });
  }

  componentDidMount() {
    const run = async (data) => {
      try {
        let dt = await fetchXData(data);
        setTimeout(() => {
          this.setState((prevState) => ({
            config: {
              ...prevState.config, // copy all other key-value pairs of config object
              scaleX: {
                // specific object of scaleX object
                ...prevState.config.scaleX, // copy all scaleX key-value pairs
                labels: dt, // update value of specific key, labels
              },
            },
          }));
        }, 1000);
      } catch (error) {
        console.log("return a reject :", error);
      }
    };
    run(data);
    this.runscript(data, this.state.value);
  }
  componentDidUpdate() {
    this.runscript(data, this.state.value);
  }

  render() {
    console.log(this.state);
    return (
      <div className="App-header">
        <div className="mb-3">
          <div className="card">
            <h5 className="card-header">choose one or more category </h5>
            <div className="card-body text-center">
              <ToggleButtonGroup
                type="checkbox"
                value={this.state.value}
                onChange={this.handleChange}
              >
                <ToggleButton value={1}>Type A</ToggleButton>
                <ToggleButton value={2}>Type B</ToggleButton>
                <ToggleButton value={3}>Type C</ToggleButton>
              </ToggleButtonGroup>
              <div className='container-fluid m-2'>
                <Button  variant="success" onClick={this.handleTotal}>Cumulative</Button>
              </div>
              
            </div>
            <div className="card-footer text-muted">
              Weekly number of meetings chart
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <ZingChart data={this.state.config} />
        </div>
      </div>
    );
  }
}

export default App;
