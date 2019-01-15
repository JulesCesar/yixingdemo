import http from './';

// 查询词频统计信息
export const listWord = params => http.get('app/word/list');