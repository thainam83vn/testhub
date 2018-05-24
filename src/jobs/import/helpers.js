var helpers = {};
helpers.questions = content => {
  const matches = content.match(
    /<div class=\"questions\">[\s\S]*<\/div>[\s\S]*<div class=\"clear\">/g
  );
  if (matches.length > 0) {
    const questions = matches[0].replace('<div class="clear">', "");
    return questions;
  }
  return null;
};
helpers.question = content => {
  return content.split('<div class="questiondiv">');
};
helpers.getObj = (nodes, schema) => {
  const nodeOutput = {};
  for (let fieldName in schema) {
    const field = schema[fieldName];
    nodeOutput[fieldName] = helpers.findNode(nodes, field);
  }
  return nodeOutput;
};
helpers.findNode = (nodes, field) => {
  for (let node of nodes) {
    if (field.compare(node)) {
      const r = field.return(node);
      if (r && field.child) {
        const outputItems = [];
        for (let item of r) {
          const rChild = helpers.getObj(item, field.child);
          outputItems.push(rChild);
        }
        return outputItems;
      } else {
        return r;
      }
    } else if (node.child) {
      const r = helpers.findNode(node.child, field);
      if (r) {
        return r;
      }
    }
  }
  return null;
};
module.exports = helpers;
