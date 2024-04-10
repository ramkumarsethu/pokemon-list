import { CSSProperties } from 'react';

const defaultStyle: CSSProperties = {
  minHeight: 5,
  minWidth: 100,
  marginTop: 3
};
const Loading = ({ style }: { style?: CSSProperties }) => {
  return <div className="loading" style={{ ...(style || defaultStyle) }}></div>;
};

export default Loading;
