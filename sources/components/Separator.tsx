import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SeparatorProps {
  height?: number;
  width?: number;
  style?: ViewStyle;
}

const Separator: React.FC<SeparatorProps> = ({ height = 0, width = 0, style = {} }) => (
  <View style={{ height, width, ...style }} />
);

export default Separator;
