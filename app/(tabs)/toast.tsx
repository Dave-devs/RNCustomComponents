import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useRef, useState } from "react";
import Toasts, { ToastsRef } from "@/components/Toasts"



const toast = () => {
  const toastRef = useRef<ToastsRef>(null);

  return (
    <View style={styles.container}>
      <Toasts ref={toastRef} />
      {/* Success Toast Button */}
      <TouchableWithoutFeedback onPress={() => {
        toastRef.current?.show('success', 'Success', 2000)
      }}>
        <View style={styles.toastBtnCotainer}>
          <Text style={styles.text}>Success Toast</Text>
        </View>
      </TouchableWithoutFeedback>
      
      {/* Warning Toast Button */}
      <TouchableWithoutFeedback onPress={() => {
        toastRef.current?.show('warning', 'Warning', 2000)
      }}>
        <View style={styles.toastBtnCotainer}>
          <Text style={styles.text}>Warning Toast</Text>
        </View>
      </TouchableWithoutFeedback>

      {/* Error Toast Button */}
      <TouchableWithoutFeedback onPress={() => {
        toastRef.current?.show('error', 'Error', 2000)

      }}>
        <View style={styles.toastBtnCotainer}>
          <Text style={styles.text}>Error Toast</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default toast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  toastBtnCotainer: {
    height: 40,
    width: "80%",
    backgroundColor: "blue",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: 'bold'
  },
});
