import axios from "axios";
import { useState } from "react";

export default function UploadImage() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "your-folder-name");
    setLoading(true);

    const res = await axios.get("your-url", data);

    const file = await res.json();
    console.log(file);
  };
  const previewImage = (e) => {
    const file = e.target.files[0]; // get from list (even though the input doesn't support multiple files)
    const localImageSrc = URL.createObjectURL(file);
    setImagePreview(<img src={localImageSrc} />);
  };

  return (
    <div>
      <h1>Cloudinary Upload</h1>
      <input type="file" name="file" placeholder="drag it here" onChange={uploadImage} />
      <div>
        <h3>image Preview</h3>
        {imagePreview ? imagePreview : <p>No image selected</p>}
      </div>
    </div>
  );
}
