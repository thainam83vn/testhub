import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { RkButton, RkText, RkCard, RkTheme } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/FontAwesome";
import { UtilStyles } from "../../style/styles";
import { ImageIcon } from "../../components/imageIcon";

class Controls extends React.Component {
  constructor(props) {
    super(props);
  }

  play() {
    this.props.navigation.navigate("TakeExam", { exam: this.props.exam });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <RkButton onPress={() => this.play()}>Try</RkButton>
      </View>
    );
  }
}

export default Controls;
