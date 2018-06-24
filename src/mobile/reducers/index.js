export default function main(state = { exams: [] }, action) {
  switch (action.type) {
    case "UPDATE_STATE":
      const newstate = { ...state };
      if (action.payload) {
        const { data, handlers } = action.payload;
        if (data) {
          for (let key in data) {
            newstate[key] = data[key];
          }
        }
        if (handlers) {
          for (let handler of handlers) {
            handler.action(handler.payload);
          }
        }
      }
      return newstate;
  }
  return state;
}
