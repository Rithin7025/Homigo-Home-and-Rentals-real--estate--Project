import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
  import { useState,useEffect } from "react";
  import { app } from "../../firebase/firebase.js";
  import Leaflet from "../../components/User/Leaflet.jsx";
  import axios from "axios";
  import {useSelector} from 'react-redux'
  import { useNavigate,useParams } from "react-router-dom";
  
  
  export default function UpdateListingPage() {
    const params = useParams();
    const listingId = params.listingId
    const navigate = useNavigate();
    const [spinnerLoad, setSpinnerLoad] = useState(false);
    const [formError, setFormError] = useState(false);
    const currentUser = useSelector((state) => state.user)
    const [formData, setFormData] = useState({
      imageUrls: [],
      docsUrls: [],
      name: "",
      description: "",
      district: "",
      city: "",
      address: "",
      type: "rent",
      parking: false,
      furnished: false,
      offer: false,
      bedrooms: 1,
      bathrooms: 1,
      regularPrice: 0,
      discountPrice: 0,
    });
    const [imageUploadErrors, setImageUploadErrors] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState([]);


    useEffect(()=>{
       const fetchData =async ()=> {
           try {
            const res = await axios.get(`/api/listing/getListing/${listingId}`);
            console.log(res)
            const data = res.data
            console.log(data)
            setFormData({
                ...formData,
                ...data

            })
            setFormError(false)
            setSpinnerLoad(false)
           } catch (error) {
            console.log(error)
           }
            
       }

       fetchData()
    },[listingId])
  
    const handleImageSubmit = (e) => {
      if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
        const promises = [];
        setUploading(true);
        setImageUploadErrors(false);
        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
        }
        Promise.all(promises)
          .then((urls) => {
            setFormData({
              ...formData,
              //to keep the previous images , we concat it other wise it will replace
              imageUrls: formData.imageUrls.concat(urls),
            });
            setImageUploadErrors(false);
            setUploading(false);
          })
          .catch((error) => {
            setUploading(false);
            setImageUploadErrors("Image upload failed (2 mb max per image)");
          });
      } else if (files.length === 0) {
        setUploading(false);
        setImageUploadErrors("please upload images");
      } else {
        setUploading(false);
        setImageUploadErrors("Sorry ! you can only add 6 images");
      }
    };
  
    const storeImage = async (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        //to make a unique name for the file
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.byspinnerLoadransferred / snapshot.totalBytes) * 100;
            console.log(`upload is ${progress} completed`);
          },
  
          (error) => {
            reject(error);
          },
  
          //if no error we return the url
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
  
    
  
    console.log("---------------------------");
    console.log(formData);
    console.log("---------------------------");
  
    const handleDeleteImage = (index) => {
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
      });
    };
  
    const handleChange = (e) => {
      if (e.target.id === "sale" || e.target.id === "rent") {
        console.log("in");
        setFormData({
          ...formData,
          type: e.target.id,
        });
      }
  
      if (
        e.target.id === "parking" ||
        e.target.id === "furnished" ||
        e.target.id === "offer"
      ) {
        setFormData({
          ...formData,
          [e.target.id]: e.target.checked,
        });
      }
  
      if (
        e.target.type === "number" ||
        e.target.type === "text" ||
        e.target.type === "textarea"
      ) {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      }
    };
  
    const handleSubmit = async (e) => {
        console.log('called')
      e.preventDefault();
      try {
        if(formData.regularPrice < formData.discountPrice){
          return setFormError(`Discounted price cannot be lower tcreateListinghan regular price`)
        }
  
        if (formData.imageUrls.length < 1) {
          return setImageUploadErrors("please add images to continue");
        }
        
        setSpinnerLoad(true);
        setFormError(false);
        console.log('entred')
        const res = await axios.post(`/api/listing/updateUserListing/${listingId}`, formData);
   
    
        console.log(res,'here teh response')
        console.log(res._id,'heere is the id of the listing ')
        
        setSpinnerLoad(false);
        navigate('/notification')
      } catch (error) {
        setFormError(error.message);
        setSpinnerLoad(false);
      }
    };
    return (
      <main className={`relative  p-3 max-w-4xl mx-auto `}>
        <h1 className="font-semibold text-center my-7 text-3xl">Update Property</h1>
        <hr className="p-3"/>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6">
          {/**left div --------------------------------------------------------------*/}
          <div
            className={`opacity-${
              spinnerLoad ? 50 : 100
            } flex flex-col gap-4 flex-1 `}
          >
            <input
              type="text"
              placeholder="Name"
              id="name"
              maxLength="62"
              minLength="10"
              className="border focus:outline-slate-400 p-3 rounded-lg"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <textarea
              type="text"
              placeholder="Description"
              id="description"
              className="border  p-3 rounded-lg ocus:outline-slate-400 focus:outline-slate-400"
              onChange={handleChange}
              value={formData.description}
              required
            />
            <div className="flex gap-4 flex-col sm:flex-row sm:gap-2">
              <input
                type="text"
                className="p-3   rounded-lg  focus:outline-slate-400"
                onChange={handleChange}
                placeholder="District"
                id="district"
                value={formData.district}
                required
              />
              <input
                type="text"
                className="p-3 rounded-lg  focus:outline-slate-400"
                placeholder="City"
                onChange={handleChange}
                id="city"
                value={formData.city}
                required
              />
            </div>
  
            <input
              type="text"
              placeholder="Address"
              id="address"
              onChange={handleChange}
              value={formData.address}
              className="border p-3 rounded-lg focus:outline-slate-400"
              required
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type == "sale"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type == "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input  
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  className="p-3 border focus:outline-slate-400 rounded-lg"
                  onChange={handleChange}
                  value={formData.bedrooms}
                  required
                />
  
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  className="p-3 border focus:outline-slate-400 rounded-lg"
                  onChange={handleChange}
                  value={formData.bathrooms}
                  required
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  min="1000"
                  max="10000000"
                  type="number"
                  id="regularPrice"
                  className="p-3 border focus:outline-slate-400 rounded-lg "
                  onChange={handleChange}
                  value={formData.regularPrice}
                  required
                />
                <div className="flex flex-col items-center">
                  <p>Regular Price</p>
                  {formData.type === 'rent' && <span className="text-xs">(₹ / month)</span>}
                </div>
              </div>
              {formData.offer && 
              <div className="flex items-center gap-2">
              <input
                type="number"
                min="1000"
                max="1000000"
                id="discountPrice"
                className="p-3 border focus:outline-slate-400 rounded-lg"
                onChange={handleChange}
                value={formData.discountPrice}
                required
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                {formData.type === 'rent' && <span className="text-xs">(₹ / month)</span>}
              </div>
            </div>
              }
            </div>
          </div>
  
          {/**Right div ---------------------------------------------------------------*/}
          <div
            className={`opacity-${
              spinnerLoad ? 50 : 100
            } flex flex-col flex-1 gap-4`}
          >
            <p className="font-semibold">
              {" "}
              Images :
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (Max 6)
              </span>
            </p>
            <span className="text-xs text-slate-500 px-1">
              (please press <span className="text-red-700">upload </span>after choosing the images)
            </span>
            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                type="file"
                className="border w-full  border-gray-400 rounded p-3"
                id="image/*"
                multiple
              />
              <button
                type="button"
                onClick={handleImageSubmit}
                disabled={uploading}
                className="rounded hover:bg-sky-800   hover:shadow-lg p-3 border border-green-700 disabled:opacity-70 text-white bg-green-700 "
              >
                {uploading ? "uploading" : "upload"}
              </button>
            </div>
            <div className="flex items-center">
              {imageUploadErrors && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2 text-red-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              )}
              {imageUploadErrors && (
                <p className="text-red-700 text-sm font-semibold">
                  {imageUploadErrors}
                </p>
              )}
            </div>
  
            {formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between items-center border p-2"
              >
                <img
                  src={url}
                  alt="images"
                  className="w-16 h-16 rounded-lg shadow-lg object-contain"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="mr-6 text-red-700 hover:opacity-100 hover:font-semibold"
                >
                  Delete
                </button>
              </div>
            ))}
  
            <hr className="bg-gray-300  " />
            {/**The Map component */}
            <div>
              <Leaflet
                address={formData.address}
                city={formData.city}
                district={formData.district}
                country={"India"}
              />
            </div>
            <button
              disabled={spinnerLoad ||  uploading}
              className="p-3 rounded-lg bg-slate-800 text-white font-semibold uppercase hover:opacity-90 hover:shadow-lg disabled:opacity-80"
            >
              {spinnerLoad ? "Property Listing" : "Update property"}
            </button>
          </div>
        </form>
        {/**Spinner */}
  
        {spinnerLoad && (
          <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </main>
    );
  }
  