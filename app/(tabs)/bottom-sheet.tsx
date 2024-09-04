import {
  Button,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Image,
} from "react-native";
import React, { useCallback, useRef } from "react";
import BottomSheet, { BottomSheetRef } from "@/components/BottomSheet";
import { demonSlayerImage } from "@/constants/images";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomSheetScreen = () => {
  const insets = useSafeAreaInsets()
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const { height } = useWindowDimensions();
  const openHandler = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Button title="Open Bottom Sheet" onPress={() => openHandler()} />
      <BottomSheet
        activeHeight={height * 0.5} // Set the desired height here
        ref={bottomSheetRef}
        backDropColor={"black"}
        backgroundColor={"white"}
        lineBackgroundColor={'#f8f9fa'}
      >
        <View style={[styles.sheetConatiner]}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: demonSlayerImage }} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Demon Slayer</Text>
            <Text style={styles.episode}>Episodes: 25</Text>
            <Text style={styles.rating}>Rating: 9.5</Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default BottomSheetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  sheetConatiner: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "space-between",
    alignItems: "center", 
  },
  image: {
    width: '90%',
    height: 200,
    aspectRatio: 1,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {},
  episode: {},
  rating: {},
});
