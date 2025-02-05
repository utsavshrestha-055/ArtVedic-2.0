import React, { useState } from "react";

import { postDataToApi } from "../API/api";
import { useParams } from "react-router-dom";

const CommissionForm = () => {
  const { artist_email } = useParams();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();
  const [time, setTime] = useState();
  const [price, setPrice] = useState();
  const [contact, setContact] = useState();
  const [title, setTitle] = useState();
  const [img, setImg] = useState(null);

  const handleImgChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
  const handleContactChange = (e) => {
    setContact(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Img_Data = new FormData();
    Img_Data.append("files", img);
    try {
      let imageData = await postDataToApi("/api/upload", Img_Data, true);
      const imageId = imageData[0].id;
      const formData = {
        artist_email: artist_email,
        commission_by_email: localStorage.getItem("USER_EMAIL"),
        commission_by_name: localStorage.getItem("USER_NAME"),
        time: time,
        price: price,
        description: description,
        reference: imageId,
        address: address,
        contact: contact,
      };
      console.log(formData);

      let { data } = await postDataToApi("/api/commissions", formData, false);
      if (data) {
        alert("Hire Request Sent");
      }
    } catch (error) {}

    window.location.reload();
  };
  return (
    <div className="absolute top-0 bottom-0 right-0 z-100">
      <div>
        <div>
          <div className="relative flex items-center justify-center min-h-screen ">
            <div className=" w-full p-10 bg-[#1E2433] rounded-xl z-10">
              <div className="text-center">
                <h2 className="mt-5 text-3xl font-bold text-gray-200">
                  UPLOAD YOUR ART!
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <form onSubmit={handleSubmit} className="mt-8 space-y-3">
                <div className="grid grid-cols-1 space-y-2">
                  <label className="mb-2 text-sm font-bold tracking-wide text-gray-500">
                    Address
                  </label>
                  <input
                    className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="text"
                    name="name"
                    placeholder="Address"
                    value={address}
                    onChange={handleAddressChange}
                  />

                  <label className="text-sm font-bold tracking-wide text-gray-500 ">
                    DESCRIPTION
                  </label>
                  <input
                    className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="Describe your workshop in short"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                  <label className="text-sm font-bold tracking-wide text-gray-500 ">
                    Time of Completion
                  </label>
                  <input
                    className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="Ex: 18:00 (24 hour format)"
                    value={time}
                    onChange={handleTimeChange}
                  />

                  <label className="text-sm font-bold tracking-wide text-gray-500 ">
                    Price
                  </label>
                  <input
                    className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="number"
                    placeholder="price"
                    value={price}
                    onChange={handlePriceChange}
                  />
                  <label className="text-sm font-bold tracking-wide text-gray-500 ">
                    Contact
                  </label>
                  <input
                    className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="number"
                    placeholder="Link"
                    value={contact}
                    onChange={handleContactChange}
                  />
                </div>
                <div className="grid grid-cols-1 space-y-2">
                  <label className="text-sm font-bold tracking-wide text-gray-500">
                    ATTACH DOCUMENT
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col w-full p-10 text-center border-4 border-dashed rounded-lg">
                      <div className="flex flex-col items-center justify-center w-full h-full text-center cursor-pointer ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-20 text-blue-400 group-hover:text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-gray-500 pointer-none ">
                          <span className="text-sm text-blue-500 underline ">
                            CHOOSE THE REFERENCE IMAGE.
                          </span>
                        </p>
                        <input
                          type="file"
                          name="img"
                          onChange={handleImgChange}
                          className="justify-center hidden mt-4 text-center text-gray-500"
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    value="Submit"
                    className="px-8 py-2 mt-4 text-white border cursor-pointer"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionForm;
