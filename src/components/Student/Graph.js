import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useAuth } from "../../Authentication/auth";
import { useToken } from "../../apis";
import "../../css/Graph.css";

export default function Graph() {
  const username = useAuth((state) => state.username);
  const { tokenInstance } = useToken();
  const [dataset, setDataSet] = useState([]);
  const [postresult, setpostresult] = useState("");
  let showbutton = false;

  useEffect(() => {
    tokenInstance
      .get(`graph/data/${username}`)
      .then((res) => {
        setDataSet(res.data);
        console.log(dataset);
      })
      .catch((err) => {
        setDataSet(null);
        console.log(err);
      });
  }, []);
  console.log(dataset);

  if (dataset.length !== 0) {
    if (dataset.x.length !== 0 && dataset.y.length !== 0) {
      showbutton = true;
    }
  }

  const state = {
    // labels: ["Sem1", "Sem2", "Sem3", "Sem4", "Sem5"],
    labels: dataset.x,
    datasets: [
      {
        label: "Marks Obtained",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        // data: [65, 59, 80, 81, 56],
        data: dataset.y,
      },
    ],
  };
  const toggle = () => {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  };
  function handleButtonClick() {
    setpostresult("Predicting...");
    tokenInstance
      .get(`/prediction/${username}`)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setpostresult(res.data.message);
        }, 3000);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <div className="contain" id="blur">
        <div className="content">
          <div className="graphBody">
            <div className="graphSection">
              <Line
                data={state}
                options={{
                  title: {
                    display: true,
                    text: "Progress graph",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                }}
              />
            </div>
          </div>
          {showbutton == false && (
            <div className="noresult">
              No result available to form a progress graph.
            </div>
          )}
          {showbutton == true && (
            <div className="graphButton">
              <button
                onClick={() => {
                  handleButtonClick();
                  toggle();
                }}
              >
                Predict My 8th sem status
              </button>
            </div>
          )}
        </div>
      </div>
      <div id="popup">
        <div onClick={toggle} className="close">
          +
        </div>
        <h2> {postresult}</h2>
        <button
          onClick={() => {
            toggle();
          }}
        >
          Close
        </button>
      </div>
    </>
  );
}
