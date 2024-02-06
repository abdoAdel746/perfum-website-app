import axios from "axios";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }
  greet = () => {
    const message = this.createChatBotMessage(
      "Hello, how can i help you today?"
    );
    this.addMessageToState(message);
  };
  track = () => {
    const message = this.createChatBotMessage(
      "please give me the order id like this : order: id "
    );
    this.addMessageToState(message);
  };
  track_id = (ProductId) => {
    let counter = 0;

    axios
      .get(`http://localhost:8000/orders`)
      .then((response) => {
        response.data.map((e) => {
          if (ProductId == e.orderId) {
            if (e.delivered == "no") {
              this.addMessageToState(
                this.createChatBotMessage(`
                state : not yet delivered ❌
                `)
              );
            } else {
              this.addMessageToState(
                this.createChatBotMessage(`
                state : deliverd done ✅
                `)
              );
            }

            counter++;
          }
        });
      })
      .finally(() => {
        if (counter > 0) {
          counter = 0;
        } else {
          this.addMessageToState(
            this.createChatBotMessage(`ProductId: not found`)
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  statementelse = () => {
    const message = this.createChatBotMessage(
      "i didn't understand any word from your writing"
    );
    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
