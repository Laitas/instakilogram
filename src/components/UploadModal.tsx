import Image from "next/image";
import { useState, useRef, ChangeEvent } from "react";
import useOnClickOutside from "../hooks/useOutsideClick";

const UploadModal = ({ closeModal }: { closeModal: () => void }) => {
  const [file, setFile] = useState<File>();
  const ref = useRef(null);
  useOnClickOutside(ref, closeModal);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };
  console.log(file);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60">
      <dialog ref={ref} open className="fixed inset-0 rounded-md">
        {file ? (
          <div className="flex flex-col gap-6">
            <div className="w-[50vh] h-[50vh] relative">
              <Image alt="" src={URL.createObjectURL(file)} layout="fill" />
            </div>
            <textarea className="shadow" placeholder="Description" name="" />
            <div className="grid grid-cols-2 gap-2">
              <button className="shadow px-1 py-2">Upload</button>
              <button className="shadow px-1 py-2 bg-red-500 text-white">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <label className="relative cursor-pointer">
            Upload
            <input
              type="file"
              className="invisible absolute inset-0"
              onChange={handleChange}
            />
          </label>
        )}
      </dialog>
    </div>
  );
};

export default UploadModal;
