import React from "react";
import { SearchBar } from "react-native-elements";
// import SearchBar from "react-native-searchbar";
import { View, StyleSheet, ScrollView, Image, TextInput } from "react-native";
import {
  RkButton,
  RkText,
  RkTextInput,
  RkCard,
  RkTheme
} from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/FontAwesome";

import storage from "../../storage";
const { action } = storage();
function search(ev) {
  action("FETCH_EXAMS", { filter: `title~${ev}` });
}
export default () => {
  return (
    <View style={{ flex: 1 }}>
      <Icon style={[styles.inputIcon, styles.searchIcon]} name="search" />
      {/* <SearchBar
        showLoading
        cancelIcon={{ type: "font-awesome", name: "chevron-left" }}
        placeholder="Search"
        onChangeText={ev => search(ev)}
      /> */}
      {/* <SearchBar
        ref={ref => (this.searchBar = ref)}
        data={items}
        handleResults={this._handleResults}
        showOnLoad
      /> */}
    </View>
  );
};

let styles = StyleSheet.create({
  inputIcon: {
    fontSize: 15,
    color: "#0000003a",
    marginLeft: 4
  },
  searchIcon: {
    marginLeft: 16
  }
});
