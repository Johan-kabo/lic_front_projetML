/**
 * Example: How to use the new data management system
 * 
 * The app now has a centralized data management system using React Context.
 * You can reset data, update data, and pass new data from external sources.
 */

import { useData } from "@/hooks/useData";

/**
 * Example 1: Access data in any component
 */
export const ExampleComponent = () => {
  const { data } = useData();
  
  // Access any data subset
  const stats = data.stats;
  const transactions = data.transactions;
  
  return <div>{stats.totalVolume}</div>;
};

/**
 * Example 2: Reset data to defaults
 */
export const ResetButton = () => {
  const { resetData } = useData();
  
  return (
    <button onClick={resetData}>
      Reset to Default Data
    </button>
  );
};

/**
 * Example 3: Update data with new values
 */
export const UpdateDataExample = () => {
  const { updateData, data } = useData();
  
  const fetchNewData = async () => {
    // Simulate fetching from an API
    const newData = {
      stats: {
        totalVolume: "250,000",
        detectionRate: "99.85%",
        securedAmount: "€15.2M",
        apiResponseTime: "18ms",
      },
      transactions: [
        // ... new transactions
      ],
    };
    
    // Update the global state
    updateData(newData);
  };
  
  return <button onClick={fetchNewData}>Fetch New Data</button>;
};

/**
 * Example 4: Partial updates (only update specific fields)
 */
export const PartialUpdateExample = () => {
  const { updateData } = useData();
  
  const updateStats = () => {
    updateData({
      stats: {
        totalVolume: "300,000",
        detectionRate: "99.90%",
        securedAmount: "€18.5M",
        apiResponseTime: "20ms",
      },
    });
  };
  
  return <button onClick={updateStats}>Update Stats Only</button>;
};

/**
 * HOW TO INTEGRATE WITH YOUR BACKEND:
 * 
 * 1. In your API service or a custom hook, fetch data:
 *    const response = await fetch('/api/fraud-data');
 *    const newData = await response.json();
 * 
 * 2. Use updateData to sync:
 *    const { updateData } = useData();
 *    updateData(newData);
 * 
 * 3. For real-time updates, use WebSocket or polling:
 *    useEffect(() => {
 *      const ws = new WebSocket('ws://...');
 *      ws.onmessage = (event) => {
 *        updateData(JSON.parse(event.data));
 *      };
 *    }, []);
 */
