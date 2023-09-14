import React from 'react'
import UploadAttendanceButton from './components/uploadAttendance'


const AttendancePage = () => {
    return (
        <div className="flow-root">
        <div className="lg:flex lg:h-full lg:flex-col">
          <header className="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
            <h1 className="text-lg font-semibold text-gray-900">
              <time dateTime="2022-01">
                {new Date().toLocaleString("en-us", { month: "long" }) +
                  " 2023"}
              </time>
            </h1>
            
            <div className="flex gap-5 items-center">
             <UploadAttendanceButton />
            </div>
          </header>
    
    
    
    
        </div>
          </div>
      )
    }


export default AttendancePage