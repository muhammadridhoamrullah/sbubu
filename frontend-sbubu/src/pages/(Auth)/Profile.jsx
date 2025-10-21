import GenerateMetadata from "../../components/GenerateMetadata";

export default function Profile() {
  const metadata = {
    title: "SBUBU- Profile",
    description: "Profile page for SBUBU users",
    keywords: "SBUBU, profile, user, account, settings",
    ogType: "website",
  };
  return (
    <>
      <GenerateMetadata data={metadata} />
      <div>Ini Profile</div>
    </>
  );
}
