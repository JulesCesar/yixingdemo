let baseUrl = '/'
let locApi = -1
// test
if (locApi < 0) {
  locApi = location.href.indexOf('/yxpctest/')
  if (locApi > 0) {
    baseUrl = '/yxpctest/'
  }
}
if (locApi < 0) {
  locApi = location.href.indexOf('/yxphtest/')
  if (locApi > 0) {
    baseUrl = '/yxphtest/'
  }
}
// gray
if (locApi < 0) {
  locApi = location.href.indexOf('/yxpcgray/')
  if (locApi > 0) {
    baseUrl = '/yxpcgray/'
  }
}
if (locApi < 0) {
  locApi = location.href.indexOf('/yxphgray/')
  if (locApi > 0) {
    baseUrl = '/yxphgray/'
  }
}
// prod
if (locApi < 0) {
  locApi = location.href.indexOf('/yxpcprod/')
  if (locApi > 0) {
    baseUrl = '/yxpcprod/'
  }
}
if (locApi < 0) {
  locApi = location.href.indexOf('/yxphprod/')
  if (locApi > 0) {
    baseUrl = '/yxphprod/'
  }
}

export default baseUrl
