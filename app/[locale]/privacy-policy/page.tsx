import RichText from "@/components/rich-text";

const PolicyPrivacyPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const get_privacy_policy_data = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/globals/privacy_policy?locale=${locale}&draft=false&depth=4`,
        { cache: "no-cache" },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const privacy_policy_data = await get_privacy_policy_data();

  return (
    <main className="max-w-5xl mx-auto px-4 w-full overflow-x-hidden pt-4">
      <h1 className="md:text-6xl font-bold pb-6 text-center text-3xl">
        Privacy Policy for Medzamrsavljenje.org
      </h1>
      <RichText content={privacy_policy_data.content} />
    </main>
  );
};

export default PolicyPrivacyPage;
