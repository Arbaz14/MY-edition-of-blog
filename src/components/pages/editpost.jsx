import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import service from "../appwrite/config.js";
import { json, useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import "./createpost.css";
export const Editpost = () => {
  const { register, handleSubmit, setValue } = useForm();
  let data = useSelector((state) => state.doc.data);

  const docid = useSelector((state) => state.doc.documentid);
  const status = useSelector((state) => state.doc.status);
  const [userdoc, setuserdoc] = useState();
  const [imageid, setimageid] = useState()
  const [image, setimage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("docid is", data.data.$id );
    
    service.getDocument(docid).then((response) => {
      // console.log(response.TITLE)
      setuserdoc(response);
      setimageid(response.FEATURED_IMAGE);

      setValue("title", response.TITLE);
      setValue("description", response.CONTENT);
      setValue("status", response.STATUS);
      service.getImage(response.FEATURED_IMAGE).then((response) => {
        console.log("image is",response);
        setimage(response.href);
        // console.log(response)
      });
    });
  }, []);

  function submit(e) {
    console.log(e);
    if (e.image.length === 0) {
      console.log("image is undefined");
      console.log(docid);

      const updatedocument = service
        .updateDocument(docid, {
          TITLE: String(e.title),
          CONTENT: String(e.description),
          STATUS: String(e.status),
        })
        .then((res) => {
          console.log("update document respnse is ", res);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("created document is ", updatedocument);
    } else {
      service
        .uploadImage(e.image[0])
        .then((res) => {
          console.log(res.$id);
          const updatedocument = service
            .updateDocument(docid, {
              TITLE: String(e.title),
              CONTENT: String(e.description),
              FEATURED_IMAGE: String(res.$id),
              STATUS: String(e.status),
            })
            .then((res) => {
              console.log(res);
              navigate("/My-post");

              service.deleteImage(imageid).then((res) => {
                console.log(res);
              }).catch((err) => {
                console.log(err);
              })
            })
            .catch((err) => {
              console.log(err);
            });

          console.log("created document is ", updatedocument);

          return res.$id;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  console.log(status);

  return (
    <>
      {!status ? (
        <h1> login plese</h1>
      ) : userdoc === undefined ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <form onSubmit={handleSubmit(submit)}>
          <input type="text" placeholder="title" {...register("title")} />
          <input
            type="text"
            placeholder="description"
            {...register("description")}
          />
          <img src={image} alt="image not found" className="h" />

          <input type="file" placeholder="image" {...register("image")} />
          <select name="" id="" {...register("status")}>
            <option value={true}>isActive</option>
            <option value={false}>NonActive</option>
          </select>
          <input
            type="submit"
            placeholder="Submit"
            value={"submit"}
            {...register("submit")}
          />
        </form>
      )}{" "}
    </>
  );
};
