import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { RkButton, RkText, RkCard, RkTheme } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/FontAwesome";
import { UtilStyles } from "../../style/styles";
import { ImageIcon } from "../../components/imageIcon";
import storage from "../../storage";

const { action } = storage();
class ExamsList extends React.Component {
  constructor(props) {
    super(props);
  }

  takeExam(exam) {
    action("UPDATE_STATE", {
      data: { exam: exam },
      handlers: [
        {
          action: payload => {
            this.props.navigation.navigate(payload.route, {
              exam: payload.exam
            });
          },
          payload: { route: "ExamDetail", exam: exam }
        }
      ]
    });
  }

  render() {
    let likeStyle = [styles.buttonIcon, { color: RkTheme.colors.accent }];
    let iconButton = [
      styles.buttonIcon,
      { color: RkTheme.current.colors.text.hint }
    ];
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={[UtilStyles.container, styles.screen]}
        >
          {this.props.exams &&
            this.props.exams.map(exam => (
              <RkCard key={exam._id}>
                <View rkCardHeader>
                  <View>
                    <RkText rkType="header">{exam.title}</RkText>
                    <RkText rkType="subtitle">{exam.tags.join(" ")}</RkText>
                  </View>
                </View>
                <Image rkCardImg source={{ uri: exam.background }} />
                <View rkCardContent>
                  <RkText rkType="cardText">{exam.description}</RkText>
                </View>
                <View rkCardFooter style={styles.footer}>
                  <RkButton rkType="clear link accent">
                    <Icon name="heart" style={likeStyle} />
                    <RkText rkType="accent">{exam.feedback.likes}</RkText>
                  </RkButton>
                  <RkButton rkType="clear link">
                    <Icon name="comment-o" style={iconButton} />
                    <RkText rkType="hint">
                      {exam.feedback.comments.length}
                    </RkText>
                  </RkButton>
                  <RkButton
                    rkType="clear link"
                    onPress={() => this.takeExam(exam)}
                  >
                    <Icon name="send-o" style={iconButton} />
                    <RkText rkType="hint">Try</RkText>
                  </RkButton>
                </View>
              </RkCard>
            ))}
        </ScrollView>
      </View>
    );
  }
}

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
export default ExamsList;
