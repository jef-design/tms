import { Oval } from "react-loader-spinner";

interface LoadingProps {
  message?: string; // optional loading text
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <Oval
        height={50}
        width={50}
        color="#4ade80" // green, can adjust
        visible={true}
        ariaLabel="loading"
        secondaryColor="#d1fae5"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
      <p className="mt-2 text-sm text-black">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
