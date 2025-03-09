import axios from "axios";
import { getAuth, getIdToken } from "firebase/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://3.22.79.0:8000";

export const getTestData = async (filters: any) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  const token = await getIdToken(user);

  const response = await axios.get(`${API_URL}/test-data/`, {
    headers: { Authorization: `Bearer ${token}` },
    params: filters
  });

  return response.data;
};

export const getAuditLogs = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  const token = await getIdToken(user);

  const response = await axios.get(`${API_URL}/logs/`,{
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
};

