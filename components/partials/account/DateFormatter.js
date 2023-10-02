import React from 'react';

function CalculateTimeDifference({targetDate}) {
  const sanangiz = new Date(targetDate);
  
  const yil = sanangiz.getFullYear();
  const oy = (sanangiz.getMonth() + 1).toString().padStart(2, '0');
  const kun = sanangiz.getDate().toString().padStart(2, '0');
  const soat = sanangiz.getHours().toString().padStart(2, '0');
  const minut = sanangiz.getMinutes().toString().padStart(2, '0');
  const getMonthOy = oy==="01" ? "yanvar" : oy==="02" ? "fevral" : oy==="03" ? "mart" : oy==="04" ? "aprel" : oy==="05" ? "may" : oy==="06" ? "iyun" : oy==="07" ? "iyul" : oy==="08" ? "avgust" : oy==="09" ? "sentabr" : oy==="10" ? "oktyabr" : oy==="11" ? "noyabr" : oy==="12" ? "dekabr" : ""
  
  const yangiSanaFormati = `${yil} yil ${kun} ${getMonthOy}  ${soat}:${minut} `;
  
  return <span>{yangiSanaFormati}</span>
}

export default CalculateTimeDifference