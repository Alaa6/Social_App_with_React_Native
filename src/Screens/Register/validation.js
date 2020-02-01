import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('This field is required !')
        .email("Invalid email"),

    password: Yup.string()
        .required('This field is required !')
        .min(6, "The password length must be greater than 6"),

     confPassword: Yup.string()
        .required('This field is required !')
        .oneOf([Yup.ref('password'), null], 'Passwords must match') ,
      

       

        
});

export default validationSchema;