import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
//Loading Functionality
const Loading = () => {
  return (
    <ThreeDots
      height={80}
      width={80}
      radius={9}
      color="#3376A8"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};

export default Loading;
