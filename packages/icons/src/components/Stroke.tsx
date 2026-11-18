import { Path } from 'react-native-svg';

interface StrokeProps {
  d: string;
  color: string;
  width: number;
  fill?: string;
}

/** One rounded stroke of an icon. */
export const Stroke = ({ d, color, width, fill = 'none' }: StrokeProps) => (
  <Path d={d} stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" fill={fill} />
);
