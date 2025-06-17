// Sanity GROQ Query File

// Query to fetch a specific user
export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

// Query to search pins based on searchTerm or category
export const searchQuery = (searchTerm, isCategorySearch = false) => {
  const sanitizedSearchTerm = searchTerm.replace(/["']/g, "");

  if (isCategorySearch) {
    return `*[_type == "pin" && lower(category) == "${sanitizedSearchTerm.toLowerCase()}"]{
      image { asset -> { url } },
      _id,
      destination,
      postedBy -> {
        _id,
        userName,
        image
      },
      save[] {
        _key,
        postedBy -> {
          _id,
          userName,
          image
        }
      },
    }`;
  }

  return `*[_type == "pin" && (title match '${sanitizedSearchTerm}*' || category match '${sanitizedSearchTerm}*' || about match '${sanitizedSearchTerm}*')]{
    image { asset -> { url } },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      }
    },
  }`;
};

// Query to fetch all pins in feed
export const feedQuery = `*[_type == 'pin'] | order(_createdAt desc) {
  image { asset -> { url } },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[] {
    _key,
    postedBy -> {
      _id,
      userName,
      image
    }
  },
}`;

// Query to fetch details of a specific pin
export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image { asset -> { url } },
    _id,
    title,
    about,
    category,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      postedBy -> {
        _id,
        userName,
        image
      }
    },
    comments[] {
      comment,
      _key,
      postedBy -> {
        _id,
        userName,
        image
      }
    }
  }`;
  return query;
};

// Query to fetch more pins from same category excluding current pin
export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}']{
    image { asset -> { url } },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      }
    },
  }`;
  return query;
};

// Static list of categories
export const categories = [
  {
    id: 1,
    name: "Technology",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    name: "Nature",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Travel",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Animals",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Food",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 6,
    name: "Art",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 7,
    name: "Architecture",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 8,
    name: "Sports",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 9,
    name: "Quotes",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 10,
    name: "Gaming",
    image: "https://images.unsplash.com/photo-1606813902484-30e1cc90a5e1?auto=format&fit=crop&w=800&q=60",
  },
];

// Query to fetch pins created by a specific user
export const userCreatedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && userId == '${userId}'] | order(_createdAt desc) {
    image { asset -> { url } },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      }
    },
  }`;
  return query;
};

// Query to fetch pins saved by a specific user
export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId] | order(_createdAt desc) {
    image { asset -> { url } },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      }
    },
  }`;
  return query;
};
