import Lottie from "lottie-react";
import pageLoader from "../Animations/Loading_dots.json";

export const PageLoader = () => {
  return (
    // <div className="fixed inset-0 z-50 bg-gray-100">
    //   <div className="w-full h-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
    // </div>
       <div style={{ width: 400, height: 200 }} className='flex justify-center items-center h-screen'>
      <Lottie animationData={pageLoader} loop={true} />
    </div>
  );
};


