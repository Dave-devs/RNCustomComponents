// import { StyleSheet, Text, View, Image, Platform } from "react-native";
// import React, {
//   forwardRef,
//   useCallback,
//   useImperativeHandle,
//   useState,
// } from "react";
// import { errorImage, successImage, warningImage } from "@/constants/images";
// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   withSpring,
//   withDelay,
//   runOnJS,
//   withSequence,
// } from "react-native-reanimated";
// import { GestureDetector, Gesture } from "react-native-gesture-handler";

// type ToastsProps = {};
// export type ToastsRef = {
//   show: (type: string, text: string, duration: number) => void;
// };

// const Toasts = forwardRef<ToastsRef, ToastsProps>((_, ref) => {
//   const toastTopAnimation = useSharedValue(-100);
//   const [showing, setShowing] = useState<boolean>(false);
//   const [toastType, setToastType] = useState<string>("success");
//   const [toastText, setToastText] = useState<string>("Toast Text");
//   const [toastDuration, setToastDuration] = useState<number>(0);

//   const TOP_VALUE = Platform.OS === "ios" ? 60 : 20;

//   const show = useCallback(
//     (type: string, text: string, duration: number) => {
//       setShowing(true);
//       setToastType(type);
//       setToastText(text);
//       setToastDuration(duration);
//       toastTopAnimation.value = withSequence(
//         withTiming(TOP_VALUE),
//         withDelay(
//           toastDuration,
//           toastTopAnimation.value = withTiming(
//             -100,
//             undefined,
//             (isFinished) => {
//               if(isFinished) {
//                 runOnJS(setShowing)(false);
//               }
//             }
//           )
//         )
//       );
//     },
//     [TOP_VALUE, toastTopAnimation]
//   );

//   useImperativeHandle(ref, () => ({ show }), [show]);

//   const animatedTopStyle = useAnimatedStyle(() => {
//     return {
//       top: toastTopAnimation.value,
//     };
//   });

//   const panGesture = Gesture.Pan();
//   onStart: ({ nativeEvent }: any, ctx: { startY: number }) => {
//     ctx.startY = toastTopAnimation.value;
//   };
//   onActive: (event: { translationY: number }, ctx: { startY: any }) => {
//     if (event.translationY < 100) {
//       toastTopAnimation.value = withSpring(ctx.startY + event.translationY, {
//         damping: 600,
//         stiffness: 100,
//       });
//     }
//   };

//       onEnd: (event: { translationY: number; }) => {
//         if (event.translationY < 0) {
//           toastTopAnimation.value = withTiming(-100, undefined, (isFinished) => {
//             if (isFinished) {
//               runOnJS(setShowing)(false);
//             }
//           });
//         } else if (event.translationY > 0) {
//           toastTopAnimation.value = withSequence(
//             withTiming(TOP_VALUE),
//             withDelay(
//               toastDuration,
//               toastTopAnimation.value = withTiming(-100, undefined, (isFinished) => {
//                 if (isFinished) {
//                   runOnJS(setShowing)(false);
//                 }
//               })
//             )
//           )
//         }
//       }
//     });

//   return (
//     <>
//       {showing && (
//         <GestureDetector gesture={panGesture}>
//           <Animated.View
//             style={[
//               styles.toastContainer,
//               toastType === "success"
//                 ? styles.successContainer
//                 : toastType === "warning"
//                 ? styles.warningContainer
//                 : styles.errorContainer,
//               animatedTopStyle,
//             ]}
//           >
//             <Image
//               source={{
//                 uri:
//                   toastType === "success"
//                     ? successImage
//                     : toastType === "warning"
//                     ? warningImage
//                     : errorImage,
//               }}
//               style={styles.image}
//               tintColor={
//                 toastType === "success"
//                   ? "#def1d7"
//                   : toastType === "warning"
//                   ? "#fef7ec"
//                   : "#fae1db"
//               }
//             />
//             <Text
//               style={[
//                 toastType === "success"
//                   ? styles.successText
//                   : toastType === "warning"
//                   ? styles.warningText
//                   : styles.errorText,
//               ]}
//             >
//               {toastText}
//             </Text>
//           </Animated.View>
//         </GestureDetector>
//       )}
//     </>
//   );
// });

// export default Toasts;

