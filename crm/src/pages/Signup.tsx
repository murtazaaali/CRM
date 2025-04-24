import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

// Validation Regex
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
// Removed complex regex for simplicity in this example, keeping basic checks
// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

interface SignupErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
}

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<SignupErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof SignupErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: SignupErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required.';
    }

    if (!formData.email) {
      newErrors.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter.';
    } else if (!/(?=.*[@$!%*?&])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character (@$!%*?&).';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.signup(formData.name, formData.email, formData.password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (err) {
      setErrors({ form: 'Failed to create account. An account with this email might already exist.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-md rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              sign in to your account
            </Link>
          </p>
        </div>

        {errors.form && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4" role="alert">
            <p className="text-sm text-red-700">{errors.form}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={`appearance-none relative block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                onBlur={validateForm}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                placeholder="Email address *"
                value={formData.email}
                onChange={handleChange}
                onBlur={validateForm}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>
            <div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm pr-10`}
                  placeholder="Password *"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={validateForm}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>
            <div>
              <div className="relative">
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm pr-10`}
                  placeholder="Confirm Password *"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={validateForm}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup; 