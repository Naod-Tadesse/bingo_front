import { useState, useEffect } from "react";
import Form from "../components/Form";
import { useOutletContext } from "react-router-dom";
import { initialBingoForm } from "../utils/bingodata";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/bingos");

function BingoForm() {
  const [fetchTotalCards] = useOutletContext();
  const [data, setData] = useState({
    showModal: false,
    resType: "error",
    resMessage: "",
    data: {},
    recordNotFound: false,
    formData: initialBingoForm,
    searchResult: {},
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

  const sendNumberToServer = (event) => {
    event.preventDefault();

    const formDataValues = Object.values(data.formData);
    const uniqueValues = new Set(
      formDataValues.filter((value) => value !== "")
    );

    // If the number of unique values is less than the total values (excluding Free space), it means there are duplicates
    if (uniqueValues.size < formDataValues.length - 1) {
      // Subtracting 1 for the Free space
      setData((prevData) => ({
        ...prevData,
        showModal: true,
        resType: "Error",
        resMessage:
          "Duplicate values detected. Please enter unique values for each cell.",
      }));
      return;
    }

    apiClient
      .post(data.formData)
      .then((response) => {
        if (response.data.err === true) {
          setData((prevData) => ({
            ...prevData,
            showModal: true,
            resType: "Error",
            resMessage: response.data.message,
          }));
        } else {
          setData((prevState) => ({
            ...prevState,
            showModal: true,
            resType: "Success",
            resMessage: response.data.message,
            formData: initialBingoForm,
          }));
          fetchTotalCards();
        }
      })
      .catch((error) => {
        console.log(error);
        setData((prevState) => ({
          ...prevState,
          showModal: true,
          resType: "Error",
          resMessage: "error happened",
        }));
      });
  };

  useEffect(() => {
    // Hide the modal after 3 seconds
    const timer = setTimeout(() => {
      setData((prevState) => ({
        ...prevState,
        showModal: false,
      }));
    }, 3000);

    // Clear the timer on component unmount to prevent memory leaks
    return () => clearTimeout(timer);
  }, [data.showModal]);
  return (
    <>
      <div className="bg-neutral-800 flex items-center">
        <div className="flex justify-around w-full">
          <div>
            <h2 className="bg-red-600 mt-4 text-white px-3 py-2 text-center text-lg font-bold uppercase">
              Enter Bingo Numbers
            </h2>
            <div className="flex justify-center items-center p-6">
              <form
                id="bingoForm"
                className="flex flex-col justify-center items-center gap-2"
                onSubmit={sendNumberToServer}
              >
                <div className="flex items-center gap-3">
                  <h4 className="text-white text-lg font-bold">
                    Enter unique code:
                  </h4>
                  <input
                    name="ID"
                    key={"id"}
                    type="number"
                    value={data.formData["ID"]}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-500 bg-neutral-700 text-white w-41 px-4 py-2 rounded-full outline-none"
                  />
                </div>
                <Form data={data} setData={setData} />
                <button
                  type="submit"
                  className="bg-red-600  text-white text-xl rounded-full py-2 px-4 hover:opacity-70"
                >
                  Submit
                </button>
              </form>
            </div>
            {data.showModal &&
              (data.resType === "Success" ? (
                <div
                  className="p-4 mb-4 text-lg flex justify-center text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                  role="alert"
                >
                  <span className="font-medium">
                    {data.resType}! {data.resMessage}
                  </span>
                </div>
              ) : (
                <div
                  className="p-4 mb-4 text-lg flex justify-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span className="font-medium">
                    {data.resType}! {data.resMessage}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BingoForm;
