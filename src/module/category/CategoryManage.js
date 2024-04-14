import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import useDebounce from "hooks/useDebounce";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { categoryStatus, userRole } from "utils/constants";
const CATEGORY_PER_PAGE = 10;
const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const value = useDebounce(filter, 500);
  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(db, "categories"),
      startAfter(lastDoc || 0),
      limit(CATEGORY_PER_PAGE),
    );
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList([...categoryList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "categories");
      const newRef = value
        ? query(colRef, where("name", ">=", value), where("name", "<=", value + "utf8"))
        : query(colRef, limit(CATEGORY_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });

      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategoryList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [value]);

  const handleDeleteCategory = async (id) => {
    const colRef = doc(db, "categories", id);
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
      <DashboardHeading title='Categories' desc='Manage your category'>
        <Button
          maxWidth='300px'
          fontSize='16px'
          padding='20px 20px'
          to='/manage/add-category'
          type='button'
        >
          Create category
        </Button>
      </DashboardHeading>
      <div className='flex justify-end'>
        <input
          type='text'
          className='p-4 border border-gray-200 rounded-lg w-full max-w-[300px]'
          placeholder='Search category...'
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList &&
            categoryList.length > 0 &&
            categoryList.map((category) => {
              return (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <span className='italic text-gray-400'>{category.slug}</span>
                  </td>
                  <td>
                    {Number(category.status) === categoryStatus.APPROVED ? (
                      <LabelStatus type='success'>Approved</LabelStatus>
                    ) : (
                      <LabelStatus type='warning'>Unapproved</LabelStatus>
                    )}
                  </td>
                  <td>
                    <div className='flex items-center text-gray-500 gap-x-3'>
                      <ActionView
                        onClick={() => navigate(`/category/${category.slug}`)}
                      ></ActionView>
                      <ActionEdit
                        onClick={() => navigate(`/manage/update-category?id=${category.id}`)}
                      ></ActionEdit>
                      <ActionDelete
                        disiable={roleUser === userRole.MOD}
                        onClick={() => handleDeleteCategory(category.id)}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {total > categoryList.length && (
        <div className='flex justify-center mt-5'>
          <Button
            type='button'
            onClick={handleLoadMoreCategory}
            maxWidth='200px'
            padding='20px'
            fontSize='16px'
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryManage;
