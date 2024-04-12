import { useState, useEffect, useRef } from "react";
import CardDisplay from "../components/CardDisplay";
import Form from "../components/Form";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/search/bingo ");
function Search() {
  const idInputRef = useRef();
  const [data, setData] = useState({
    id: "",
    formData: {},
    recordNotFound: false,
    mode: "",
    updateData: {},
    showModal: false,
    resType: "",
    resMessage: "",
  });

  const searchNumber = (event) => {
    event.preventDefault();

    setData({ ...data, formData: {}, id: idInputRef.current.value });
    apiClient
      .post({ ID: idInputRef.current.value })
      .then((response) => {
        if (response.data.err === true) {
          setData((prevState) => ({
            ...prevState,
            formData: {},
            recordNotFound: true,
            mode: "",
          }));
        } else {
          setData({
            ...data,
            formData: response.data.data,
            mode: "show",
          });
        }
      })
      .catch((error) => {
        // Handle errors
        setData({
          formData: {},
          recordNotFound: true,
        });
      });
  };

  const handleUpdateButton = (event) => {
    event.preventDefault();
    setData((prevState) => ({
      ...prevState,
      mode: "update",
    }));
  };

  const sendNumberToServer = (event) => {
    event.preventDefault();
    apiClient
      .put(data.formData)
      .then((response) => {
        if (response.data.error === true) {
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
            resMessage: "Successfully updated bingoboard",
            mode: "",
          }));
        }
      })
      .catch((error) => {
        setData((prevState) => ({
          ...prevState,
          showModal: true,
          resType: "Error",
          resMessage: "error happened",
        }));
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setData((prevState) => ({
        ...prevState,
        recordNotFound: false,
        showModal: false,
      }));
    }, 3000);
    return () => clearTimeout(timer);
  }, [data.recordNotFound, data.showModal]);

  return (
    <>
      <div className="bg-neutral-800 flex items-center">
        <div className="flex justify-around w-full">
          <div>
            <h2 className="bg-red-600 mt-4 text-white px-3 py-2 text-center text-lg font-bold uppercase">
              search bingo card
            </h2>
            <div className="flex justify-center items-center p-6">
              <div className="flex flex-col justify-center items-center gap-2">
                <form
                  onSubmit={searchNumber}
                  className="flex gap-3 items-center"
                >
                  <div className="flex items-center gap-3">
                    <h4 className=" text-white text-lg font-bold">
                      Search unique code:
                    </h4>
                    <input
                      name="searchID"
                      key={"id1"}
                      type="text"
                      ref={idInputRef}
                      required
                      className="border border-gray-500 bg-neutral-700 text-white w-41 px-4 py-2 rounded-full outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-red-600 text-white rounded-full py-1 px-4 hover:opacity-70"
                  >
                    Check
                  </button>
                  {Object.keys(data.formData).length !== 0 &&
                    data.mode !== "update" && (
                      <button
                        className="bg-red-600 text-white rounded-full py-1 px-4 hover:opacity-70"
                        onClick={handleUpdateButton}
                      >
                        update
                      </button>
                    )}
                </form>
                <div className="flex flex-col gap-3 justify-center mt-1 items-center ">
                  {Object.keys(data.formData).length !== 0 ? (
                    data.mode === "update" ? (
                      <div>
                        <form
                          onSubmit={sendNumberToServer}
                          className="flex flex-col items-center gap-3"
                        >
                          <Form data={data} setData={setData} />
                          {data.mode === "update" && (
                            <button
                              type="submit"
                              className="bg-red-600 text-white rounded-full py-1 px-4 hover:opacity-70"
                            >
                              Save
                            </button>
                          )}
                        </form>
                      </div>
                    ) : (
                      <CardDisplay card={data.formData} />
                    )
                  ) : (
                    data.recordNotFound && (
                      <div
                        className="p-4 mb-4 text-lg
                    text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        <span className="font-medium">Error: </span>
                        Record Not found
                      </div>
                    )
                  )}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
