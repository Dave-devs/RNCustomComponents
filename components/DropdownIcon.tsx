import { StyleSheet, Image } from "react-native";
import React from "react";
import { DropdownIconProps } from "@/types/DropdownTypes";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

// const DropdownIcon = ({ progress }: DropdownIconProps) => {
//   const iconStyle = useAnimatedStyle(() => ({
//     transform: [{ rotate: `${progress.value * -180}deg` }],
//   }));

//   return (
//     <Animated.View style={iconStyle}>
//       <Image
//         source={require("@/assets/images/chevron-down.png")}
//         style={styles.icon}
//         tintColor={"white"}
//       />
//     </Animated.View>
//   );
// };

// export default DropdownIcon;

// const styles = StyleSheet.create({
//   icon: {
//     height: 24,
//     width: 24,
//   },
// });


const DropdownIcon = ({ progress }: DropdownIconProps) => {
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * -180}deg` }],
  }));

  return (
    <Animated.View style={iconStyle}>
      <Image
        source={require("@/assets/images/chevron-down.png")}
        style={styles.icon}
        tintColor={"white"}
      />
    </Animated.View>
  );
};

export default DropdownIcon;

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
});

