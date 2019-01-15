import http from './'

// --------------------- 文件服务 ------------------------
// 获取文件列表
export const listFile = params => http.get(`app/file/list?type=${params.type}&classname=${params.classname}`)
// export const listFile = params => http.get('app/file/list')
// 下载文件
export const downFile = params => http.get(`app/file/download/${params}`)
// 删除文件
export const deleteFile = params => http.delete(`app/file/delete/${params}`)
// 文件解析
export const parseFile = params => http.post('app/file/parse', params)
// 上传文件 保存文件
export const upFile = params => http.post(`app/file/upload?type=${params.type}&classname=${params.classname}&remark=${params.remark}`, params.file, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

// 上传文件 不保存文件 返回字段
export const upload2File = params => http.post(`app/file/upload2?classname=${params.classname}&remark=${params.remark}`, params.file, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

// ------------------------ 2018.7之前的旧版本 ---------------------

// export const listUploadedFile = params => http.post('files/search', params);

// export const searchFiles = params => http.post('files/search', params)

// export const downloadFile = params => http.post('files/download', params)

// export const delFile = params => http.post('files/delete', params)

// export const typeFile = params => http.post('files/type', params)

// export const downloadUrl = {
//   url: http.defaults.baseURL + '/files/download',
//   params: http.defaults.params
// }
// export const downloadTemplateUrl = http.defaults.baseURL + '/files/download/template'
// export const uploadUrl = http.defaults.baseURL + '/files/upload'

// export const uploadFile = (formData, uri) => http.post('files/upload' + uri, formData, {
//   headers: {
//     'Content-Type': 'multipart/form-data'
//   }
// })
