import { USERS } from "./users";

export const POSTS = [
  {
    imageUrl:
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    user: USERS[0].user,
    likes: 3500,
    caption: "A sweet Honey pancake?",
    profile_picture: USERS[0].image,
    comments: [
      {
        user: "aquaman",
        comment: "Holy sweetness!",
      },
      {
        user: "someoneyouknow",
        comment: "yumm!",
      },
      {
        user: "bottle",
        comment: "ahhhhh!",
      },
    ],
  },
  {
    imageUrl:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
    user: USERS[1].user,
    likes: 7871,
    caption: "Egg cipe!",
    profile_picture: USERS[1].image,
    comments: [
      {
        user: "aquaman",
        comment: "egge!",
      },
      {
        user: "someoneyouknow",
        comment: "eggs!",
      },
      {
        user: "bottle",
        comment: "yums!",
      },
    ],
  },
];
