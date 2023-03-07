import axios from "axios";

const BROADCAST_API_BASE_URL = process.env.NEXT_PUBLIC_BROADCAST_API_URL;

export const getImageboardList = async (): Promise<any[]> => {
  const imageboardListUrl = BROADCAST_API_BASE_URL + "/imageboard";
  try {
    const response = await axios.get(imageboardListUrl);
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export const getThreadsForImageboard = async (
  imageboardInitials: string
): Promise<any[]> => {
  const threadsUrl = BROADCAST_API_BASE_URL + `/${imageboardInitials}`;
  try {
    const response = await axios.get(threadsUrl);
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export const createNewThread = async (
  imageboardInitials: string,
  formData: FormData
): Promise<any[]> => {
  const createThreadUrl = BROADCAST_API_BASE_URL + `/${imageboardInitials}/`;
  try {
    const response = await axios.post(createThreadUrl, formData);
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export const getThreadDetails = async (
  imageboardInitials: string,
  threadId: number
): Promise<any[]> => {
  const threadDetailsUrl =
    BROADCAST_API_BASE_URL + `/${imageboardInitials}/${threadId}`;
  try {
    const response = await axios.get(threadDetailsUrl);
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export const addNewReply = async (
  imageboardInitials: string,
  threadId: number,
  formData: FormData
): Promise<any[]> => {
  const newReplyUrl =
    BROADCAST_API_BASE_URL + `/${imageboardInitials}/${threadId}/`;
  try {
    const response = await axios.post(newReplyUrl, formData);
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};
