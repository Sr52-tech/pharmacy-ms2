import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Paper } from '@mui/material';
import { db, storage } from '../firebase-config';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


export const UploadPrescription = () => {
    const navigate = useNavigate();
    const [prescription, setPrescription] = useState({
        id: uuidv4(),
        patientName: '',
        date: '',
        description: '',
        image: null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setPrescription({
            ...prescription,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];

            if (!allowedTypes.includes(selectedFile.type)) {
                setErrors({
                    ...errors,
                    image: 'Only PNG, JPEG, JPG images or PDF files are allowed',
                });
                return;
            }

            setPrescription({
                ...prescription,
                image: selectedFile,
            });
            setErrors({
                ...errors,
                image: null,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation can be added here as needed

        try {
            // Handle image upload to Firebase Storage
            const storageRef = ref(storage, `prescriptions/${prescription.id}`);
            await uploadBytes(storageRef, prescription.image);

            // Get the download URL for the uploaded image
            const imageUrl = await getDownloadURL(storageRef);

            // Add prescription data to Firestore
            await addDoc(collection(db, "prescriptions"), {
                PrescriptionId: prescription.id,
                PatientName: prescription.patientName,
                Date: prescription.date,
                Description: prescription.description,
                PrescriptionImage: imageUrl,
            });
            toast.success('Prescription Submitted Successfully')

            // Clear the form and navigate back
            setPrescription({
                id: uuidv4(),
                patientName: '',
                date: '',
                description: '',
                image: null,
            });
            document.getElementById('prescription-file').value = null;
            navigate('/payment');
        } catch (err) {
            toast.error('Something went wrong')
            setErrors({ ...errors, image: err.message });
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography component="h1" variant="h5">
                    Upload Prescription
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Patient Name" name="patientName" value={prescription.patientName} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Date" name="date" value={prescription.date} onChange={handleChange} type="date" InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Description" name="description" value={prescription.description} onChange={handleChange} multiline rows={4} />
                        </Grid>
                        <Grid item xs={12}>
                            <input id="prescription-file" type="file" accept=".png, .jpg, .jpeg, .pdf" onChange={handleImageChange} />
                            {errors.image && <Typography color="error" variant="caption">{errors.image}</Typography>}
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                        Upload Prescription
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
