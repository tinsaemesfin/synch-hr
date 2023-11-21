const generateRandomNumber = () => Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;

const generatePastDates = () => {
  const currentDate = new Date();
  const pastDates = [];

  for (let i = 0; i < 50; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    pastDates.push(date.toISOString().split('T')[0]);
  }

  return pastDates.reverse();
};

const Table = () => {
  const headerDates = generatePastDates();
  const rowData = Array.from({ length: 50 }, () => generateRandomNumber());

  return (
    <div className="max-w-96 mx-auto mt-8 flex flex-wrap">
      {headerDates.map((date, index) => (
        <div key={index} className="flex-row rounded-md shadow-sm border m-2">

            <div className="flex-shrink-0 flex items-center justify-center w-full text-white text-sm font-medium rounded-tr-md rounded-tl-md bg-blue-950">
                Jan 06 2023
            </div>

          <div className=" px-4 py-2">{date}</div>
          <div className=" px-4 py-2">{date}</div>
          <div className=" px-4 py-2">{date}</div>
          <div className=" px-4 py-2">{date}</div>
          <div className=" px-4 py-2">{date}</div>
          
        </div>
      ))}
    </div>
  );
};

export default Table;