import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button";
import { Field } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { Label } from "components/label";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import * as yup from "yup";

const schema = yup.object({
  fullname: yup
    .string()
    .required("Please enter your fullname")
    .test(
      "should has at two words",
      "Please enter at least two words",
      (value) => value.split(" ").length >= 2
    ),
  email: yup
    .string()
    .required("Please enter your email")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email invalid"
    ),
  password: yup
    .string()
    .required("Please enter your password")
    .min(6, "At least 6 chars")
    .matches(/[a-z]/, "At least one lowercase char")
    .matches(/[A-Z]/, "At least one uppercase char"),
  confirmPassword: yup
    .string()
    .label("confirm password")
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const UserProfile = () => {
  const { userInfo } = useAuth();
  const {
    control,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  const [user, setUser] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const colRef = doc(db, "users", userInfo?.uid);
        const docData = await getDoc(colRef);
        setUser(docData.data());
        reset({ ...docData.data(), confirmPassword: docData.data().password });
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [reset, userInfo?.uid]);
  const { handleSelectImage, progress, image } = useFirebaseImage(
    setValue,
    getValues
  );

  const handleUpdateProfile = async (values) => {
    const cloneValue = { ...values, avatar: image || user?.avatar };
    await updateProfile(userInfo, {
      displayName: values.fullname,
      photoURL: image || user?.avatar,
    });
    const colRefUpdate = doc(db, "users", userInfo?.uid);
    await updateDoc(colRefUpdate, {
      ...cloneValue,
    }).then(() => {
      Swal.fire({
        icon: "success",
        title: "Your update profile successfully!!",
        showConfirmButton: false,
        timer: 1500,
      });
      reset({ ...cloneValue });
    });
  };

  useEffect(() => {
    const error = Object.values(errors);
    toast.error(error[0]?.message, {
      pauseOnHover: false,
    });
  }, [errors]);

  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="p-5 mb-10 text-center border-gray-400 ">
          <ImageUpload
            className="!w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
            image={image || user?.avatar}
            progress={progress}
            onChange={handleSelectImage}
          ></ImageUpload>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Field>
            <Label>Fullname</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
          <Field>
            <Label>Date of Birth</Label>
            <Input
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
          <Field></Field>
          <Field>
            <Label>New Password</Label>
            <InputPasswordToggle
              control={control}
              name="password"
              type="password"
              placeholder="Enter your password"
            ></InputPasswordToggle>
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <InputPasswordToggle
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
            ></InputPasswordToggle>
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

export default UserProfile;
