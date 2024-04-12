import "../print.css";
import { useState, useRef } from "react";
import CardGen from "../components/CardGen";
import { useReactToPrint } from "react-to-print";

import APIClient from "../services/api-client";
const apiClient = new APIClient("/generateBingos");
const CardGenerator = () => {
  const [data, setData] = useState({
    generatedCards: [],
    numberOfCards: null,
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleInputChange = (event) => {
    setData((prevData) => ({
      ...prevData,
      numberOfCards: event.target.value,
    }));
  };

  const handleButton = (event) => {
    event.preventDefault();
    console.log("Number of cards:", data.numberOfCards);
    apiClient
      .getAll({ params: { numberOfCards: data.numberOfCards } })
      .then((response) => {
        console.log(response);
        setData((prevData) => ({
          ...prevData,
          generatedCards: response.data,
        }));
      });
  };

  return (
    <div className="bg-neutral-800">
      <div className="w-100 flex justify-center mt-7 gap-3">
        <select
          name="cards"
          value={data.numberOfCards || ""}
          onChange={handleInputChange}
          required
          className="border border-gray-500 bg-neutral-700 text-white px-4 py-2 rounded-full outline-none"
        >
          <option key={`d`}>number of cards</option>
          {[...Array(110).keys()].map((index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>

        <button
          onClick={handleButton}
          className="bg-red-600  text-white text-xl rounded-full py-1 px-4 hover:opacity-70"
        >
          Submit
        </button>
        <button
          onClick={handlePrint}
          className="bg-red-600  text-white text-xl rounded-full py-1 px-4 hover:opacity-70"
        >
          Print
        </button>
      </div>
      <div ref={componentRef} className="flex flex-wrap justify-around">
        {data.generatedCards.map((card, index) => (
          <div key={index} className="page-break">
            <CardGen key={index} card={card} />
            {(index + 1) % 2 === 0 && <div className="page-break"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGenerator;
