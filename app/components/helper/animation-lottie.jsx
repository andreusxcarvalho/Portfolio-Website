'use client';

import dynamic from 'next/dynamic';

// Disable SSR for this component
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const AnimationLottie = ({ animationPath, className = '' }) => {
  return (
    <Lottie
      animationData={animationPath}
      loop={true}
      className={className}
    />
  );
};

export default AnimationLottie;
