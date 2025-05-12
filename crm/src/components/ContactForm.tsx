import { useForm } from 'react-hook-form';
import useContactsStore from '../store/contacts';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive';
}

interface ContactFormProps {
  contact?: ContactFormData & { _id: number };
  onClose: () => void;
}

const ContactForm = ({ contact, onClose }: ContactFormProps) => {
  const { addContact, updateContact } = useContactsStore();
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    defaultValues: contact || {
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'active',
    },
  });

  const onSubmit = (data: ContactFormData) => {
    if (contact) {
      updateContact(contact._id, data);
    } else {
      addContact(data);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="input"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="input"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          {...register('phone', { required: 'Phone is required' })}
          className="input"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company</label>
        <input
          type="text"
          {...register('company', { required: 'Company is required' })}
          className="input"
        />
        {errors.company && (
          <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          {...register('status', { required: 'Status is required' })}
          className="input"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

    

     
       
      </div>

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {contact ? "Update" : "Add"} Contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm; 