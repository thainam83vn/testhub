module.export = () => {
  const helpers = {};
  helpers.questions = content => {
    const matches = content.match(
      /<div class=\"questions\">[\s\S]*<\/div>[\s\S]*<div class=\"clear\">/g
    );
    if (matches.length > 0) {
      const result = matches[0].replace('<div class="clear">', "");
      return result;
    }
    return null;
  };

  return helpers;
};
