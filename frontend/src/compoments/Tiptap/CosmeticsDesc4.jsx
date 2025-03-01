import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import style from './TextEditor.module.scss'
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../redux/productSlice";
import MenuBar from "./MenuBar";



export const CosmeticsDesc4 = ({onReset}) => {
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product.product);



  function removePTagsFromLists(html) {
    // Usuwamy wszystkie znaczniki <p> oraz </p> pomiędzy <ul> i </ul> oraz <ol> i </ol>
    return html.replace(/(<ul[\s\S]*?>|<ol[\s\S]*?>)([\s\S]*?)(<\/ul>|<\/ol>)/g, (match, openTag, content, closeTag) => {
      // Usuwamy znaczniki <p> oraz </p> tylko wewnątrz list
      const cleanedContent = content.replace(/<\/?p>/g, "");
      console.log('test')
      // Zwracamy całą strukturę z wyczyszczonymi <p>
      return `${openTag}${cleanedContent}${closeTag}`;
    });
  }

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: productData.cosmeticsDescription4 || "",

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      const cleanedHtml = removePTagsFromLists(html);

      dispatch(updateProduct({ cosmeticsDescription4: cleanedHtml }));
      // console.log(cleanedHtml);
    },
  });
  useEffect(() => {
    // Resetowanie zawartości edytora w przypadku zmiany produktu
    if (productData.cosmeticsDescription4 !== editor.getHTML()) {
      editor.commands.setContent(productData.cosmeticsDescription4 || "");
    }
  }, [productData.cosmeticsDescription4, editor]);

  useEffect(() => {
    if (onReset && editor) {
      editor.commands.setContent(''); // Resetuj zawartość edytora
      dispatch(updateProduct({ shortDescription: '' })); // Resetuj stan Redux
    }
  }, [onReset, editor, dispatch]);

  return (
    <div className={style.textEditorContainer}>
      <h4>Akapit 4</h4>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
