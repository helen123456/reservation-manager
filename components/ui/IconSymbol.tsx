// Fallback for using MaterialIcons on Android and web.

import { 
  Ionicons, 
  MaterialIcons, 
  FontAwesome, 
  FontAwesome5, 
  AntDesign, 
  Entypo, 
  EvilIcons, 
  Feather, 
  Foundation, 
  MaterialCommunityIcons, 
  Octicons, 
  SimpleLineIcons, 
  Zocial 
} from '@expo/vector-icons';
import { SymbolWeight } from 'expo-symbols';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';
import { ComponentProps } from 'react';

// 定义支持的图标库类型
type IconLibrary = 
  | 'Ionicons'
  | 'MaterialIcons'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'Foundation'
  | 'MaterialCommunityIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';

// 定义各个图标库的名称类型
type IconNames = {
  Ionicons: ComponentProps<typeof Ionicons>['name'];
  MaterialIcons: ComponentProps<typeof MaterialIcons>['name'];
  FontAwesome: ComponentProps<typeof FontAwesome>['name'];
  FontAwesome5: ComponentProps<typeof FontAwesome5>['name'];
  AntDesign: ComponentProps<typeof AntDesign>['name'];
  Entypo: ComponentProps<typeof Entypo>['name'];
  EvilIcons: ComponentProps<typeof EvilIcons>['name'];
  Feather: ComponentProps<typeof Feather>['name'];
  Foundation: ComponentProps<typeof Foundation>['name'];
  MaterialCommunityIcons: ComponentProps<typeof MaterialCommunityIcons>['name'];
  Octicons: ComponentProps<typeof Octicons>['name'];
  SimpleLineIcons: ComponentProps<typeof SimpleLineIcons>['name'];
  Zocial: ComponentProps<typeof Zocial>['name'];
};

// 图标库组件映射
const IconComponents = {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  Foundation,
  MaterialCommunityIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
};

export function IconSymbol<T extends IconLibrary>({
  library = 'Ionicons' as T,
  name,
  size = 24,
  color,
  style,
}: {
  library?: T;
  name: IconNames[T];
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const IconComponent = IconComponents[library] as any;
  
  return <IconComponent color={color} size={size} name={name} style={style} />;
}
