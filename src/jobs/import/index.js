const cwd = process.cwd();
const TESTS_PATH = `${cwd}/../../../tests`;
const fs = require("fs");
const html2json = require("html2json").html2json;
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

function main(params) {
  return new Promise(async (resolve, reject) => {
    try {
      const files = fs.readdirSync(TESTS_PATH);
      const mongo = await require(`${cwd}/mongo/mongo.js`)(
        "mongodb://localhost:27017",
        "testhub"
      );

      const result = await mongo.insertOne("exams", {
        user_id: "1",
        title: "CA DMV",
        tags: ["dmv", "driver license"],
        description:
          "600 common questions frequently appear in Driver License Writing tests.",
        background:
          "https://www.virtualdriveoftexas.com/wp-content/uploads/2017/05/texas-drivers-license.jpg",
        settings: {
          total_questions: 10,
          show_answer: true
        },
        feedback: {
          likes: 0,
          comments: []
        }
      });
      const exam = result.ops[0];
      exam.questions = [];
      for (let file of files) {
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
          const rawQuestions = helpers.question(sample);
          for (let rawQuestion of rawQuestions) {
            let nodes = html2json(rawQuestion).child;
            nodes = nodes.filter(node => node.node === "element");

            const output = helpers.getObj(nodes, schema);
            if (!!output.question) {
              exam.questions.push(output);
              output.exam_id = exam._id;
              await mongo.insertOne("questions", output);

              console.log(exam.questions.length);
            }
          }
        }
      }
      console.log("----------------------------------------------------------");
      // const result = mongo.insertOne("exams", exam);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}

main().then(() => {
  console.log("done");
});
