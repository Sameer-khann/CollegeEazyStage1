import React, { useState } from 'react';
import axios from 'axios';

export default function ItemAdd2() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [itemCategory, setitemCategory] = useState({
        Description: '',
        Contact: '',
        Title: '',
        Price: '',
        Category: '',
        ProductImage: null
    });

    const handleChange = (event) => {
        setitemCategory({
            ...itemCategory,
            [event.target.name]: event.target.value
        });
    };

    const handlePhotoChange = (event) => {
        setSelectedPhoto(event.target.files[0]);
    };

    const submitForm = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('Description', itemCategory.Description);
        formData.append('Contact', itemCategory.Contact);
        formData.append('Title', itemCategory.Title);
        formData.append('Price', itemCategory.Price);
        formData.append('Category', itemCategory.Category);
        formData.append('ProductImage', selectedPhoto);

        try {
            const response = await axios.post(
                'http://localhost:8080/collegeazy/shop',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log('Image uploaded successfully:', response.data);
            alert('Your product was listed successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('An error occurred while uploading the image.');
        }
    };

    return (
        <>
            <div className="storeModel">
                <form onSubmit={submitForm}>
                    {/* Form fields */}
                    {/* ... */}


                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input name='Description' onChange={handleChange} value={itemCategory.Description} className="form-control" aria-describedby="emailHelp" type="text" placeholder="" />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contact</label>
                        <input className="mb-3" name='Contact' onChange={handleChange} value={itemCategory.Contact} type="text" placeholder="It can be Phone number, Email ID or any other Contact detail" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input className="form-control mb-3" name='Title' onChange={handleChange} value={itemCategory.Title} type="text" placeholder="" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input className="form-control mb-3" name='Price' onChange={handleChange} value={itemCategory.Price} type="number" placeholder="Enter amount in INR" />
                    </div>
                    <select name='Category' value={itemCategory.value} onChange={handleChange} style={{ margin: "10px 10px 10px 0", height: "2rem" }}>
                        <option value="Categoryy">Category</option>
                        <option value="BOOKS">BOOKS</option>
                        <option value="STATIONERY">STATIONERY</option>
                        <option value="TOOLS">TOOLS</option>
                        <option value="Other">Other</option>
                    </select>

                    <div className="mb-3">
                        <label className="form-label">Product Image</label>
                        <input
                            className="form-control mb-3"
                            name="ProductImage"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            placeholder="Select an Image for preview"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}
