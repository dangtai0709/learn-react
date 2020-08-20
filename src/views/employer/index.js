import React, {  useState, useEffect,useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CCollapse,
  CButton
} from '@coreui/react'
import AddForms from './AddForms'
import { EmployerServices } from  '../../services'
const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Todo = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [user, setUser] = useState({
    name: '', 
    registered: new Date().toISOString().slice(0,10),
    role: 'Staff',
    status: 'Active'
  });
  
  const [datas, setDatas] = useState({
    data: [],
    totalpage: Math.ceil(1)
  })
  const onSubmit = useCallback(async(value) => {
    if(value.isUpdate){
      delete value.isUpdate
     await EmployerServices.updateEmployer(value.id,value);
    }else{
    await EmployerServices.addEmployer(value);
    }
    await getData()
  // eslint-disable-next-line no-use-before-define
  },[getData]);
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/employer?page=${newPage}`)
  }
const getData =  useCallback(async()=>{
  try {
    let list = await EmployerServices.getEmployer();
    if(list){
       list = Object.keys(list).map((key) => { return {...list[key],id:key}} )
       if(JSON.stringify(list) === JSON.stringify(datas.data)) return;
       setDatas(() => {
         return {
           data: list,
           totalpage: Math.ceil(list.length/5)
         }
       })
    }
   } catch (err) {
     console.error(err);
   }
},[datas])
useEffect(() => {
    getData();
    currentPage !== page && setPage(currentPage)}, [currentPage, page,getData])
  const [details, setDetails] = useState(null)
  const handleDelete = useCallback(async(id)=>{
    setDetails(null)
    await EmployerServices.deleteEmployer(id);
    await getData();
  },[getData]);
  const getDetails = useCallback((item)=>{
    item.registered = new Date(item.registered).toISOString().slice(0,10)
    item.isUpdate = true;
    setUser(item)
  },[]);
  return (
    <>
    <AddForms onSubmit={onSubmit} user={user} handleUser={setUser}/>
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> example</small>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={datas.data}
            fields={[
              { key: 'name', _classes: 'font-weight-bold' },
              'registered', 'role', 'status',
              {
                key: 'show_details',
                label: '',
                _style: { width: '1%' },
                sorter: false,
                filter: false
              }
            ]}
            columnFilter
            sorter
            hover
            striped
            itemsPerPage={5}
            activePage={page}
            clickableRows
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status}
                    </CBadge>
                  </td>
                ),
                'show_details':
                (item)=>{
                  return (
                    <td className="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={()=>{setDetails(item.id)}}
                      >
                        {details===item.id ? 'Hide' : 'Show'}
                      </CButton>
                    </td>
                    )
                },
              'details':
                  (item)=>{
                    return (
                    <CCollapse show={details===item.id}>
                      <CCardBody>
                        <h4>
                          {item.username}
                        </h4>
                        <p className="text-muted">User since: {item.registered}</p>
                        <CButton size="sm" color="info" onClick={()=>{getDetails(item)}}>
                          User Settings 
                        </CButton>
                        <CButton size="sm" color="danger" className="ml-1" onClick={()=>{handleDelete(item.id)}}>
                          Delete
                        </CButton>
                      </CCardBody>
                    </CCollapse>
                  )
              }   
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={datas.totalpage}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>
  )
}
export default Todo
