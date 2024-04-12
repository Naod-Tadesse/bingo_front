import { useState } from "react";

function Form({ data, setData }) {
  const [validation, setValidation] = useState({
    b: { min: 1, max: 15 },
    i: { min: 16, max: 30 },
    n: { min: 31, max: 45 },
    g: { min: 46, max: 60 },
    o: { min: 61, max: 75 },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      formData: {
        ...prevData.formData,
        [name]: value,
      },
    }));
  };
  return (
    <div className="bg-red-600 mt-1 rounded-lg p-1 px-6 pb-6">
      <table className="rounded-default">
        <thead>
          <tr className="text-white">
            {["B", "I", "N", "G", "O"].map((item, index) => (
              <th key={index} className="p-2 text-3xl">
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
                  return (
                    <td key={`${item}${num}`}>
                      {item === "n" && num === 3 ? (
                        <span className="text-red-900 text-2xl font-bold w-20 h-20 outline-none rounded-md bg-white flex justify-center items-center">
                          {data.formData[`${item}${num}`]}
                        </span>
                      ) : (
                        <input
                          type="number"
                          name={`${item}${num}`}
                          min={validation[`${item}`].min}
                          max={validation[`${item}`].max}
                          value={data.formData[`${item}${num}`]}
                          onChange={handleInputChange}
                          required
                          className="help-input w-20 h-20 outline-none focus:bg-gray-200 rounded-md text-2xl text-center"
                        />
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

export default Form;
