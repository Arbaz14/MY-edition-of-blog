import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import service from "../appwrite/config.js";
import { useNavigate } from "react-router-dom";

export const Post = () => {
  const docid = useSelector((state) => state.doc.documentid);
  const [userdoc, setuserdoc] = useState();
  const [image, setimage] = useState();
  const [imageid, setimageid] = useState()
  
  const navigate = useNavigate();
  useEffect(() => {
    service.getDocument(docid).then((response) => {
      console.log(response.TITLE);
      setuserdoc(response);
      setimageid(response.FEATURED_IMAGE);

      service.getImage(response.FEATURED_IMAGE).then((response) => {
        console.log(response);
        setimage(response.href);
      });
    });
  }, []);
  console.log("docid is", docid);
  console.log(userdoc);

  return (
    <>
      {userdoc === undefined ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="flex flex-col items-center h-[40vw] text-white m-4 bg-black">
          <div className="self-start font-black text-[2vw] leading-9 block w-full h-16  capitalize">
            {userdoc.TITLE}
          </div>
          <div className="flex justify-evenly flex-row  h-[30vw] w-full">
            <div className=" w-full">
              <img
                src={image}
                alt="image not found"
                className="w-full h-full object-contain"
              />
            </div>
            <div  className="  p-6 w-full overflow-auto text-[1.5vw] leading-7">
              {userdoc.CONTENT}
            </div>
          </div>
          <div className="flex justify-evenly w-full bg-aquamarine h-[3vw]">
            <div className="flex items-center justify-center w-full">
              {userdoc.STATUS === "true" ? (
                <h1>isactive</h1>
              ) : (
                <h1> nonactive</h1>
              )}
              {console.log(String(userdoc.STATUS))}
            </div>
            <div className="flex items-center justify-start flex-row bg-blue w-full">
              <div className="flex items-center justify-start flex-row bg-blue w-full">
                <button
                  className="w-52 h-8 bg-[#000] text-[1.4vw] leading-7 border-[2px] border-red-800 capitalize"
                  onClick={() => navigate("/edit")}
                >
                  edit
                </button>
              </div>
              <div className="flex items-center justify-start flex-row bg-blue w-full">
                <button
                  className="w-52 h-8 bg-[#000] text-[1.4vw] leading-7 border-[2px] border-red-800  capitalize"
                  onClick={() =>
                    service.deleteDocument(docid).then(() => {
                      service.deleteImage(imageid).then((res) => {
                        console.log(res);
                      }).catch((err) => {
                        console.log(err);
                      })


                      navigate("/My-post");
                    })
                  }
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
