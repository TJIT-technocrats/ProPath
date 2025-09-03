import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Companies from "@/components/companies";

const PlacementInfo: React.FC = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>Placement Drive</Text>
        <Text style={styles.subheading}>5 companies visiting</Text>
        <Companies />
      </View>
    </ScrollView>
  );
};

export default PlacementInfo;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 56,
    width: "100%",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subheading: {
    fontSize: 16,
    color: "gray",
    marginBottom: 12,
  },
});
