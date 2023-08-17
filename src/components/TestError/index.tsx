import React, { useEffect, useState } from "react";

function TestError() {
  //   const [data, setData] = useState(null);

  //   useEffect(() => {
  //     fetchData(); // Gọi hàm fetch dữ liệu
  //   }, []);

  //   const fetchData = async () => {
  //     try {
  //       // Gọi API để lấy dữ liệu
  //       const response = await fetch(
  //         "http://localhost:3001/knowledges/get-knowledge-list/?page=1"
  //       );
  //       const jsonData = await response.json();
  //       setData(jsonData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   console.log(data);

  //   if (!data) {
  //     return <div>Loading...</div>;
  //   }

  //   return (
  //     <div>
  //       <p>Data: {data}</p>
  //     </div>
  //   );
  useEffect(() => {
    const container = document.getElementById("container");
    if (container) {
      const nonExistentNode = document.createElement("div");
      container.removeChild(nonExistentNode);
    }
  }, []);

  return <div id="container">Example Component</div>;
}

export default TestError;
