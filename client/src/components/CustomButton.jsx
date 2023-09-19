import React from 'react'

const CustomButton = ({ btnType, title, handleClick, styles, connectedAddress }) => {
  return (
    <button
      type='{btnType}'
      className={`font-epilogue font-semibold text-[16px] min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {connectedAddress ? connectedAddress : title}
    </button>
  )
}

export default CustomButton