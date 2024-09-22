import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import service from "../appwrite/config.js";
import { docid } from "../../store/docsslice.js";
import Tilt from "react-parallax-tilt";
import parse from "html-react-parser";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionItem } from "@nextui-org/react";

export const Allpost = () => {
  const [list, setlist] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [docs, setdocs] = useState();
  const [imagehref, setimagehref] = useState([]);
  const data = useSelector((state) => state.doc.data);
  const status = useSelector((state) => state.doc.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setvalue] = useState();

  useEffect(() => {
    if (status) {
      service
        .listDocuments(data.data.$id)
        .then(async (res) => {
          setdocs(res);
          const FEATURED_IMAGE = res.documents.map(
            (element) => element.FEATURED_IMAGE
          );

          const imageURLs = await Promise.all(
            FEATURED_IMAGE.map(async (element) => {
              const imageRes = await service.getImage(element);
              return imageRes.href;
            })
          );

          setimagehref(imageURLs);
        })
        .catch((err) => {
          console.log("error is ", err);
        });
    } else {
      navigate("/");
    }
  }, [status]);

  return (
    <div className="flex flex-wrap dark gap-[1vw] justify-evenly items-start bg-gray-900 min-h-screen ">
      {docs === undefined ? (
        <h1 className="text-white">Loading....</h1>
      ) : docs.documents.length === 0 ? (
        <h1 className="text-white">No post available</h1>
      ) : (
        <>
          <div>
            <Button
              onPress={onOpen}
              className="border-none  mb-[2vw]"
              color="warning"
            >
              Search
            </Button>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              className="border-none sm:top-[-5vw] bottom-[30vw]"
            >
              <ModalContent className="border-none">
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-row gap-1 bg-black border-none">
                      <input
                        type="text"
                        className="bg-white rounded-[5vw] px-[1vw] h-[3] w-[70%] placeholder:text-black text-gray-600 text-[2vw]"
                        onChange={(e) => {
                          let val = e.target.value;
                          val = val.trim();
                          if (val.length > 0) {
                            console.log(e.target.value);
                          }
                          setvalue(val);
                        }}
                      />
                      <Button
                        className="w-[20%] text-white hover:text-black"
                        variant="ghost"
                        onClick={() => {
                          service.searchDocuments(value).then((e) => {
                            console.log("search document ", e.documents);
                            setlist(e.documents);
                          });
                        }}
                      >
                        {console.log("search list 1", list)}
                        Search
                      </Button>
                    </ModalHeader>
                    <div className="sm:h-[30vw] h-[50vw] overflow-x-hidden overflow-y-scroll text-ellipsis">
                      <ModalBody className="border-none flex flex-col">
                        {list !== undefined ? (
                          list.map((element, index) => (
                            <Accordion key={index} selectionMode="single">
                              <AccordionItem
                                key={index}
                                className=" overflow-hidden text-ellipsis max-h-[28vh]"
                                title={`${element.TITLE}`}
                              >
                                <Button
                                  color="secondary"
                                  onClick={() => {
                                    // console.log(element.$id);
                                    navigate("/readmore");
                                    dispatch(docid(element.$id));
                                  }}
                                >
                                  Read more
                                </Button>
                                <br />
                                {element.CONTENT}
                              </AccordionItem>
                            </Accordion>
                          ))
                        ) : (
                          <h1>No result found</h1>
                        )}
                      </ModalBody>
                    </div>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
          <div className="flex flex-wrap gap-[1vw] justify-evenly items-start bg-gray-900 min-h-screen ">
            {docs.documents.map((element, index) => (
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
                glareBorderRadius="1vw"
              >
                <Card className="py-4 max-w-[90vw] md:max-w-[22vw] min-h-[400px] flex flex-col rounded-lg bg-gray-800 text-white shadow-lg transition-shadow duration-300 hover:shadow-2xl hover:shadow-[#00000080] my-[1vw]">
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
                    <h4 className="font-bold text-lg text-ellipsis md:text-xl whitespace-nowrap overflow-hidden">
                      {element.TITLE}
                    </h4>
                    <h1 className="text-xs md:text-sm uppercase font-bold text-ellipsis whitespace-nowrap overflow-hidden">
                      {element.CONTENT && parse(element.CONTENT)}
                    </h1>
                  </CardBody>

                  <CardFooter className="p-[1.4vw] mt-auto rounded-b-lg">
                    <Button
                      color="primary"
                      variant="ghost"
                      onClick={() => {
                        navigate("/readmore");
                        dispatch(docid(element.$id));
                      }}
                    >
                      Readmore
                    </Button>
                  </CardFooter>
                </Card>
              </Tilt>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
