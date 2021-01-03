import React, { Component } from "react";
import "zingchart/es6";
import ZingChart from "zingchart-react";
import data from "./utils/data";
import fetchYData from "./utils/fetchYData";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {
        type: "line",
        title: {
          text: "Weekly number of meetings chart",
          align: "center",
          marginLeft: "23%",
        },
        scaleX: {
          labels: [],
        },
        series: [
          {
            values: [2,3,4],
          },
        ],
      },
    };
  }
  componentDidMount() {
    const run = async (data) => {
      try {
        const dt = await fetchYData(data);
        setTimeout(() => {
          this.setState((prevState) => ({
            config: {
              ...prevState.config,
              scaleX: {
                ...prevState.config.scaleX,
                labels:dt
              },
            },
          }));
      
      }, 3000);
      } catch (error) {
        console.log("return a reject :", error);
      }
    };
    run(data)
   

 
  }

  render() {
    // console.log(this.state)
    return (
      <div className="App">
        <ZingChart data={this.state.config} />
      </div>
    );
  }
}

export default App;
