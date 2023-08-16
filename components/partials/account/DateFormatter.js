import React, { useState, useEffect } from 'react';

function CalculateTimeDifference({targetDate}) {
  const currentDate = new Date();
  const targetTime = new Date(targetDate);
  const differenceMilliseconds = currentDate-targetTime;

  const days = Math.floor(differenceMilliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (differenceMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (differenceMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
//   
  return <span>{`${days===0 ? "" : `${days} kun`} ${hours===0 ? "" : `${hours} soat`}  ${minutes===0 ? "" : `${minutes} minut`} oldin`}</span>
}

export default CalculateTimeDifference