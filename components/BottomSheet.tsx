import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSpring,
  interpolate,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";

type BottomSheetProps = {
  activeHeight: number;
  backDropColor: string;
  backgroundColor: string;
  lineBackgroundColor: string;
  children: React.ReactNode;
};

export type BottomSheetRef = {
  expand: () => void;
  close: () => void;
};

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ activeHeight, backDropColor, backgroundColor, lineBackgroundColor, children }, ref) => {
    const height = useWindowDimensions().height;
    const newActiveHeight = height - activeHeight;
    const topAnimation = useSharedValue(height);

    const animatedStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });

    const backDropAnimation = useAnimatedStyle(() => {
      const opacity = interpolate(
        topAnimation.value,
        [height, newActiveHeight],
        [0, 0.5],
        "clamp"
      );

      const display = opacity === 0 ? "none" : "flex";
      return {
        opacity,
        display,
      };
    });

    const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startY: number }>({
      onStart: (_, ctx) => {
        ctx.startY = topAnimation.value;
      },
      onActive: (event, ctx) => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(ctx.startY + event.translationY, {
            damping: 100,
            stiffness: 400,
          });
        }
      },
      onEnd: () => {
        if (topAnimation.value > newActiveHeight) {
          topAnimation.value = withSpring(height, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      },
    });

    const expand = useCallback(() => {
      "worklet";
      topAnimation.value = withSpring(newActiveHeight, {
        damping: 100,
        stiffness: 400,
      });
    }, []);

    const close = useCallback(() => {
      "worklet";
      topAnimation.value = withSpring(height, {
        damping: 100,
        stiffness: 400,
      });
    }, []);

    useImperativeHandle(ref, () => ({ expand, close }), [expand, close]);

    return (
      <>
        {/* Backdrop */}
        <TouchableNativeFeedback
          onPress={() => {
            close();
          }}
        >
          <Animated.View
            style={[
              styles.backDrop,
              backDropAnimation,
              { backgroundColor: backDropColor },
            ]}
          />
        </TouchableNativeFeedback>
        {/* BottomSheet */}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              styles.container,
              animatedStyle,
              { height: activeHeight, backgroundColor: backgroundColor },
            ]}
          >
            {/* Black Line */}
            <View style={[styles.lineContainer, { backgroundColor: lineBackgroundColor }]}>
              <View style={styles.line} />
            </View>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </>
    );
  }
);

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  lineContainer: {
    height: 40,
    width: "100%",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  line: {
    width: 50,
    height: 5,
    backgroundColor: "#000",
    borderRadius: 20,
  },
  backDrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
