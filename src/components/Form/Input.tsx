import { ForwardRefRenderFunction, forwardRef } from "react";
import {
  FormControl,
  FormLabel,
  Input as FormInput,
  InputProps as ChackraInputProps,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChackraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <FormInput
        name={name}
        id={name}
        type={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{ bgColor: "gray.900" }}
        size="lg"
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
