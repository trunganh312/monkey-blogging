import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { Label } from "components/label";
import { auth, db } from "firebase-app/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";
import * as yup from "yup";
import AuthencationPage from "./AuthencationPage";

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

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    const error = Object.values(errors);
    toast.error(error[0]?.message, {
      pauseOnHover: false,
    });
  }, [errors]);

  const handleSubmitForm = async (values) => {
    if (!isValid) return;
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
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createAt: serverTimestamp(),
    });

    toast.success("Register user successfully!!", {
      pauseOnHover: false,
    });
    navigate("/");
    reset();
  };

  useEffect(() => {
    document.title = "Register page";
  }, []);

  return (
    <AuthencationPage>
      <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
        <Field>
          <Label htmlFor="fullname" className="label">
            Fullname
          </Label>
          <Input
            control={control}
            type="text"
            name="fullname"
            placeholder="Please enter your fullname"
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email" className="label">
            Email address
          </Label>
          <Input
            control={control}
            type="text"
            name="email"
            placeholder="Please enter your email address"
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password" className="label">
            Password
          </Label>
          <InputPasswordToggle
            control={control}
            name="password"
            placeholder="Please enter your password"
          ></InputPasswordToggle>
        </Field>
        <div className="have-account">
          You already have an account ?<NavLink to="/sign-in">Login</NavLink>
        </div>
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Sign Up
        </Button>
      </form>
    </AuthencationPage>
  );
};

export default SignUpPage;
