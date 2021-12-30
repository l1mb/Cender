// function getCookie(name: string): string {
//   const cookies = document.cookie.split(";");
//   let cookieValue = "";
//   let cookieKey = "";

//   cookies.forEach((cookie) => {
//     const splitCookie = cookie.split("=");
//     const cookieName = splitCookie[0].trim();

//     if (cookieName === name) {
//       [cookieKey, cookieValue] = splitCookie;
//     }
//   });

//   return cookieValue;
// }

// eslint-disable-next-line no-shadow
enum HTTPMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

function apiService<T>(url: string, method: HTTPMethods, body?: unknown | null): Promise<T> {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      // "X-CSRFToken": `${getCookie("csrftoken")}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.text().then((data) => (data.length === 0 ? null : JSON.parse(data)));
    })
    .then((data: T) => data)
    .catch((error: Error) => {
      throw error;
    });
}

const httpService = {
  get: <T,>(url: string): Promise<T> => apiService(url, HTTPMethods.GET),

  post: <T,>(url: string, body?: unknown): Promise<T> => apiService(url, HTTPMethods.POST, body),
};

export default httpService;
