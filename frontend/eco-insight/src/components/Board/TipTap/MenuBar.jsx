import { useCurrentEditor } from "@tiptap/react"

const MenuBar = () => { 
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group flex items-center justify-center gap-2 p-6 py-3 border-b-2 sm:gap-8">
      <div className="flex items-center justify-center gap-2">
        <Icon.H1 editor={editor} />
        <Icon.H2 editor={editor} />
        <Icon.H3 editor={editor} />
      </div>
    </div>
  );
}

export default MenuBar;