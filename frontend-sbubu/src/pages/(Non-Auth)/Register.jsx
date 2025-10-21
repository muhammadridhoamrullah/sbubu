import GenerateMetadata from "../../components/GenerateMetadata";

export default function Register() {
  const metadata = {
    title: "Register - SBUBU",
    description: "Register page for SBUBU users",
    keywords: "SBUBU, register, sign up, create account, new user",
    ogType: "website",
  };
  return (
    <>
      <GenerateMetadata data={metadata} />
      <div>Ini register page</div>
    </>
  );
}
