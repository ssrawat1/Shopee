// Custom API Middleware

export const apiMiddleware = ({ dispatch }) => (next) => async (action) => {
    const BASE_URL = "https://fakestoreapi.com";
    if (action.type === "api/makeCall") {
      next(action); // Allow the action to pass through to other middlewares
      const { url, onStart, onSuccess, onError } = action.payload;

      if (onStart) {
        dispatch({ type: onStart });
      }

      try {
        const response = await fetch(`${BASE_URL}/${url}`);
        const data = await response.json();
        dispatch({ type: onSuccess, payload: data });
      } catch (error) {
        dispatch({ type: onError, payload: "Oops! Something went wrong." });
      }
    } else {
      return next(action);
    }
  };


// API Action Creators
export const fetchData = (payload) => ({type:"api/makeCall",payload})