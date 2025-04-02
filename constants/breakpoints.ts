const breakpoints = {
    mobile: "576px",
    tablet: "768px",
    laptop: "992px",
    laptopWide: "1025px",
    desktop: "1290px",
  };
  
  const device = {
    mobile: `(max-width: ${breakpoints.mobile})`,
    tablet: `(max-width: ${breakpoints.tablet})`,
    laptop: `(max-width: ${breakpoints.laptop})`,
    laptopWide: `(max-width: ${breakpoints.laptopWide})`,
    desktop: `(max-width: ${breakpoints.desktop})`,
  };
  
  export default device;
  