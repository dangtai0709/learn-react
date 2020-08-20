import React, {  useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
const roles =[
  "Guest",
  "Member",
  "Staff",
  "Admin",
  "Alien"
]
const statues =[
   'Active',
   'Inactive',
   'Pending',
   'Banned',
   'Other'
  ]
const AddForms = (props) => {
  const [validateForm, setValidateForm] = useState(true)
  const handleChange = (e) => {
    const {name , value} = e.target
    props.handleUser(
        prevState => ({
        ...prevState,
        [name] : value
        })
    )
    if(!value){
      setValidateForm(true);
    }else{
      setValidateForm(false);
    }
}
const handleSubmitClick = (e) => {
  e.preventDefault();
  props.onSubmit(props.user)
  resetForm();
}
const resetForm = ()=>{
  setValidateForm(true);
  props.handleUser({
    name: '', 
    registered: new Date().toISOString().slice(0,10),
    role: 'Staff',
    status: 'Active'
  })
}
  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Basic Form
            <small> Elements</small>
          </CCardHeader>
          <CCardBody>
            <CForm
            onSubmit={(e)=>{e.preventDefault();}}
              encType="multipart/form-data"
              className="form-horizontal"
            >
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="text-input"
                    name="name"
                    placeholder="Text"
                    value={props.user.name}
                      onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-input">Registered</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    type="date"
                    id="date-input"
                    name="registered"
                    placeholder="date"
                    value={props.user.registered}
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
             
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Role</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect custom name="role"  value={props.user.role}
                    onChange={handleChange}>
                    <option value="0">Please select</option>
                    {roles.map((role,index) =>
                    <option value={role} key={index}>{role}</option>
                    )}
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Status</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect custom name="status"  value={props.user.status}
                    onChange={handleChange}>
                    <option value="0">Please select</option>
                    {statues.map((status,index) =>
                    <option value={status} key={index}>{status}</option>
                    )}
                  </CSelect>
                </CCol>
              </CFormGroup>
             
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" disabled={validateForm} onClick={handleSubmitClick}>
              <CIcon name="cil-scrubber"/> {props.user.isUpdate?'Update':'Submit'}
            </CButton>
            <CButton type="reset" size="sm" color="danger" className="ml-2" onClick={resetForm}>
              <CIcon name="cil-ban" /> Reset
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddForms;
