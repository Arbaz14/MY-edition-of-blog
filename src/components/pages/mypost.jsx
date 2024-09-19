import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import service from "../appwrite/config.js";
import { docid } from "../../store/docsslice.js";
import { Card, CardHeader, CardBody, Image, CardFooter, Button } from "@nextui-org/react";
import Tilt from 'react-parallax-tilt';
import { useNavigate } from "react-router-dom";

export const Mypost = () => {
  const [docs, setdocs] = useState();
  const [imagehref, setimagehref] = useState([]);
  const data = useSelector((state) => state.doc.data);
  const status = useSelector((state) => state.doc.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status) {
      service
        .getuserDocuments(data.data.$id)
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
          console.log(err);
        });
    }
  }, [status, data]);

  useEffect(()=>{
    if(!status){
    
      navigate("/")
    }},[status])
    
  return (
    <div className="flex flex-wrap dark gap-[0.5vw] justify-evenly items-start bg-gray-900 min-h-screen">
      {docs === undefined ? (
        <h1 className="text-white">Loading....</h1>
      ) : docs.documents.length === 0 ? (
        <h1 className="text-white">No post available</h1>
      ) : (
        docs.documents.map((element, index) => (
          <Tilt
            key={element.$id}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1000}
            scale={1.05}
            gyroscope={true}
            glareEnable={true}
            glareMaxOpacity={0.5}
            glareColor="lightblue"
            glarePosition="bottom"
            glareBorderRadius="1vw" // Rounded glare effect
          >
            <Card className="py-4 max-w-[90vw] md:max-w-[22vw] min-h-[300px] flex flex-col rounded-lg bg-gray-800 text-white shadow-lg transition-shadow duration-300 hover:shadow-2xl hover:shadow-[#00000080]">
              <CardHeader className="overflow-visible py-2">
                {imagehref[index] ? (
                  <Image
                    alt="Card background"
                    className="object-contain aspect-video rounded-t-lg"
                    src={imagehref[index]}
                    width={270}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </CardHeader>
            
              <CardBody className="pb-0 pt-2 px-4 flex flex-col flex-grow text-ellipsis overflow-hidden">
                <h4 className="font-bold text-lg text-ellipsis md:text-xl whitespace-nowrap overflow-hidden">{element.TITLE}</h4>
                <h1 className="text-xs md:text-sm uppercase font-bold text-ellipsis whitespace-nowrap overflow-hidden">
                  {element.CONTENT}
                </h1>
              </CardBody>
            
              <CardFooter className="p-[1.4vw] mt-auto rounded-b-lg">
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => {
                    navigate("/post");
                    dispatch(docid(element.$id));
                  }}
                >
                  Readmore
                </Button>
              </CardFooter>
            </Card>
          </Tilt>
        ))
      )}
    </div>
  );

  
};
