import React, { Component } from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

import ZingChart from "zingchart-react";
import "./App.css";
import data from "./utils/data";
import fetchXData from "./utils/fetchXData";
import fetchYData from "./utils/fetchYData";
class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.plotVertical= this.plotVertical.bind(this);

    this.state = {
      config: {
        type: "line",
        scaleX: {
          labels: [],
        },
        series: [],
        scaleY: {
          label: {
            text: "Number of meetings",
            fontSize: "14px",
          },
        },
        crosshairX: {
          lineColor: "#424242",
          lineGapSize: "4px",
          lineStyle: "dotted",
          plotLabel: {
            padding: "15px",
            backgroundColor: "white",
            bold: true,
            borderColor: "#e3e3e3",
            borderRadius: "5px",
            fontColor: "#2f2f2f",
            fontFamily: "Lato",
            fontSize: "12px",
            shadow: true,
            shadowAlpha: 0.2,
            shadowBlur: 5,
            shadowColor: "#a1a1a1",
            shadowDistance: 4,
            textAlign: "left",
          },
          scaleLabel: {
            backgroundColor: "#424242",
          },
        },
      },
      value: [1],
    };
  }

  plotVertical(data, arrOfWks) {
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
    this.plotVertical(data, this.state.value);
  }
  componentDidUpdate() {
    this.plotVertical(data, this.state.value);
  }

  render() {
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
                <ToggleButton value={4}>Cumulative</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="card-footer text-muted">
              Weekly number of meetings chart
            </div>
          </div>
        </div>
        <div className="container">
          <ZingChart data={this.state.config} />
        </div>
      </div>
    );
  }
}

export default App;
