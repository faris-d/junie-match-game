import React from "react";

export default function FrontSide({ src, alt="", style={}, className="frontside", ...props }) {
  return <img src={src} alt={alt} style={style} className={className} {...props}/>;
};
