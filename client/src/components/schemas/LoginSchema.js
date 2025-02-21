// import * as yup from 'yup'
// const LoginSchema =yup.object().shape({
//     usename: yup.string().min(5,'username at least 5 chars').max(30, 'max 30 chars').required('username is required'),
//     password: yup.string().min(8).max(25).required()
// });
// export default LoginSchema;

// chatgpt 
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(5)
    .max(30)
    .required('Username is required'),
  password: Yup.string()
    .min(5)
    .max(20)
    .required('password is required'),
});

export default LoginSchema;
