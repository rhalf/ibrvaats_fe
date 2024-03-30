export default {
  required: (value) => {
    if (!!value) return true;
    return "Required field";
  },

  minimum: (value, length = 6, name = "field") => {
    if (value?.length >= length) return true;
    return `The ${name} must be atleast ${length} characters.`;
  },

  maximum: (value, length = 6, name = "field") => {
    if (value?.length <= length) return true;
    return `The ${name} must not exceed ${length} characters.`;
  },

  match: (value, value1, name = "field") => {
    if (value === value1) return true;
    return `The ${name} did not match.`;
  },

  email: (value) => {
    if (!value) return true;
    if (/.+@.+\..+/.test(value)) return true;
    return "Email must be valid.";
  },
};
