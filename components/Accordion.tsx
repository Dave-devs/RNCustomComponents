import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { AccordionProps } from "@/types/AccordionTypes";
import DropdownIcon from "./DropdownIcon";
import Animated, {
  interpolate,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Accordion = ({ value }: AccordionProps) => {
  const listRef = useAnimatedRef<Animated.View>();
  const heightValue = useSharedValue<number>(0);
  const expand = useSharedValue(false);

  const handleExpand = () => {
    if (heightValue.value === 0) {
      runOnUI(() => {
        "worklet";
        heightValue.value = measure(listRef)?.height || 0;
      })();
    }
    expand.value = !expand.value;
  };

  const progress = useDerivedValue(() =>
    expand.value ? withTiming(1) : withTiming(0)
  );

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: interpolate(
      progress.value,
      [0, 1],
      [0, heightValue.value],
      "clamp" // Use "clamp" directly instead of Extrapolate.CLAMP
    ),
  }));

  return (
    <View style={styles.container}>
      <Pressable style={styles.titleContainer} onPress={handleExpand}>
        <Text style={styles.title}>{value.title}</Text>
        <DropdownIcon progress={progress} />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View ref={listRef} style={styles.contentContainer}>
          {value.content.map((item: any, index: number) => (
            <View key={index} style={styles.content}>
              <Text style={styles.text}>{item}</Text>
            </View>
          ))}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2f3e46",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#354f52",
    overflow: "hidden",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    fontFamily: "interSB",
    fontSize: 16,
    color: "white",
  },
  contentContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
  },
  content: {
    padding: 20,
    backgroundColor: '#84a98c',
  },
  text: {
    fontFamily: "interM",
    fontSize: 14,
    color: "white",
  },
});

export default Accordion;

