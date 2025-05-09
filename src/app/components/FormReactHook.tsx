// import { useForm } from 'react-hook-form';
"use client"
import { useForm } from "react-hook-form";

const FormReactHook: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm();
  console.log('register', register)
  console.log('formState', formState)
  const onSubmitFunction = async (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitFunction)}>
      <input 
        {...register('name', { required: true })} 
        placeholder="Name"
      />
        {/* {errors.name && <div>This field is required</div>} */}
      <input 
        {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} 
        // a@a.a
        placeholder="Email" 
      />
      {/* {errors.email && <div>Invalid email address</div>} */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormReactHook;


