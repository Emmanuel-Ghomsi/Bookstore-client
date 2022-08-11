const apiPort = location.protocol === "https:" ? ":8443" : ":8080";

const apiUrl =
    location.protocol +
    "//" +
    location.hostname +
    apiPort +
    process.env.BASE_URL +
    "api";

    export const fetchCategories = () => {
        const url = apiUrl + "/categories";
        console.log("GET from " + url);
        return fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .catch(reason => {
                console.log("Error fetching category data", reason);
            });
    }

    export const fetchCategoryName = (name) => {
        const url = apiUrl + "/categories/name/" + name;
        console.log("GET from " + url);
        return fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .catch(reason => {
                console.log("Error fetching category data", reason);
            });
    }

    export const fetchSelectedCategoryBooks = (name) => {
        const url = apiUrl + "/categories/name/" + name + "/books";
        console.log("GET from " + url);
        return fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .catch(reason => {
                console.log("Error fetching category data", reason);
            });
    }

    export const fetchCategorySuggestedBooks = (name) => {
        const url = apiUrl + "/categories/name/" + name + "/suggested-books";
        console.log("GET from " + url);
        return fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .catch(reason => {
                console.log("Error fetching category data", reason);
            });
    }

    export function placeOrder(order) {
        console.log("POSTing to " + `${apiUrl}/orders`);
        return fetch(`${apiUrl}/orders`, {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(stream => {
            if (stream.ok) {
                return stream.json();
            }
            throw new Error("Network response was not ok.");
        });
    }