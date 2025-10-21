import { Helmet } from "react-helmet-async";

export default function GenerateMetadata({ data }) {
  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords} />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:type" content={data.ogType} />
    </Helmet>
  );
}
