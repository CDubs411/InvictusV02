import { clientQueries } from "./database/queries";

// The `type` parameter is validated by a CHECK constraint in the database,
// so we don't need to validate it here. The valid types are:
// 'calls_made', 'deals_closed', 'quotes_sent', 'contracts_signed'
export async function trackKPI(userId: string, type: string, value: number) {
  try {
    await clientQueries.createKPI({
      user_id: userId,
      type,
      value,
    });
  } catch (error) {
    console.error("Failed to track KPI:", error);
    // Depending on the application's needs, you might want to re-throw the error
    // or handle it in a way that doesn't disrupt the user experience.
    throw error;
  }
}
