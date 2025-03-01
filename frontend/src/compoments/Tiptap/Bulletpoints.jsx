import React, { useEffect } from "react";
import style from './TextEditor.module.scss'
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../redux/productSlice";
import MenuBar from "./MenuBar";

export const Bulletpoints = ({ initialContent }) => {
  const dispatch = useDispatch();

  function removePTagsFromLists(html) {
    // Usuwamy wszystkie znaczniki <p> oraz </p> pomiędzy <ul> i </ul> oraz <ol> i </ol>
    return html.replace(
      /(<ul[\s\S]*?>|<ol[\s\S]*?>)([\s\S]*?)(<\/ul>|<\/ol>)/g,
      (match, openTag, content, closeTag) => {
        // Usuwamy znaczniki <p> oraz </p> tylko wewnątrz list
        const cleanedContent = content.replace(/<\/?p>/g, "");
        // Zwracamy całą strukturę z wyczyszczonymi <p>
        return `${openTag}${cleanedContent}${closeTag}`;
      }
    );
  }

  const productData = useSelector((state) => state.product.product);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: initialContent || productData.bulletpoints || "",

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      const cleanedHtml = removePTagsFromLists(html);

      dispatch(updateProduct({ bulletpoints: cleanedHtml }));
    },
  });

  useEffect(() => {
    if (editor && productData.bulletpoints !== editor.getHTML()) {
      editor.commands.setContent(productData.bulletpoints || "");
    }
  }, [productData.bulletpoints, editor]);

  return (
    <div className={style.textEditorContainer}>
      <h4>Dlaczego warto stosować?</h4>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
