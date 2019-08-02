// 过滤筛选车号
export const filterTrain = (search, value) => {
  if (search !== null || search !== "") {
    value.forEach(item => {
      if (item.trainLocono.toString().indexOf(search) !== -1) {
        item.show = true;
      } else {
        item.show = false;
      }
    });
  } else {
    value.forEach(item => {
      item.show = true;
    });
  }
  return value;
};
