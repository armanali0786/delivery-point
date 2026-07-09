import { useEffect, useReducer, useCallback } from "react";
import debounce from "lodash/debounce";

const INTERSECTION_THRESHOLD = 5;
const LOAD_DELAY_MS = 500;

const reducer = (state, action) => {
  switch (action.type) {
    case "set": {
      return {
        ...state,
        ...action.payload
      };
    }
    case "appendData": {
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload.data],
        currentPage: state.currentPage + 1
      };
    }
    default:
      return state;
  }
};

const useLazyLoad = ({ triggerRef, onGrabData, options }) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    currentPage: 1,
    data: []
  });

  const handleIntersection = useCallback(
    debounce(async (entries) => {
      const entry = entries[0];
      if (!state.loading && entry.isIntersecting) {
        dispatch({ type: "set", payload: { loading: true } });
        const newData = await onGrabData(state.currentPage);
        dispatch({ type: "appendData", payload: { data: newData } });
      }
    }, LOAD_DELAY_MS),
    [state.currentPage, state.loading, onGrabData]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, options);

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current);
      }
    };
  }, [triggerRef, handleIntersection, options]);

  return state;
};

export default useLazyLoad;
