import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import api from "../../apis/api";
import FormField from "../../components/forms/FormField";

function BookEdit(props) {
  const [userData, setUserData] = useState({
    title: "",
    author: "",
    synopsis: "",
    releaseYear: "",
    genre: "",
    picture: new File([], ""),
    coverimage: "",
  });

  //Loading
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function user() {
      try {
        const response = await api.get(`/detail-book/${id}`);
        const coverImage = await handleFileUpload(userData.picture);

        setUserData({ ...userData, coverImage, ...response.data });
      } catch (e) {
        console.log(e);
      }
    }
    user();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleChange(e) {
    if (e.target.files) {
      return setUserData({
        ...userData,
        [e.target.name]: e.target.files[0],
      });
    }
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function handleFileUpload(file) {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", file);

      const response = await api.post("/upload", uploadData);
      console.log(response);

      return response.data.url;
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const coverImage = await handleFileUpload(userData.picture);
      const response = await api.patch(
        `/update-book/${id}`,
        userData,
        coverImage
      );

      console.log(response);
      setLoading(false);

      navigate("/");
    } catch (err) {
      setLoading(false);
      console.error(err);
      if (err.response) {
        console.error(err.response);
      }
    }
  }

  return (
    <div className="container">
        
      <form onSubmit={handleSubmit}>
        <div className="titulo">
          <h1>New Book</h1>
        </div>

        
        <div className=" mb-3 ">
          <FormField
            label="Title"
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={userData.title}
            required
            readOnly={loading}
          />
        </div>

        
        <div className=" mb-3">
          <FormField
            label="Authot"
            type="text"
            id="author"
            name="author"
            onChange={handleChange}
            value={userData.author}
            required
            readOnly={loading}
          />
        </div>

        
        <div className=" mb-3">
          <FormField
            label="Synopsis"
            type="text"
            id="synopsis"
            name="synopsis"
            onChange={handleChange}
            value={userData.synopsis}
            required
            readOnly={loading}
          />
        </div>

        
        <div className="mb-3">
          <FormField
            label="Ano"
            id="releaseYear"
            name="releaseYear"
            onChange={handleChange}
            value={userData.releaseYear}
            required
            readOnly={loading}
          />
        </div>

       
        <div className=" mb-3">
          <FormField
            label="Gênero"
            id="genre"
            name="genre"
            onChange={handleChange}
            value={userData.genre}
            required
            readOnly={loading}
          />
        </div>

        <div class=" mb-3">
          <FormField
            type="file"
            label="Image"
            id="productFormPicture"
            name="picture"
            onChange={handleChange}
            readOnly={loading}
          />
        </div>

        <div>
          <button disabled={loading} type="submit" className="btn btn-primary mb-3">
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </>
            ) : null} 
              Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookEdit;