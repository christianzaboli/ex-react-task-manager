export default function taskReducer(state, action) {
  switch (action.type) {
    case "LOAD_TASK":
      return [...action.payload];
    case "ADD_TASK":
      return [...state, action.payload];
    case "UPDATE_TASK":
      return state.map((t) =>
        t.id === action.payload.id ? action.payload : t,
      );
    case "REMOVE_TASK":
      return state.filter((t) => t.id !== action.payload);
    case "REMOVE_MULTIPLE_TASK":
      return state.filter((t) => !action.payload.includes(t.id));
    default:
      return state;
  }
}
