import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import service from "../appwrite/config.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tinymc } from "../tinymce/tiinymce.jsx";

export const Createpost = () => {
  const { register, handleSubmit } = useForm();
  const data = useSelector((state) => state.doc.data);
  const status = useSelector((state) => state.doc.status);
  const navigate = useNavigate();
  const [value, setvalue] = useState();
  function getvalue(value) {
    setvalue(value);
  }
  const submit = async (e) => {
    try {
      // Get user data
      const user = await service.getUser();
      // console.log("response of createpost", user);

      // Upload image
      const imageResponse = await service.uploadImage(e.image[0]);
      // console.log(imageResponse.$id);

      // Create document
      const documentResponse = await service
        .createDocument({
          TITLE: String(e.title),
          CONTENT: value,
          FEATURED_IMAGE: String(imageResponse.$id),
          STATUS: String(e.status),
          USER_ID: String(data.data.$id),
        })
        .then((res) => {
          // console.log(res);
          navigate("/My-post");
        });
      // console.log(documentResponse);

      return imageResponse.$id;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!status) {
      navigate("/");
    }
  }, [status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create a New Post
        </h2>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
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
            <Tinymc getvalue={getvalue} />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
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
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              id="status"
              {...register("status")}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-transform transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
