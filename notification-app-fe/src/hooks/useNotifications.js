import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications(page = 1, filter = "All") {
  const [notifications, setNotifications] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNotifications();
        const weight = { Placement: 3, Result: 2, Event: 1 };

        let filtered = data;
        if (filter !== "All") {
          filtered = data.filter((n) => n.Type === filter);
        }

        const sorted = [...filtered].sort((a, b) => {
          const wA = weight[a.Type] || 0;
          const wB = weight[b.Type] || 0;
          if (wA !== wB) return wB - wA;
          return new Date(b.Timestamp) - new Date(a.Timestamp);
        });

        const pageSize = 10; // show 10 per page
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        setNotifications(sorted.slice(start, end));
        setTotalPages(Math.ceil(sorted.length / pageSize));
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, filter]);

  return { notifications, totalPages, loading, error };
}
