import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSortedVids } from "../../data/db";

export const DiscoverComponent = () => {
  const [vids, setVids] = useState(null);

  useEffect(() => {
    const pulledVids = getSortedVids("likes");
    setVids(pulledVids);
  }, []);
  return (
    <div className="flex flex-col p-8 text-white md:pl-32 ">
      <div className="flex space-x-3 items-center pt-12">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
            />
          </svg>
        </div>
        <div className="font-bold text-xl">Trending</div>
      </div>

      <div className="flex mt-4 flex-wrap gap-6 justify-start">
        {vids &&
          vids.map((vid) => (
              <div
                key={vid.id}
                className="w-full md:w-1.5/5 h-72 flex flex-col cursor-pointer shadow-xl hover:border border-gray-600"
              >
                <Link to={`/watch/${vid.id}`}>
                <div className="w-full">
                  <img
                    className="w-full h-44 object-cover rounded"
                    src={vid.thumbnail}
                    alt=""
                  />
                </div>
                <div className="flex justify-between text-xs font-semibold text-gray-500 mt-1">
                  <div className="tracking-wide">{vid.likes} Likes</div>
                  <div className="">2 months ago</div>
                </div>
                <div className="flex pt-2 space-x-2 overflow-hidden">
                  <div className="flex-shrink-0 h-1/2">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={
                        "https://res.cloudinary.com/dh5acw9p6/image/upload/v1629732438/sauti/be7wn8lzs2kgftrz0hcs.png"
                        
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col ">
                    <div className="h-full ">
                      <p className="text-sm text-white   line-clamp-2">
                        {vid.title}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600 font-semibold pt-1">
                      {vid.user.name}
                    </div>
                  </div>
                </div>
                </Link>
              </div>
          ))}
      </div>
    </div>
  );
};
