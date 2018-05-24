const cwd = process.cwd();
const TESTS_PATH = `${cwd}/../../../tests`;
const fs = require("fs");
const html2json = require("html2json").html2json;
const files = fs.readdirSync(TESTS_PATH);
const helpers = require(`${cwd}/helpers.js`);

let schema = {
  question: {
    compare: obj => obj.tag === "div" && obj.attr.class === "question2",
    return: obj => obj.child[0].text.trim()
  },
  explanation: {
    compare: obj => obj.tag === "div" && obj.attr.class === "explanation",
    return: obj => obj.child[0].text.trim()
  },
  answers: {
    compare: obj => obj.tag === "div" && obj.attr.class === "answer",
    return: obj =>
      obj.child
        .filter(node => node.tag === "div" && node.attr.class === "text")
        .map(node => node.child)[0][1]
        .child[1].child.filter(node => node.tag === "tr")
        .map(node => node.child),
    child: {
      answer: {
        compare: obj => obj.tag === "span" && obj.attr.class === "answers",
        return: obj => obj.child[0].text.trim()
      },
      correct: {
        compare: obj =>
          obj.tag === "div" &&
          (~obj.attr.class.indexOf("icheckbox_minimal-red") ||
            ~obj.attr.class.indexOf("icheckbox_minimal")),
        return: obj =>
          ~obj.attr.class.indexOf("icheckbox_minimal-red") ? true : false
      }
    }
  }
};

files.forEach(file => {
  if (~file.indexOf(".html")) {
    const name = file.replace(".html", "");
    const filePath = `${TESTS_PATH}/${file}`;
    let sample = fs.readFileSync(filePath).toString();

    while (~sample.indexOf("\t")) {
      sample = sample.replace("\t", " ");
    }
    while (~sample.indexOf("\n")) {
      sample = sample.replace("\n", " ");
    }

    sample = helpers.questions(sample);
    const questions = helpers.question(sample);
    console.log(questions.length);
    for (let question of questions) {
      let nodes = html2json(question).child;
      nodes = nodes.filter(node => node.node === "element");

      const output = helpers.getObj(nodes, schema);
      // console.log(nodes);
      console.log("----------------------------------------------------------");
      console.log("result:", output);
    }
  }
});
