import axios from "axios";

export default async function handler(req, res) {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const response = await axios.get(
      `https://inventory.roblox.com/v1/users/${userId}/items/GamePass`,
      {
        params: {
          limit: 50,
          sortOrder: "Asc"
        }
      }
    );

    const gamepasses = response.data.data.map(gp => ({
      id: gp.assetId,
      name: gp.name,
      price: gp.price ?? 0
    }));

    res.status(200).json(gamepasses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch gamepasses" });
  }
}
