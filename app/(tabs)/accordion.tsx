import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import data from "@/assets/json/data.json";
import Accordion from "@/components/Accordion";

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
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
