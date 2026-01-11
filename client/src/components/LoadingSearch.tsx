import { Oval } from "react-loader-spinner";

interface LoadingProps {
  message?: string; // optional loading text
}

const LoadingSearch: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-64">
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

export default LoadingSearch;
