const db = require("../models");
const config = require("config");

const UserModel = db.User;
module.exports = {
  fetchHome: async (req, res) => {
    try {
      let data = {
        "-NRWifmDJwiwH8wwvlhV": {
          banners: [
            {
              id: 1,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/banners/banner.png?updatedAt=1679917491504",
            },
            {
              id: 2,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/banners/banner.png?updatedAt=1679917491504",
            },
            {
              id: 3,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/banners/banner.png?updatedAt=1679917491504",
            },
            {
              id: 4,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/banners/banner.png?updatedAt=1679917491504",
            },
            {
              id: 5,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/banners/banner.png?updatedAt=1679917491504",
            },
          ],
          foodBanners: [
            {
              foodname: "Biriyani",
              id: 1,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/food_delivery_app/food3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678249114387",
            },
            {
              foodname: "Fried rice",
              id: 2,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/food_delivery_app/food2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678249114322",
            },
            {
              foodname: "Chapathy",
              id: 3,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/food_delivery_app/food1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678249114324",
            },
            {
              foodname: "Idli",
              id: 4,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/food_delivery_app/food3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678249114387",
            },
            {
              foodname: "Dosa",
              id: 5,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/food_delivery_app/food1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678249114324",
            },
            {
              foodname: "Appam",
              id: 6,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/food_delivery_app/food2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678249114322",
            },
            {
              foodname: "Poori",
              id: 7,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/food_delivery_app/food1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678249114324",
            },
            {
              foodname: "Puttu",
              id: 8,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/food_delivery_app/food3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678249114387",
            },
          ],
          hotel_count: 387,
          xploreResto: [
            {
              distance: 5,
              hotel: "Chakarapanthal",
              id: 1,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/explore_resto/exploreResto.png?updatedAt=1679545663252",
              off: 10,
              place: "Kochi",
              rating: 4.1,
              time: 10,
            },
            {
              distance: 7,
              hotel: "Thal",
              id: 2,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/explore_resto/exploreResto.png?updatedAt=1679545663252",
              off: 15,
              place: "Kalamassery",
              rating: 4.5,
              time: 15,
            },
            {
              distance: 12,
              hotel: "Burger hut",
              id: 3,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/explore_resto/exploreResto.png?updatedAt=1679545663252",
              off: 5,
              place: "palarivattam",
              rating: 3.9,
              time: 25,
            },
            {
              distance: 10,
              hotel: "Soofi mandi",
              id: 4,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/explore_resto/exploreResto.png?updatedAt=1679545663252",
              off: 10,
              place: "Edapilly",
              rating: 3.4,
              time: 20,
            },
            {
              distance: 5,
              hotel: "Dominos",
              id: 5,
              image:
                "https://ik.imagekit.io/x5sm8rsdy/explore_resto/exploreResto.png?updatedAt=1679545663252",
              off: 20,
              place: "Kochi",
              rating: 4.7,
              time: 15,
            },
          ],
        },
      };

      return res.status(200).json({
        code: 200,
        message: "Home list",
        data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        code: 500,
        status: "failed",
        message: "Sorry, an error occurred on the server.",
      });
    }
  },
};
