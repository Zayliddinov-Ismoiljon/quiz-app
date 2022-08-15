import React, {useEffect, useState} from 'react'
import {Select, Button} from "antd"

const {Option} = Select;
export default function Home({setCategoryId, categoryId, setIsStart}) {

    const [category, setCategory]= useState([]);
    const [loading, setLoading]= useState(false);
    

    useEffect(() => {
        setLoading(true);
        const options = {
          method: 'GET',
        };
    
        fetch(
          `https://opentdb.com/api_category.php`, options
        )
          .then((response) => response.json())
          .then((data) => {setCategory(data.trivia_categories); setLoading(false)});
      }, []);

  return (
    <div className='w-75 mx-auto'>
        <div className="mb-4">
          <h3 className='text-center mb-4'>Select Category</h3>
        <Select allowClear loading={loading} className='mx-auto w-100'size='large' onChange={ (e) => setCategoryId(e)} >
            {
                category?.map((e,i)=>(
                          <Option value={e?.id} key={i}>{e?.name}</Option>
                    ))
            }
        </Select>
        </div>
        <Button block type="primary" size='large' disabled={!Boolean(categoryId)} onClick={() => setIsStart(true)} >Start btn</Button>
    </div>
  )
}
