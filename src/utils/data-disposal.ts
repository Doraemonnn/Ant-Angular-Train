import * as _ from "lodash";

// 处理 websocket 数据
export const handleWebsocketData = (wsdata, allTrainList) => {
  allTrainList.forEach(item => {
    for (const key in wsdata.value.data) {
      const trainKey = wsdata.value.data[key];
      if (item.trainLocono === trainKey.trainNo) {
        item.mile = Number(trainKey.currentdaydistance);
        item.speed = Number(trainKey.sys1_s9);
        item.voltage = Number(trainKey.sys1_s31);
        item.energy = Number(trainKey.currentdayenergy);
        item.level = 0;
        // 计算最高故障等级
        if (trainKey.faults) {
          const maxFault = _.maxBy(trainKey.faults, function(o) {
            return Number(o.faultLevel);
          });
          if (maxFault) {
            item.level = Number(maxFault["faultLevel"]);
          }
        }
        item.online = true;
      }
    }
  });

  return allTrainList;
};
