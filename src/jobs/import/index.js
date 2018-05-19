const TESTS_PATH = "./../../../tests";
const fs = require("fs");
const html2json = require("html2json").html2json;

const files = fs.readdirSync(TESTS_PATH);
var helpers = {
  questions: content => {
    const matches = content.match(
      /<div class=\"questions\">[\s\S]*<\/div>[\s\S]*<div class=\"clear\">/g
    );
    if (matches.length > 0) {
      const questions = matches[0].replace('<div class="clear">', "");
      return questions;
    }
    return null;
  },
  question: content => {
    return content.split('<div class="questiondiv">');
    // const matches = content.match(/<div class=\"questiondiv\">[\s\S]*<\/div>/g);
    // return matches;
  },
  detail: content => {
    const matches = content.match(/<div class=\"question2\">[\s\S]*<\/div>/g);
    return matches;
  }
};

files.forEach(file => {
  if (~file.indexOf(".html")) {
    const name = file.replace(".html", "");
    const filePath = `${TESTS_PATH}/${file}`;
    const content = fs.readFileSync(filePath).toString();
    const s = helpers.questions(content);
    const questions = helpers.question(s);
    questions.forEach(q => {
      console.log(helpers.detail(q));
    });
    // console.log(questions.length);
    return;
    // const matches = content.match(
    //   /<div class=\"questions\">[\s\S]*<\/div>[\s\S]*<div class=\"clear\">/g
    // );
    // if (matches.length > 0) {
    //   const questions = matches[0].replace('<div class="clear">', "");
    //   const json = html2json(questions);
    //   console.log(json);
    // }
    return;
  }
});
