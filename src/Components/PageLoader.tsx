import {PropagateLoader } from "react-spinners";

export const PageLoader = () => {
  return (
       <div style={{ width: 400, height: 200 }} className='flex justify-center  '>
      <PropagateLoader color="#62605d"/>
    </div>
  );
};


