import React from 'react';


const PartialDescription = ({product}) => {
    // console.log(product);
    return (
        <div className="ps-document">
        <p>
          {
              product && product.description
          }
        </p>
          {/* <img
              className="mb-30"
              src={product.file}
              alt={product.name}
          /> */}
      </div>
    )
}

export default PartialDescription;
