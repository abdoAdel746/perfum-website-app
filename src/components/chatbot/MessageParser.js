class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    // console.log(message);
    const lowercase = message.toLowerCase();

    if (lowercase.includes("hello")) {
      this.actionProvider.greet();
    } else if (lowercase.includes("track")) {
      this.actionProvider.track();
    } else if (lowercase.includes("order")) {

      const regex =
        /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g;
      const matches = lowercase.match(regex);
      let ProductId = "";
      if (matches) {
        matches.forEach((match) => {
          ProductId += match;
        });
      }


      // console.log(ProductId);

      this.actionProvider.track_id(ProductId);
    } else {
      this.actionProvider.statementelse();
    }
  }
}

export default MessageParser;
