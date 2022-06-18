import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { COMPANY_NAME } from "src/utils/company_details";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/auth/Login"), {
  ssr: false,
});

const Auth = () => {
  // const [stores, setstores] = useState([]);

  return (
    <>
      <Head>
        <title>Login | {COMPANY_NAME}</title>
      </Head>
      <DynamicComponentWithNoSSR />
    </>
  );
};

export default Auth;
