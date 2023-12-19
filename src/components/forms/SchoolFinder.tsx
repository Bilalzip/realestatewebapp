import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
const SchoolFinder = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.schooldigger.com/v1.2/schools?st=ca&appID=17cceaf3&appKey=736bf0c36506466e16dd9ca01c8cfd5c'
        );
        setSchools(response.data.schoolList);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(schools)

  return (
    <>
    {
loading ? (
  <Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
     />
) : ( 
      schools.map((item:any) => (
        <div key={item.schoolid} className="h-fit w-full bg-slate-400 mt-4 ml-1 md:ml-4 rounded-md p-2 font-mono">
          <h1 className="text-3xl font-semibold font-sans text-center">
            {item.schoolName} 
          </h1>
          <p>Phone: {item.phone}</p>
          <p>Address: {item.address.html}</p>
          <div>
            {item.isPrivate ? (
              <span>
                <strong>Private</strong> <span>Days: {item.privateDays}, Hours: {item.privateHours}</span>
              </span>
            ) : (
              <span>
                <strong>Public</strong>
              </span>
            )}
            <br />
            {item.schoolLevel === 'Elementary' && <span>✅ Elementary</span>}
            {item.schoolLevel === 'Middle' && <span>✅ Middle</span>}
            {item.schoolLevel === 'High' && <span>✅ High</span>}
            {item.schoolLevel === 'College' && <span>✅ College</span>}
          </div>
        </div>
      )) )}
    </>
  );
};

export default SchoolFinder;
