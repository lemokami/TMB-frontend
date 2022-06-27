import * as yup from 'yup';

export const updateUserFormSchema = yup.object({
  name: yup.string().required(),
  age: yup.string().required(),
});
