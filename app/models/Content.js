import { useEffect, useState } from "react";

const getContent = async (GroupName) => {
    console.log(12)
    let [contentDetails,setContentDetails] = useState({})
    let [data,setData] = useState(null)
    let [error,setError] = useState(null)
    let [loading,setLoading] = useState(true)
    const [count, setCount] = useState(0);
    let CONTENT_GROUP_URL = 'http://localhost:1337/api/contents?populate=*&filters[content_group][name][$eq]='+GroupName

    const fetchData = async () => {
        try {
          const response = await fetch(CONTENT_GROUP_URL,);
          const json = await response.json();
          if(json){
            const contentData = [];
            json.data.forEach(rows => {
                contentData.push(
                        {
                            'Subject':rows.attributes.Subject,
                            'Description':rows.attributes.Description,
                            'Link':rows.attributes.Link,
                            'Video':rows.attributes.Video,
                            'Image':rows.attributes.Image,
                        }
                    )
            });
            setContentDetails(contentData)
        }
        } catch (error) {
          console.error(error);
        }
      };
      
      useEffect(() => {
        fetchData()
      },[])
    return contentDetails;
}

export default getContent