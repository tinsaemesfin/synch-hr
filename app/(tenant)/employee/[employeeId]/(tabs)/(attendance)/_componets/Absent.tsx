import { TableCell } from '@/components/ui/table'
import React from 'react'
interface props{
    index:number,
    penaltyMoney:number
}

const Absent:React.FC<props> = ({index,penaltyMoney}) => {
  return (
    <TableCell key={index}>
              <span className="text-red-800">Absent</span> <br />
              <span className="text-red-700">
                {" "}
                -
                {penaltyMoney}{" "}
                Birr
              </span>{" "}
            </TableCell>
  )
}

export default Absent