// const styles = StyleSheet.create({
//   toastContainer: {
//     position: "absolute",
//     top: 0,
//     width: "90%",
//     padding: 10,
//     borderRadius: 18,
//     borderWidth: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "center",
//     gap: 10,
//   },
//   toastText: {
//     fontSize: 16,
//     fontFamily: "InterRegular",
//   },
//   successContainer: {
//     backgroundColor: "#def1d7",
//     borderColor: "#1f8722",
//   },
//   successText: {
//     color: "#1f8722",
//   },
//   warningContainer: {
//     backgroundColor: "#fef7ec",
//     borderColor: "#f08135",
//   },
//   warningText: {
//     color: "#f08135",
//   },
//   errorContainer: {
//     backgroundColor: "#fae1db",
//     borderColor: "#d9100a",
//   },
//   errorText: {
//     color: "#d9100a",
//   },
//   image: {
//     width: 25,
//     height: 25,
//     resizeMode: "contain",
//   },
// });


import { StyleSheet, Text, View, Image, Platform } from "react-native";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { errorImage, successImage, warningImage } from "@/constants/images";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSpring,
  withDelay,
  runOnJS,
  withSequence,
} from "react-native-reanimated";
import { GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import toast from '../app/(tabs)/toast';

type ToastsProps = {};
export type ToastsRef = {
  show: (type: string, text: string, duration: number) => void;
};

const Toasts = forwardRef<ToastsRef, ToastsProps>((_, ref) => {
  const {top} = useSafeAreaInsets()
  const toastTopAnimation = useSharedValue(-100);
  const [showing, setShowing] = useState<boolean>(false);
  const [toastType, setToastType] = useState<string>("success");
  const [toastText, setToastText] = useState<string>("Toast Text");
  const [toastDuration, setToastDuration] = useState<number>(0);

  const TOP_VALUE = Platform.OS === "ios" ? 70 : 45;

  const show = useCallback(
    (type: string, text: string, duration: number) => {
      setShowing(true);
      setToastType(type);
      setToastText(text);
      setToastDuration(duration);
      toastTopAnimation.value = withSequence(
        withTiming(TOP_VALUE),
        withDelay(
          toastDuration,
          withTiming(-100, undefined, (isFinished) => {
            if (isFinished) {
              runOnJS(setShowing)(false);
            }
          })
        )
      );
    },
    [TOP_VALUE, toastTopAnimation]
  );

  useImperativeHandle(ref, () => ({ show }), [show]);

  const animatedTopStyle = useAnimatedStyle(() => {
    return {
      top: toastTopAnimation.value,
    };
  });

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      if (event.translationY < 100) {
        toastTopAnimation.value = withSpring(event.translationY, {
          damping: 600,
          stiffness: 100,
        });
      }
    })
    .onEnd((event) => {
      if (event.translationY < 0) {
        toastTopAnimation.value = withTiming(-100, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(setShowing)(false);
          }
        });
      } else if (event.translationY > 0) {
        toastTopAnimation.value = withSequence(
          withTiming(TOP_VALUE),
          withDelay(
            toastDuration,
            withTiming(-100, undefined, (isFinished) => {
              if (isFinished) {
                runOnJS(setShowing)(false);
              }
            })
          )
        );
      }
    });

  return (
    <>
      {showing && (
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              styles.toastContainer,
              toastType === "success"
                ? styles.successContainer
                : toastType === "warning"
                  ? styles.warningContainer
                  : styles.errorContainer,
              animatedTopStyle,
            ]}
          >
            <Image
              source={{
                uri:
                  toastType === "success"
                    ? successImage
                    : toastType === "warning"
                      ? warningImage
                      : errorImage,
              }}
              style={styles.image}
              tintColor={
                toastType === "success"
                  ? "#2c6e49"
                  : toastType === "warning"
                    ? "orange"
                    : "red"
              }
            />
            <Text
              style={[
                styles.toastText,
                toastType === "success"
                  ? styles.successText
                  : toastType === "warning"
                    ? styles.warningText
                    : styles.errorText,
              ]}
            >
              {toastText}
            </Text>
          </Animated.View>
        </GestureDetector>
      )}
    </>
  );
});

export default Toasts;

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 0,
    width: "90%",
    padding: 10,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 10,
  },
  toastText: {
    fontSize: 16,
  },
  successContainer: {
    backgroundColor: "#edf8f2",
    borderColor: "#2c6e49",
  },
  successText: {
    color: "#2c6e49",
  },
  warningContainer: {
    backgroundColor: "#fff2e6",
    borderColor: "#ff7b00",
  },
  warningText: {
    color: "#ff7b00",
  },
  errorContainer: {
    backgroundColor: "#fde8e9",
    borderColor: "#c1121f",
  },
  errorText: {
    color: "#c1121f",
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});