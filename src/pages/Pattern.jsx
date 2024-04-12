import { useEffect, useState } from "react";
import { initialDrawPattern } from "../utils/bingodata";

// import "./App.css";

function Pattern() {
  const [data, setData] = useState(initialDrawPattern);

  const handleReset = () => {
    const data = initialDrawPattern;
    localStorage.setItem("BoardBing", JSON.stringify(data));
    setData(data);
  };

  const handleClick = (ind) => {
    const updatedData = { ...data, [ind]: !data[ind] };
    localStorage.setItem("BoardBing", JSON.stringify(updatedData));
    setData(updatedData);
  };

  const getDataFromLocalStorage = () => {
    const storedData = JSON.parse(localStorage.getItem("BoardBing")) || {};
    setData(storedData);
  };

  useEffect(() => {
    getDataFromLocalStorage();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center pt-2 gap-2">
        <div className="flex items-center gap-20">
          <h1 className="font-bold uppercase text-3xl text-white mb-1">
            game pattern
          </h1>
          <button
            onClick={handleReset}
            className="bg-red-600 text-white rounded-full py-2 px-6 hover:opacity-70"
          >
            Reset
          </button>
        </div>
        <div className="bg-red-600 p-4 rounded-lg">
          <table>
            <thead>
              <tr className="text-white">
                {["B", "I", "N", "G", "O"].map((item, index) => (
                  <th
                    key={index}
                    className="text-4xl text-center rounded-md outline-none "
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((it, i) => {
                return (
                  <tr key={i}>
                    {["b", "i", "n", "g", "o"].map((item, j) => {
                      return (
                        <td key={`${item}${it}`}>
                          <div
                            className="w-24 h-24 outline-none rounded-md bg-white flex justify-center items-center"
                            onClick={() => handleClick(`${item}${it}`)}
                          >
                            {item === "n" && it === 3 ? (
                              <span
                                className={
                                  data[`${item}${it}`]
                                    ? "text-white font-bold flex justify-center items-center text-xl text-center w-16 h-16 rounded-full bg-red-900"
                                    : "text-red-900 font-bold text-3xl"
                                }
                              >
                                Free
                              </span>
                            ) : (
                              data[`${item}${it}`] && (
                                <div className="w-16 h-16 bg-red-900 rounded-full"></div>
                              )
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Pattern;
