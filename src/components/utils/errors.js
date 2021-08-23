export const InputError = () => {
  return (
    <div class="bg-red-50 rounded-lg border border-red-300 p-3 shadow-lg">
      <div class="flex items-center space-x-2">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="">
          <span class="block text-gray-500">
            Please provide all required information
          </span>
        </div>
      </div>
    </div>
  );
};
