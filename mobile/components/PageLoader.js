import React from "react";
import { View, ActivityIndicator } from "react-native";
import { COLORS } from "../constants/colors";
import { styles } from "../assets/styles/home.styles";

const PageLoader = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color={COLORS.primary} />
    </View>
  );
};

export default PageLoader;