// Auth form props
export interface AuthFormProps {
  title: string;
  onSubmit: (formData: { [key: string]: string }) => Promise<void>;
  fields: { name: string; type: string; placeholder: string }[];
}

// Login props
export interface LoginProps {
  onLogin: () => void;
}
