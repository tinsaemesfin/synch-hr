import UploadBulk from "./UploadBulk"
import { DADe } from "./components/DataViewForUpload"

const UploadBulkHome = async () => {
  const to= await DADe('https://res.cloudinary.com/dyygximg9/raw/upload/v1692249483/sqts6godvmb52chymk2l.xlsx') 
  return <>
  
  {JSON.stringify(to)}
  <UploadBulk />
  </> 
}

export default UploadBulkHome