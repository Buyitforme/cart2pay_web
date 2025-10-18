import { ClimbingBoxLoader } from "react-spinners";

export const PageLoader = () => {
  return (
       <div style={{ width: 400, height: 200 }} className='flex justify-center items-center h-screen'>
      <ClimbingBoxLoader color="#6f6d6bff"/>
    </div>
  );
};


