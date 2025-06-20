import React from "react";
import exampleImage from "../../Assets/svg_images/payment_cards.svg";
import { Text } from "../../Components/Typography";
import { Button } from "../../Components/Button";

const ThirstTraps = () => {
  return (
    <section className="w-full bg-background py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <img
            src={exampleImage}
            alt="Creative commerce illustration"
            className=" rounded-xl "
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 text-left space-y-6">
          <Text
            size="lg"
            weight="medium"
            color="default"
            className="  max-w-3xl mx-auto py-6 tracking-widest text-2xl/10"
          >
            {" "}
            How about we both stick to our strengths, shall we? You focus on
            adding your favorite items to your cart from international stores
            and we handle the checkout.
          </Text>
          {/* <button className="bg-[#8fac6a] hover:bg-[#7a9a5c] text-white font-semibold px-6 py-3 rounded-md transition duration-300">
            Okay, let’s go
          </button> */}
          <Button variant="primary" className=" ">
            Okay, let’s go
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ThirstTraps;
