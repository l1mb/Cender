import signUpUserDto from "@/api/types/user/signUpUserDto";

export default interface AuthFormProps {
  onSubmit: (e: signUpUserDto) => void;
}
