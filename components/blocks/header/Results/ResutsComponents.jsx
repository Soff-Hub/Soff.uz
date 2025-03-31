// import React from 'react';

// export default function ResutsComponents() {
//   const results = [
//     {
//       rate: '5+',
//       title: 'Yillik tajriba'
//     },
//     {
//       rate: '864+',
//       title: 'Tugatilgan ishlar'
//     },
//     {
//       rate: '2500+',
//       title: 'Faol foydalanuvchilar'
//     },
//     {
//       rate: '235+',
//       title: 'Mutaxassislar soni'
//     }
//   ];

//   return (
//     <div className='results-container'>
//       <div className="container">
//         <h2 className='product-list-title text-center mt-5'>Shu kunga qadar!
//       </h2></div>
//       <div className='bg-success'>
//       <div className='resultBox '>
//         {results.map((item, index) => (
//           <React.Fragment key={index}>
//             <div className='resultsItems'>
//               <p className='resultsItemsRate'>{item.rate}</p>
//               <p className='resultsItemsTitle'>{item.title}</p>
//             </div>
//             {index < results.length - 1 && (
//               <img src='/static/img/line.svg' alt='divider' />
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';

export default function ResultsComponent() {
  return (
    <div className='results-container mt-4'>
      <div className="container">
        <h2 className='product-list-title mt-5'>Shu kunga qadar!</h2>
      </div>
      <div className='bg-success'>
        <div className='resultBox'>
          
          <div className='resultsItems'>
            <p className='resultsItemsRate'>200 000+</p>
            <p className='resultsItemsTitle'>Raqamli mahsulotlar</p>
          </div>
          
          <div className='divider middle-divider'></div>
          
          <div className='resultsItems'>
            <p className='resultsItemsRate'>500 000+</p>
            <p className='resultsItemsTitle'>Oylik faol foydalanuvchilar</p>
          </div>
          
          <div className='divider'></div>

          <div className='resultsItems'>
            <p className='resultsItemsRate'>50 000</p>
            <p className='resultsItemsTitle'>Sotilgan mahuslotlar</p>
          </div>
          
          <div className='divider'></div>
          
          <div className='resultsItems'>
            <p className='resultsItemsRate'>8 200+</p>
            <p className='resultsItemsTitle'>Mutaxassislar soni</p>
          </div>
        </div>
      </div>
    </div>
  );
}