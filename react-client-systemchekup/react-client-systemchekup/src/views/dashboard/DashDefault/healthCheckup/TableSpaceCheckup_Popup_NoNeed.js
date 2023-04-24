import React, { useState } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const array = [
  {
    id: 1,
    date: {
      id: 1,
      name: "202001"
    },
    item: {
      id: 1,
      name: "I1"
    },
    price: 100
  },
  {
    id: 2,
    date: {
      id: 2,
      name: "202002"
    },
    item: {
      id: 1,
      name: "I1"
    },
    price: 200
  },
  {
    id: 3,
    date: {
      id: 2,
      name: "202002"
    },
    item: {
      id: 2,
      name: "I2"
    },
    price: 300
  }
];

export default function App() {
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const hanldeClick = (selectedId) => {
    const selectedRec = array.find((val) => val.item.name === selectedId);
    setSelectedData(selectedRec);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };
  const items_dicc = array.reduce((acc, e) => {
    if (!acc[e["item"]["name"]]) {
      acc[e["item"]["name"]] = {
        [e["date"]["name"]]: e["price"]
      };
    } else {
      acc[e["item"]["name"]][e["date"]["name"]] = e["price"];
    }
    return acc;
  }, {});

  const dates = [
    ...new Set(
      Object.keys(items_dicc)
        .map((i) => Object.keys(items_dicc[i]))
        .flat()
    )
  ];

  const totalSumPerDate = {};

  dates.forEach((date) => {
    const sumOnDate = Object.values(items_dicc).reduce((acc, curr) => {
      acc = acc + (curr[date] ? curr[date] : 0);
      return acc;
    }, 0);
    totalSumPerDate[[date]] = sumOnDate;
  });

  const totalSum = Object.values(totalSumPerDate).reduce(
    (acc, curr) => acc + curr,
    0
  );

  const sumPerItem = {};

  Object.keys(items_dicc).forEach((key) => {
    const sum = Object.values(items_dicc[key]).reduce(
      (acc, curr) => acc + curr,
      0
    );
    sumPerItem[[key]] = sum;
  });

  return (
    <>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th>ITEM</th>
            {dates.map((date) => (
              <th>{date}</th>
            ))}
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(items_dicc).map((item) => {
            return (
              <tr onClick={() => hanldeClick(item)}>
                <td>{item}</td>
                {dates.map((date) => (
                  <td>{items_dicc[item][date] || ""}</td>
                ))}
                <td>{sumPerItem[item]}</td>
              </tr>
            );
          })}
          <tr>
            <td>TOTAL</td>
            {Object.values(totalSumPerDate).map((item) => (
              <td>{item}</td>
            ))}
            <td>{totalSum}</td>
          </tr>
        </tbody>
      </table>
      {show && <Modal details={selectedData} handleClose={hideModal} />}
    </>
  );
}

const Modal = ({ handleClose, details }) => {
  console.log(details);
  return (
    <div className="modal display-block">
      <section className="modal-main">
        <div className="App">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">ITEM</th>
                <th scope="col">ID</th>
                <th scope="col">DATE</th>
                <th scope="col">PRICE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{details?.item?.name}</td>
                <td>{details?.item?.id}</td>
                <td>{details?.date?.name}</td>
                <td>{details?.price}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};
