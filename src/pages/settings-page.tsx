import { useUser } from "@/components/user-provider";

const SettingsPage: React.FC = () => {
  const user = useUser();

  return <div>Hello {user?.displayName}</div>;
};

export default SettingsPage;
