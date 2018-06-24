import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { StyleSheet, ListView, View, TouchableOpacity } from "react-native";

import { RkText, RkTheme, RkStyleSheet } from "react-native-ui-kitten";

import { UtilStyles } from "../../style/styles";
// import { ImageIcon } from "../components/imageIcon";
import Icon from "react-native-vector-icons/FontAwesome";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      {
        title: "Pickers",
        route: "Picker"
      },
      {
        title: "Exams",
        route: "Exams"
      },
      {
        title: "Take Exam",
        route: "TakeExam"
      },
      {
        title: "Inputs",
        route: "Input"
      },
      {
        title: "Cards",
        route: "Card"
      },
      {
        title: "Image Viewer",
        route: "Image"
      },
      {
        title: "Tab View",
        route: "Tab"
      },
      {
        title: "Custom Control View",
        route: "Avatar"
      }
    ];
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows(this.data),
      theme: _.cloneDeep(RkTheme.current)
    };
  }

  renderComponent(componentDefinition) {
    return (
      <TouchableOpacity
        onPress={() => this.selectComponent(componentDefinition)}
      >
        <View style={styles.componentRow}>
          <RkText rkType="bold">{componentDefinition.title}</RkText>
        </View>
      </TouchableOpacity>
    );
  }

  selectComponent(componentDefinition) {
    const { navigate } = this.props.navigation;
    navigate(componentDefinition.route);
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    var style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
      style = [style, styles.rowSeparatorHide];
    }
    return <View key={"SEP_" + sectionID + "_" + rowID} style={style} />;
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(...params) => this.renderComponent(...params)}
        renderSeparator={this.renderSeparator}
        automaticallyAdjustContentInsets={true}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
  componentRow: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rowSeparator: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: 1
  },
  rowSeparatorHide: {
    opacity: 0.0
  }
}));

// start of code change
const mapStateToProps = state => {
  return { exams: state.exams };
};

export default connect(mapStateToProps)(Home);
