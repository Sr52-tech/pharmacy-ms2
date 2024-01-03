import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Paper, Switch, FormControlLabel } from '@mui/material';
import { db, storage } from '../firebase-config';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem } from '@mui/material';
import Prescription from './Prescription';
import { ToastContainer, toast } from 'react-toastify';
export const AddProducts = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        id: uuidv4(),
        name: '',
        price: '',
        quantity: '',
        description: '',
        image: null,
        category: '',
        prescription: false
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        console.log('handleChange called with value:', e.target.value);
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        console.log('handleImageChange called with file:', e.target.files[0]);
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

            if (!allowedTypes.includes(selectedFile.type)) {
                setErrors({
                    ...errors,
                    image: 'Only PNG, JPEG, or JPG images are allowed',
                });
                return;
            }

            setProduct({
                ...product,
                image: selectedFile,
            });
            setErrors({
                ...errors,
                image: null,
            });
        }
    };

    const handlePrescriptionChange = (event) => {
        setProduct({
            ...product,
            prescription: event.target.checked,
        });
    };

    const handleSubmit = async (e) => {
        console.log('handleSubmit called');
        e.preventDefault();

        const newErrors = {};
        if (!product.name.trim()) {
            newErrors.name = 'Product name is required';
        }
        if (!product.price.trim()) {
            newErrors.price = 'Product price is required';
        } else if (isNaN(product.price) || +product.price < 0) {
            newErrors.price = 'Price must be a non-negative number';
        }
        if (!product.quantity.trim()) {
            newErrors.quantity = 'Product quantity is required';
        } else if (isNaN(product.quantity) || +product.quantity < 0) {
            newErrors.quantity = 'Quantity must be a non-negative number';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            // Handle image upload to Firebase Storage
            const storageRef = ref(storage, `product-images/${product.id}`);
            await uploadBytes(storageRef, product.image).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });

            // Get the download URL for the uploaded image
            const imageUrl = await getDownloadURL(storageRef);
            console.log('Image uploaded, URL:', imageUrl);

            // Add product data to Firestore with the generated UUID and image URL
            await addDoc(collection(db, "products"), {
                ProductId: product.id,
                ProductName: product.name,
                ProductPrice: product.price,
                Product_quantity: product.quantity,
                ProductImage: imageUrl,
                Description: product.description,
                Category: product.category,
                Prescription: product.prescription
            });
            toast.success("Document Added Successfully!");

            // Clear the form
            setProduct({
                id: uuidv4(),
                name: '',
                price: '',
                quantity: '',
                description: '',
                image: null,
                category: '',
                prescription: false
            });

            // Clear file input
            document.getElementById('file').value = null;
            navigate(-1)
            console.log('Product added to Firestore');
        } catch (err) {
            // Update error state correctly
            setErrors({ ...errors, image: err.message });
            toast.error("Error Adding Product!");
            console.error('Error in handleSubmit:', err.message);
        }
    };

    return (
        <Container component="main" maxWidth="md" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Add New Product
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Product Name" name="name" value={product.name} onChange={handleChange} error={Boolean(errors.name)} helperText={errors.name} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Product Price" name="price" value={product.price} onChange={handleChange} error={Boolean(errors.price)} helperText={errors.price} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Product Quantity" name="quantity" value={product.quantity} onChange={handleChange} error={Boolean(errors.quantity)} helperText={errors.quantity} />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                fullWidth
                                label="Product Category"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                placeholder='Select Category'
                            >
                                <MenuItem disabled value="">
                                    <em>Select Category</em>
                                </MenuItem>
                                <MenuItem value="Medicine">Medicine</MenuItem>
                                <MenuItem value="Cosmetic">Beauty Products</MenuItem>
                                <MenuItem value="Hygiene">Hygiene</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Product Description" name="description" value={product.description} onChange={handleChange} error={Boolean(errors.description)} helperText={errors.description} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={product.prescription}
                                        onChange={handlePrescriptionChange}
                                        name="prescription"
                                        color="primary"
                                    />
                                }
                                label="Prescription Required"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input id="file" type="file" accept=".png, .jpg, .jpeg" onChange={handleImageChange} />
                            {errors.image && <Typography color="error" variant="caption" sx={{ mt: 1 }}>{errors.image}</Typography>}
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                        Submit
                    </Button>
                </form>
            </Paper>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </Container>
    );
};
