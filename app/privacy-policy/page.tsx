"use client";

import Head from "next/head";
import PrivacyPolicyComponent from '../../components/PrivacyPolicy'
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

const PrivacyPolicyPage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Zabbot - Privacy Policy Page</title>
        <meta
          name="description"
          content="Zabbot Privacy Policy"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="bg-[#cee9fc] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-6 hover:cursor-pointer text-[#012657] hover:text-[#0098DE] transition-colors"
            aria-label="Go back to previous page"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <PrivacyPolicyComponent />
        </div>
      </main>
    </div>
  );
}

export default PrivacyPolicyPage;
