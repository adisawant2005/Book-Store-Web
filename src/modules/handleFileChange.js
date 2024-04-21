import axios from "axios";

const handleFileChange = (event, setImage) => {
  const imageFile = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const content = e.target.result;
    setImage(content);
  };

  reader.readAsDataURL(imageFile);
};

export default handleFileChange;
