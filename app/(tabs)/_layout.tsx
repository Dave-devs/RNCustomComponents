import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="toast" />
      <Tabs.Screen name="accordion" options={{ headerShown: true, title: 'Accordion'}} />
      <Tabs.Screen name="bottom-sheet" />
      <Tabs.Screen name="scrollable-bottom-sheet" />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
