import React from 'react';

export default function ResutsComponents() {
  const results = [
    {
      rate: '5+',
      title: 'Yillik tajriba'
    },
    {
      rate: '864+',
      title: 'Tugatilgan ishlar'
    },
    {
      rate: '2500+',
      title: 'Faol foydalanuvchilar'
    },
    {
      rate: '235+',
      title: 'Mutaxassislar soni'
    }
  ];

  return (
    <div className='results-container'>
      <h2 className='product-list-title text-center'>Shu kunga qadar!</h2>
      <div className='resultBox bg-success'>
        {results.map((item, index) => (
          <React.Fragment key={index}>
            <div className='resultsItems'>
              <p className='resultsItemsRate'>{item.rate}</p>
              <p className='resultsItemsTitle'>{item.title}</p>
            </div>
            {index < results.length - 1 && (
              <img src='/static/img/line.svg' alt='divider' />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}