// import Animated, { useSharedValue } from 'react-native-reanimated';

// export type DropdownIconProps = {
//     progress: Animated.SharedValue<number>;
// }

import { SharedValue, useAnimatedStyle } from "react-native-reanimated";

export type DropdownIconProps = {
    progress: SharedValue<number>;
}