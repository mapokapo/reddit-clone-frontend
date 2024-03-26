import { RotateCw } from "lucide-react";

const Loading: React.FC = () => {
  return (
    <div className="flex h-12 w-12 animate-spin items-center justify-center p-2">
      <RotateCw className="h-full w-full" />
    </div>
  );
};

export default Loading;
