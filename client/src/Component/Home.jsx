import React from 'react'
import { useState } from 'react'
import { bookBaseURL } from '../../axiosInstance';
import { useEffect } from 'react';

const Home = () => {
  const [bookform,setBookform]=useState({
    BookName:"",
    BookAuthor:"",
    BookTitle:"",
    BookPrice:"",
    PublishDate:"",
    Id:""
  })

  const [updated,setUpdated]=useState(false);

  const [bookList,setBookList]=useState([]);

  const getAllBookList=async ()=>{
    try {
      const {data}=await bookBaseURL.get("booklists");
      setBookList(data?.BookList || []);
      console.log('booklists from API:', data?.BookList);
      
    } catch (error) {
        console.log(error);
        
    }
  }

  useEffect(()=>{
     getAllBookList();
  },[updated])

  function handleChangeForm(e){
    const {name,value}=e.target;
    setBookform((prev)=>({
       ...prev,
       [name]:value
    }
    ))
  }

  
  const handleSubmit=async()=>{
    try{

      if(!updated){
          if(!bookform.BookName||!bookform.BookAuthor||!bookform.BookTitle||!bookform.BookPrice){
        alert("All fields are required");
      }
  const {data}=await  bookBaseURL.post('/addbook',bookform);
  if(data?.Success){
    alert(data?.Message);
    setBookform({
    BookName:"",
    BookAuthor:"",
    BookTitle:"",
    BookPrice:"",
    PublishDate:"",
    Id:""
  });
  setUpdated(false);
  await getAllBookList();
  }
  console.log(data);
      }else{

        const {data}=await  bookBaseURL.put('/updatebook',bookform);
  if(data?.Success){
    alert(data?.Message);
    setBookform({
    BookName:"",
    BookAuthor:"",
    BookTitle:"",
    BookPrice:"",
    PublishDate:"",
    Id:""
  })
  }
 setUpdated(false)
      }

      
  
    }catch(error){
      console.log(error);
      
    }
  }

  const handleDelete=async(id)=>{
  console.log("he");
  
    try {

      const {data}=await bookBaseURL.post("deletebook",{
        Id:id,
      })

      if(data?.Success){
        window.alert(data?.Message);
        await getAllBookList();
       
      }
      
    } catch (error) {
       console.log(error);
       
    }

  }

  const handleUpdate=(data)=>{
    
    setBookform({
      BookName:data?.BookName,
    BookAuthor:data?.BookAuthor,
    BookTitle:data?.BookTitle,
    BookPrice:data?.BookPrice,
    PublishDate:data?.PublishDate,
    Id:data?._id
    })

    setUpdated(true)
  }
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Add a Book</h1>

      <form className="bg-white shadow-md rounded-md p-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          
          {/* Book Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Book Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter book name"
              name='BookName'
              value={bookform.BookName}
              onChange={handleChangeForm}
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter author"
              name='BookAuthor'
              value={bookform.BookAuthor}
              onChange={handleChangeForm}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter title"
              name='BookTitle'
              value={bookform.BookTitle}
              onChange={handleChangeForm}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="$0.00"
              name='BookPrice'
              value={bookform.BookPrice}
              onChange={handleChangeForm}
            />
          </div>

          {/* Publish Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2"
             name='PublishDate'
              value={bookform.PublishDate}
              onChange={handleChangeForm}
            />
          </div>

        </div>

        <div className="mt-6">
          <button
            type="button"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
           onClick={handleSubmit}
          >
            Submit
          </button>

          {/* submitted for */}
            {/* Static Table */}
       <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Submitted Books</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="px-4 py-2 border-b">Book Name</th>
                <th className="px-4 py-2 border-b">Author</th>
                <th className="px-4 py-2 border-b">Title</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Publish Date</th>
                <th className="px-4 py-2 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
            {
              bookList?.map((book,index)=>{
                return <tr key={index}>
                <td className="px-4 py-2 border-b">{book?.BookName}</td>
                <td className="px-4 py-2 border-b">{book?.BookAuthor}</td>
                <td className="px-4 py-2 border-b">{book?.BookTitle}</td>
                <td className="px-4 py-2 border-b">{book?.BookPrice}</td>
                <td className="px-4 py-2 border-b">{book?.PublishDate}</td>
                <td className="px-4 py-2 border-b text-center space-x-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm" onClick={()=>handleUpdate(book)} >
                    Update
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm" onClick={()=>{handleDelete(book._id)}}>
                    Delete
                  </button>
                </td>
              </tr>
              })
            }
              

              {/* Add more static rows if needed */}
            </tbody>
          </table>
        </div>
      </div>
        </div>
      </form>
    </div>
  )
}

export default Home
