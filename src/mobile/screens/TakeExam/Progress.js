import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { RkButton, RkText, RkCard, RkTheme } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/FontAwesome";
import { UtilStyles } from "../../style/styles";
import { ImageIcon } from "../../components/imageIcon";
import { take } from "redux-saga/effects";

class Progress extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { take_exam } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {take_exam && (
          <RkText>
            {take_exam.current + 1}/{take_exam.questions.length}
          </RkText>
        )}
      </View>
    );
  }
}

export default Progress;
