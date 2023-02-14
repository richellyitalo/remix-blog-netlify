function hasValue(input, index) {
  return input[index] && input[index].trim().length > 0;
}

function isValidEmail(credentials) {
  return (
    credentials.email &&
    credentials.email.includes("@") &&
    credentials.email.includes(".")
  );
}

function isValidPassword(credentials) {
  return credentials.password && credentials.password.length >= 5;
}

export function validateUserCredentials(credentials) {
  let validationErrors = {};

  // email valid
  if (!hasValue(credentials, "email")) {
    validationErrors.email = "Email is required";
  } else if (!isValidEmail(credentials)) {
    validationErrors.email = "Invalid email";
  }

  if (!hasValue(credentials, "password")) {
    validationErrors.password = "Password is required";
  } else if (!isValidPassword(credentials)) {
    validationErrors.password = "Provide at least 5 characters";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}
