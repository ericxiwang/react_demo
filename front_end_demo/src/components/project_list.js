export default async function Project_list() {
    try {
    const response = await fetch('/api/v1/project_info', {   
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
