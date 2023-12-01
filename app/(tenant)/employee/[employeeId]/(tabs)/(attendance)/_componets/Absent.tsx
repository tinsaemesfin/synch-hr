import { TableCell } from '@/components/ui/table'
import React from 'react'
interface props{
    penaltyMoney:number
}

const Absent:React.FC<props> = ({penaltyMoney}) => {
  return (
    <div className=" px-4 py-2">
              <span className="text-red-800">Absent</span> <br />
              <span className="text-red-700">
                {" "}
                -
                {penaltyMoney}{" "}
                Birr
              </span>{" "}
            </div>
  )
}

export default Absent