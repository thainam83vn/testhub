import React from "react";
import { connect } from "react-redux";

import { View, StyleSheet, ScrollView, Image } from "react-native";
import { RkButton, RkText, RkCard, RkTheme } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/FontAwesome";
import { UtilStyles } from "../../style/styles";
import { ImageIcon } from "../../components/imageIcon";

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.take_exam) {
      const question = this.props.take_exam.questions[
        this.props.take_exam.current
      ];
      return (
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
              <RkText rkType="hint">{exam.feedback.comments.length}</RkText>
            </RkButton>
            <RkButton rkType="clear link" onPress={() => this.takeExam(exam)}>
              <Icon name="send-o" style={iconButton} />
              <RkText rkType="hint">Try</RkText>
            </RkButton>
          </View>
        </RkCard>

        // <View style={{ flex: 1 }}>
        //   <RkText>{question.question}</RkText>
        //   {question &&
        //     question.answers.map(answer => (
        //       <RkButton key={answer.answer}>{answer.answer}</RkButton>
        //     ))}
        // </View>
      );
    } else {
      return <View />;
    }
  }
}

let styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f0f1f5",
    padding: 12
  }
});
const mapStateToProps = state => {
  return { take_exam: state.take_exam };
};

export default connect(mapStateToProps)(Question);
