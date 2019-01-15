import http from './'

// -------------------------------------------------------------------
// 2017-11-30 v2

// --tags
export const getDrivingStat = params => http.post('driving/stat/search', params) // 驱动指标数据查询分类统计
export const getActivity = params => http.post('driving/activity/search', params) // 驱动指标数据重点关注指标查询
export const insertActivity = params => http.post('driving/activity/insert', params) // 驱动指标数据重点关注指标查询
export const sortActivity = params => http.post('driving/activity/sort', params) // 排序
export const deleteActivity = params => http.post('driving/activity/delete', params) // 驱动指标数据重点关注指标查询

