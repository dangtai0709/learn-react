
class ConnectionServices {
  LOGIN(params) {
    if(params.username ==='admin@admin.com' && params.password === '123')
    return {
      user:{
        username:'admin@admin.com',
        password:'123'
      }
    }
    return false;
  }
}

export default new ConnectionServices()
