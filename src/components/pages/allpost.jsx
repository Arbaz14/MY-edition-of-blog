
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import service from "../appwrite/config.js";
import {docid} from "../../store/docsslice.js";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export const Allpost = () => {
  const [docs, setdocs] = useState();
  const [imagehref, setimagehref] = useState([]);
  const data = useSelector((state) => state.doc.data);
  const status = useSelector((state) => state.doc.status);
const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    if (status) {
      service
        .listDocuments(data.data.$id)
        .then(async (res) => {
          setdocs(res);
          console.log(res);

          const FEATURED_IMAGE = res.documents.map(
            (element) => element.FEATURED_IMAGE
          );
          

          // Get image URLs for each featured image
          const imageURLs = await Promise.all(
            FEATURED_IMAGE.map(async (element) => {
              const imageRes = await service.getImage(element);
              return imageRes.href;
            })
          );

          // Update state once all image URLs are fetched
          setimagehref(imageURLs);
          console.log(imagehref);
        })
        .catch((err) => {
          console.log("error is ",err);
        });
    }
  }, [status, data]);

  return (
    <div className="flex justify-evenly items-end content-center flex-wrap gap-[0.5vw] relative z-[1]
">
      {docs === undefined ? (
        <h1>Loading....</h1>
      ) : docs.documents.length === 0 ? (
        <h1>No post available</h1>
      ) : (


        docs.documents.map((element, index) => {
          return (
            <div key={element.$id} >
              {/* <h1 className="text-red-700">{element.TITLE}</h1>
              <p>{element.CONTENT}</p>
              {imagehref[index] ? (
                <img src={imagehref[index]} alt="Image not found" />
              ) : (
                <p>No image available</p>
              )} */}




<Card className="max-w-[24rem] overflow-hidden "  >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        {imagehref[index] ? (
                <img src={imagehref[index]} alt="Image not found"  />
              ) : (
                <p>No image available</p>
              )}
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray">
        {element.TITLE}
        </Typography>
        <Typography variant="lead" color="gray" className="mt-3 font-normal">
        {element.CONTENT}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
         {/* <Button className=" border-solid border-2 border-red-400 cursor-pointer" onClick={navigate('/Read-more')} > Read more</Button>
         <Button className=" border-solid border-2 border-red-400 cursor-pointer" onClick={navigate('/e')}> edit</Button>
         <Button className=" border-solid border-2 border-red-400 cursor-pointer" onClick={navigate('/delet')}> delet</Button> */}
          <button onClick={() => {console.log("document id is",element.$id)
            dispatch(docid(element.$id))
            navigate('/readmore')
          }}> readmore</button>
        </div>
      </CardFooter>
    </Card>








            </div>

              


          );
        })
      )}
    </div>
  );
};
