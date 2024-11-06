import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/productSlice";
import MenuBar from "./MenuBar";


export const ResponsibleEntity = ({ setDescription }) => {
  const dispatch = useDispatch()

  function mergeParagraphsToSingleWithBreaks(input) {
    // Znajdź wszystkie treści wewnątrz znaczników <p>...</p>
    const matches = input.match(/<p>(.*?)<\/p>/g);
  
    if (!matches) {
      return input; // Jeśli nie znaleziono znaczników <p>, zwróć oryginalny kod
    }
  
    // Usuń znaczniki <p> i </p> z każdego fragmentu, a następnie połącz je przy użyciu <br/>
    const mergedContent = matches
      .map(p => p.replace(/<\/?p>/g, ''))
      .join('<br>');
  
    // Umieść złączoną treść wewnątrz jednego znacznika <p>...</p>
    return `${mergedContent}`;g
  }

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: ``,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log(`${html}: 'first'`)

      const blHtml = html;
      const shopHtml = mergeParagraphsToSingleWithBreaks(html);

      dispatch(updateProduct({ responsibleEntity: { shop: shopHtml, bl: blHtml } }));
      console.log(html);
      setDescription(html);
    },
  });

  return (
    <>
      <h4>Podmiot odpowiedzialny</h4>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
};
