import React,{ useEffect, useState } from "react";
import { Card, Table  } from 'react-bootstrap';
import { AiFillDelete,AiFillEdit } from "react-icons/ai";
import { getJWT } from '../../services/userService';
import { toast } from "react-toastify";
import http from "../../services/httpService";
import RolesEditFormModal from "./RolesEditFormModal";
import RolesDeleteAuthModal from "./RolesDeleteAuthModal";

export default function RoleList(props) {
    const [roles, setRoles] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [updatedRole, setUpdatedRole] = useState(null);


    useEffect(()=> {
        async function fetchRolesData() {
          const token = getJWT();
          const reqHeaders = { 'x-auth-token': token }
          const response = await http.get('http://localhost:5000/api/roles/',{headers: reqHeaders});
          setRoles(response.data.found);
        };
        fetchRolesData();
      },[props.newRole,updatedRole])

    const handleEdit = (id) => {
    const roleToEdit = roles.find((role) => role.id === id);
    setSelectedRole(roleToEdit);
    setShowEditModal(true);
  };
  const handleDelete= (id)=> {
    console.log(id);
    const roleToEdit = roles.find((role) => role._id === id);
    console.log(roleToEdit);
    setSelectedRole(roleToEdit);
    setShowDeleteModal(true);
  }

  const handleSaveChanges = async (role) => {
    const updatedRoles = roles.slice();
    for (let i = 0; i < updatedRoles.length; i++) {
      if (updatedRoles[i].id === role.id) {
        updatedRoles[i] = role;
        break;
      }
    }
    setRoles(updatedRoles);
    try {
      const token = getJWT();
      const reqHeaders = { 'x-auth-token': token };
      await http.patch(`http://localhost:5000/api/roles/${role._id}`, role, { headers: reqHeaders });
      console.log(`Updating ${role.name} role has been success !`);
      setTimeout(() => {
        toast.success('התפקיד עודכן בהצלחה');
      }, 1000);
      setSelectedRole("")
      setUpdatedRole(role)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRole = async (role) =>{
    console.log(role);
    try {
      const token = getJWT();
      const reqHeaders = { 'x-auth-token': token };
       await http.delete(`http://localhost:5000/api/roles/${role._id}`, { headers: reqHeaders });
      console.log(`Deleting ${role.name} role has been success !`);
      setTimeout(() => {
        toast.success('התפקיד נמחק בהצלחה');
      }, 1000);
      setSelectedRole("")
      setUpdatedRole(role)
    } catch (error) {
      console.log(error);
    }
  }

  const handleModalClose = () => {
    setShowEditModal(false);
  };
  const handleModalShow = () => {
    setShowEditModal(true);
  };
  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };
  const handleDeleteModalShow = () => {
    setShowDeleteModal(true);
  };

      if (!roles) return (<h4>טוען רשימת תפקידים...</h4>)

  return (
<>
    <Card>
    <Card.Header>תפקידים</Card.Header>
    <Card.Body>
      <Table  responsive striped bordered hover className="usersListTable">
        <thead>
          <tr>
            <th>#</th>
            <th>שם התפקיד</th>
            <th>צבע</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={role._id}>
              <td>{index+1}</td>
              <td>{role.name}</td>
              <td style={{ backgroundColor: role.color, color:'white' }}>{role.color}</td>
              <td className="actions">
                <button onClick={() => handleEdit(role._id)} className="btn-edit"><AiFillEdit/></button>
                <button onClick={() => handleDelete(role._id)} className="btn-delete"><AiFillDelete/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card.Body>
  </Card>
  {showEditModal && (
<RolesEditFormModal
show={handleModalShow}
  role={selectedRole}
  onSaveChanges={handleSaveChanges}
  onClose={handleModalClose}/>)}

  {showDeleteModal&& (
    <RolesDeleteAuthModal
    role={selectedRole}
    show={handleDeleteModalShow}
    onClose={handleDeleteModalClose}
    onDelete={handleDeleteRole}
    />
  )}
  </>
      )
}
