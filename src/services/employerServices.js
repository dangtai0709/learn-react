
import axios from '../axios';
class EmployerServices {
 getEmployer =  async()=>{
  try {
   const {data} = await  axios.get('/employeries.json')
   return data
  } catch {
    return null;
  }
}
  async addEmployer(params){
    return await axios.post('/employeries.json',params)
  
  }
  async deleteEmployer(params){
    return await axios.delete(`/employeries/${params}.json`)
  }
  async getEmployer(params){
    return await axios.get(`/employeries/${params}.json`)
  }
  async updateEmployer(id,params){
    return await axios.put(`/employeries/${id}.json`,params)
  }
  
}

export default new EmployerServices()
