import http from './'

// 分类标签服务
// 获取分类标签列表
export const listTag = params => http.get('app/tag/list');

// 新建分类标签
export const addTag = params => http.post('app/tag/add', params);

// 分类标签信息修改
export const updateTag = params => http.put('app/tag/update', params);

// 删除分类标签
export const deleteTag = params => http.delete(`app/tag/delete/${params}`);

// 收付款人查询
export const searchReceiver = params => http.post('app/receiver/search', params);


// -------------------------- old ----------------------------
// -- postags

export const getTag2s = params => http.get('moneyflows/postags/statistics', {
  params
})

export const getMoneyflow = params => http.post('moneyflows/postags/stat', params)


export const getMoneyflowSearch = params => http.post('moneyflows/search', params)

// --Tags



export const modifyTag = params => http.post('tags/modify', params)

// export const deleteTag = params => http.post('tags/delete', params)

export const getTagsSimilar = params => http.post('tags/similar', params)

// -- yuntags
export const modifyYuntag = params => http.post('yuntags/modify', params)

export const getYuntags = params => http.get('yuntags', { params })

export const getWordsCloud = params => http.get('yuntags', { params })

// -------------------------------------------------------------------
// 2017-11-30 v2

// --tags
export const getTags = params => http.post('tags', params);
export const insertTag = params => http.post('tags/insert', params)

// --postags
export const setMoneyflowsTag = params => http.post('moneyflows/postags/modify', params)