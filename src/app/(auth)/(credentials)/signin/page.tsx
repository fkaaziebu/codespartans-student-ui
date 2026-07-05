import { Suspense } from "react";
import SigninForm from "../_components/signin-form";

export default function SigninPage() {
  return (
    <Suspense>
      <SigninForm />
    </Suspense>
  );
}
