import * as yup from 'yup';

export const createPostSchema = yup.object({
  caption: yup.string().required(),
  shareable: yup.bool().required(),
});
