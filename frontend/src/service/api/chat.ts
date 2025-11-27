import axiosInstance from "@/api/axiosInstance";

export const getOlderMessages = async (beforeId?: string) => {
  try {
    const url = beforeId
      ? `/messages/older?before=${beforeId}`
      : `$/messages/older`;

    const data = await axiosInstance.get(url);
    return data.data;
  } catch (error) {
    console.error("Error fetching older messages:", error);
    throw error;
  }
};
