import React,{ useEffect, useState } from "react";
import { Dropdown } from 'react-bootstrap';
import { getJWT } from '../../services/userService';
import http from "../../services/httpService";

export default function RolelistDropDown(props) {
    const [rolesList,setRolesList] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);

    useEffect(()=> {
        async function fetchRolesData() {
          const token = getJWT();
          const reqHeaders = { 'x-auth-token': token }
          const response = await http.get('http://localhost:5000/api/roles/',{headers: reqHeaders});
          console.log(response.data.found);
          setRolesList(response.data.found);
        };
        fetchRolesData();
      },[])

      const handleRoleSelect = (role)=> {
        setSelectedRole(role);
        props.onChange(role);
      }
      const buttonStyle = selectedRole ? { backgroundColor: selectedRole.color } : {};

      if (!rolesList) return (<h4>טוען רשימת תפקידים...</h4>)

  return (
    <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic" style={buttonStyle}>
    {selectedRole ? selectedRole.name : "בחר תפקיד"}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      {rolesList.map((role) => (
        <Dropdown.Item
          key={role._id}
          style={{
            backgroundColor: role.color,
            color:'black',
            textAlign:'center'
          }}
          onClick={() => handleRoleSelect(role)}
        >
          {role.name}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>  )
}
