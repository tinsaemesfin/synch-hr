import React from 'react'
import { useRouter } from 'next/navigation'
import { EyeIcon } from 'lucide-react';
interface IProps {
    id: string;
}

export const CellAction:React.FC<IProps> = ({id}) => {
    const router = useRouter();
  return (
    <>
    <EyeIcon className="cursor-pointer" onClick={()=>
        router.push(`/employee/${id}`) }/>
        </>
  );
}
