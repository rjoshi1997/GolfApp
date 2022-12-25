import { useEffect, useState } from "react";

const getContentGroups = () => {
    let [activeGroups,setActiveGroups] = useState([])
    let [data,setData] = useState(null)
    let [error,setError] = useState(null)
    let [loading,setLoading] = useState(true)
    const CONTENT_GROUP_URL = 'http://localhost:1337/api/content-groups'
    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            try {
                fetch(CONTENT_GROUP_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                })
                .then(response => response.json())
                .then(data => setData(data.data));

                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        fetchData()

        if(data){
            const sortData = data.sort((a,b) => 
                a.attributes.sort_order - b.attributes.sort_order
            );

            const activeData = [];
            sortData.forEach(rows => {
                if(rows.attributes.is_active && rows.id){
                    activeData.push(
                            {
                                'id':rows.id,
                                'name':rows.attributes.name
                            }
                        )
                }
            });
            setActiveGroups(activeData)
        }
        
    },[CONTENT_GROUP_URL])
    return {loading,error,activeGroups}
}
export default getContentGroups