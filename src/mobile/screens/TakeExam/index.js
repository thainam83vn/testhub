import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { RkButton, RkText, RkCard, RkTheme } from "react-native-ui-kitten";
import { UtilStyles } from "../../style/styles";

import Question from "./Question";
import Progress from "./Progress";
import storage from "../../storage";
const { action } = storage();

class TakeExam extends React.Component {
  constructor(props) {
    super(props);

    action("FETCH_TAKE_EXAM", { exam: this.props.exam });
  }

  nextQuestion() {
    action("UPDATE_STATE", {
      data: {
        take_exam: {
          questions: this.props.take_exam.questions,
          current: this.props.take_exam.current + 1
        }
      }
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={[UtilStyles.container, styles.screen]}
        >
          <Progress take_exam={this.props.take_exam} />
          <Question navigation={this.props.navigation} />;
          <RkButton onPress={() => this.nextQuestion()}>Next</RkButton>
        </ScrollView>
      </View>
    );
  }
}
TakeExam.navigationOptions = ({ navigation }) => {
  const { exam } = navigation.state.params;
  console.log("navigationOptions", exam);
  return {
    headerTitle: `Test Hub - ${exam.title}`
  };
};

let styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f0f1f5",
    padding: 12
  },
  buttonIcon: {
    marginRight: 7,
    fontSize: 19.7
  },
  footer: {
    marginHorizontal: 16
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 17
  },
  dot: {
    fontSize: 6.5,
    color: "#0000008e",
    marginLeft: 2.5,
    marginVertical: 10
  },
  floating: {
    width: 56,
    height: 56,
    position: "absolute",
    zIndex: 200,
    right: 16,
    top: 173
  },
  footerButtons: {
    flexDirection: "row"
  },
  overlay: {
    justifyContent: "flex-end",
    paddingVertical: 23,
    paddingHorizontal: 16
  }
});
// start of code change
const mapStateToProps = state => {
  return { exam: state.exam, take_exam: state.take_exam };
};

export default connect(mapStateToProps)(TakeExam);
