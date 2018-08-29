import React from 'react';

const BlockHeight = ({blockNumber}) => {
  return(
    <div>
      <h4> {blockNumber.toLocaleString()} </h4>
    </div>
  );
};

export default BlockHeight;
