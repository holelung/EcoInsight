import { useCurrentEditor } from "@tiptap/react";
import { useRef } from "react";
import { MdImage } from "react-icons/md";

const ImageUploader = () => {
  const fileInputRef = useRef(null);
  const { editor } = useCurrentEditor();

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      editor.chain().focus().setImage({ src: base64 }).run();
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="px-3 py-1 rounded border bg-white text-black text-lg"
      >
        <MdImage />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileChange}
        style={{ display: "none"}}
      />
    </div>
  );
}
export default ImageUploader;