import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
const SchoolFinder = ({sz}:any) => {
  console.log(sz)
  
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async (data:any) => {
      console.log(data)
      try {
        const response = await axios.get(
          `https://api.schooldigger.com/v1.2/schools?st=${`NY`}&zip=${sz.pincode}&appID=a9f1e0df&appKey=51b5124c005037772ce6b311a2a92cf4`
        );
        setSchools(response.data.schoolList);
        console.log(response.data.schoolList)
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(sz);
  }, [sz]);

  console.log(schools)

  return (
    <div className="flex flex-wrap justify-center items-center">
      {loading ? (
        <Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" />
      ) : (
        schools.map((item: any) => (
          <div key={item.schoolid} className="max-w-md mx-4 my-4 bg-white p-4 rounded-md border border-black">
            <h1 className="text-3xl font-semibold mb-2">{item.schoolName}</h1>
            <p className="mb-2">Phone: {item.phone}</p>
            <p className="mb-2">Address: {item.address.html}</p>
            <div className="flex items-center mb-2">
              {item.isPrivate ? (
                <span className="text-green-600 mr-2">
                  <strong>Private</strong>
                </span>
              ) : (
                <span className="text-blue-600 mr-2">
                  <strong>Public</strong>
                </span>
              )}
              {item.schoolLevel === 'Elementary' && <span className="text-purple-600">✅ Elementary</span>}
              {item.schoolLevel === 'Middle' && <span className="text-orange-600">✅ Middle</span>}
              {item.schoolLevel === 'High' && <span className="text-red-600">✅ High</span>}
              {item.schoolLevel === 'College' && <span className="text-indigo-600">✅ College</span>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SchoolFinder;