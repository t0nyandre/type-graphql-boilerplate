import { AuthenticationError, ApolloError } from "apollo-server-express";

export const invalidTokenError = () => {
  return new ApolloError("invalid token", "INVALID_TOKEN");
};

export const accountNotVerifiedError = () => {
  return new AuthenticationError(
    "account not verified. please check your email or request a new verification code"
  );
};

export const accountAlreadyVerifiedError = () => {
  return new ApolloError(
    "account already verified",
    "ACCOUNT_ALREADY_VERIFIED"
  );
};

export const invalidLoginError = () => {
  return new AuthenticationError("password invalid");
};
