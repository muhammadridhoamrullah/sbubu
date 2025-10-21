import GenerateMetadata from "../../components/GenerateMetadata";

export default function Login() {
  const metadata = {
    title: "Login - SBUBU",
    description: "Register page for SBUBU users",
    keywords: "SBUBU, register, sign up, create account, new user",
    ogType: "website",
  };
  return (
    <>
      <GenerateMetadata data={metadata} />
      <div>
        <h1>Login Page</h1>
      </div>
    </>
  );
}
