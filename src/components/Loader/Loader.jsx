import { ThreeCircles } from 'react-loader-spinner';

export default function Loader({ width, height, color = '#4fa94d' }) {
  return (
    <div>
      <ThreeCircles
        visible={true}
        height={width}
        width={height}
        color={color}
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
