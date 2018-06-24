import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import ExamList from "./ExamList";
import Title from "./Title";
import {
  RkButton,
  RkText,
  RkTextInput,
  RkCard,
  RkTheme
} from "react-native-ui-kitten";

class Exams extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ExamList exams={this.props.exams} navigation={this.props.navigation} />
    );
  }
}

Exams.navigationOptions = ({ title, subtitle }) => {
  return {
    headerTitle: <Title style={{ flex: 1 }} />
  };
};

// start of code change
const mapStateToProps = state => {
  return { exams: state.exams };
};

export default connect(mapStateToProps)(Exams);
