import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import service from "../appwrite/config.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tinymc } from "../tinymce/tiinymce.jsx";

export const Editpost = () => {
  const { register, handleSubmit, setValue } = useForm();
  const docid = useSelector((state) => state.doc.documentid);
  const status = useSelector((state) => state.doc.status);
  const [userdoc, setuserdoc] = useState();
  const [imageid, setimageid] = useState();
  const [image, setimage] = useState();
  const navigate = useNavigate();
  const [content, setcontent] = useState();
  function getvalue(document) {
    setcontent(document);
  }
  useEffect(() => {
    service.getDocument(docid).then((response) => {
      setuserdoc(response);
      setimageid(response.FEATURED_IMAGE);
      setValue("title", response.TITLE);
      setValue("status", response.STATUS);

      service.getImage(response.FEATURED_IMAGE).then((response) => {
        setimage(response.href);
      });
    });
  }, []);

  useEffect(() => {
    if (!status) {
      navigate("/");
    }
  }, [status]);

  const submit = async (e) => {
    try {
      if (e.image.length === 0) {
        await service.updateDocument(docid, {
          TITLE: String(e.title),
          CONTENT: content,
          STATUS: String(e.status),
        });
        navigate("/My-post");
      } else {
        const imageResponse = await service.uploadImage(e.image[0]);
        await service.updateDocument(docid, {
          TITLE: String(e.title),
          CONTENT: content,
          FEATURED_IMAGE: String(imageResponse.$id),
          STATUS: String(e.status),
        });
        await service.deleteImage(imageid);
        navigate("/My-post");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 text-white rounded-lg shadow-lg">
        {!status ? (
          <h1 className="text-center text-red-500">Please log in</h1>
        ) : userdoc === undefined ? (
          <h1 className="text-center text-blue-500">Loading...</h1>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Post</h2>
            <form onSubmit={handleSubmit(submit)} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter title"
                  {...register("title")}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Description
                </label>
                <Tinymc initial={userdoc.CONTENT} getvalue={getvalue} />
              </div>
              {image && (
                <div className="my-4">
                  <img
                    src={image}
                    alt="Featured"
                    className="w-full h-auto max-h-64 object-contain rounded-md"
                    f
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium mb-1"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  {...register("image")}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium mb-1"
                >
                  Status
                </label>
                <select
                  id="status"
                  {...register("status")}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-transform transform hover:scale-105"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
