import React, { useState } from 'react';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  srcSet,
  sizes,
  style,
  fetchPriority,
  loading,
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
      fetchPriority={fetchPriority || 'auto'}
      loading={loading || 'lazy'}
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
