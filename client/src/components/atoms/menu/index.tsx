import React from "react";

const MenuList = () => {
  return (
    <div
      className={`md:flex hidden gap-10 items-center"text-[#191619]`}
    >
      <p
        className="cursor-pointer hover:scale-110 transition-transform duration-300"
      >
         Give Feedback
      </p>
      <p
        className="cursor-pointer hover:scale-110 transition-transform duration-300"
      >
         Read Feedback
      </p>
      <p
        className="cursor-pointer hover:scale-110 transition-transform duration-300"
      >
        Recent Posts
      </p>
      <p
        className="cursor-pointer hover:scale-110 transition-transform duration-300"
      >
        Contact Us
      </p>
    </div>
  );
};

export default MenuList;
