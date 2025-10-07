export default async function User_list() {
    try {
    const response = await fetch('/api/v1/all_user', {   
        method: 'GET',
    }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // rethrow so caller can handle it
  }




    
}   
