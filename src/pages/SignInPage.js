import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { Label } from "components/label";
import { useAuth } from "contexts/auth-context";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthencationPage from "./AuthencationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
const schema = yup.object({
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

const SignInPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const handleSubmitForm = async (values) => {
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };
  useEffect(() => {
    const error = Object.values(errors);
    toast.error(error[0]?.message, {
      pauseOnHover: false,
    });
  }, [errors]);

  useEffect(() => {
    document.title = "Login page";
    if (userInfo?.email) navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthencationPage>
      <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
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
          You have not had an account ?<NavLink to="/sign-up">Register</NavLink>
        </div>
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Sign In
        </Button>
      </form>
    </AuthencationPage>
  );
};

export default SignInPage;
