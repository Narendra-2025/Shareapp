import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin'; // Capitalized correctly

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointObj}>
      {pins?.map((item) => (
        <Pin key={item._id} pin={item} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
