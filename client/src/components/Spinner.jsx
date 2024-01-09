import React from 'react'

function Spinner() {
    const zIndexStyle = {
        zIndex: 100 
      };
    const mySquareBox = {
        width: '50px',
        height: '50px', 
        // backgroundColor: 'black', 
        border: '2px dashed black', 
        borderRadius: '50%', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '2px solid transparent',
        animation: 'spin 2s linear infinite'
      }
  return (
    <>
    <div
    style={zIndexStyle}
    className='position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-success bg-opacity-25 vh-100'
    >
        <b>Loading, </b>
    <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div 
    style={mySquareBox}
      >
        {/* <span className='text-white'>Downloading....</span> */}
      </div>
      <b> please, wait </b>
    </div>
    </>
  )
}

export default Spinner
