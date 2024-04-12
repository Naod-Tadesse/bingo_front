import { useState } from "react";
import { initialDrawPattern } from "../utils/bingodata";
function CardDisplay({ card }) {
  const [data, setData] = useState(initialDrawPattern);

  const handleClick = (ind) => {
    const updatedData = { ...data, [ind]: !data[ind] };
    setData(updatedData);
  };

  return (
    <div className="bg-red-600 rounded-lg p-1 px-6 pb-6">
      <table className="rounded-default">
        <thead>
          <tr className="text-white">
            {["B", "I", "N", "G", "O"].map((item, index) => (
              <th key={index} className="p-2 text-4xl">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((num, i) => {
            return (
              <tr key={i}>
                {["b", "i", "n", "g", "o"].map((item, ind) => {
                  const key = `${item}${num}`;
                  return (
                    <td
                      key={key}
                      onClick={() => handleClick(key)}
                      className={data[`${item}${num}`] ? "bg-red-600" : ""}
                    >
                      {item === "n" && num === 3 ? (
                        <span className="w-24 h-24 outline-none rounded-md bg-white flex justify-center items-center">
                          <span
                            className={
                              data[`${item}${num}`]
                                ? "text-white text-3xl font-bold w-14 h-14 outline-none rounded-full bg-red-900 flex justify-center items-center"
                                : "text-red-900 text-3xl font-bold w-18 h-18 outline-none rounded-md bg-white flex justify-center items-center"
                            }
                          >
                            free
                          </span>
                        </span>
                      ) : (
                        <span className="w-24 h-24 outline-none rounded-md bg-white flex justify-center items-center">
                          <span
                            className={
                              data[`${item}${num}`]
                                ? "text-white  text-3xl font-bold w-14 h-14 outline-none rounded-full bg-red-900 flex justify-center items-center"
                                : "text-red-900  text-3xl font-bold w-18 h-18 outline-none rounded-md bg-white flex justify-center items-center"
                            }
                          >
                            {card[key]}
                          </span>
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CardDisplay;
