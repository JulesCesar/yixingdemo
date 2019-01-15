import http from './'

/*
 *  ----------------------------新接服务-----服务替换------------------------------------
 *  ----------------------------2018-6-26------------------------------------
 */
// --------------account------------
// 新增账户列表
export const addAccount = params => http.post('/app/account/add', params)
// 删除帐户信息
export const deleteAccount = params => http.delete(`app/account/delete/${params}`)
// 更新帐户信息
export const updateAccount = params => http.put('app/account/update', params)
// 获取账户列表
export const listAccount = params => http.get('/app/account/list', params)
// 获取账户类型列表
export const listAtype = params => http.get('app/atype/list', params);

// ------------ receiver----------
// 获取收付款人列表
export const listReceiver = params => http.get('/app/receiver/list', params)
// 收付款人信息修改
export const updateReceiver = params => http.put('app/receiver/update', params);
// 删除收付款人
export const deleteReceiver = params => http.delete(`app/receiver/delete/${params}`);
// 新建收付款人
export const addReceiver = params => http.post('app/receiver/add', params);
// 获取收付款人or应收应付类型列表
export const listRAtype = params => http.get('app/ratype/list', params);

// ------------ ftype----------
// 获取财务分类列表
export const listFtype = params => http.get('app/ftype/list', params)
// 新建财务分类
export const addFtype = params => http.post('app/ftype/add', params);
// 删除财务分类
export const deleteFtype = params => http.delete(`app/ftype/delete/${params}`);
// 财务分类信息修改
export const updateFtype = params => http.put('app/ftype/update', params);

// ----------------- moneyflow -----------------
// 按条件查询现金流水列表
export const listMoneyflow = params => http.post('app/moneyflow/search', params);
// 新建现金流水
export const addMoneyflow = params => http.post('app/moneyflow/add', params);
// 按创建时间查询现金流水列表
export const listCreatetimeMoneyflow = params => http.post('app/moneyflow/createtime/search', params);
// 删除现金流水
export const deleteMoneyFlow = params => http.delete(`app/moneyflow/delete/${params}`);
// 批量删流水
export const batchDeleteMoneyflow = params => http.post('app/moneyflow/delete/batch',params);
// 现金流水信息修改
export const updateMoneyflow = params => http.put('app/moneyflow/update', params);

// -------------------- 内部转账 ----------------------
// 新建内部转账流水
export const addTransfer = params => http.post('app/moneyflow/transfer/add', params);
// 现金流水内部转账信息修改
export const updateTransfer = params => http.post('app/moneyflow/transfer/update', params);

// -------------------- account check -------------------
// 添加对账信息
export const addCheck = params => http.post('app/account/check/add', params);
// 清除当前日期的对账信息
export const clearCheck = params => http.post('app/account/check/clear', params);
// 获取账户当前对账日期状态
export const listCheck = params => http.post('app/account/check/list', params);

// --------------------------- stat moneyflow ---------------------------
// 按日期、账户，统计月流入流出数据服务
export const statAccountMoneyflow = params => http.post('app/moneyflow/stat/account', params);
// 按日期条件月流入流出统计分类服务
export const statDefaultMoneyflow = params => http.post('app/moneyflow/stat/default', params);
// 按日期、财务类别，统计月流入流出数据服务
export const statFtypeMoneyflow = params => http.post('app/moneyflow/stat/ftype', params);
// 按日期、收付款人，统计月流入流出数据服务
export const statReceiverMoneyflow = params => http.post('app/moneyflow/stat/receiver', params);



 /*
 *  ----------------------------2018-6-26 以前的旧------------------------------------
 */


// export const searchMoneyFlowAccounts = params => http.post('moneyflows/accounts', params)

// // 财务流水-月流入流出统计分类服务
// export const statMoneyflows = params => http.post('moneyflows/stat/search', params)
// //type 3 安装帐户统计

// // --------------------------------------------------------------------
// // 2017-11-30 v2

// // moneyflows
// // --------accounts------
// export const insertAccounts = params => http.post('/accounts/insert', params)

// export const insertAccountsList = params => http.post('/accounts/insert/list', params)

// export const deleteAccounts = params => http.post('/accounts/delete', params)

// // --------receivers------
// export const searchReceivers = params => http.post('/receivers/search', params)
// export const insertReceivers = params => http.post('/receivers/insert', params)
// export const modifyReceivers = params => http.post('/receivers/modify', params)
// export const deleteReceivers = params => http.post('/receivers/delete', params)

// // ---------------------------------------
// // v2

// // accounts
// export const searchAccounts = params => http.post('/accounts/search', params)
// export const modifyAccounts = params => http.post('/accounts/modify', params)

// // moneyflows
// export const searchMoneyflows = params => http.post('moneyflows/search', params)
// export const insertMoneyFlow = params => http.post('moneyflows/insert', params)
// export const modifyMoneyFlow = params => http.post('moneyflows/modify', params)
// // export const deleteMoneyFlow = params => http.post('moneyflows/delete', params)

// // transfer
// export const insertTransfer = params => http.post('moneyflows/transfer', params)
// export const modifyTransfer = params => http.post('moneyflows/transfer/modify', params)
// export const deleteTransfer = params => http.post('moneyflows/transfer/delete', params)


// // atage  searchAtage=查询  deleteAtage=删除 modifyAtage=修改 insertAtage= 添加
// export const insertAtage = params => http.post('moneyflows/atype/insert', params) 
// export const modifyAtage = params => http.post('moneyflows/atype/modify', params)
// export const deleteAtage = params => http.post('moneyflows/atype/delete', params)
// export const searchAtage = params => http.post('moneyflows/atype/search', params)
