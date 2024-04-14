import { ActionDelete, ActionEdit } from "components/action";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { collection, deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userRole, userStatus } from "utils/constants";
const USER_PER_PAGE = 5;
const UserTable = () => {
  const [roleUser, setRoleUser] = useState(0);
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const users = snapshot.docs.map((data) => {
        return {
          id: data.id,
          ...data.data(),
        };
      });
      setUserList(users);
    });
  }, []);

  const handleDeleteUser = async (id) => {
    const colRef = doc(db, "users", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const renderRoleLabel = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Moderator";
      case userRole.USER:
        return "User";

      default:
        break;
    }
  };
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type='success'>Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type='warning'>Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type='danger'>Rejected</LabelStatus>;

      default:
        break;
    }
  };

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + USER_PER_PAGE;
  const currentItems = userList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(userList.length / USER_PER_PAGE);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * USER_PER_PAGE) % userList.length;

    setItemOffset(newOffset);
  };
  const { userInfo } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        const colRef = doc(db, "users", userInfo?.uid);
        const docData = await getDoc(colRef);
        setRoleUser(docData.data().role);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [userInfo?.uid]);

  if (roleUser !== userRole.ADMIN && roleUser !== userRole.MOD) return null;

  const renderUserItem = (user) => {
    return (
      <tr key={user.id}>
        <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
        <td className='whitespace-nowrap'>
          <div className='flex items-center gap-x-3 mgr-50-mb'>
            <img
              src={user?.avatar || "https://picsum.photos/seed/picsum/200/300"}
              alt=''
              className='flex-shrink-0 object-cover w-10 h-10 rounded-md'
            />
            <div className='flex-1'>
              <h3 className='hide-text-dot max-w-[115px] '>{user?.fullname}</h3>
              <time className='text-sm text-gray-300'>
                {new Date(user?.createAt?.seconds * 1000).toLocaleDateString("vi-VI")}
              </time>
            </div>
          </div>
        </td>
        <td className='text-sm !whitespace-normal'>{user?.username}</td>
        <td>{user?.email.slice(0, 5) + "..."}</td>
        <td>{renderLabelStatus(user?.status)}</td>
        <td>{renderRoleLabel(user?.role)}</td>
        <td>
          <div className='flex items-center text-gray-500 gap-x-3'>
            <ActionEdit onClick={() => navigate(`/manage/update-user?id=${user.id}`)}></ActionEdit>
            <ActionDelete
              disiable={roleUser === userRole.MOD}
              onClick={() => handleDeleteUser(user.id)}
            ></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{currentItems.length > 0 && currentItems.map((user) => renderUserItem(user))}</tbody>
      </Table>
      <ReactPaginate
        breakLabel='...'
        nextLabel=' >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel='< '
        renderOnZeroPageCount={null}
        className='pagination'
      />
    </div>
  );
};

export default UserTable;
