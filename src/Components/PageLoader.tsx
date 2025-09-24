import Lottie from "lottie-react";
import pageLoader from "../Animations/Loading_dots.json";

export const PageLoader = () => {
  return (
       <div style={{ width: 400, height: 200 }} className='flex justify-center items-center h-screen'>
      <Lottie animationData={pageLoader} loop={true} />
    </div>
  );
};


