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

import usersData from './UsersData'
import AddForms from './AddForms'

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
    name: 'dang tai', 
    registered: new Date().toISOString().slice(0,10),
    role: 'Staff',
    status: 'Active'
  });
  const [datas, setDatas] = useState({
    data: usersData,
    totalpage: Math.ceil(usersData.length/5)
  })
 
  const onSubmit = useCallback((value) => {
    if(value.isUpdate){
      setDatas(prev => {
        delete value.isUpdate
        prev.data[value.index] = value;
        return {
          data: prev.data,
          totalpage: Math.ceil(prev.data.length/5)
        }
      })
      return;
    }
    setDatas(prev => {
      prev.data.push(value);
      return {
        data: prev.data,
        totalpage: Math.ceil(prev.data.length/5)
      }
    })
  },[]);
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/todo?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])
  const [details, setDetails] = useState([])

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
  const handleDelete = useCallback((id)=>{
    setDetails([])
    setDatas(prev => {
      let data =prev.data.filter(i => i.id !== id);
      return {
        data: data,
        totalpage: Math.ceil(data.length/5)
      }
    })
  },[]);
  const getDetails = useCallback((item,index)=>{
    item.registered = new Date(item.registered).toISOString().slice(0,10)
    item.index = index;
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
            // onRowClick={(item) => history.push(`/users/${item.id}`)}
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
                (item, index)=>{
                  return (
                    <td className="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={()=>{toggleDetails(index)}}
                      >
                        {details.includes(index) ? 'Hide' : 'Show'}
                      </CButton>
                    </td>
                    )
                },
              'details':
                  (item, index)=>{
                    return (
                    <CCollapse show={details.includes(index)}>
                      <CCardBody>
                        <h4>
                          {item.username}
                        </h4>
                        <p className="text-muted">User since: {item.registered}</p>
                        <CButton size="sm" color="info" onClick={()=>{getDetails(item,index)}}>
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
