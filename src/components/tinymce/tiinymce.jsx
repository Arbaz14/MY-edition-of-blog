import { Editor } from "@tinymce/tinymce-react";
import { textarea } from "framer-motion/client";
export const Tinymc = ({ getvalue, initial }) => {
  return (
    <>
      <Editor
        apiKey="e851eedz4zstympr60wsd275z2icm9160vp677nggv166fls"
        initialValue={
          initial || "<p>This is the initial content of the editor aa.</p>"
        }
        onEditorChange={(e) => {
          if (typeof getvalue === "function") {
            getvalue(e);
          }
        }}
        init={{
          height: 500,
          menubar: false,
          selector: textarea,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body {  background-color:  font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
};
