import { TableCell } from '@/components/ui/table'
import React from 'react'
interface props{
    index:number
}

const NotWorkingDay:React.FC<props> = ({index}) => {
  return (
    <TableCell key={index} className="text-red-800">
              -------
            </TableCell>
  )
}

export default NotWorkingDay