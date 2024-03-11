"use client"

import React, {useEffect, useState} from 'react'
import GlobalApi from '@/app/_services/GlobalApi'
import BusinessList from '@/app/_components/BusinessList'

export default function BusinessByCategory({params}) {

  const [filteredBusiness, setFilteredBusiness] = useState([])

    useEffect(() => {
      console.log(params)
      params&&getBusinessListByCategory()
      console.log(filteredBusiness)
    }, [params])

    const getBusinessListByCategory = () => {
      GlobalApi.getFilteredBusinessByCategory(params.category).then((resp) => {
        setFilteredBusiness(resp.businessLists);
      });
    };
  return (
    <div>
      <BusinessList title={params.category} businessList={filteredBusiness} />
    </div>
  )
}
