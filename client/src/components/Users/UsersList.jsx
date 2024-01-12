import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { getJWT } from "../../services/userService";
import { toast } from "react-toastify";
import http from "../../services/httpService";

import "./UsersList.css";
import UsersEditFormModal from "./UsersEditFormModal";
import UseresDeleteAuthModal from "./UseresDeleteAuthModal";


export default function UsersList(props) {
  const [users, setUsers] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    console.log(userId);
    setSelectedUser(userToEdit);
    setShowEditModal(true);
  };

  const handleSaveChanges = async (updatedUser) => {
    const updatedUsers = users.slice();
    for (let i = 0; i < updatedUsers.length; i++) {
      if (updatedUsers[i].id === updatedUser.id) {
        updatedUsers[i] = updatedUser;
        break;
      }
    }
    setUsers(updatedUsers);
    try {
      const token = getJWT();
      const reqHeaders = { "x-auth-token": token };
      await http.patch(
        `http://localhost:5000/api/users/${updatedUser._id}`,
        updatedUser,
        { headers: reqHeaders }
      );
      console.log(`Updating ${updatedUser.name} user has been success !`);
      setTimeout(() => {
        toast.success("המשתמש עודכן בהצלחה");
      }, 2000);
      setSelectedUser("");
      setUpdatedUser(updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    async function fetchUsersData() {
      const token = getJWT();
      const reqHeaders = { "x-auth-token": token };
      const response = await http.get("http://localhost:5000/api/users/", {
        headers: reqHeaders,
      });
      console.log(response.data.found);
      setUsers(response.data.found);
    }
    fetchUsersData();
  }, [props.newUser, updatedUser]);

  const handleDelete = (id) => {
    const userToDelete = users.find((user) => user.id === id);
    console.log(userToDelete);
    setSelectedUser(userToDelete);
    setShowDeleteModal(true);
  };
  const handleDeleteUser = async (user) => {
    console.log(user);
    try {
      const token = getJWT();
      const reqHeaders = { "x-auth-token": token };
       await http.delete(
        `http://localhost:5000/api/users/${user._id}`,
        { headers: reqHeaders }
      );
      console.log(`Deleting ${user.name} user has been success !`);
      setTimeout(() => {
        toast.success("המשתמש נמחק בהצלחה");
      }, 1000);
      setSelectedUser("");
      setUpdatedUser(user);
    } catch (error) {
      console.log(error);
    }
  };
  if (!users) return <h4>טוען רשימת משתמשים...</h4>;

  return (
    <>
      <Card>
        <Card.Header>משתמשים</Card.Header>
        <Card.Body>
          <Table responsive striped bordered hover className="usersListTable">
            <thead>
              <tr>
                <th>#</th>
                <th>שם המשתמש</th>
                <th>Email</th>
                <th>סיסמא</th>
                <th>תמונת פרופיל</th>
                <th>Admin?</th>
                <th>תפקיד</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <img src={user.imgUrl} alt="" />
                  </td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td style={{color:'white', backgroundColor: user.roles.length > 0 && user.roles[0].color }}>{user.roles.length > 0 && user.roles[0].name}</td>
                  <td className="actions">
                    <button
                      onClick={() => handleEdit(user._id)}
                      className="btn-edit"
                    >
                      <AiFillEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn-delete"
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {showEditModal && (
        <UsersEditFormModal
          show={handleModalShow}
          user={selectedUser}
          onSaveChanges={handleSaveChanges}
          onClose={handleModalClose}
        />
      )}

      {showDeleteModal && (
        <UseresDeleteAuthModal
          user={selectedUser}
          show={handleDeleteModalShow}
          onClose={handleDeleteModalClose}
          onDelete={handleDeleteUser}
        />
      )}
    </>
  );
}
