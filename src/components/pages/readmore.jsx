import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/config.js";
import { useNavigate } from "react-router-dom";

export const Readmore = () => {
  const docid = useSelector((state) => state.doc.documentid);
  const status = useSelector((state) => state.doc.status);
  const [userdoc, setuserdoc] = useState();
  const [image, setimage] = useState();
  
  const navigate = useNavigate();
  
  useEffect(() => {
    service.getDocument(docid).then((response) => {
      setuserdoc(response);

      service.getImage(response.FEATURED_IMAGE).then((response) => {
        setimage(response.href);
      });
    });
  }, [docid]);
  
  useEffect(()=>{
    if(!status){
    
      navigate("/")
    }},[status])
    
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="max-w-5xl mx-auto p-6 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg shadow-lg">
          {userdoc === undefined ? (
            <div className="flex justify-center items-center h-60">
              <span className="text-xl text-gray-400">Loading...</span>
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden bg-gray-900">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-4xl font-extrabold capitalize">{userdoc.TITLE}</h2>
              </div>
              
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-4">
                  <img
                    src={image}
                    alt="Featured"
                    className="w-full h-auto object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                  />
                </div>
                <div className="w-full md:w-1/2 p-4 overflow-auto text-lg leading-relaxed">
                  <p>{userdoc.CONTENT}</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-800 border-t border-gray-700 flex items-center justify-center   " >
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    userdoc.STATUS === "true" ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {userdoc.STATUS === "true" ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  
};
