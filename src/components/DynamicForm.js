import React, { useState } from 'react';

const DynamicForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let fieldErrors = { ...errors };

    switch (name) {
      case 'name':
        fieldErrors.name = value.length >= 3 ? '' : 'Name must be at least 3 characters';
        break;
      case 'email':
        fieldErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Email is not valid';
        break;
      case 'password':
        fieldErrors.password = /^(?=.*\d).{8,}$/.test(value) ? '' : 'Password must be at least 8 characters and contain a number';
        break;
      case 'confirmPassword':
        fieldErrors.confirmPassword = value === formData.password ? '' : 'Passwords do not match';
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
    setIsFormValid(Object.values(fieldErrors).every((error) => error === ''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert(JSON.stringify(formData, null, 2));
    } else {
      alert('Please fill out the form correctly.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-5">Dynamic Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border text-black ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border text-black ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border text-black ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full p-2 border text-black ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
