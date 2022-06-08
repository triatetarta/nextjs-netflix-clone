export const getScrollbarStyle = (modal) => {
  if (modal) {
    return "overflow-hidden";
  }

  if (!modal) {
    return "overflow-y-auto";
  }
};
