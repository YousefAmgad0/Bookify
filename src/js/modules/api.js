/** */

export async function getSearchBooks(query, limit) {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodedQuery}&limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}
