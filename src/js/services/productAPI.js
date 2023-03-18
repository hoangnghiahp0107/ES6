const URL = "https://640cb0a694ce1239b0b3693a.mockapi.io/api/products";

async function apiGetPerson() {
   return await axios({
    method: "GET",
    url: URL,
  });
}

async function apiCreatePerson(product) {
  return await axios({
    method: "POST",
    url: URL,
    data: product,
  });
}

function apiDeletePerson(productID) {
  return axios({
    method: "DELETE",
    url: `${URL}/${productID}`,
  });
}

function apiGetPersonById(productID) {
  return axios({
    method: "GET",
    url: `${URL}/${productID}`,
  });
}

async function apiUpdateProduct(productID, product) {
  return await axios({
    method: "PUT",
    url: `${URL}/${productID}`,
    data: product,
  });
}
