import React, { Component } from "react";
// import { Home, Exams, TakeExam } from "./screens";
import Home from "./screens/Home";
import Exams from "./screens/Exams";
import ExamDetail from "./screens/ExamDetail";
import TakeExam from "./screens/TakeExam";
import { Provider } from "react-redux";
import { StackNavigator } from "react-navigation";
import { StatusBar, View, Platform } from "react-native";
import storage from "./storage";

const { action, store } = storage();
action("FETCH_EXAMS", {});

const ExplorerApp = StackNavigator(
  {
    // Home: { screen: Home },
    Exams: { screen: Exams },
    ExamDetail: { screen: ExamDetail },
    TakeExam: { screen: TakeExam }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "white",
        marginTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
      }
    }
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ExplorerApp />
      </Provider>
    );
  }
}

// ...
