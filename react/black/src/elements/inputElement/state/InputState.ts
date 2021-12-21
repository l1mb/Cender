import ErrorState from "@/types/interfaces/validation/errorState";

export default interface inputState {
  value: string;
  error: ErrorState | null;
}
