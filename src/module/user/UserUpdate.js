import { Button } from "components/button";
import Radio from "components/checkbox/Radio";
import { Field } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { Label } from "components/label";
import Textarea from "components/textarea/Textarea";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { userRole, userStatus } from "utils/constants";

const UserUpdate = () => {
  const { userInfo } = useAuth();
  const [params] = useSearchParams();
  const userId = params.get("id");
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const { handleSelectImage, handleDeleteImage, progress, image } =
    useFirebaseImage(setValue, getValues);
  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      const colRef = doc(db, "users", userId);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
    }
    fetchData();
  }, [userId, reset]);
  const [roleUser, setRoleUser] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const colRef = doc(db, "users", userInfo.uid);
        const docData = await getDoc(colRef);
        setRoleUser(docData.data().role);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [userInfo.uid]);
  if (!userId) return null;

  const handleUpdateUser = async (values) => {
    if (roleUser !== userRole.ADMIN) {
      Swal.fire("Failed", "You have no right to do this action", "warning");
      return;
    }
    try {
      const cloneValue = { ...values };
      cloneValue.status = Number(values.status);
      cloneValue.role = Number(values.role);
      const colRefUpdate = doc(db, "users", userId);
      await updateDoc(colRefUpdate, {
        ...cloneValue,
        avatar: image,
      }).then(() => {
        Swal.fire({
          icon: "success",
          title: "Your update user successfully!!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/manage/user");
        });
      });
    } catch (error) {
      toast.error("Update user failed!");
    }
  };

  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc="Update user information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          <ImageUpload
            className="!rounded-full h-full"
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            image={image}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
              required
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
              required
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <InputPasswordToggle
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
              required
            ></InputPasswordToggle>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Role</Label>
            <div className="flex">
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </div>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Description</Label>
            <Textarea name="description" control={control}></Textarea>
          </Field>
        </div>
        <Button
          isLoading={isSubmitting}
          disabled={isSubmitting}
          type="submit"
          className="mx-auto w-[200px]"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
