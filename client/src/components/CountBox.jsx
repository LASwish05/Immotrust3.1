import React from 'react'

const CountBox = ({ title, value }) => {
  return (
    <div className='flex flex-col items-center w-[200px]'>
        <h4 className='font-epilogue font-bold text-[30px] p-3 text-[#FFFF00] bg-[#0025E8] rounded-t-[10px] w-full text-center truncate'>{value}</h4>
        <p className='font-epilogue font-normal text-[16px] text-[#FFFF00] bg-[#0025E8] px-3 py-2 w-full rounded-b-[10px] text-center'>{title}</p>
    </div>
  )
}

export default CountBox