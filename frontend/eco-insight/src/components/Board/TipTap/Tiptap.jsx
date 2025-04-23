import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import ResizeImage from "tiptap-extension-resize-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Paragraph from "@tiptap/extension-paragraph";
import { EditorContent, EditorProvider, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdStrikethroughS,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatColorText,
  MdFormatUnderlined,
  MdFormatAlignJustify,
  MdImage,
  MdCode,
} from "react-icons/md";
import { RiH1, RiH2, RiH3 } from "react-icons/ri";
import { FaQuoteLeft, FaTable } from "react-icons/fa";
import Separate from "../../Seperate/Seperate";
import axios from "axios";


const MenuBar = ({ editor }) => {
  const [textColor, setTextColor] = useState("");
  const handleColorChange = (e) => {
    setTextColor(e.target.value);
  };


// useRef
  const insertImageFromFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData;
      formData.append("file", file);

      axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `bearer `
        }
      })
      .then(response => {
        console.log(response.data);
        const imageUrl = response.data.url;
        editor.chain().focus().setImage({ src: imageUrl }).run();
      }).catch(error => {
        console.log("이미지 업로드 실패", error);
      });
      // base64
      // const reader = new FileReader();
      // reader.onload = () => {
      //   const base64 = reader.result;
      //   editor.chain().focus().setImage({ src: base64 }).run();
      // };
      // reader.readAsDataURL(file);
    };
  };


  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4 text-lg items-center border-b pb-3">
      {/* Image */}
      <button
        onClick={insertImageFromFile}
        className="px-2 py-1 rounded border bg-white text-black"
      >
        <MdImage />
      </button>
      <Separate />
      {/* Text Format */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-2 py-1 rounded border ${
          editor.isActive("bold")
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        <MdFormatBold className="text-lg" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`px-2 py-1 rounded border ${
          editor.isActive("italic")
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        <MdFormatItalic className="text-lg" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-2 py-1 rounded border ${
          editor.isActive("underline")
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        <MdFormatUnderlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`px-2 py-1 rounded border ${
          editor.isActive("strike")
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        <MdStrikethroughS className="text-lg" />
      </button>
      {/* 색상 */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => editor.chain().focus().setColor(textColor).run()}
          className={`px-2 py-1 rounded border`}
        >
          <MdFormatColorText className="text-lg" />
        </button>
        <input
          type="color"
          onChange={handleColorChange}
          className="w-7 h-7 p-0 border rounded cursor-pointer"
          title="텍스트 색상 선택"
        />
      </div>
      <Separate />
      {/* heading */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 rounded border ${
          editor.isActive("heading", { level: 1 })
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        <RiH1 className="text-lg" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 rounded border ${
          editor.isActive("heading", { level: 2 })
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        <RiH2 className="text-lg" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-2 py-1 rounded border ${
          editor.isActive("heading", { level: 3 })
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        <RiH3 className="text-lg" />
      </button>
      <Separate />
      {/* Align */}
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`px-2 py-1 rounded border ${
          editor.isActive({ textAlign: "left" })
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        <MdFormatAlignLeft />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`px-2 py-1 rounded border ${
          editor.isActive({ textAlign: "center" })
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        <MdFormatAlignCenter />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`px-2 py-1 rounded border ${
          editor.isActive({ textAlign: "right" })
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        <MdFormatAlignRight />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`px-2 py-1 rounded border ${
          editor.isActive({ textAlign: "justify" })
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        <MdFormatAlignJustify />
      </button>
      <Separate />
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-2 py-1 rounded border ${
          editor.isActive("blockquote")
            ? "bg-blue-400 text-white"
            : "bg-white text-black"
        }`}
      >
        <FaQuoteLeft />
      </button>
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        className="px-2 py-1 rounded border"
      >
        <FaTable />
      </button>
    </div>
  );
};

const extensions = [
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableCell,
  TableHeader,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  Underline,
  Heading.configure({ levels: [1, 2, 3] }),
  Image.configure({
    inline: false,
    allowBase64: true,
  }),
  ResizeImage,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
  }),
  StarterKit.configure({
    heading: false, // disable heading inside StarterKit
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const content = ``;

const Tiptap = ({setContent}) => {
  const editor = useEditor({
    extensions,
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    }
  })

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose max-w-none min-h-[400px] border-2 rounded-lg border-gray-400"
      />
    </div>
  );
};

export default Tiptap;
