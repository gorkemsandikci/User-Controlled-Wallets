"use server";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const initialize_user = async () => {
    const idempotencyKey = uuidv4(); // generates an idempotency key

    const options = {
        method: "POST",
        url: "https://api.circle.com/v1/w3s/user/initialize",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  TEST_API_KEY:538b8a315375d1946984b561e0119eb9:05d3535b35f0b251eec3e51d7a68c4ab`,
            "X-User-Token": `${process.env.NEXT_PUBLIC_USER_TOKEN}`,
        },
        data: { idempotencyKey: idempotencyKey, blockchains: ["MATIC-AMOY"] },
    };

    return axios
        .request(options)
        .then(function (response) {
            console.log("idempotency key: ", idempotencyKey);
            return response.data.data.challengeId;
        })
        .catch(function (error) {
            console.error(error);
        });
};
