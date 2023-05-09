export function parsePhone(phone: string) {

    //对空格进行替换
  phone = phone.replace(/\s+/g,'');
  let res=[
    phone.slice(0,3),
    phone.slice(3,7),
    phone.slice(7,11)
    //过滤掉空的字串
  ].filter(item=>!!item).join(' ')

  return res
}

export function replacePhone(phone:string){
    return phone?phone.replace(/\s+/g,''):''
}
