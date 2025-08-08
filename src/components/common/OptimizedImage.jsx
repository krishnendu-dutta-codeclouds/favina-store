import React, { useState } from 'react';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  srcSet,
  sizes,
  style,
  className,
  fallback = '/fallback.png', // fallback image path in public/
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      srcSet={srcSet}
      sizes={sizes}
      style={style}
      className={className}
      onError={() => setImgSrc(fallback)}
      {...props}
    />
  );
};

export default OptimizedImage;
