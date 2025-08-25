import React, { useState, useEffect } from 'react';
import './FeedbackForm.css'; // We'll create this file next

const FeedbackForm = () => {
    // State for form fields
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        feedback: '',
        rating: ''
    });

    // State for validation errors
    const [errors, setErrors] = useState({});

    // Real-time validation using useEffect
    useEffect(() => {
        // Validate email format
        if (formData.email) {
            validateField('email', formData.email);
        }
        // Validate feedback length
        if (formData.feedback) {
            validateField('feedback', formData.feedback);
        }
        // Validate phone number pattern
        if (formData.phone) {
            validateField('phone', formData.phone);
        }
    }, [formData.email, formData.feedback, formData.phone]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Validation logic for a single field
    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'name':
                if (!value.trim()) {
                    error = 'Name is required.';
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    error = 'Name should only contain alphabets and spaces.';
                }
                break;
            case 'email':
                if (!value.trim()) {
                    error = 'Email is required.';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Please enter a valid email address (e.g., name@example.com).';
                }
                break;
            case 'phone':
                if (!value.trim()) {
                    error = 'Phone number is required.';
                } else if (!/^\d{10}$/.test(value)) {
                    error = 'Phone number must be a 10-digit number.';
                }
                break;
            case 'feedback':
                if (!value.trim()) {
                    error = 'Feedback message is required.';
                } else if (value.length < 20 || value.length > 250) {
                    error = 'Feedback must be between 20 and 250 characters.';
                }
                break;
            case 'rating':
                if (!value) {
                    error = 'Rating is required.';
                }
                break;
            default:
                break;
        }
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        return error === '';
    };

    // Validate all fields
    const validateForm = () => {
        const newErrors = {};
        const fieldNames = ['name', 'email', 'phone', 'feedback', 'rating'];
        let isValid = true;

        fieldNames.forEach(name => {
            const value = formData[name];
            const error = validateField(name, value);
            if (!error) {
                isValid = false;
            }
        });

        return isValid;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            console.log('Form is valid. Submitting data:', formData);
            // Here you would typically submit to a backend API
            // E.g., fetch('your-api-endpoint', { method: 'POST', body: JSON.stringify(formData) })
            alert('Thank you for your feedback!');
            // Reset form after submission
            setFormData({
                name: '',
                email: '',
                phone: '',
                feedback: '',
                rating: ''
            });
            setErrors({});
        } else {
            console.log('Form has errors. Please correct them.');
        }
    };

    return (
        <div className="feedback-container">
            <h2>LMS Feedback Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => validateField('name', formData.name)}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                    <label>Feedback Message:</label>
                    <textarea
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                    ></textarea>
                    {errors.feedback && <span className="error">{errors.feedback}</span>}
                </div>

                <div className="form-group">
                    <label>Rating:</label>
                    <select
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        onBlur={() => validateField('rating', formData.rating)}
                    >
                        <option value="">Select a rating</option>
                        <option value="1">1 (Poor)</option>
                        <option value="2">2 (Fair)</option>
                        <option value="3">3 (Good)</option>
                        <option value="4">4 (Very Good)</option>
                        <option value="5">5 (Excellent)</option>
                    </select>
                    {errors.rating && <span className="error">{errors.rating}</span>}
                </div>

                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
};

export default FeedbackForm;