export const isValidEmail = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z][a-z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

export const isAtLeastTwoLetter = (text) => {
  const atLeastTwoLetterRegex = /^[^\d\W_]*[a-zA-Z][^\d\W_]*[a-zA-Z][^\d\W_]*$/;
  return atLeastTwoLetterRegex.test(text);
}

export const isValidLatitude = (latitude) => {
  const latitudeRegex = /^-?([0-8]?\d(\.\d{2})?|90(\.00)?)$/;
  console.log(latitudeRegex.test(latitude));
  return latitudeRegex.test(latitude);
  
}

export const isValidLongitude = (longitude) => {
  const longitudeRegex = /^-?((1[0-7]\d(\.\d{2})?)|([0-9]?\d(\.\d{2})?)|180(\.00)?)$/;
  console.log(longitudeRegex.test(longitude))
  return longitudeRegex.test(longitude);
}