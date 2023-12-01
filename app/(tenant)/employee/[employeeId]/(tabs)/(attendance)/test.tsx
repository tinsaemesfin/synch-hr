
const Ad = ({date,index,children}:{date:Date|'total',index:number,children:React.ReactNode}) => {
  
  return (
    // <div className="max-w-96 mx-auto mt-8 flex flex-wrap">
      
        <div key={index} className="flex-row rounded-md shadow-sm border m-2">

            <div className="flex-shrink-0 flex items-center justify-center w-full text-white text-sm font-medium rounded-tr-md rounded-tl-md bg-blue-950">
                {date==='total'? 'Total':date.toDateString()}
            </div>

          {children}
        </div>
      // ))}
    // </div>
  );
};

export default Ad;