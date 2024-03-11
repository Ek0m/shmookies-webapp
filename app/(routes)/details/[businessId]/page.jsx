"use client";

import GlobalApi from "@/app/_services/GlobalApi";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BusinessInfo from "../_components/BusinessInfo";
import BusinessDescription from "../_components/BusinessDescription";
import SuggestedBusiness from "../_components/SuggestedBusiness";

export default function BusinessDetail({ params }) {
  const { data, status } = useSession();
  const [business, setBusinesss] = useState([]);

  useEffect(() => {
    params && getBusinessById();
  }, [params]);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const getBusinessById = () => {
    GlobalApi.getBusinessById(params.businessId).then((resp) => {
      setBusinesss(resp.businessList);
    });
  };

  const checkUserAuth = () => {
    if (status == "loading") {
      return <p>Loading...</p>;
    }
    if (status == "unauthenticated") {
      signIn("descope");
    }
  };

  return (
    status == "authenticated" &&
    business && (
      <div className="py-8 md:py-20 px-10 md:px-36">
        <BusinessInfo business={business} />
        <div className="grid grid-cols-3 mt-10">
          <div className="col-span-3 md:col-span-2 order-last md:order-first">
            <BusinessDescription business={business} />
          </div>
          <div>
            <SuggestedBusiness business={business} />
          </div>
        </div>
      </div>
    )
  );
}
