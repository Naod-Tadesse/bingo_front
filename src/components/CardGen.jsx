function CardGen({ card }) {
  return (
    <>
      <div className="flex flex-col items-center pt-2 gap-2">
        <div className="bg-zinc-900 p-4 rounded-lg">
          <table>
            <thead>
              <tr className="text-white">
                <th colSpan="5" className="text-center text-xl">
                  ID: {card.ID}
                </th>
              </tr>
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
                                className={"text-red-900 font-bold text-3xl"}
                              >
                                Free
                              </span>
                            ) : (
                              <span
                                className={"text-red-900 font-bold text-3xl"}
                              >
                                {card[`${item}${it}`]}
                              </span>
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

export default CardGen;
