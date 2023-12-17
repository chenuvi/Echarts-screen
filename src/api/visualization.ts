import request from "@/utils/request";

export const getVisualization = (params = {}) => {
  return request({
    url: "/visualization",
    method: "get",
    params,
  });
};
