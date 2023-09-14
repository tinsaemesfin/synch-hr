import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import ClipLoader from 'react-spinners/ClipLoader'

const LoadingModel = () => {
  return (
    <Dialog open >
<DialogContent>
    <DialogHeader>
      <DialogTitle></DialogTitle>
      <DialogDescription className="items-center justify-center">
      <ClipLoader
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="flex justify-center items-center"
      />
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
    </Dialog>
  )
}

export default LoadingModel