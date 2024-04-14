import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { userRole } from "utils/constants";
import UserTable from "./UserTable";

const UserManage = () => {
  const { userInfo } = useAuth();
  const [roleUser, setRoleUser] = useState(0);
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
  return (
    <div>
      <DashboardHeading title='Users' desc='Manage your user'></DashboardHeading>
      <div className='flex justify-end mb-10'>
        <Button type='button' maxWidth='200px' padding='20px' fontSize='16px' to='/manage/add-user'>
          Add new user
        </Button>
      </div>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
