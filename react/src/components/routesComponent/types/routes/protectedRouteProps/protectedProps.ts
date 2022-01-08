import signUpUserDto from "@/api/types/user/signUpUserDto";

export default interface ProtectedRouteProps {
  user: signUpUserDto | null;
  route: string;
  redirectRoute: string;
}
