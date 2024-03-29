import Joi from "joi";

// joi validation to the blog body
const blogValidation = Joi.object({
  title: Joi.string().min(10).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  writer: Joi.string().required(),
});

export default blogValidation;
