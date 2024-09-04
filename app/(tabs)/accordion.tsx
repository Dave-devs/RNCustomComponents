import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import data from "@/assets/json/data.json";
import Accordion from "@/components/Accordion";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Page = () => {
  const insets = useSafeAreaInsets()
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((value, index) => {
          return <Accordion value={value} key={index} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Page;
