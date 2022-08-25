export const getAllDays = () => {
    const weakday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    let arr = [];
  
    const d = new Date();
  
    const day = weakday[d.getDay()];
  
    weakday.filter((ele, ind) => {
      if (day === ele) {
        for (let i = 0; i < 8; i++) arr.push(weakday[(ind + i) % 7]);
      }
  
      return 1;
    });
  
    return arr;
  };