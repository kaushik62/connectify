import React, { useState } from 'react';

const Follower_Following_list = () => {
  const [followers] = useState([
    {
      name: 'Claire Kumas',
      img: 'https://storage.googleapis.com/a1aa/image/P6ALr6jEE5Q1Ys00MRG8Uomg6hn2SWOw2B_LkPaFRrU.jpg',
    },
    {
      name: 'Blair Dota',
      img: 'https://storage.googleapis.com/a1aa/image/_jjIEtUnwCbhcd4qn9gFHVSn30LcOHgycTtrVsoMIEk.jpg',
    },
    {
      name: 'Claire Kumas',
      img: 'https://storage.googleapis.com/a1aa/image/P6ALr6jEE5Q1Ys00MRG8Uomg6hn2SWOw2B_LkPaFRrU.jpg',
    },
    {
      name: 'Blair Dota',
      img: 'https://storage.googleapis.com/a1aa/image/_jjIEtUnwCbhcd4qn9gFHVSn30LcOHgycTtrVsoMIEk.jpg',
    },
    {
      name: 'Claire Kumas',
      img: 'https://storage.googleapis.com/a1aa/image/P6ALr6jEE5Q1Ys00MRG8Uomg6hn2SWOw2B_LkPaFRrU.jpg',
    },
    {
      name: 'Blair Dota',
      img: 'https://storage.googleapis.com/a1aa/image/_jjIEtUnwCbhcd4qn9gFHVSn30LcOHgycTtrVsoMIEk.jpg',
    },
  ]);

  const [following, setFollowing] = useState([
    {
      name: 'Luna Roy',
      img: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      name: 'Ethan Nova',
      img: 'https://randomuser.me/api/portraits/men/64.jpg',
    },
    {
      name: 'Luna Roy',
      img: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      name: 'Ethan Nova',
      img: 'https://randomuser.me/api/portraits/men/64.jpg',
    },
    {
      name: 'Luna Roy',
      img: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      name: 'Ethan Nova',
      img: 'https://randomuser.me/api/portraits/men/64.jpg',
    },
  ]);

  const [showFollowers, setShowFollowers] = useState(true);

  const handleRemove = (index) => {
    const updated = [...following];
    updated.splice(index, 1);
    setFollowing(updated);
  };

  const users = showFollowers ? followers : following;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            showFollowers ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setShowFollowers(true)}
        >
          Followers
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            !showFollowers ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setShowFollowers(false)}
        >
          Following
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-xl font-semibold mt-6 mb-2 text-center">
        {showFollowers ? 'My Followers List' : 'My Following List'}
      </h1>

      {/* Scrollable List */}
      <div className="bg-white max-h-96 overflow-y-auto rounded-lg p-4">
        {users.length === 0 ? (
          <p className="text-gray-500 text-center">No users found.</p>
        ) : (
          users.map((user, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border-b border-gray-200"
            >
              <div className="flex items-center">
                <img
                  src={user.img}
                  alt={`Profile picture of ${user.name}`}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <div className="text-lg font-semibold">{user.name}</div>
                </div>
              </div>

              {!showFollowers && (
                <button
                  onClick={() => handleRemove(index)}
                  className="text-white hover:bg-pink-700 text-sm bg-pink-600 px-3.5 rounded-full py-1.5 transition duration-200 ease-in-out"
                >
                  Unfollow
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Follower_Following_list;
