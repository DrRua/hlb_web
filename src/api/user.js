import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

// 登录
export function GetTask(username, password) {
  return request({
    url: '/Api/GetTask',
    method: 'post',
    data: {
      username: username,
      password: password
    }
  })
}
// 获取所有工序
export function GetOperationSummary(Name, SaleNo, pageIndex) {
  return request({
    url: '/Api/GetOperationSummary',
    method: 'POST',
    data: {
      Name: Name,
      SaleNo: SaleNo,
      pageIndex: pageIndex
    }
  })
}
// 工序详情
export function GetOperationDetail(startTime, EndTime, Name, SaleNo, pageIndex) {
  return request({
    url: '/Api/GetOperationDetail',
    method: 'post',
    data: {
      startTime: startTime,
      EndTime: EndTime,
      Name: Name,
      SaleNo: SaleNo,
      pageIndex: pageIndex
    }
  })
}
