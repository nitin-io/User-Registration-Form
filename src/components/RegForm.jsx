import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { BsEyeSlash, BsEye } from "react-icons/bs";

// Validation Function to pass in formik.
const validate = (values) => {
  const errors = {};

  if (!values.fullname) {
    errors.fullname = "Name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password length must be atleast 8 charater long";
  }

  if (!values.validByUser) {
    errors.validByUser = "Check the box to proceed";
  }

  return errors;
};

const RegForm = () => {
  // Using for show and hide password by changing
  // input type password to text and vice versa
  const [checked, setChecked] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const formik = useFormik({
    // Initial Values
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      validByUser: false,
    },
    validate,
    onSubmit: (values) => {
      setSubmitting(true);
      console.log(
        `New user create with name ${values.fullname} and email ${values.email}. Valid: ${values.validByUser}`
      ),
        formik.resetForm();

      toast.success("Form is submitted successfully");
      setChecked(false);
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-5 rounded-2">
      <div className="mb-3">
        <label htmlFor="fullname" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          disabled={isSubmitting}
          placeholder="eg - Nitin Chaudhary"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          className="form-control"
        />
        {formik.errors.fullname && formik.touched.fullname ? (
          <span className="form-text text-warning">
            {formik.errors.fullname}
          </span>
        ) : null}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="text"
          name="email"
          id="email"
          disabled={isSubmitting}
          placeholder="example@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="form-control"
        />
        {formik.errors.email && formik.touched.email ? (
          <span className="form-text text-warning">{formik.errors.email}</span>
        ) : null}
      </div>
      <div className="mb-3 password-container">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <span id="eye-icon">
          {checked ? (
            <BsEye onClick={() => setChecked(!checked)} />
          ) : (
            <BsEyeSlash onClick={() => setChecked(!checked)} />
          )}
        </span>
        <input
          type={checked ? "text" : "password"}
          name="password"
          id="password"
          disabled={isSubmitting}
          placeholder="Enter Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="form-control"
        />
      </div>
      {formik.errors.password && formik.touched.password ? (
        <span className="form-text text-warning">{formik.errors.password}</span>
      ) : null}
      <div className="mb-3">
        <br />
        <input
          type="checkbox"
          name="validByUser"
          disabled={isSubmitting}
          value={formik.values.validByUser}
          onChange={formik.handleChange}
          className="form-check-input"
        />
        <label htmlFor="email" className="form-check-label">
          &nbsp;I consent that all the details are true.
        </label>
        {formik.errors.validByUser && formik.touched.validByUser ? (
          <span className="form-text text-warning">
            <br />
            {formik.errors.validByUser}
          </span>
        ) : null}
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-warning text-white"
        >
          Register
        </button>
      </div>
      {/* Toast Container to show notification */}
    </form>
  );
};

export default RegForm;
