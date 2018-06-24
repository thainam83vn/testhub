import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { UtilStyles } from "../../style/styles";
import Controls from "./Controls";

class TakeExam extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={[UtilStyles.container, styles.screen]}
        />
        <Controls navigation={this.props.navigation} exam={this.props.exam} />
      </View>
    );
  }
}
TakeExam.navigationOptions = ({ navigation }) => {
  const { exam } = navigation.state.params;
  return {
    headerTitle: `Test Hub - ${exam.title}`
  };
};

let styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f0f1f5",
    padding: 12
  }
});
// start of code change
const mapStateToProps = state => {
  return { exam: state.exam };
};

export default connect(mapStateToProps)(TakeExam);
