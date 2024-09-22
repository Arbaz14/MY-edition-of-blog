import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

export const Post = () => {
  const docid = useSelector((state) => state.doc.documentid);
  const status = useSelector((state) => state.doc.status);
  const [userdoc, setuserdoc] = useState();
  const [image, setimage] = useState();
  const [imageid, setimageid] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    service.getDocument(docid).then((response) => {
      setuserdoc(response);
      setimageid(response.FEATURED_IMAGE);
      service.getImage(response.FEATURED_IMAGE).then((response) => {
        setimage(response.href);
      });
    });
  }, [docid]);
  useEffect(() => {
    if (!status) {
      navigate("/");
    }
  }, [status]);

  return (
    <div className="bg-black">
      <div className="max-w-5xl mx-auto p-6 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg shadow-lg">
        {userdoc === undefined ? (
          <div className="flex justify-center items-center h-60 ">
            <span className="text-xl text-gray-400">Loading...</span>
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden bg-gray-900">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-4xl font-extrabold capitalize">
                {userdoc.TITLE}
              </h2>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-4">
                <img
                  src={image}
                  alt="Featured"
                  className="w-full h-full object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                />
              </div>
              <div className="w-full md:w-1/2 p-4 overflow-auto text-lg leading-relaxed">
                <p>{userdoc.CONTENT && parse(userdoc.CONTENT)}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-800 border-t border-gray-700 flex justify-between">
              <div className="flex items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    userdoc.STATUS === "true"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {userdoc.STATUS === "true" ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex gap-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105"
                  onClick={() => navigate("/edit")}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105"
                  onClick={() => {
                    service.deleteDocument(docid).then(() => {
                      service.deleteImage(imageid).then(() => {
                        navigate("/My-post");
                      });
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
