import http from './';

// ------------------------ araper ------------------------
// 获取应收应付款人列表
export const listAraper = params => http.get('app/araper/list', params);
// 删除应收应付款人
export const deleteAraper = params => http.delete(`app/araper/delete/${params}`);
// 新建应收应付款人
export const addAraper = params => http.post('app/araper/add', params);
// 应收应付款人信息修改
export const updateAraper = params => http.put('app/araper/update', params);

// ----------------------- arap --------------------------------
// 新建应收应付流水
export const addArap = params => http.post('app/arap/add', params);
// 删除应收应付流水
export const deleteArap = params => http.delete(`app/arap/delete/${params}`);
// 按条件查询应收应付流水
export const listArap = params => http.post('app/arap/search', params);
// 应收应付流水信息修改
export const updateArap = params => http.put('app/arap/update', params);

// ------------------------ 2018.7 Old ---------------------

export const searchArap = params => http.post('/arap/search', params)

export const modifyArap = params => http.post('/arap/modify', params)

export const insertArap = params => http.post('/arap/insert', params)

// export const deleteArap = params => http.post('/arap/delete', params)
