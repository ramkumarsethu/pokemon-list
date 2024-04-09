import { CSSProperties } from 'react';

const Loading = ({ style }: { style?: CSSProperties }) => {
  return <div className="loading" style={{ ...style }}></div>;
};

export default Loading;
