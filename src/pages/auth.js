import React from "react";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/auth/Login"), {
  ssr: false,
});

const Auth = () => {
  // const [stores, setstores] = useState([]);

  return (
    <>
      <DynamicComponentWithNoSSR />
    </>
  );
};

export default Auth;
