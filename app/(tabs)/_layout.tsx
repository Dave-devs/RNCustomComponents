import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="accordion" options={{ headerShown: true, title: 'Accordion' }} />
      <Tabs.Screen name="bottom-sheet" options={{ headerShown: true }} />
      <Tabs.Screen
        name="scrollable-bottom-sheet"
        options={{ headerShown: true }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
