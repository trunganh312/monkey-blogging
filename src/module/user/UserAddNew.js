import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button";
import Radio from "components/checkbox/Radio";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { auth, db } from "firebase-app/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";
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
});

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      email: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
    },
  });

  const watchStatus = watch("status");
  const watchRole = watch("role");

  const hanldeAddUser = async (values) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(auth.currentUser, {
        displayName: values.fullname,
        photoURL: "https://picsum.photos/seed/picsum/200/300",
      });

      const colRef = collection(db, "users");
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.fullname, { lower: true }),
        avatar: "https://picsum.photos/seed/picsum/200/300",
        status: Number(values.status),
        role: Number(values.role),
        createAt: serverTimestamp(),
      });

      toast.success("Register user successfully!!", {
        pauseOnHover: false,
      });
      reset();
    } catch (error) {
      toast.error("Email already exists !!", {
        pauseOnHover: false,
      });
    }
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
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(hanldeAddUser)}>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
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
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex">
              <Radio
                name="status"
                value={userStatus.ACTIVE}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                control={control}
              >
                Active
              </Radio>
              <Radio
                name="status"
                value={userStatus.PENDING}
                checked={Number(watchStatus) === userStatus.PENDING}
                control={control}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
                control={control}
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
                value={userRole.ADMIN}
                checked={Number(watchRole) === userRole.ADMIN}
                control={control}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                value={userRole.MOD}
                checked={Number(watchRole) === userRole.MOD}
                control={control}
              >
                Moderator
              </Radio>

              <Radio
                name="role"
                value={userRole.USER}
                checked={Number(watchRole) === userRole.USER}
                control={control}
              >
                User
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="mx-auto w-[200px]"
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
